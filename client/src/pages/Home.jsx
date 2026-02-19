import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>💖 Welcome to Love Bumble</h1>
        <p style={styles.subtitle}>
          Discover, match, and chat with amazing people around you.
        </p>
        <div style={styles.cta}>
          <Link to="/register" style={styles.buttonPrimary}>
            Sign Up
          </Link>
          <Link to="/login" style={styles.buttonSecondary}>
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2>Why Love Bumble?</h2>
        <div style={styles.featureList}>
          <div style={styles.feature}>
            <span style={styles.icon}>🔥</span>
            <h3>Discover Matches</h3>
            <p>Swipe and find people who share your interests.</p>
          </div>
          <div style={styles.feature}>
            <span style={styles.icon}>💬</span>
            <h3>Chat Real-Time</h3>
            <p>Connect instantly through our secure chat platform.</p>
          </div>
          <div style={styles.feature}>
            <span style={styles.icon}>💖</span>
            <h3>Support the Platform</h3>
            <p>Your donations keep Love Bumble ad-free and running smoothly.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action for Donations */}
      <section style={styles.donations}>
        <h2>Support Love Bumble</h2>
        <p>
          Love Bumble runs on a donation-based model. Help us keep the platform free!
        </p>
        <Link to="/donations" style={styles.buttonPrimary}>
          Donate Now
        </Link>
      </section>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "60px",
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
  },
  hero: {
    textAlign: "center",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "3rem",
    margin: 0,
    color: "#ff3864",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
  cta: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  buttonPrimary: {
    padding: "12px 25px",
    borderRadius: "8px",
    backgroundColor: "#ff3864",
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "0.3s",
  },
  buttonSecondary: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "2px solid #ff3864",
    color: "#ff3864",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "0.3s",
  },
  features: {
    textAlign: "center",
  },
  featureList: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "30px",
  },
  feature: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "2.5rem",
  },
  donations: {
    textAlign: "center",
    maxWidth: "500px",
  },
};

export default Home;
