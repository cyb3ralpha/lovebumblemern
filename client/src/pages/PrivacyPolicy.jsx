import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔒 Privacy Policy</h1>

      <p>
        At <strong>Love Bumble</strong>, your privacy is extremely important to us.
        We are committed to protecting your personal information and ensuring a
        safe experience on our platform.
      </p>

      <section style={styles.section}>
        <h2>1. Information We Collect</h2>
        <ul>
          <li>Account details (name, email, password, profile picture)</li>
          <li>Messages and chat interactions</li>
          <li>Donation information (amount, date)</li>
          <li>Device and usage data for platform optimization</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide our services (match discovery, chatting)</li>
          <li>To process donations securely</li>
          <li>To improve user experience and platform features</li>
          <li>To communicate updates, alerts, and promotions</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>3. Data Sharing & Security</h2>
        <ul>
          <li>
            We do not sell your personal information to third parties.
          </li>
          <li>
            Data is stored securely and access is restricted to authorized personnel.
          </li>
          <li>
            Third-party services (e.g., payment gateways) may have their own privacy policies.
          </li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>4. Your Rights</h2>
        <ul>
          <li>Access your account information at any time.</li>
          <li>Update or delete your personal information.</li>
          <li>Opt-out of promotional communications.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>5. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
          <br />
          <strong>Email:</strong> support@lovebumble.com
        </p>
      </section>

      <p style={styles.note}>
        Last updated: February 17, 2026
      </p>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  title: {
    textAlign: "center",
    color: "#ff3864",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "25px",
  },
  note: {
    marginTop: "40px",
    fontSize: "14px",
    color: "#777",
    textAlign: "center",
  },
};

export default PrivacyPolicy;

