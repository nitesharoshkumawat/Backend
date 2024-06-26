import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


  
const connectDB = async () =>{
  try {
    const connectionInstance =  await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);
    console.log(`\n mongodb connected !! DB host: ${connectionInstance.connection.host}`)
  }catch(error){
    console.log("MONGODB connection error", error);
    process.exit(1)
  }
};

export default connectDB