import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD MATCHES ---------------- */
  const fetchMatches = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/matches");
      setMatches(data.matches);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading matches...</p>;

  if (!matches.length)
    return <p style={{ textAlign: "center" }}>No matches yet. Keep swiping!</p>;

  return (
    <div style={styles.container}>
      <h2>💌 Your Matches</h2>
      <div style={styles.grid}>
        {matches.map((match) => (
          <div key={match._id} style={styles.card}>
            <img
              src={match.profilePic || "https://via.placeholder.com/100"}
              alt={match.name}
              style={styles.avatar}
            />
            <h3>{match.name}, {match.age}</h3>
            <Link to={`/chat/${match._id}`} style={styles.chatBtn}>
              Chat 💬
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    gap: "10px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  chatBtn: {
    padding: "8px 20px",
    borderRadius: "8px",
    backgroundColor: "#ff3864",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Matches;
