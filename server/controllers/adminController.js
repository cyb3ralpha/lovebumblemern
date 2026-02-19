const User = require("../models/User");
const Donation = require("../models/Donation");
const Report = require("../models/Report");
const { deleteFromCloudinary } = require("../config/cloudinary");

/* =====================================================
   GET ALL USERS
===================================================== */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   DELETE USER
===================================================== */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete profile picture from Cloudinary if exists
    if (user.profilePicPublicId) {
      await deleteFromCloudinary(user.profilePicPublicId);
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   BLOCK USER
===================================================== */
const blockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   UNBLOCK USER
===================================================== */
const unblockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = false;
    await user.save();

    res.json({ message: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET DONATION STATS
===================================================== */
const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    res.json(totalDonations[0] || { total: 0, count: 0 });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET USER REPORTS
===================================================== */
const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter", "name email")
      .populate("reportedUser", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   RESOLVE REPORT
===================================================== */
const resolveReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);

    if (!report) return res.status(404).json({ message: "Report not found" });

    report.status = "resolved";
    await report.save();

    res.json({ message: "Report resolved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
  getDonationStats,
  getReports,
  resolveReport,
};
