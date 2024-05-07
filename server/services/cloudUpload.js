const fs = require('fs');
const {cloudinary} = require('../configs/cloud.js')

async function uploadToCloudinary(locaFilePath) {
  var mainFolderName = "main"
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath
  const res = await cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
  console.log(res);
  return {
        message: "Success",
        url:res.url
      };
  // .then((result) => {
  //   fs.unlinkSync(locaFilePath)
  //   return {
  //     message: "Success",
  //     url:result.url
  //   };
  // }).catch((error) => {
  //   fs.unlinkSync(locaFilePath)
  //   return {message: "Fail",};
  // });
}

module.exports = { uploadToCloudinary };