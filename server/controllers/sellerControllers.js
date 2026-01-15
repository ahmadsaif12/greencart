import jwt from "jsonwebtoken"

//api/seller/login

export const sellerLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
    if(process.env.SELLER_PASSWORD === password && process.env.SELLER_EMAIL===email){
        const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie("sellerToken", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({success:true,message:"Logged in"})

    }else{
        res.json({success:false,message:"invalid credentials"});
    }

    }catch(error){
        console.log(error);
        return res.json({
         success: false,
         message: "Not Authorized",
    });
    }
}
//api/seller/is-auth

export const sellerisAuth = async (req, res) => {
  try {

    res.json({
      success: true,
      message: user,
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//api/user/logout logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({
      success: true,
      message: "logout",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
