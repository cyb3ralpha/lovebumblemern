const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");
require("dotenv").config();

/* =====================================================
   HELPER: GENERATE JWT TOKEN
===================================================== */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =====================================================
   REGISTER NEW USER
===================================================== */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   LOGIN USER
===================================================== */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.isBlocked) return res.status(403).json({ message: "User is blocked" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET CURRENT USER PROFILE
===================================================== */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   UPDATE USER PROFILE
===================================================== */
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, bio, location, age } = req.body;

    if (req.file) {
      // Upload new profile picture
      const result = await uploadToCloudinary(req.file.path, { folder: "love-bumble/profiles" });

      // Delete old picture if exists
      if (user.profilePicPublicId) await deleteFromCloudinary(user.profilePicPublicId);

      user.profilePic = result.secure_url;
      user.profilePicPublicId = result.public_id;
    }

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (age) user.age = age;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      age: user.age,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   LOGOUT USER
===================================================== */
const logoutUser = async (req, res) => {
  // On frontend, just delete token
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
};
