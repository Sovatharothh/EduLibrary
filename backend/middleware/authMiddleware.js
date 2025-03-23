const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized. No token provided.",
            body: {}
        });
    }

    try {
        // Remove "Bearer " from the token if present
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user payload to request
        next(); // Proceed to the next middleware or controller
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: "Invalid or expired token.",
            body: {}
        });
    }
};

module.exports = authMiddleware;
