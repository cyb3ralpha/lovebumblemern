import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Logo & Description */}
        <div style={styles.section}>
          <h2 style={styles.logo}>❤️ Love Bumble</h2>
          <p style={styles.description}>
            AI-powered donation-based dating platform focused on ethical and meaningful connections.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/discover" style={styles.link}>Discover</Link></li>
            <li><Link to="/matches" style={styles.link}>Matches</Link></li>
            <li><Link to="/donations" style={styles.link}>Support Us</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Legal</h4>
          <ul style={styles.list}>
            <li><Link to="/privacy" style={styles.link}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={styles.link}>Terms & Conditions</Link></li>
            <li><Link to="/settings" style={styles.link}>Account Settings</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Connect</h4>
          <div style={styles.socialContainer}>
            <a href="#" style={styles.socialLink}>Facebook</a>
            <a href="#" style={styles.socialLink}>Instagram</a>
            <a href="#" style={styles.socialLink}>Twitter</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        © {year} Love Bumble. All rights reserved.
      </div>
    </footer>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    paddingTop: "40px",
    marginTop: "60px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    padding: "0 40px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    marginBottom: "10px",
    fontSize: "22px",
    color: "#ff3864",
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#ccc",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "#ccc",
    marginBottom: "8px",
    display: "inline-block",
    fontSize: "14px",
  },
  socialContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  socialLink: {
    textDecoration: "none",
    color: "#ccc",
    fontSize: "14px",
  },
  bottomBar: {
    marginTop: "30px",
    padding: "15px",
    textAlign: "center",
    borderTop: "1px solid #333",
    fontSize: "13px",
    color: "#888",
  },
};

export default Footer;
