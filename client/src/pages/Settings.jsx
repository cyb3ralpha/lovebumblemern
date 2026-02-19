import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [privacy, setPrivacy] = useState({
    showAge: true,
    showLocation: true,
    showDonationBadge: true,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ---------------- UPDATE PROFILE ---------------- */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put(
        "http://localhost:5000/api/users/update",
        profileData
      );
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  /* ---------------- CHANGE PASSWORD ---------------- */
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        passwordData
      );
      setMessage("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError("Failed to change password.");
    }
  };

  /* ---------------- DELETE ACCOUNT ---------------- */
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account permanently?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:5000/api/users/delete");
      logout();
      navigate("/");
    } catch (err) {
      setError("Failed to delete account.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Account Settings ⚙️</h2>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* -------- PROFILE UPDATE -------- */}
        <section style={styles.section}>
          <h3>Update Profile</h3>
          <form onSubmit={handleProfileUpdate} style={styles.form}>
            <input
              type="text"
              placeholder="Name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={profileData.location}
              onChange={(e) =>
                setProfileData({ ...profileData, location: e.target.value })
              }
            />
            <textarea
              placeholder="Bio"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
            />
            <button type="submit">Save Changes</button>
          </form>
        </section>

        {/* -------- PASSWORD CHANGE -------- */}
        <section style={styles.section}>
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange} style={styles.form}>
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />
            <button type="submit">Update Password</button>
          </form>
        </section>

        {/* -------- PRIVACY SETTINGS -------- */}
        <section style={styles.section}>
          <h3>Privacy Settings</h3>
          <label>
            <input
              type="checkbox"
              checked={privacy.showAge}
              onChange={() =>
                setPrivacy({ ...privacy, showAge: !privacy.showAge })
              }
            />
            Show Age
          </label>
          <label>
            <input
              type="checkbox"
              checked={privacy.showLocation}
              onChange={() =>
                setPrivacy({ ...privacy, showLocation: !privacy.showLocation })
              }
            />
            Show Location
          </label>
          <label>
            <input
              type="checkbox"
              checked={privacy.showDonationBadge}
              onChange={() =>
                setPrivacy({
                  ...privacy,
                  showDonationBadge: !privacy.showDonationBadge,
                })
              }
            />
            Show Donation Badge
          </label>
        </section>

        {/* -------- DANGER ZONE -------- */}
        <section style={styles.danger}>
          <h3>Danger Zone</h3>
          <button style={styles.deleteBtn} onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </section>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    borderTop: "1px solid #eee",
    paddingTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
  logoutBtn: {
    padding: "10px",
    backgroundColor: "#ff3864",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  danger: {
    marginTop: "20px",
    borderTop: "2px solid #ff3864",
    paddingTop: "15px",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Settings;
