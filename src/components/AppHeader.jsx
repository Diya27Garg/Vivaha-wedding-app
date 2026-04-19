// src/components/AppHeader.jsx
import { useNavigate } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import HindiLogo from "./HindiLogo";

export default function AppHeader({ onMenuClick, showBackButton = false, showMessage = true }) {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#3E0014",
      padding: "16px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      {/* Left - Menu Button or Back Button */}
      {showBackButton ? (
        <button 
          onClick={() => navigate(-1)} 
          style={{
            background: "rgba(231,114,145,0.15)",
            border: "1px solid rgba(231,114,145,0.3)",
            color: "#E77291",
            cursor: "pointer",
            display: "flex",
            padding: "8px 12px",
            borderRadius: 10,
            fontSize: "16px"
          }}
        >
          ← Back
        </button>
      ) : (
        <button 
          onClick={onMenuClick} 
          style={{
            background: "rgba(231,114,145,0.15)",
            border: "1px solid rgba(231,114,145,0.3)",
            color: "#E77291",
            cursor: "pointer",
            display: "flex",
            padding: "8px",
            borderRadius: 10
          }}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Center - Hindi Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HindiLogo size="small" />
      </div>

      {/* Right - Message Button */}
      {showMessage && (
        <button 
          onClick={() => navigate("/messages")} 
          style={{
            background: "rgba(231,114,145,0.15)",
            border: "1px solid rgba(231,114,145,0.3)",
            color: "#E77291",
            cursor: "pointer",
            display: "flex",
            padding: "8px",
            borderRadius: 10
          }}
        >
          <MessageCircle size={20} />
        </button>
      )}
    </div>
  );
}