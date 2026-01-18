import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  // If no token is present
  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    // Verify JWT token
    const tokenData = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Check if the token belongs to the correct seller
    if (tokenData.email === process.env.SELLER_EMAIL) {
      req.seller = tokenData; // Optional: attach seller info to request
      return next(); // ✅ Only call next once
    } else {
      return res.status(403).json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    console.error("AuthSeller Error:", error.message);
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};
