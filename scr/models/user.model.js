import mongoose, {Schema}from "mongoose";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";


const userSchema = new Schema({
  username:{
    type: String,
    required : true,
    unique : true,
    lowerCase : true,
    trim : true,
    index : true
  },
  email:{
    type: String,
    required: true,
    unique : true,
    lowerCase : true,
    trim : true,
  },
  fullName:{
    type: String,
    required: true,
    trim : true,
    index : true
  },
  avatar:{
    type: String,
    required: true
  },
  coverimage: {
    type : String,

  },
  watchHistroy:[
    {
      type: Schema.Types.ObjectId,
      rel : "Video"
    }
  ],
  password:{
    type: String,
    required: [true, "password is required"]
  },
  refreshToken :{
    type : String
  }
  

},
{timestamps}) ;

userSchema.pre("save",async function(next)
{
  if(!this.ismodified("password")) return next()
 this.password =await bcrypt.hash(this.password, 10)
  next()
});

userSchema.methods.ispasswordcorrect = async function(password){
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
    {
      _id: transformWithEsbuild._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRECT,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
};

userSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
    {
      _id: transformWithEsbuild._id,
     
    },
    process.env.REFRESH_TOKEN_SECRECT,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
};

export const User = mongoose.model("User", userSchema);