// src/pages/AIAssistantPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import AIWeddingAssistant from "../components/AIWeddingAssistant";

export default function AIAssistantPage({ user }) {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#3E0014", padding: "16px 32px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", gap: "20px" }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", padding: "8px 16px", borderRadius: "10px", cursor: "pointer" }}
          >
            ← Back
          </button>
          <HindiLogo size="small" />
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" }}>
            AI Wedding Assistant
          </h1>
          <p style={{ fontSize: "18px", color: "#7A5560" }}>
            Your personal AI-powered wedding planning companion
          </p>
        </div>
        
        <AIWeddingAssistant 
          user={user}
          weddingDetails={user?.weddingDetails || user}
          onClose={() => {}}
          isOpen={true}
        />
      </div>
      
      <BottomNav />
    </div>
  );
}