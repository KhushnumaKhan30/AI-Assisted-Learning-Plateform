import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify the JWT token before allowing access to protected routes.
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check whether the authorization token exists.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // Extract the token from the authorization header.
    const token = authHeader.split(" ")[1];

    // Verify the token using the application's secret key.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the authenticated user in the database.
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    // Attach the authenticated user's ID and role to the request.
    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

export default authMiddleware;