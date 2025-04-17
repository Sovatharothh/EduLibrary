const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ status: 401, message: 'Unauthorized - No token', body: {} });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ status: 401, message: 'Unauthorized - Invalid token', body: {} });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ status: 401, message: 'Unauthorized - User not authenticated', body: {} });
    }

    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ status: 403, message: 'Forbidden - Admin access required', body: {} });
    }
};

module.exports = { verifyToken, authorizeAdmin };
