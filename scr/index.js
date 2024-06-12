import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js";


dotenv.config({
  path: "./env"
})

connectDB()
.then(() => { 

  app.on("error", (err) =>{
    console.log("error", err);
    throw err
  })
  app.listen(process.env.PORT || 8080,() =>{
  console.log(`Server is lisning at port ${process.env.PORT}`)
 })})
.catch((err) =>{
  console.log("MongoDB connections failed !! ", err)
});