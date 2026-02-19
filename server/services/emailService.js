const nodemailer = require("nodemailer");

/* =====================================================
   EMAIL TRANSPORTER CONFIG
===================================================== */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =====================================================
   GENERIC EMAIL SENDER
===================================================== */
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Love Bumble 💕" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Email service unavailable");
  }
};

/* =====================================================
   WELCOME EMAIL
===================================================== */
const sendWelcomeEmail = async (user) => {
  const html = `
    <h2>Welcome to Love Bumble, ${user.name}! 💖</h2>
    <p>We're excited to have you join our community.</p>
    <p>Start discovering matches and connect with amazing people today!</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "Welcome to Love Bumble 💕",
    html,
  });
};

/* =====================================================
   PASSWORD RESET EMAIL
===================================================== */
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const html = `
    <h3>Password Reset Request 🔐</h3>
    <p>Hi ${user.name},</p>
    <p>You requested a password reset. Click the link below:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Love Bumble Password",
    html,
  });
};

/* =====================================================
   MATCH NOTIFICATION EMAIL
===================================================== */
const sendMatchNotification = async (user, matchedUser) => {
  const html = `
    <h2>It's a Match! 💞</h2>
    <p>Hi ${user.name},</p>
    <p>You and ${matchedUser.name} liked each other!</p>
    <p>Log in now and start chatting.</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "You Have a New Match! 💕",
    html,
  });
};

/* =====================================================
   REPORT ALERT (ADMIN NOTIFICATION)
===================================================== */
const sendReportAlert = async (adminEmail, reportDetails) => {
  const html = `
    <h3>New User Report 🚨</h3>
    <p><strong>Reported User:</strong> ${reportDetails.reportedUser}</p>
    <p><strong>Reason:</strong> ${reportDetails.reason}</p>
    <p><strong>Description:</strong> ${reportDetails.description}</p>
  `;

  await sendEmail({
    to: adminEmail,
    subject: "New Report Submitted",
    html,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendMatchNotification,
  sendReportAlert,
};
