import {v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js";

//api/product/add
export const addProduct=async(req,res)=>{
 try{
  let productData=JSON.parse(req.body.productData);
  const images=req.files;
  let imagesUrl=await Promise.all
  (
    images.map(async(item)=>{
        let result=await cloudinary.uploader.upload(item.path,{resourses_type:'image'})
        return result.secure_url;
    })
  )
   await Product.create({...productData,image:imagesUrl})
   res.json({success:true,message:"product added"})
 }catch(error){
     console.error(error.message);
     res.status(500).json({
      success: false,
      message: error.message,
    });
 }
}
//get all products :/api/product/list

export const productList=async(req,res)=>{
 try{
    const products=await Product.find({});
    res.json({success:true,products})
 }
 catch(error){
     console.error(error.message);
     res.status(500).json({
      success: false,
      message: error.message,
    });
 }

}

//get single products :/api/product/id
export const productById=async(req,res)=>{
  try{
    const {id}=req.body;
    const product=await Product.findById(id);
    res.json({success:true,product})
  }
  catch(error){
     console.error(error.message);
     res.status(500).json({
      success: false,
      message: error.message,
    });
}
}
//change stock products: /api/product/stock
export const changeStock=async(req,res)=>{
    try{
     const {id,inStock}=req.body;
     await Product.findByIdAndUpdate(id,{inStock})
     res.json({success:true,message:"stock updated"})
    }
    catch(error){
     console.error(error.message);
     res.status(500).json({
      success: false,
      message: error.message,
    });
}
}