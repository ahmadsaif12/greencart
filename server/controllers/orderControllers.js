import 'dotenv/config';  
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- PLACE ORDER (COD) ---
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data: Address or Items missing" });
    }

    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.offerPrice * item.quantity;
      }
    }

    totalAmount += Math.floor(totalAmount * 0.02);

    const newOrder = await Order.create({
      userId,
      items,
      addresses: address,
      Amount: totalAmount,
      paymentType: "COD",
      isPaid: false,
      date: Date.now()
    });

    res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.log("COD Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- PLACE ORDER (STRIPE) ---
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address, origin } = req.body; // origin is your frontend URL (e.g. http://localhost:5173)

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data: Address or Items missing" });
    }

    let totalAmount = 0;
    const line_items = [];

    // loop through items to build Stripe line_items and calculate total
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.offerPrice * item.quantity;

        line_items.push({
          price_data: {
            currency: 'usd', // Change to your currency (e.g., 'inr')
            product_data: {
              name: product.name,
            },
            unit_amount: product.offerPrice * 100, // Stripe expects amount in cents
          },
          quantity: item.quantity,
        });
      }
    }

    // Add 2% Tax to Stripe line items
    const taxAmount = Math.floor(totalAmount * 0.02);
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: "Service Fee & Tax" },
        unit_amount: taxAmount * 100,
      },
      quantity: 1,
    });

    // Create order in DB (unpaid)
    const newOrder = await Order.create({
      userId,
      items,
      addresses: address,
      Amount: totalAmount + taxAmount,
      paymentType: "Stripe",
      isPaid: false,
      date: Date.now()
    });

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("Stripe Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- VERIFY STRIPE PAYMENT ---
export const verifyStripe = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// --- GET USER ORDERS ---
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId })
      .populate({
        path: 'items.product',
        model: Product 
      })
      .populate({
        path: 'addresses',
        model: Address
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- GET ALL ORDERS (FOR SELLER) ---
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("items.product addresses")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};