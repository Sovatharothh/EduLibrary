const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


//function to create initial admin user if one doesn't exist

async function createInitialAdmin() {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });

        if (!existingAdmin) {
            const adminUsername = process.env.INITIAL_ADMIN_USERNAME;
            const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
            const adminEmail = process.env.INITIAL_ADMIN_EMAIL; // Optional

            if (!adminUsername || !adminPassword) {
                console.warn("INITIAL_ADMIN_USERNAME and INITIAL_ADMIN_PASSWORD environment variables must be set to create the initial admin user.");
                return;
            }

            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            const newAdmin = new User({
                username: adminUsername, // You can decide what to use as fullName
                email: adminEmail || `${adminUsername}@elib.com`, // Provide a default if not set
                password: hashedPassword,
                role: "admin",
            });

            await newAdmin.save();
            console.log("Initial admin user created successfully.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error creating initial admin user:", error);
    }
}

exports.createInitialAdmin = createInitialAdmin;

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
