import React, { useState } from "react";
import axios from "axios";

const DonationButton = ({ currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ---------------------- OPEN / CLOSE MODAL ---------------------- */
  const toggleModal = () => {
    setShowModal(!showModal);
    setMessage("");
  };

  /* ---------------------- HANDLE DONATION ---------------------- */
  const handleDonate = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/donations",
        {
          userId: currentUser._id,
          amount: Number(amount),
          currency: "USD",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("🎉 Thank you for supporting Love Bumble!");
      setAmount("");
    } catch (error) {
      console.error(error);
      setMessage("Donation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Donation Button */}
      <button
        onClick={toggleModal}
        style={styles.button}
      >
        ❤️ Support Love Bumble
      </button>

      {/* Modal */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Support Love Bumble</h2>
            <p>Your donation helps keep the platform ethical and ad-free.</p>

            <form onSubmit={handleDonate}>
              <input
                type="number"
                placeholder="Enter amount (USD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
              />

              <button
                type="submit"
                disabled={loading}
                style={styles.donateBtn}
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </form>

            {message && <p style={styles.message}>{message}</p>}

            <button onClick={toggleModal} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  button: {
    backgroundColor: "#ff3864",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  donateBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ff3864",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  closeBtn: {
    marginTop: "15px",
    backgroundColor: "#ddd",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontWeight: "500",
  },
};

export default DonationButton;
