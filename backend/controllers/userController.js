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

// Get a user's profile (for users and admins)
exports.getUserProfile = async (req, res) => {
  try {
    // Fetch the user's profile based on the userId from the token
    const user = await User.findById(req.user.userId);
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
