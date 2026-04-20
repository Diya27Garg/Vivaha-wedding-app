// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Heart, Mail, Phone, ArrowRight, AlertCircle } from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function Login({ setUser }) {
  const [identifier, setIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState("email");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const validateIdentifier = () => {
    if (identifierType === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    } else {
      return /^[6-9]\d{9}$/.test(identifier);
    }
  };

  const handleSendOTP = async () => {
    if (!identifier) {
      setError(`Please enter your ${identifierType === "email" ? "email" : "mobile number"}`);
      return;
    }
    if (!validateIdentifier()) {
      setError(`Please enter a valid ${identifierType === "email" ? "email address" : "10-digit mobile number"}`);
      return;
    }

    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 1500));
    
    const demoOTP = Math.floor(100000 + Math.random() * 900000);
    console.log(`Demo OTP for ${identifier}: ${demoOTP}`);
    
    setOtpSent(true);
    setResendTimer(30);
    
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setLoading(false);
    alert(`Demo OTP sent! For testing, use any 6-digit number (e.g., 123456)\n\nYour demo OTP is: ${demoOTP}`);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    
    // Store user info but WITHOUT role
    setUser({ 
      email: identifierType === "email" ? identifier : `${identifier}@phone.com`,
      phone: identifierType === "phone" ? identifier : null,
      name: identifier.split('@')[0] || `User_${identifier.slice(-4)}`,
      isNewUser: !isLogin,
      premium: false
    });
    
    // Navigate to role selection after login
    navigate("/role");
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setOtp("");
    setIdentifier("");
    setError("");
  };

  if (loading && !otpSent) {
    return (
      <div style={styles.verificationContainer}>
        <div style={styles.verificationCard}>
          <div style={styles.verificationIcon}>📱</div>
          <h2 style={styles.verificationTitle}>Sending OTP...</h2>
          <p style={styles.verificationText}>Please wait while we send a verification code</p>
          <div style={styles.loader}><div style={styles.spinner} /></div>
        </div>
      </div>
    );
  }

  if (otpSent) {
    return (
      <div style={styles.container}>
        <div style={styles.bgDecoration1} />
        <div style={styles.bgDecoration2} />
        <div style={styles.otpCard}>
          <div style={styles.logoSection}>
            <HindiLogo size="large" />
          </div>
          <div style={styles.otpSection}>
            <h2 style={styles.otpTitle}>Enter Verification Code</h2>
            <p style={styles.otpText}>
              We've sent a 6-digit code to<br />
              <strong>{identifierType === "email" ? identifier : `+91 ${identifier}`}</strong>
            </p>
            <div style={styles.otpInputContainer}>
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/[^0-9]/g, ''));
                  setError("");
                }}
                style={styles.otpInput}
                autoFocus
              />
            </div>
            {error && <div style={styles.errorMessage}><AlertCircle size={16} /><span>{error}</span></div>}
            <button onClick={handleVerifyOTP} style={styles.verifyBtn} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Continue"}
              <ArrowRight size={18} />
            </button>
            <div style={styles.resendSection}>
              <p style={styles.resendText}>
                Didn't receive the code?{" "}
                {resendTimer > 0 ? (
                  <span style={styles.timerText}>Resend in {resendTimer}s</span>
                ) : (
                  <button onClick={handleSendOTP} style={styles.resendBtn}>Resend OTP</button>
                )}
              </p>
            </div>
            <button onClick={() => { setOtpSent(false); setIdentifier(""); setOtp(""); }} style={styles.backBtn}>
              ← Back to {identifierType === "email" ? "email" : "mobile"} entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.bgDecoration1} />
      <div style={styles.bgDecoration2} />
      <div style={styles.loginCard}>
        <div style={styles.logoSection}>
          <HindiLogo size="large" />
          <p style={styles.welcomeText}>Welcome to Vivaha</p>
        </div>

        <div style={styles.toggleContainer}>
          <button onClick={() => setIdentifierType("email")} style={{...styles.toggleBtn, ...(identifierType === "email" ? styles.toggleBtnActive : {})}}>
            <Mail size={16} /> Email
          </button>
          <button onClick={() => setIdentifierType("phone")} style={{...styles.toggleBtn, ...(identifierType === "phone" ? styles.toggleBtnActive : {})}}>
            <Phone size={16} /> Mobile Number
          </button>
        </div>

        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>{identifierType === "email" ? "Email Address" : "Mobile Number"}</label>
            <input 
              type={identifierType === "email" ? "email" : "tel"}
              placeholder={identifierType === "email" ? "you@example.com" : "9876543210"}
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
              style={styles.input}
            />
          </div>

          {error && <div style={styles.errorMessage}><AlertCircle size={16} /><span>{error}</span></div>}

          <button onClick={handleSendOTP} style={styles.continueBtn}>
            Continue with OTP <ArrowRight size={18} />
          </button>

          <div style={styles.divider}><span>or</span></div>

          <div style={styles.toggleModeSection}>
            <p style={styles.toggleModeText}>
              {isLogin ? "New to Vivaha?" : "Already have an account?"}
              <button onClick={toggleMode} style={styles.toggleModeBtn}>
                {isLogin ? "Create Account" : "Login"}
              </button>
            </p>
          </div>

          <div style={styles.demoNote}>
            <Sparkles size={14} color="#E77291" />
            <p>Demo: Enter any {identifierType === "email" ? "email" : "mobile number"} • OTP: any 6 digits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #FDF0F3 0%, #FFF5F7 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" },
  bgDecoration1: { position: "absolute", top: "-20%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(231,114,145,0.08) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" },
  bgDecoration2: { position: "absolute", bottom: "-20%", left: "-10%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(172,22,52,0.06) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite reverse" },
  loginCard: { background: "white", borderRadius: "48px", width: "100%", maxWidth: "480px", padding: "48px 40px", boxShadow: "0 25px 50px -12px rgba(62,0,20,0.25)", border: "1px solid #F5D0DA", position: "relative", zIndex: 2 },
  otpCard: { background: "white", borderRadius: "48px", width: "100%", maxWidth: "480px", padding: "48px 40px", boxShadow: "0 25px 50px -12px rgba(62,0,20,0.25)", border: "1px solid #F5D0DA", position: "relative", zIndex: 2 },
  logoSection: { textAlign: "center", marginBottom: "32px" },
  welcomeText: { color: "#7A5560", fontSize: "14px", marginTop: "12px" },
  toggleContainer: { display: "flex", gap: "12px", marginBottom: "32px", background: "#FDF0F3", borderRadius: "999px", padding: "4px" },
  toggleBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#666" },
  toggleBtnActive: { background: "white", color: "#AC1634", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  formSection: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  inputLabel: { fontSize: "13px", fontWeight: 600, color: "#3E0014" },
  input: { width: "100%", padding: "16px 20px", border: "1.5px solid #F5D0DA", borderRadius: "20px", fontSize: "15px", outline: "none", background: "#FDF8F9", fontFamily: "'DM Sans', sans-serif" },
  continueBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)", color: "white", border: "none", borderRadius: "40px", fontSize: "16px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" },
  divider: { textAlign: "center", position: "relative", margin: "8px 0", "& span": { background: "white", padding: "0 16px", color: "#999", fontSize: "12px" } },
  toggleModeSection: { textAlign: "center" },
  toggleModeText: { fontSize: "14px", color: "#666" },
  toggleModeBtn: { background: "none", border: "none", color: "#AC1634", fontWeight: 600, cursor: "pointer", marginLeft: "8px" },
  demoNote: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", background: "#FDF0F3", borderRadius: "16px", fontSize: "12px", color: "#AC1634" },
  errorMessage: { display: "flex", alignItems: "center", gap: "8px", padding: "12px", background: "#FFEBEE", borderRadius: "12px", fontSize: "13px", color: "#F44336" },
  verificationContainer: { minHeight: "100vh", background: "linear-gradient(135deg, #FDF0F3 0%, #FFF5F7 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" },
  verificationCard: { background: "white", borderRadius: "48px", width: "100%", maxWidth: "400px", padding: "48px", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(62,0,20,0.25)" },
  verificationIcon: { fontSize: "64px", marginBottom: "24px" },
  verificationTitle: { fontSize: "24px", fontWeight: 600, marginBottom: "12px" },
  verificationText: { fontSize: "14px", color: "#666", marginBottom: "32px" },
  loader: { display: "flex", justifyContent: "center" },
  spinner: { width: "40px", height: "40px", border: "3px solid #F5D0DA", borderTopColor: "#AC1634", borderRadius: "50%", animation: "spin 1s linear infinite" },
  otpSection: { textAlign: "center" },
  otpTitle: { fontSize: "24px", fontWeight: 600, marginBottom: "12px" },
  otpText: { fontSize: "14px", color: "#666", marginBottom: "32px", lineHeight: 1.5 },
  otpInputContainer: { marginBottom: "24px" },
  otpInput: { width: "100%", padding: "16px 20px", border: "1.5px solid #F5D0DA", borderRadius: "20px", fontSize: "20px", textAlign: "center", letterSpacing: "8px", outline: "none", background: "#FDF8F9" },
  verifyBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)", color: "white", border: "none", borderRadius: "40px", fontSize: "16px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" },
  resendSection: { marginBottom: "20px" },
  resendText: { fontSize: "13px", color: "#666" },
  timerText: { color: "#999" },
  resendBtn: { background: "none", border: "none", color: "#AC1634", fontWeight: 600, cursor: "pointer" },
  backBtn: { background: "none", border: "none", color: "#E77291", fontSize: "13px", cursor: "pointer" }
};