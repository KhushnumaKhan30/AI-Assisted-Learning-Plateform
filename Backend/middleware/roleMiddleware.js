// Allow access only to users with the specified roles.
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Check whether the authenticated user's role is permitted.
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });
    }

    next();
  };
};

export default roleMiddleware;