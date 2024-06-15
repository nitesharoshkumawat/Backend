import {asynceHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/apiResponse.js";

const registerUser = (asynceHandler,async(req, res)=>{
  let { username, email, fullName, password } = req.body;
  console.log(username, email, fullName, password);

  if(
    [fullName, username, email, password].some((fields) => fields?.trim() === "" )
  ){
  throw new apiError(400, "all fields are requried");
  };

const existUser = await User.findOne({
  $or :[{username}, {email}]
});

console.log(existUser);

if(existUser){
 throw new apiError(409, "User with email or username already exist");
}

const avatarLocalPath = req.files?.avatar[0].path
const coverImageLocalPath = req.files?.coverImage[0].path

console.log(avatarLocalPath);
console.log(coverImageLocalPath);

if(!avatarLocalPath){
  throw new apiError(400, "Avatar is required");
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
  throw new apiError(400, "Avatar file is required");
}

const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase()
});

const createUser = await User.findById(user._id).select( "-password -refreshToken")

if(!createUser){
  throw new apiError(500, "something went wrong while registring the user")
};

return  res.status(200).json(
  new ApiResponse(200, createUser, "User Registred successfully")
)

})

export {registerUser};