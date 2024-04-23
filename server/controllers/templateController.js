/*
    This file contains the controller function for the Templates.
*/

const Template = require('../models/templateModel'); // Importing the Template model
const Ngohandler  = require("../controllers/NgoController");
const Roles = require('../models/roleModel'); // Importing the Template model

const multer = require('multer');

// Controller function to save Template document to the database


const upload = multer({ dest: 'uploads/' });

const { uploadToCloudinary } = require('../services/cloudUpload')

class TemplateHandler{
    static storeTemplate = async (req, res) => {
        try {
            // Extracting data from the request body
            const {
                logo,
                ngoName,
                heroImages,
                aboutUsText,
                // aboutUsImage1,
                aboutUsImage2,
                recentEvents,
                email,
                phoneNumber,
                contactImage
            } = req.body;
            if (!logo || 
                !ngoName ||
                !heroImages ||
                !aboutUsText ||
                // aboutUsImage1,
                !aboutUsImage2 ||
                !recentEvents ||
                !email ||
                !phoneNumber||
                !contactImage){
                    return res.status(400).json({
                        success: false,
                        error: "Missing NGO template variables",
                    });
            }
            const ngo_id = await Ngohandler.addNgo(ngoName, req.name);
            if(!ngo_id){
                return res.status(400).json({
                        success: false,
                        error: "NGO already exists",
                });
            }
            // Creating a new Template document
            const newTemplate = new Template({
                logo,
                ngoName,
                ngo_id,
                heroImages,
                aboutUsText,
                // aboutUsImage1,
                aboutUsImage2,
                recentEvents,
                email,
                phoneNumber,
                contactImage
            });
            // Saving the document to the database
            const savedTemplate = await newTemplate.save();
            const packet = {
                user_id:req.user_id,
                ngo_id:ngo_id,
                role:'admin'
            };

            await Roles.create(packet);

            return res.status(201).json({
                success:true,
                message: 'Template saved successfully',
                //savedTemplate
            }); // Respond with the saved document
        } catch (error) {
            return res.status(500).json({ 
                success:false,
                message: error.message 
            });
            console.log("Error in template1 controller: ", error.message);
        }
    }

    // Controller function to fetch Template document associated with the provided NGO ID
    static fetchTemplate = async (req, res) => {
        try {
            const { ngo_id } = req.body; // Extracting NGO ID from request parameters

            if(!ngo_id){
                return res.status(400).json({
                    success: false,
                    error: "Missing NGO details",
                });
            }
            // Fetching Template document associated with the provided NGO ID
            const template1 = await Template.findOne({ ngo_id: ngo_id });

            if (!template1) {
                return res.status(404).json({ 
                    success:true,
                    error: 'Template not found for the provided NGO ID'
                });
            }

            return res.status(200).json({
                success:true,
                message:"Successfully fetched template variables",
                template1
            });
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            });
            console.log("Error in getTemplate controller: ", error.message);
        }
    }   


    static storeTemplatetmp = async (req, res) => {
        const uploadedImages = req.files;
        //console.log(req.files);
        const image_status = req.body.image_status;
        // Access text data using req.body
        const { name, aboutUsText } = req.body;

        let img_idx = 0;

        const URLS = ['a', 'b']
        console.log(image_status);
        console.log(uploadedImages);

        const results = await Promise.all(
            image_status.map(async (status, index) => {
                console.log(status, index);
                if (status==='true') {
                    try {
                      const result = await uploadToCloudinary(uploadedImages[img_idx].path);
                      img_idx += 1;
                      return result.url;
                    } catch (error) {
                      console.error('Error uploading image to Cloudinary:', error);
                      return null;
                    }
                  } 
                else {
                    console.log("hihi");
                    return URLS[index];
                }
            })
        );

        console.log(results);

        // Respond with success message
        return res.json({ success: true, message: 'Data uploaded successfully' });
    };
}



module.exports = { TemplateHandler };