const User = require("../models/User");

/* =====================================================
   GET ALL USERS (ADMIN ONLY)
===================================================== */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET SINGLE USER BY ID
===================================================== */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   UPDATE USER DETAILS (ADMIN OR SELF)
===================================================== */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Only admin or the user themselves can update
    if (!req.user.isAdmin && req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = req.body;

    // Prevent password update here, use authController for that
    delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   BLOCK USER (ADMIN ONLY)
===================================================== */
const blockUser = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Unauthorized" });

    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   UNBLOCK USER (ADMIN ONLY)
===================================================== */
const unblockUser = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Unauthorized" });

    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = false;
    await user.save();

    res.json({ message: "User unblocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  blockUser,
  unblockUser,
};
