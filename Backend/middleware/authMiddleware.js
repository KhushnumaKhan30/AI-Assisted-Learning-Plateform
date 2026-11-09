import jwt from "jsonwebtoken";

// Verify the JWT token before allowing access to protected routes.
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check whether the authorization token exists.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // Extract the token from the Bearer authorization header.
    const token = authHeader.split(" ")[1];

    // Verify the token using the application's secret key.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user's ID to the request.
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

export default authMiddleware;