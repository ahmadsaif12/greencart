import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
  userId:{type:String,required:true,ref:"user"},
  items:[{
    product:{type:String,required:true,ref:"product"},
    quantity:{type:Number,required:true,}
  }],
  Amount:{type:Number,required:true,},
  addresses:{type:String,required:true,ref:"address"},
  status:{type:String,default:"order Placed"},
  paymentType:{type:String,required:true},
  isPaid:{type:Boolean,required:true,default:false}
},{timestamps:true})

const Order=mongoose.models.Order || mongoose.model("Order",orderSchema)
export default Order;