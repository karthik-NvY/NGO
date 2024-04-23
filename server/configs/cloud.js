const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dvhwtxtna', //process.env.CLOUD_NAME,
  api_key: '724276411298822', //process.env.CLOUD_KEY,
  api_secret: '9iLaQbi-dd4lLw9LkAmb5k4NcP0'//process.env.CLOUD_SECRET_KEY
});

module.exports = { cloudinary };
