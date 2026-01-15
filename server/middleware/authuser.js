import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const tokenCode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenCode.id) {
      if (!req.body) req.body = {};
      req.body.userId = tokenCode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Not Authorized",
    });
  }
};
