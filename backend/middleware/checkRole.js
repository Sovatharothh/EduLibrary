const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (req.user && req.user.role && allowedRoles.includes(req.user.role)) {
      // User has the required role, proceed to the next middleware or route handler
      return next();
    } else {
      // User does not have the required role
      return res.status(403).json({
        status: 403,
        message: "Unauthorized: Insufficient role privileges.",
      });
    }
  };
};

module.exports = checkRole;