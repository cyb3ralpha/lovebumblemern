const Donation = require("../models/Donation");

/* =====================================================
   CREATE DONATION
===================================================== */
const createDonation = async ({ userId, amount, paymentId, message }) => {
  const donation = await Donation.create({
    user: userId,
    amount,
    paymentId,
    message,
  });

  return donation;
};

/* =====================================================
   GET USER DONATIONS
===================================================== */
const getUserDonations = async (userId) => {
  return await Donation.find({ user: userId })
    .sort({ createdAt: -1 });
};

/* =====================================================
   GET ALL DONATIONS (ADMIN)
===================================================== */
const getAllDonations = async () => {
  return await Donation.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

/* =====================================================
   GET DONATION STATS (ADMIN)
===================================================== */
const getDonationStats = async () => {
  const totalStats = await Donation.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalDonations: { $sum: 1 },
      },
    },
  ]);

  const monthlyStats = await Donation.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        totalDonations: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);

  const topDonors = await Donation.aggregate([
    {
      $group: {
        _id: "$user",
        totalDonated: { $sum: "$amount" },
      },
    },
    { $sort: { totalDonated: -1 } },
    { $limit: 5 },
  ]);

  return {
    total: totalStats[0] || { totalAmount: 0, totalDonations: 0 },
    monthly: monthlyStats,
    topDonors,
  };
};

module.exports = {
  createDonation,
  getUserDonations,
  getAllDonations,
  getDonationStats,
};
