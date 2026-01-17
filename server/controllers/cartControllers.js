import User from "../models/User.js";

// api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    res.json({ success: true, message: "cart updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
