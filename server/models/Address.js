import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
  userId:{type:String,required:true},
  firstname:{type:String,required:true},
  lastname:{type:String,required:true},
  email:{type:String, required:true,unique:true},
  street:{type:String, required:true,unique:true},
  city:{type:String, required:true,unique:true},
  state:{type:String, required:true,unique:true},
  zipcode:{type:String, required:true,unique:true},
  country:{type:String, required:true,unique:true},
  phone:{type:String, required:true,unique:true},
})

const Address=mongoose.models.address || mongoose.model("Addeess",addressSchema)
export default Address;