/*
    This file contains the controller function for the Templates.
*/

const Template = require('../models/templateModel'); // Importing the Template model
const Ngohandler  = require("../controllers/NgoController");
const Roles = require('../models/roleModel'); // Importing the Template model

const multer = require('multer');

// Controller function to save Template document to the database

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const upload = multer({ dest: 'uploads/' });

const { uploadToCloudinary } = require('../services/cloudUpload')

class TemplateHandler{
    static storeTemplate = async (req, res) => {
        const uploadedImages = req.files;
        const image_status = req.body.image_status;
        const { name, visionText, aboutUsText, 
            eventBottomText, email, phoneNumber, 
            instahandle, xhandle 
        } = req.body;
        const eventDescriptions = req.body.eventDescriptions;


        const ngo_id = await Ngohandler.addNgo(name, req.name);
        if(!ngo_id){
            return res.status(400).json({
                success: false,
                error: "NGO already exists",
            });
        }

        const roles_packet = {
                user_id:req.user_id,
                ngo_id:ngo_id,
                role:'admin'
        };
        await Roles.create(roles_packet);


        const default_images = [
            'https://res.cloudinary.com/dvhwtxtna/image/upload/v1714162595/main/uploads/lffl2zhkzevtuxvthidl.png', 
            'https://res.cloudinary.com/dvhwtxtna/image/upload/v1713906646/main/uploads/87bb7bea86951b8c2463a848c3d75293.png', 
            'https://res.cloudinary.com/dvhwtxtna/image/upload/v1713906646/main/uploads/87bb7bea86951b8c2463a848c3d75293.png', 
            'https://res.cloudinary.com/dvhwtxtna/image/upload/v1713906646/main/uploads/87bb7bea86951b8c2463a848c3d75293.png', 
            'https://res.cloudinary.com/dvhwtxtna/image/upload/v1713906646/main/uploads/87bb7bea86951b8c2463a848c3d75293.png', 
            'https://res.cloudinary.com/dvhwtxtna/image/upload/v1713906646/main/uploads/87bb7bea86951b8c2463a848c3d75293.png', 
        ]
        const packet = {
            name : name,
            visionText:visionText,
            aboutUsText: aboutUsText,
            eventBottomText: eventBottomText,
            logo:default_images[0],
            main:default_images[1],
            aboutUsImage:default_images[2],
            aboutUsImage2:default_images[3],
            contactImage:default_images[4],
            eventImages:[],
            eventDescriptions:eventDescriptions,
            email:email,
            phoneNumber:phoneNumber,
            instahandle:instahandle,
            xhandle:xhandle,
            ngo_id:new ObjectId(ngo_id),
        }
        const im_map = {
            0:"logo", 
            1:"main", 
            2:"aboutUsImage", 
            3:"aboutUsImage2",
            4:"contactImage",
        }
        const eventImages = []
        let img_idx = 0;
        image_status.map(async (status, index) => {
            if(index > 4 && status==='true'){
                uploadedImages[img_idx]
            }
        })
        await Promise.all(
            image_status.map(async (status, index) => {
                if (status==='true') {
                    try {
                        const result = await uploadToCloudinary(uploadedImages[img_idx].path);
                        // console.log("Image uploaded");
                        //const result = {"url":"Fu"}
                        img_idx += 1;
                        if (index < 5){
                            packet[im_map[index]] = result.url;
                        }
                        else{
                            packet["eventImages"].push(result.url);
                        }
                        return true;
                    } 
                    catch (error) {
                        console.error('Error uploading image to Cloudinary:', error);
                        return false;
                    }
                  } 
                else {
                    if(index > 4){
                        packet["eventImages"].push(default_images[default_images.length-1])
                    }
                    return true;
                }
            })           
        );
        const response = await Template.create(packet);
        return res.status(201).json({
            success:true,
            message: 'Template saved successfully',
            response
        });  
    };

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
            const template = await Template.findOne({ ngo_id: ngo_id });

            if (!template) {
                return res.status(404).json({ 
                    success:true,
                    error: 'Template not found for the provided NGO ID'
                });
            }

            return res.status(200).json({
                success:true,
                message:"Successfully fetched template variables",
                template
            });
        } 
        catch (error) {
            res.status(500).json({ 
                message: error.message 
            });
            console.log("Error in getTemplate controller: ", error.message);
        }
    }   
    }

module.exports = { TemplateHandler };