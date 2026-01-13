import mongoose from "mongoose";

const ConnectDb=async()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("connected to database"));
        await mongoose.connect(
      `${process.env.MONGODB_URI}/greencart`
    );
    }catch(error){
        console.error(error.message)
    }
}
export default ConnectDb;