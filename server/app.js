require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const http = require("http");

const logger = require("./utils/logger");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const chatRoutes = require("./routes/chatRoutes");
const donationRoutes = require("./routes/donationRoutes");
const discoverRoutes = require("./routes/discoverRoutes");
const likeRoutes = require("./routes/likeRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware
const { errorHandler } = require("./middleware/errorMiddleware");
const { notFound } = require("./middleware/notFoundMiddleware");

// Socket
const initChatSocket = require("./sockets/chatSocket");

/* =====================================================
   CONNECT DATABASE
===================================================== */
connectDB();

/* =====================================================
   CREATE EXPRESS APP
===================================================== */
const app = express();

/* =====================================================
   MIDDLEWARE
===================================================== */
app.use(helmet()); // security headers
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev")); // HTTP request logger

/* =====================================================
   RATE LIMITING
===================================================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: "Too many requests from this IP, try again later",
});
app.use(limiter);

/* =====================================================
   ROUTES
===================================================== */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/discover", discoverRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/admin", adminRoutes);

/* =====================================================
   NOT FOUND ROUTE
===================================================== */
app.use(notFound);

/* =====================================================
   ERROR HANDLER
===================================================== */
app.use(errorHandler);

/* =====================================================
   CREATE HTTP SERVER & SOCKET.IO
===================================================== */
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.IO for chat
initChatSocket(server);

/* =====================================================
   START SERVER
===================================================== */
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
