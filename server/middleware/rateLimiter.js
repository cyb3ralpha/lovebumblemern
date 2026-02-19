const rateLimit = require("express-rate-limit");

/* =====================================================
   GLOBAL RATE LIMITER
   - Limits all incoming requests
   - Prevents abuse / DDoS
===================================================== */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP per window
  standardHeaders: true, // return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // disable `X-RateLimit-*` headers
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});

/* =====================================================
   LOGIN / AUTH RATE LIMITER
   - Stricter for sensitive routes
===================================================== */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max login attempts per IP per window
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes.",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};
