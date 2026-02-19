import AuthService from "./AuthService";

const api = AuthService.api;

/* ---------------------------------------------
   LIKE USER (SWIPE RIGHT)
--------------------------------------------- */
const likeUser = async (targetUserId) => {
  const response = await api.post("/matches/like", {
    targetUserId,
  });

  return response.data;
  // Expected:
  // { matched: true/false, matchId?: "123" }
};

/* ---------------------------------------------
   DISLIKE USER (SWIPE LEFT)
--------------------------------------------- */
const dislikeUser = async (targetUserId) => {
  const response = await api.post("/matches/dislike", {
    targetUserId,
  });

  return response.data;
};

/* ---------------------------------------------
   GET ALL MATCHES
--------------------------------------------- */
const getMatches = async () => {
  const response = await api.get("/matches");
  return response.data;
};

/* ---------------------------------------------
   GET USERS I LIKED
--------------------------------------------- */
const getLikedUsers = async () => {
  const response = await api.get("/matches/liked");
  return response.data;
};

/* ---------------------------------------------
   GET USERS WHO LIKED ME
--------------------------------------------- */
const getUsersWhoLikedMe = async () => {
  const response = await api.get("/matches/liked-me");
  return response.data;
};

/* ---------------------------------------------
   UNMATCH USER
--------------------------------------------- */
const unmatchUser = async (matchId) => {
  const response = await api.delete(`/matches/${matchId}`);
  return response.data;
};

/* ---------------------------------------------
   CHECK MATCH STATUS
--------------------------------------------- */
const checkMatchStatus = async (targetUserId) => {
  const response = await api.get(`/matches/status/${targetUserId}`);
  return response.data;
  // { liked: true, matched: false }
};

/* ---------------------------------------------
   EXPORT
--------------------------------------------- */
const matchService = {
  likeUser,
  dislikeUser,
  getMatches,
  getLikedUsers,
  getUsersWhoLikedMe,
  unmatchUser,
  checkMatchStatus,
};

export default matchService;
