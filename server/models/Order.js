// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }, 
    quantity: { type: Number, required: true }
  }],
  Amount: { type: Number, required: true },
  addresses: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "address" },
  status: { type: String, default: "Order Placed" },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  date: { type: Number, default: Date.now }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;