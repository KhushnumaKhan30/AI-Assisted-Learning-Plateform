import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Register a new user account.
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check whether all required fields are provided.
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

    // Check whether the email is already registered.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create the user; the User model hashes the password before saving.
    const user = await User.create({
      name,
      email,
      password,
    });

    // Return the newly registered user's basic details.
    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
};



// Log in an existing user.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check whether email and password are provided.
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Find the user and explicitly include the hidden password field.
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    // Reject requests with an unknown email or incorrect password.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

   
    // Generate an authentication token for the logged-in user.
const token = generateToken(user._id);

// Return the token and user's basic account details.
res.status(200).json({
  success: true,
  message: "Login successful!",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};


// Retrieve the profile of the authenticated user.
export const getProfile = async (req, res) => {
  try {
    // Find the user using the ID attached by authentication middleware.
    const user = await User.findById(req.user.id);

    // Check whether the user still exists.
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Return the authenticated user's profile.
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user profile.",
    });
  }
};