import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ success: false, message: "Not Authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach userId for backend
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};
