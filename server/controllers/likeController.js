const Match = require("../models/Match");
const User = require("../models/User");

/* =====================================================
   LIKE A USER
===================================================== */
const likeUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { likedUserId } = req.body;

    if (!likedUserId) return res.status(400).json({ message: "likedUserId is required" });
    if (likedUserId === userId) return res.status(400).json({ message: "Cannot like yourself" });

    // Check if a match record exists
    let match = await Match.findOne({
      $or: [
        { user1: userId, user2: likedUserId },
        { user1: likedUserId, user2: userId },
      ],
    });

    if (!match) {
      // Create new match record
      match = await Match.create({
        user1: userId,
        user2: likedUserId,
        user1Liked: true,
        user2Liked: false,
        isMatched: false,
      });
    } else {
      // Update existing match
      if (match.user1.toString() === userId) match.user1Liked = true;
      if (match.user2.toString() === userId) match.user2Liked = true;

      // Check for mutual match
      if (match.user1Liked && match.user2Liked) match.isMatched = true;

      await match.save();
    }

    res.json({ message: "User liked successfully", match });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET USERS WHO LIKED CURRENT USER
===================================================== */
const getLikesReceived = async (req, res) => {
  try {
    const userId = req.user.id;

    const matches = await Match.find({
      $or: [
        { user1: { $ne: userId }, user2: userId, user2Liked: false, user1Liked: true },
        { user1: userId, user2: { $ne: userId }, user1Liked: false, user2Liked: true },
      ],
    }).populate("user1 user2", "name profilePic age");

    const likes = matches.map((m) =>
      m.user1._id.toString() === userId ? m.user2 : m.user1
    );

    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   GET MUTUAL MATCHES
===================================================== */
const getMutualMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    const matches = await Match.find({
      isMatched: true,
      $or: [{ user1: userId }, { user2: userId }],
    }).populate("user1 user2", "name profilePic age");

    const mutuals = matches.map((m) =>
      m.user1._id.toString() === userId ? m.user2 : m.user1
    );

    res.json(mutuals);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  likeUser,
  getLikesReceived,
  getMutualMatches,
};
