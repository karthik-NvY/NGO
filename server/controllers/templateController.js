/*
    This file contains the controller function for the Templates.
*/

const Template1 = require('../models/template1Model'); // Importing the Template1 model

const template1 = async (req, res) => {
    try {
        // Extracting data from the request body
        const {
            logo,
            name,
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
            name,
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

export { template1 }