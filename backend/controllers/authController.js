const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ status: 400, message: "Passwords do not match", body: {} });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "User already exists", body: {} });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        // Return the created user's data in the response body
        res.status(201).json({
            status: 201,
            message: "User registered successfully",
            body: {
                fullName: newUser.fullName,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};


// Login an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 400, message: "Invalid credentials", body: {} });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 400, message: "Invalid credentials", body: {} });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return user details and token in the response body
        res.json({
            status: 200,
            message: "Login successful",
            body: {
                token,
                userId: user._id,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};
