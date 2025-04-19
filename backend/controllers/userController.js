const mongoose = require('mongoose');
const User = require("../models/User");
const bcrypt = require('bcrypt');


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

    // Fetch all users (excluding passwords)
    const users = await User.find().select('-password'); 
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

// delete user by ID (admin only)
exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("Deleting user ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid user ID format",
        body: {}
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        message: "Forbidden - Admin access required.",
        body: {}
      });
    }

    // First find the user to return later
    const userToDelete = await User.findById(userId);
    
    if (!userToDelete) {
      return res.status(404).json({
        status: 404,
        message: "User not found", 
        body: {}
      });
    }

    // Now delete the user
    await User.findByIdAndDelete(userId);

    // Return the deleted user data (excluding password)
    const deletedUserData = {
      _id: userToDelete._id,
      fullName: userToDelete.fullName,
      email: userToDelete.email,
      role: userToDelete.role,
      createdAt: userToDelete.createdAt,
      updatedAt: userToDelete.updatedAt
    };

    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      body: deletedUserData  // Now contains the deleted user's info
    });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      body: {}
    });
  }
};


// create new user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    console.log('Create user request:', req.body); // Debug log

    // Simple validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Full name, email and password are required",
        body: {}
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "User already exists",
        body: {}
      });
    }

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      password: await bcrypt.hash(password, 12),
      role: role || 'user'
    });

    // Return response without password
    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      body: userResponse
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      status: 500,
      message: error.message || "Server error",
      body: {}
    });
  }
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, email, role, password } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        message: "Forbidden - Admin access required",
        body: {}
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        body: {}
      });
    }

    // Update fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.role = role || user.role;

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // Return updated user without password
    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      status: 200,
      message: "User updated successfully",
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


// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        body: {}
      });
    }

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

// Update logged-in user's profile
exports.updateProfileById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        body: {}
      });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      body: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      body: {}
    });
  }
};
