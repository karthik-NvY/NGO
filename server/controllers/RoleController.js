const Roles = require('../models/roleModel'); // Importing the Roles model

// Endpoint for signing up for a role in an NGO
const signUpForRole = async (req, res) => {
    const { user_id, ngo_id, role } = req.body;
    try {
        const newRole = new Roles({ 
            user_id, 
            ngo_id, 
            role 
        });

        await newRole.save();

        res.status(201).json({ 
            message: 'Role signed up successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
        console.log("Error in signUpForRole controller: ", error.message);
    }
}

const deleteRole = async (req, res) => {
    const { user_id, ngo_id } = req.body;
    try {
        await Roles.deleteOne({ 
            user_id, 
            ngo_id 
        });
        res.status(200).json({ 
            message: 'Role removed successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message
        });
        console.log("Error in deleteRole controller: ", error.message);
    }
}

module.exports = { 
    signUpForRole, 
    deleteRole 
};