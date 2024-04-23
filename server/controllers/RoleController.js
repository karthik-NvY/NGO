const Roles = require('../models/roleModel'); // Importing the Roles model

// Endpoint for signing up for a role in an NGO
const signUpForRole = async (req, res) => {
    const { ngo_id, role } = req.body;
    const user_id = req.user_id;
    try {
        const newRole = new Roles({ 
            user_id, 
            ngo_id, 
            role 
        });

        userRole = await newRole.save();
        res.status(201).json({ 
            userRole,
            message: 'Role signed up successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
        console.log("Error in signUpForRole controller: ", error.message);
    }
}
const fetchRole = async (req, res) => {
    const { ngo_id } = req.body;
    const user_id = req.user_id;
    try {
         const role = await Roles.find({ 
            user_id, 
            ngo_id 
        });
        if(role){
            return res.status(200).json({ 
                success: true,
                role,
                message: 'Role fetched successfully' 
            });
        }
        return res.status(201).json({
            success: true,
            message: 'No role for the user'
        })
        
    } catch (error) {

       console.log("Error in fetchRole controller: ", error.message);
       return res.status(500).json({ 
            error: error.message
        });
        
    }
}

const deleteRole = async (req, res) => {
    const { ngo_id } = req.body;
    const user_id = req.user_id;
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
    fetchRole,
    deleteRole
};