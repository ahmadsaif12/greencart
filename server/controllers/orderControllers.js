import Product from "../models/Product.js";
import Order from "../models/Order.js";

// PLACE ORDER (COD)
// POST /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // calculate total amount
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }

    // tax (2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
    });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER ORDERS
// POST /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL ORDERS (SELLER / ADMIN)
// GET /api/orders/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product address userId")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
