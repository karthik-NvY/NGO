const fs = require('fs');
const {cloudinary} = require('../configs/cloud.js')

async function uploadToCloudinary(locaFilePath) {
  var mainFolderName = "main"
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath
  return cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
  .then((result) => {
    fs.unlinkSync(locaFilePath)
    return {
      message: "Success",
      url:result.url
    };
  }).catch((error) => {
    fs.unlinkSync(locaFilePath)
    return {message: "Fail",};
  });
}

module.exports = { uploadToCloudinary };