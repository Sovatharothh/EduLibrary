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
