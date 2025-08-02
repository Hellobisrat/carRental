import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB connected successfully')
  }
  catch(error){
    console.log('error in connection')
    process.exit()
  }
}

export default connectDB;