
const cloudinary = require("cloudinary").v2;//ensuring that you are using version 2 of cloudinary sdk

require("dotenv").config();//Load environment variables

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000
});




const uploadOnCloudinary = async(filePath)=> {
   try{

    console.log("this is the filePath->",filePath);
    // upload the file o the cloudinary with the help of upload function
    const result = await cloudinary.uploader.upload(filePath,{
        folder:"orders" //default folder
        
    });
    console.log(result)
    return result;
}catch(err){
    console.error(err);
    console.log(err)
    throw err;
}
};

module.exports = uploadOnCloudinary;