import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../Models/user.js";
import multer from "multer";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
//for image
//1) Store file temporarily in memory
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//2) Creating middleware to upload userPhoto
const uploadUserPhoto = upload.single("photo");

//3) Resize and upload user photo to cloudinary
const resizeUserPhoto = catchAsync(async (req, res, next) => {
  //upload.single("image") , to access files use "req.file"
  //upload.array("images",5) , to access files use "req.files"
  if (!req.file) return next();

  //Resize the image using sharp before uploading to cloudinary
  const buffer = await sharp(req.file.buffer)
  .resize({width:500,height:500},{
    fit:sharp.fit.cover, 
    position:sharp.strategy.entropy
  })
  .toFormat("jpeg")
  .jpeg({quality:90})
  .toBuffer();

 //now we will upload to cloudinary 
 const stream = cloudinary.uploader.upload_stream(
  {
    folder:"avatars",
    public_id:`user-${req.user.id}-${Date.now()}`,
    resource_type:"image"
  },(error,result)=>{
    //Cloudinary lae basically k garxa vane ni haina image upload garxa ani hami lai chai ni,
    //url dinxa k tyo image ko, ho tyo url chai hami database ma rakhna parne hunxa
    if(error){
      return next(new AppError("Error uploading image to Cloudinary",500));
    }
    //We will store the secure Url in req.file.cloudinaryAvatar
    req.file.cloudinaryAvatar = result.secure_url;
    req.file.public_id = result.public_id;
    next();
  }
 ) 
 //Sending the data to cloudinary via stream 
 stream.end(buffer);
});

//get myself
const getMe = catchAsync(async (req, res, next) => {
  //using cookie to get the current user from protect route
  const { user } = req;
  if (!user) {
    return next(new AppError("There is no user logged in", 401));
  }
  res.status(200).json({
    status: "true",
    message: user,
  });
});

//update userProfile
const updateProfile = catchAsync(async (req, res, next) => {
  const userid = req.user.id;
  const updatedData = {
    email: req.body.email,
    name: req.body.name,
  };

  //4)if user uploaded photo then we will add that to the updatedData
  if(req.file && req.file.cloudinaryAvatar){
    updatedData.avatar ={
      public_id:req.file.public_id,
      url:req.file.cloudinaryAvatar
    };
  }

  //update user data using patch request
  const updatedUser = await User.findByIdAndUpdate(userid, updatedData, {
    new: true,
  });

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "true",
    message: updatedUser,
  });
});

//Get all users - ADMIN
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new AppError("No users found", 404));
  }
  res.status(200).json({
    status: "true",
    message: users,
  });
});

//Get a user by ID - ADMIN
const getUserbyId = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found with that id", 404));
  }
  res.status(200).json({
    status: "true",
    message: user,
  });
});

//update user - ADMIN
const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  //do not change password with this
  req.body.password = undefined;
  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!user) {
    return next(new AppError("User not found with that id", 404));
  }
  res.status(200).json({
    status: "true",
    message: user,
  });
});

//delete user - ADMIN
const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const deletedUser = await User.findByIdAndDelete(userId);
  //delete avatar from cloudinary if implemented
  if (!deletedUser) {
    return next(new AppError("User not found with that id", 404));
  }
  res.status(204).json({
    status: "true",
    message: "Deleted successfully",
  });
});

export {
  getMe,
  updateProfile,
  getAllUsers,
  getUserbyId,
  updateUser,
  deleteUser,
};
