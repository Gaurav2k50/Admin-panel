const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { tokenBlacklist } = require("../middleware/authMiddleware");

// SignUp
exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name email and password is required" });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      role: "User",
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role }, // payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Expire time
    );

    // Respond with a success message
    res.status(201).json({
      message: "User register successfully!",
      token,
    });
  } catch (error) {
    console.error("Signup failed!", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("Password hash comparison:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login failed!", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout
exports.logout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // Validate the presence of the authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "No token provided in authorization header" });
    }

    const token = authHeader.split(" ")[1];

    // Check if the token is already blacklisted
    if (tokenBlacklist.has(token)) {
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    // Add token to blacklist
    tokenBlacklist.add(token);

    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Logout failed!", error.message);
    res.status(500).json({
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};

// Promote a User
exports.promoteUser = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    // Validate new role
    if (!["Admin", "User"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    // Find the user to be promoted/demoted
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the role
    user.role = newRole;
    await user.save();
    res
      .status(200)
      .json({ message: `User role updated to ${newRole} successfully`, user });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
