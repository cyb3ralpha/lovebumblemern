const winston = require("winston");
const path = require("path");

/* =====================================================
   LOG FORMAT
===================================================== */
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

/* =====================================================
   CREATE LOGGER
===================================================== */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Console output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // Error log file
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/errors.log"),
      level: "error",
    }),

    // Combined log file (info + error)
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
