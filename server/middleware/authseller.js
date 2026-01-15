import jwt from "jsonwebtoken"
export const authSeller=async(req,res,next)=>{
 const {sellerToken}=req.cookies;
 if(!sellerToken){
    return res.json({success:false,message:"Not authorized"});
 }
try {
    const tokenCode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenCode.email === process.env.SELLER_EMAIL) {
      next();
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

