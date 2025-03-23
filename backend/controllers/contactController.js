const Contact = require("../models/Contact");

exports.submitForm = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;
        const contactMessage = new Contact({ fullName, email, subject, message });
        await contactMessage.save();
        res.status(201).json({ status: 201, message: "Message sent successfully", body: {} });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};


exports.getAllMessages = async (req, res) => {
    try {
        // Fetch all contact messages from the database
        const messages = await Contact.find();

        // Respond with the list of messages
        res.status(200).json({ status: 200, message: "Messages fetched successfully", body: messages });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ status: 500, message: "Server error", body: {} });
    }
};
