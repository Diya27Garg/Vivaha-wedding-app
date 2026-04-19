// src/pages/SplashScreen.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HindiLogo from "../components/HindiLogo";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Show logo after brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 200);
    
    // Show subtitle after logo
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1200);
    
    // Navigate away
    const navigateTimer = setTimeout(() => {
  navigate("/real-weddings");  // Changed from "/intro"
}, 3500);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #3E0014 0%, #7A002B 50%, #AC1634 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(231,114,145,0.08) 0%, transparent 70%)",
        animation: "pulse 3s ease-in-out infinite"
      }} />
      
      <div style={{
        position: "absolute",
        width: "450px",
        height: "450px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(172,22,52,0.06) 0%, transparent 70%)",
        animation: "pulse 4s ease-in-out infinite reverse"
      }} />

      {/* Main Logo - Reveals as a complete word */}
      <div style={{
        marginBottom: "32px",
        textAlign: "center"
      }}>
        <HindiLogo animated={true} size="xl" />
      </div>

      {/* Subtitle */}
      {showSubtitle && (
        <div style={{
          textAlign: "center",
          animation: "fadeInUp 0.6s ease-out"
        }}>
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: "16px",
            color: "#E77291",
            letterSpacing: "6px",
            marginBottom: "12px"
          }}>
            Wedding Services
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px"
          }}>
            <span style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "3px"
            }}>
              EVERY LOVE STORY DESERVES A GRAND CELEBRATION
            </span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      <div style={{
        position: "absolute",
        bottom: "40px",
        display: "flex",
        gap: "10px"
      }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#E77291",
              animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}