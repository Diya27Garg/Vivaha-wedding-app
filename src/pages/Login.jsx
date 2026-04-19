// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "bride";

  const handle = async () => {
  if (!email || !password) return;
  setVerifying(true);
  await new Promise(r => setTimeout(r, 2000));
  setUser({ email, name: email.split("@")[0], role, premium: false });
  
  if (role === "vendor") {
    navigate("/onboarding/vendor");
  } else {
    navigate("/couple-form");  // Make sure this points to CoupleForm
  }
};

  if (verifying) return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 24, fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ fontSize: 64, animation: "pulse 1s ease-in-out infinite" }}>💍</div>
      <HindiLogo size="large" />
      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic", color: "#FFFFFF", fontSize: 24
      }}>Verifying...</h2>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
        Authenticating your account
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#E77291",
            animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-12px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.bgDecoration1} />
      <div style={styles.bgDecoration2} />
      
      <div style={styles.loginCard}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <HindiLogo size="large" />
          <div style={styles.roleBadge}>
            <Heart size={12} color="#E77291" />
            <span>Signing in as {role}</span>
          </div>
        </div>

        {/* Form Section */}
        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handle()}
              style={styles.input}
            />
          </div>

          <button onClick={handle} style={styles.continueBtn}>
            Continue
            <span style={styles.btnArrow}>→</span>
          </button>

          <div style={styles.demoNote}>
            <Sparkles size={14} color="#E77291" />
            <p>Enter any email and password to continue</p>
          </div>

          <button onClick={() => navigate("/role")} style={styles.changeRoleBtn}>
            ← Change role
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF0F3 0%, #FFF5F7 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden"
  },
  bgDecoration1: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(231,114,145,0.08) 0%, transparent 70%)",
    animation: "float 8s ease-in-out infinite"
  },
  bgDecoration2: {
    position: "absolute",
    bottom: "-20%",
    left: "-10%",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(172,22,52,0.06) 0%, transparent 70%)",
    animation: "float 10s ease-in-out infinite reverse"
  },
  loginCard: {
    background: "white",
    borderRadius: "48px",
    width: "100%",
    maxWidth: "480px",
    padding: "48px 40px",
    boxShadow: "0 25px 50px -12px rgba(62,0,20,0.25)",
    border: "1px solid #F5D0DA",
    position: "relative",
    zIndex: 2
  },
  logoSection: {
    textAlign: "center",
    marginBottom: "40px"
  },
  roleBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    padding: "6px 16px",
    background: "#FDF0F3",
    borderRadius: "999px",
    fontSize: "12px",
    color: "#AC1634",
    fontWeight: 500
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    width: "100%",
    padding: "16px 20px",
    border: "1.5px solid #F5D0DA",
    borderRadius: "20px",
    fontSize: "15px",
    outline: "none",
    background: "#FDF8F9",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease"
  },
  continueBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)",
    color: "white",
    border: "none",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.2s ease",
    marginTop: "8px"
  },
  btnArrow: {
    transition: "transform 0.2s ease",
    display: "inline-block"
  },
  demoNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px",
    background: "#FDF0F3",
    borderRadius: "16px",
    fontSize: "12px",
    color: "#AC1634"
  },
  changeRoleBtn: {
    background: "none",
    border: "none",
    color: "#E77291",
    fontSize: "13px",
    cursor: "pointer",
    padding: "8px",
    marginTop: "8px"
  }
};