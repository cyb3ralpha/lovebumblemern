const Report = require("../models/Report");
const User = require("../models/User");
const Message = require("../models/Message");
const aiService = require("./aiService"); // optional AI moderation

/* =====================================================
   CREATE REPORT
===================================================== */
const createReport = async ({ reporterId, reportedUserId, reason, description }) => {
  const report = await Report.create({
    reporter: reporterId,
    reportedUser: reportedUserId,
    reason,
    description,
    status: "pending",
  });

  return report;
};

/* =====================================================
   GET ALL PENDING REPORTS
===================================================== */
const getPendingReports = async () => {
  return await Report.find({ status: "pending" })
    .populate("reporter", "name email")
    .populate("reportedUser", "name email")
    .sort({ createdAt: -1 });
};

/* =====================================================
   RESOLVE REPORT
   - action: "block", "warn", "ignore"
===================================================== */
const resolveReport = async (reportId, action) => {
  const report = await Report.findById(reportId);
  if (!report) throw new Error("Report not found");

  report.status = "resolved";
  report.resolution = action;

  // Perform action
  if (action === "block") {
    await User.findByIdAndUpdate(report.reportedUser, { isBlocked: true });
  }

  await report.save();
  return report;
};

/* =====================================================
   CHECK CONTENT FOR INAPPROPRIATE MATERIAL
   - Uses AI Service for moderation
===================================================== */
const moderateText = async (text) => {
  try {
    const flagged = await aiService.moderateText(text); // returns true if inappropriate
    return flagged;
  } catch (err) {
    console.error("Moderation AI failed:", err.message);
    return false; // fail-safe: treat as safe
  }
};

/* =====================================================
   BLOCK USER
===================================================== */
const blockUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};

/* =====================================================
   UNBLOCK USER
===================================================== */
const unblockUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
};

module.exports = {
  createReport,
  getPendingReports,
  resolveReport,
  moderateText,
  blockUser,
  unblockUser,
};
