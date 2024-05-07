const fs = require('fs');
const {cloudinary} = require('../configs/cloud.js')

async function uploadToCloudinary(locaFilePath) {
  var mainFolderName = "main"
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath
  try{
    const result = await cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
    fs.unlinkSync(locaFilePath);
    return {
      message: "Success",
      url:result.url
    };
  }
  catch(error){
    console.log(error);
    return {message: "Fail"};
  };
}

module.exports = { uploadToCloudinary };