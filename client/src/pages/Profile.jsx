import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/me");
      setProfile(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

  if (!profile)
    return <p style={{ textAlign: "center" }}>Profile not found. Please try again.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={profile.profilePic || "https://via.placeholder.com/150"}
          alt={profile.name}
          style={styles.avatar}
        />
        <h2>{profile.name}, {profile.age}</h2>
        <p style={styles.location}>{profile.location}</p>
        <p style={styles.bio}>{profile.bio || "No bio yet. Update your profile!"}</p>

        <div style={styles.actions}>
          <Link to="/profile/edit" style={styles.editBtn}>
            Edit Profile
          </Link>
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>

        {/* Optional Stats */}
        {profile.stats && (
          <div style={styles.stats}>
            <p>Matches: {profile.stats.matches}</p>
            <p>Likes Received: {profile.stats.likes}</p>
            <p>Donations Made: ${profile.stats.donations}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    maxWidth: "500px",
    width: "100%",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
  location: {
    color: "#777",
    fontSize: "14px",
  },
  bio: {
    fontSize: "16px",
    color: "#555",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "15px",
  },
  editBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#ff3864",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #ff3864",
    backgroundColor: "#fff",
    color: "#ff3864",
    fontWeight: "bold",
    cursor: "pointer",
  },
  stats: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "10px",
    borderTop: "1px solid #eee",
    fontSize: "14px",
    color: "#555",
  },
};

export default Profile;
