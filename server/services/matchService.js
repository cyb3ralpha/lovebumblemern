const Match = require("../models/Match");
const Like = require("../models/Like");
const User = require("../models/User");

/* =====================================================
   CREATE OR FETCH MUTUAL MATCH
===================================================== */
const createMatchIfMutual = async (userId, targetUserId) => {
  // Check if the other user has already liked the current user
  const existingLike = await Like.findOne({
    sender: targetUserId,
    receiver: userId,
  });

  if (!existingLike) {
    // Not mutual yet, no match created
    return null;
  }

  // Check if match already exists
  const existingMatch = await Match.findOne({
    users: { $all: [userId, targetUserId] },
  });

  if (existingMatch) return existingMatch;

  // Create new mutual match
  const match = await Match.create({
    users: [userId, targetUserId],
  });

  return match;
};

/* =====================================================
   GET ALL MATCHES FOR A USER
===================================================== */
const getUserMatches = async (userId) => {
  return await Match.find({
    users: userId,
  })
    .populate("users", "name profilePic age gender bio")
    .sort({ createdAt: -1 });
};

/* =====================================================
   GET SINGLE MATCH BY ID
===================================================== */
const getMatchById = async (matchId) => {
  return await Match.findById(matchId).populate(
    "users",
    "name profilePic age gender bio"
  );
};

/* =====================================================
   UNMATCH USERS
===================================================== */
const unmatchUsers = async (userId, targetUserId) => {
  const match = await Match.findOneAndDelete({
    users: { $all: [userId, targetUserId] },
  });

  return match;
};

/* =====================================================
   ADMIN: DELETE MATCH
===================================================== */
const deleteMatchByAdmin = async (matchId) => {
  return await Match.findByIdAndDelete(matchId);
};

module.exports = {
  createMatchIfMutual,
  getUserMatches,
  getMatchById,
  unmatchUsers,
  deleteMatchByAdmin,
};
