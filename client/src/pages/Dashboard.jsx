import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ProfileCard from "../components/ProfileCard";
import useSocket from "../hooks/useSocket";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { onlineUsers } = useSocket();

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>💖 Love Bumble</h1>
        <div>
          <span style={styles.onlineCount}>
            Online Users: {onlineUsers.length}
          </span>
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.main}>
        {/* User Profile */}
        <ProfileCard
          user={user}
          currentUserId={user._id}
          onEdit={() => window.location.assign("/profile/edit")}
        />

        {/* Quick Actions */}
        <div style={styles.quickActions}>
          <Link to="/discover" style={styles.actionBtn}>
            🔥 Discover
          </Link>
          <Link to="/matches" style={styles.actionBtn}>
            💌 Matches
          </Link>
          <Link to="/chat" style={styles.actionBtn}>
            💬 Chat
          </Link>
          <Link to="/profile/edit" style={styles.actionBtn}>
            ⚙️ Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#ff3864",
    color: "#fff",
    fontWeight: "bold",
  },
  onlineCount: {
    marginRight: "20px",
    fontSize: "14px",
  },
  logoutBtn: {
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#fff",
    color: "#ff3864",
    fontWeight: "bold",
    cursor: "pointer",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    gap: "30px",
  },
  quickActions: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  actionBtn: {
    padding: "15px 25px",
    borderRadius: "12px",
    textDecoration: "none",
    backgroundColor: "#ff3864",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: "120px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Dashboard;
