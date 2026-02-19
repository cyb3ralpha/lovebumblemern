const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeController");
const { protect } = require("../middleware/authMiddleware");

/* =====================================================
   All like routes require authentication
===================================================== */
router.use(protect);

/* =====================================================
   LIKE A USER
===================================================== */
router.post("/like/:userId", likeController.likeUser);

/* =====================================================
   SKIP A USER
===================================================== */
router.post("/skip/:userId", likeController.skipUser);

/* =====================================================
   GET USERS I LIKED
===================================================== */
router.get("/liked", likeController.getLikedUsers);

/* =====================================================
   GET USERS WHO LIKED ME
===================================================== */
router.get("/liked-me", likeController.getUsersWhoLikedMe);

/* =====================================================
   GET MUTUAL MATCHES
===================================================== */
router.get("/matches", likeController.getMutualMatches);

module.exports = router;
