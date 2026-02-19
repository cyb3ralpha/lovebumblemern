const User = require("../models/User");
const Match = require("../models/Match");

/* =====================================================
   GET POTENTIAL MATCHES FOR CURRENT USER
===================================================== */
const getDiscoverUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch current user's data
    const currentUser = await User.findById(userId);

    if (!currentUser) return res.status(404).json({ message: "User not found" });

    // Get list of users already matched or skipped
    const matchedUsers = await Match.find({
      $or: [
        { user1: userId },
        { user2: userId }
      ]
    }).select("user1 user2");

    const matchedIds = matchedUsers.flatMap(m => [m.user1.toString(), m.user2.toString()]);
    matchedIds.push(userId); // Exclude self

    // Query potential users
    const potentialUsers = await User.find({
      _id: { $nin: matchedIds },
      isBlocked: false,
      age: { $gte: currentUser.minAge || 18, $lte: currentUser.maxAge || 100 },
      location: currentUser.location || { $exists: true } // Optionally filter by location
    }).select("-password -email"); // Exclude sensitive info

    res.json(potentialUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =====================================================
   LIKE A USER
===================================================== */
const likeUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { likedUserId } = req.body;

    // Check if match already exists
    let match = await Match.findOne({
      $or: [
        { user1: userId, user2: likedUserId },
        { user1: likedUserId, user2: userId }
      ]
    });

    if (!match) {
      // Create new match record
      match = await Match.create({
        user1: userId,
        user2: likedUserId,
        isMatched: false,
        user1Liked: true,
        user2Liked: false,
      });
    } else {
      // Update existing match
      if (match.user1.toString() === likedUserId) match.user2Liked = true;
      if (match.user2.toString() === likedUserId) match.user1Liked = true;

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
   SKIP / PASS A USER
===================================================== */
const skipUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skippedUserId } = req.body;

    // Record skip as a Match entry without liking
    const match = await Match.create({
      user1: userId,
      user2: skippedUserId,
      isMatched: false,
      user1Liked: false,
      user2Liked: false,
      skipped: true,
    });

    res.json({ message: "User skipped successfully", match });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDiscoverUsers,
  likeUser,
  skipUser,
};
