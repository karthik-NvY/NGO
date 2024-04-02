/*
    This file contains the controller function for the Templates.
*/

const Template1 = require('../models/template1Model'); // Importing the Template1 model

// Controller function to save Template1 document to the database
const template1 = async (req, res) => {
    try {
        // Extracting data from the request body
        const {
            logo,
            ngoName,
            heroImages,
            aboutUsText,
            aboutUsImage1,
            aboutUsImage2,
            recentEvents,
            email,
            phoneNumber,
            contactImage
        } = req.body;

        // Creating a new Template1 document
        const newTemplate1 = new Template1({
            logo,
            ngoName,
            heroImages,
            aboutUsText,
            aboutUsImage1,
            aboutUsImage2,
            recentEvents,
            email,
            phoneNumber,
            contactImage
        });

        // Saving the document to the database
        const savedTemplate1 = await newTemplate1.save();

        res.status(201).json({
            message: 'Template saved successfully',
            savedTemplate1
        }); // Respond with the saved document
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in template1 controller: ", error.message);
    }
}

// Controller function to fetch Template1 document associated with the provided NGO ID
const getTemplate1 = async (req, res) => {
    try {
        const { ngoId } = req.params; // Extracting NGO ID from request parameters

        // Fetching Template1 document associated with the provided NGO ID
        const template1 = await Template1.findOne({ ngo_id: ngoId });

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
        console.log("Error in getTemplate1 controller: ", error.message);
    }
}

export { template1, getTemplate1}