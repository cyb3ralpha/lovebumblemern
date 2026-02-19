import React, { useEffect, useState } from "react";
import SwipeCard from "../components/SwipeCard";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Discover = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD USERS ---------------- */
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/discover");
      // Exclude current user
      const filtered = data.users.filter((u) => u._id !== user._id);
      setUsers(filtered);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- HANDLE LIKE ---------------- */
  const handleLike = async (likedUserId) => {
    try {
      await axios.post(`http://localhost:5000/api/users/like/${likedUserId}`);
      setUsers((prev) => prev.filter((u) => u._id !== likedUserId));
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  /* ---------------- HANDLE DISLIKE ---------------- */
  const handleDislike = async (dislikedUserId) => {
    try {
      await axios.post(`http://localhost:5000/api/users/dislike/${dislikedUserId}`);
      setUsers((prev) => prev.filter((u) => u._id !== dislikedUserId));
    } catch (error) {
      console.error("Dislike failed:", error);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading users...</p>;

  if (!users.length)
    return <p style={{ textAlign: "center" }}>No users available to discover.</p>;

  return (
    <div style={styles.container}>
      {users.map((u) => (
        <SwipeCard
          key={u._id}
          user={u}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      ))}
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
  },
};

export default Discover;
