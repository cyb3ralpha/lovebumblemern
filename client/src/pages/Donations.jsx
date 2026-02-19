import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Donations = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  /* ---------------- FETCH DONATION HISTORY ---------------- */
  const fetchDonations = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/donations/history"
      );
      setDonations(data.donations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  /* ---------------- HANDLE DONATION ---------------- */
  const handleDonate = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    try {
      // Example POST request to backend to process donation
      const { data } = await axios.post(
        "http://localhost:5000/api/donations/create",
        { amount: Number(amount) }
      );

      setSuccessMsg(`Thank you for donating $${amount}!`);
      setAmount("");
      fetchDonations();
    } catch (error) {
      console.error("Donation failed:", error.response?.data?.message);
      setSuccessMsg("Donation failed. Please try again.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading donations...</p>;

  return (
    <div style={styles.container}>
      <h2>💖 Support Love Bumble</h2>
      <p>Your donations help us keep the platform free and ad-free!</p>

      {/* Donation Input */}
      <div style={styles.inputContainer}>
        <input
          type="number"
          placeholder="Enter amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleDonate} style={styles.donateBtn}>
          Donate
        </button>
      </div>

      {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}

      {/* Donation History */}
      <div style={styles.history}>
        <h3>Donation History</h3>
        {donations.length ? (
          donations.map((d) => (
            <div key={d._id} style={styles.donationItem}>
              <span>${d.amount}</span>
              <span>{new Date(d.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        ) : (
          <p>No donations yet. Be the first to support!</p>
        )}
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    fontFamily: "Arial, sans-serif",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  donateBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff3864",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  history: {
    marginTop: "20px",
  },
  donationItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
};

export default Donations;
