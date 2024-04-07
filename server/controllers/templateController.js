/*
    This file contains the controller function for the Templates.
*/

const Template = require('../models/templateModel'); // Importing the Template model
const Ngohandler  = require("../controllers/NgoController");
const Roles = require('../models/roleModel'); // Importing the Template model

// Controller function to save Template document to the database

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

            ngo_id = await Ngohandler.addNgo(ngoName, req.user_id);

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

            packet = {
                user_id:req.user_id,
                ngo_id:ngo_id,
                role:'admin'
            };
            await Roles.create(packet);

            res.status(201).json({
                message: 'Template saved successfully',
                //savedTemplate
            }); // Respond with the saved document
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in template1 controller: ", error.message);
        }
    }

    // Controller function to fetch Template document associated with the provided NGO ID
    static fetchTemplate = async (req, res) => {
        try {
            const { ngo_id } = req.body; // Extracting NGO ID from request parameters

            // Fetching Template document associated with the provided NGO ID
            const template1 = await Template.findOne({ ngo_id: ngo_id });

            if (!template1) {
                return res.status(404).json({ 
                    message: 'Template not found for the provided NGO ID'
                });
            }

            res.status(200).json(template1);
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            });
            console.log("Error in getTemplate controller: ", error.message);
        }
    }   
}



module.exports = { TemplateHandler };