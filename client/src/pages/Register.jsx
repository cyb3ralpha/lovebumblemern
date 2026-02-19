import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    location: "",
    bio: "",
    profilePic: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      return setError("Please fill in required fields.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      // Auto login after register
      login(data.token, data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Your Love Bumble Account ❤️</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <input
            type="text"
            name="profilePic"
            placeholder="Profile Picture URL"
            value={formData.profilePic}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  error: {
    color: "red",
    fontSize: "14px"
  },
  loginText: {
    textAlign: "center",
    fontSize: "14px"
  },
  link: {
    color: "#ff3864",
    fontWeight: "bold",
    textDecoration: "none"
  }
};

export default Register;
