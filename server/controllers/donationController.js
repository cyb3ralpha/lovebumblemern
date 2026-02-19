const Donation = require("../models/Donation");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* =====================================================
   CREATE DONATION (Stripe Payment)
===================================================== */
const createDonation = async (req, res) => {
  try {
    const { amount, token } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount" });
    }

    // Create Stripe charge
    const charge = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: "usd",
      payment_method: token.id,
      confirm: true,
    });

    // Save donation to DB
    const donation = await Donation.create({
      user: userId,
      amount,
      paymentId: charge.id,
    });

    res.status(201).json({
      message: "Donation successful! Thank you for your support.",
      donation,
    });
  } catch (error) {
    console.error("Donation Error:", error);
    res.status(500).json({ message: "Donation failed", error: error.message });
  }
};

/* =====================================================
   GET USER DONATION HISTORY
===================================================== */
const getUserDonations = async (req, res) => {
  try {
    const userId = req.user.id;

    const donations = await Donation.find({ user: userId }).sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET TOTAL DONATION STATS (ADMIN)
===================================================== */
const getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDonors: { $addToSet: "$user" },
          totalDonations: { $sum: 1 },
        },
      },
    ]);

    const result = stats[0] || { totalAmount: 0, totalDonors: [], totalDonations: 0 };

    res.json({
      totalAmount: result.totalAmount,
      totalDonors: result.totalDonors.length,
      totalDonations: result.totalDonations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createDonation,
  getUserDonations,
  getDonationStats,
};
