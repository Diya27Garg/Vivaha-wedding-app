// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HindiLogo from "../components/HindiLogo";

export default function AdminLogin({ setAdmin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simple hardcoded admin credentials
    if (email === "admin@vivaha.com" && password === "admin123") {
      setAdmin({ isAdmin: true, name: "Admin" });
      navigate("/admin");
    } else {
      setError("Invalid credentials. Use admin@vivaha.com / admin123");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <HindiLogo size="large" />
        </div>
        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.subtitle}>Enter your credentials to access dashboard</p>
        
        <div style={styles.form}>
          <input 
            type="email" 
            placeholder="Email" 
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button onClick={handleLogin} style={styles.button}>
            Login as Admin
          </button>
          <p style={styles.hint}>Demo: admin@vivaha.com / admin123</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3E0014, #7A002B)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },
  card: {
    background: "white",
    borderRadius: "32px",
    padding: "48px",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
  },
  logo: {
    marginBottom: "24px"
  },
  title: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#3E0014",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "32px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  input: {
    padding: "14px 18px",
    borderRadius: "16px",
    border: "1px solid #F5D0DA",
    fontSize: "15px",
    outline: "none"
  },
  button: {
    padding: "14px",
    borderRadius: "999px",
    background: "#3E0014",
    color: "white",
    border: "none",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px"
  },
  error: {
    color: "#F44336",
    fontSize: "13px",
    marginTop: "-8px"
  },
  hint: {
    fontSize: "12px",
    color: "#999",
    marginTop: "16px"
  }
};