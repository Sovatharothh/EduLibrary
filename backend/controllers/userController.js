const User = require("../models/User");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        message: "Forbidden - Admin access required.",
        body: {}
      });
    }

    // Fetch all users (including the password field)
    const users = await User.find(); 
    res.status(200).json({
      status: 200,
      body: users
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      body: {}
    });
  }
};

// delete user by name (only admin)
exports.deleteUserByName = async (req, res) => {
    try {
        const { fullName } = req.params; 

        // Check if user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                status: 403,
                message: "Forbidden - Admin access required.",
                body: {}
            });
        }

        // Find and delete the user by full name
        const user = await User.findOneAndDelete({ fullName });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
                body: {}
            });
        }

        res.status(200).json({
            status: 200,
            message: "User deleted successfully",
            body: {}
        });


    }catch (error) {
        res.status(500).json({
            status: 500,
            message: "Server error",
            body: {}
        });
    }
}


// Get a user's profile (for users and admins)
exports.getUserProfile = async (req, res) => {
  try {
    // Fetch the user's profile excluding password
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        body: {}
      });
    }

    // Return the user's profile including password
    res.json({
      status: 200,
      body: user
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      body: {}
    });
  }
};

// update user profile (for users and admins)
exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // Validate the incoming data
    if (!fullName || !email) {
      return res.status(400).json({
        status: 400,
        message: "Full name and email are required",
        body: {}
      });
    }

    // Check if the user is updating their own profile or an admin is updating any user
    const userId = req.user.role === 'admin' ? req.params.userId : req.user.userId;

    // Find the user and update the profile
    const updatedUser = await User.findByIdAndUpdate(userId, { fullName, email }, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        body: {}
      });
    }

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      body: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      body: {}
    });
  }
};

