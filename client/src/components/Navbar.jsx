import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ currentUser, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          ❤️ Love Bumble
        </Link>

        {/* Desktop Links */}
        <div style={styles.links}>
          <NavLink to="/" style={styles.link}>Home</NavLink>
          <NavLink to="/discover" style={styles.link}>Discover</NavLink>
          <NavLink to="/matches" style={styles.link}>Matches</NavLink>
          <NavLink to="/donations" style={styles.link}>Support</NavLink>
        </div>

        {/* Auth Section */}
        <div style={styles.authSection}>
          {!currentUser ? (
            <>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          ) : (
            <div style={styles.profileContainer}>
              <div
                style={styles.profile}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={
                    currentUser.profilePic ||
                    "https://via.placeholder.com/35"
                  }
                  alt="profile"
                  style={styles.avatar}
                />
                <span>{currentUser.name}</span>
              </div>

              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link to="/profile" style={styles.dropdownItem}>
                    Profile
                  </Link>
                  <Link to="/settings" style={styles.dropdownItem}>
                    Settings
                  </Link>
                  <div
                    style={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger */}
          <div
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <NavLink to="/" style={styles.mobileLink}>Home</NavLink>
          <NavLink to="/discover" style={styles.mobileLink}>Discover</NavLink>
          <NavLink to="/matches" style={styles.mobileLink}>Matches</NavLink>
          <NavLink to="/donations" style={styles.mobileLink}>Support</NavLink>
        </div>
      )}
    </nav>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  navbar: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#ff3864",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  loginBtn: {
    textDecoration: "none",
    color: "#ff3864",
    fontWeight: "500",
  },
  registerBtn: {
    textDecoration: "none",
    backgroundColor: "#ff3864",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
  },
  profileContainer: {
    position: "relative",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },
  dropdown: {
    position: "absolute",
    top: "45px",
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "150px",
    display: "flex",
    flexDirection: "column",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
  },
  hamburger: {
    display: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    backgroundColor: "#fff",
    borderTop: "1px solid #eee",
  },
  mobileLink: {
    padding: "8px 0",
    textDecoration: "none",
    color: "#333",
  },
};

export default Navbar;
