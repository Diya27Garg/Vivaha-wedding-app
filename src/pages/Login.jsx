// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Heart, Mail, Phone, ArrowRight, AlertCircle, CheckCircle, Calendar, MapPin, Users } from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function Login({ setUser }) {
  const [identifier, setIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState("email");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up (Create Account)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  // Animated counter for wedding stats
  const [stats, setStats] = useState({ couples: 0, vendors: 0, weddings: 0 });

  useEffect(() => {
    const animateStats = setInterval(() => {
      setStats(prev => ({
        couples: prev.couples < 10542 ? prev.couples + 87 : 10542,
        vendors: prev.vendors < 256 ? prev.vendors + 2 : 256,
        weddings: prev.weddings < 8943 ? prev.weddings + 63 : 8943
      }));
    }, 50);
    return () => clearInterval(animateStats);
  }, []);

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
    setShowVerification(true);
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
    
    let userName = "";
    if (identifierType === "email") {
      userName = identifier.split('@')[0];
    } else {
      userName = `User_${identifier.slice(-4)}`;
    }
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    const userData = { 
      email: identifierType === "email" ? identifier : `${identifier}@phone.com`,
      phone: identifierType === "phone" ? identifier : null,
      name: userName,
      isNewUser: !isLogin,
      premium: false
    };
    
    setUser(userData);
    
    setTimeout(() => {
      navigate("/role");
    }, 100);
    
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setShowVerification(false);
    setOtp("");
    setIdentifier("");
    setError("");
  };

  if (loading && !otpSent) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingIcon}>📱</div>
          <h2 style={styles.loadingTitle}>Sending OTP...</h2>
          <p style={styles.loadingText}>Please wait while we send a verification code</p>
          <div style={styles.spinner} />
        </div>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div style={styles.twoColumnContainer}>
        {/* Left Column - Brand Section */}
        <div style={styles.leftColumn}>
          <div style={styles.leftContent}>
            <div style={styles.animatedLogo}>
              <HindiLogo size="xl" animated={true} />
            </div>
            <div style={styles.tagline}>
              <Sparkles size={20} color="#E77291" />
              <span>Plan Your Dream Wedding</span>
              <Sparkles size={20} color="#E77291" />
            </div>
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <Heart size={24} color="#E77291" />
                <p style={styles.statNumber}>{stats.couples.toLocaleString()}+</p>
                <p style={styles.statLabel}>Happy Couples</p>
              </div>
              <div style={styles.statItem}>
                <Users size={24} color="#E77291" />
                <p style={styles.statNumber}>{stats.vendors.toLocaleString()}+</p>
                <p style={styles.statLabel}>Verified Vendors</p>
              </div>
              <div style={styles.statItem}>
                <Calendar size={24} color="#E77291" />
                <p style={styles.statNumber}>{stats.weddings.toLocaleString()}+</p>
                <p style={styles.statLabel}>Weddings Planned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - OTP Verification Form */}
        <div style={styles.rightColumn}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Enter Verification Code</h2>
              <p style={styles.formSubtitle}>
                We've sent a 6-digit code to<br />
                <strong>{identifierType === "email" ? identifier : `+91 ${identifier}`}</strong>
              </p>
            </div>

            <div style={styles.otpContainer}>
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

            <button onClick={handleVerifyOTP} style={styles.submitBtn} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Continue"} <ArrowRight size={18} />
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

            <button onClick={() => { setShowVerification(false); setOtp(""); }} style={styles.backBtn}>
              ← Back to {identifierType === "email" ? "email" : "mobile"} entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.twoColumnContainer}>
      {/* Left Column - Brand / Animated Wedding Logo */}
      <div style={styles.leftColumn}>
        <div style={styles.leftContent}>
          <div style={styles.animatedLogo}>
            <HindiLogo size="xl" animated={true} />
          </div>
          <div style={styles.tagline}>
            <Sparkles size={20} color="#E77291" />
            <span>Plan Your Dream Wedding</span>
            <Sparkles size={20} color="#E77291" />
          </div>
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <Heart size={24} color="#E77291" />
              <p style={styles.statNumber}>{stats.couples.toLocaleString()}+</p>
              <p style={styles.statLabel}>Happy Couples</p>
            </div>
            <div style={styles.statItem}>
              <Users size={24} color="#E77291" />
              <p style={styles.statNumber}>{stats.vendors.toLocaleString()}+</p>
              <p style={styles.statLabel}>Verified Vendors</p>
            </div>
            <div style={styles.statItem}>
              <Calendar size={24} color="#E77291" />
              <p style={styles.statNumber}>{stats.weddings.toLocaleString()}+</p>
              <p style={styles.statLabel}>Weddings Planned</p>
            </div>
          </div>
          <div style={styles.testimonial}>
            <p>"Vivaha made our wedding planning so easy! Found all our vendors in one place."</p>
            <div style={styles.testimonialAuthor}>— Priya & Raj, December 2024</div>
          </div>
        </div>
      </div>

      {/* Right Column - Login/Signup Form */}
      <div style={styles.rightColumn}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
            <p style={styles.formSubtitle}>
              {isLogin ? "Sign in to continue your wedding planning" : "Start your wedding planning journey with Vivaha"}
            </p>
          </div>

          <div style={styles.toggleContainer}>
            <button 
              onClick={() => setIdentifierType("email")}
              style={{...styles.toggleBtn, ...(identifierType === "email" ? styles.toggleBtnActive : {})}}
            >
              <Mail size={16} /> Email
            </button>
            <button 
              onClick={() => setIdentifierType("phone")}
              style={{...styles.toggleBtn, ...(identifierType === "phone" ? styles.toggleBtnActive : {})}}
            >
              <Phone size={16} /> Mobile Number
            </button>
          </div>

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

          <button onClick={handleSendOTP} style={styles.submitBtn}>
            {isLogin ? "Login with OTP" : "Create Account"} <ArrowRight size={18} />
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
  twoColumnContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    fontFamily: "'DM Sans', sans-serif",
    overflow: "hidden"
  },
  leftColumn: {
    flex: 1,
    background: "linear-gradient(135deg, #3E0014 0%, #7A002B 50%, #AC1634 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    position: "relative",
    overflow: "hidden"
  },
  leftContent: {
    maxWidth: "500px",
    textAlign: "center",
    color: "white",
    zIndex: 2
  },
  animatedLogo: {
    marginBottom: "32px"
  },
  tagline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "16px",
    letterSpacing: "2px",
    marginBottom: "48px"
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "40px",
    marginBottom: "48px",
    flexWrap: "wrap"
  },
  statItem: {
    textAlign: "center",
    flex: 1
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "12px",
    marginBottom: "4px"
  },
  statLabel: {
    fontSize: "13px",
    opacity: 0.8
  },
  testimonial: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "24px",
    marginTop: "32px",
    border: "1px solid rgba(255,255,255,0.2)"
  },
  rightColumn: {
    flex: 1,
    background: "#FDF0F3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    overflowY: "auto"
  },
  formCard: {
    background: "white",
    borderRadius: "32px",
    padding: "48px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    border: "1px solid #F5D0DA"
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "32px"
  },
  formTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "32px",
    color: "#3E0014",
    marginBottom: "12px"
  },
  formSubtitle: {
    fontSize: "14px",
    color: "#7A5560",
    lineHeight: 1.5
  },
  toggleContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
    background: "#FDF0F3",
    borderRadius: "999px",
    padding: "4px"
  },
  toggleBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "999px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#666",
    transition: "all 0.2s"
  },
  toggleBtnActive: {
    background: "white",
    color: "#AC1634",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "24px"
  },
  inputLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#3E0014"
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
  submitBtn: {
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
    marginBottom: "20px"
  },
  divider: {
    textAlign: "center",
    position: "relative",
    margin: "20px 0",
    "& span": {
      background: "white",
      padding: "0 16px",
      color: "#999",
      fontSize: "12px"
    }
  },
  toggleModeSection: {
    textAlign: "center",
    marginBottom: "20px"
  },
  toggleModeText: {
    fontSize: "14px",
    color: "#666"
  },
  toggleModeBtn: {
    background: "none",
    border: "none",
    color: "#AC1634",
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: "8px"
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
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    background: "#FFEBEE",
    borderRadius: "12px",
    fontSize: "13px",
    color: "#F44336",
    marginBottom: "20px"
  },
  loadingContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF0F3 0%, #FFF5F7 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px"
  },
  loadingCard: {
    background: "white",
    borderRadius: "48px",
    width: "100%",
    maxWidth: "400px",
    padding: "48px",
    textAlign: "center",
    boxShadow: "0 25px 50px -12px rgba(62,0,20,0.25)"
  },
  loadingIcon: {
    fontSize: "64px",
    marginBottom: "24px"
  },
  loadingTitle: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "12px"
  },
  loadingText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "32px"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #F5D0DA",
    borderTopColor: "#AC1634",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto"
  },
  otpContainer: {
    marginBottom: "24px"
  },
  otpInput: {
    width: "100%",
    padding: "16px 20px",
    border: "1.5px solid #F5D0DA",
    borderRadius: "20px",
    fontSize: "20px",
    textAlign: "center",
    letterSpacing: "8px",
    outline: "none",
    background: "#FDF8F9",
    fontFamily: "'DM Sans', sans-serif"
  },
  resendSection: {
    textAlign: "center",
    marginBottom: "20px"
  },
  resendText: {
    fontSize: "13px",
    color: "#666"
  },
  timerText: {
    color: "#999"
  },
  resendBtn: {
    background: "none",
    border: "none",
    color: "#AC1634",
    fontWeight: 600,
    cursor: "pointer"
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#E77291",
    fontSize: "13px",
    cursor: "pointer",
    display: "block",
    width: "100%",
    textAlign: "center"
  }
};