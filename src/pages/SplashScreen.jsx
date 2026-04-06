import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/intro"), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #800020 0%, #5a0015 60%, #3a000d 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px"
    }}>
      <div style={{ fontSize: 64 }}>💍</div>
      <h1 style={{
        fontFamily: "Georgia, serif",
        fontSize: 52,
        color: "#C9A84C",
        letterSpacing: 6,
        fontWeight: 700
      }}>VIVAHA</h1>
      <p style={{
        color: "#e2c97e",
        fontSize: 16,
        letterSpacing: 2,
        opacity: 0.85
      }}>Plan Your Wedding, Effortlessly</p>
      <div style={{ marginTop: 48 }}>
        <div style={{
          width: 40,
          height: 3,
          background: "#C9A84C",
          borderRadius: 99,
          animation: "pulse 1.5s infinite"
        }}/>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; width: 40px; }
          50% { opacity: 0.4; width: 20px; }
        }
      `}</style>
    </div>
  );
}