// src/pages/SustainabilityHub.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Award, Recycle, TreePine, Droplets, Sun, CheckCircle, Sparkles, TrendingUp, Heart, Home, Package, User, ShoppingCart } from "lucide-react";

export default function SustainabilityHub() {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [points, setPoints] = useState(0);

  const sustainableSteps = [
    { id: 1, title: "Digital Invitations", impact: "Save 500+ papers", points: 50, tip: "Use Canva for beautiful e-invites", icon: "📧", completed: false },
    { id: 2, title: "Local & Seasonal Flowers", impact: "Reduce carbon footprint", points: 75, tip: "Choose local florists for fresh flowers", icon: "🌸", completed: false },
    { id: 3, title: "Compostable Cutlery", impact: "Zero plastic waste", points: 40, tip: "Use bamboo or palm leaf plates", icon: "🍽️", completed: false },
    { id: 4, title: "Food Donation", impact: "Feed 100+ people", points: 100, tip: "Donate excess food to local NGOs", icon: "🍲", completed: false },
    { id: 5, title: "Solar-Powered Venue", impact: "Reduce energy consumption", points: 80, tip: "Choose venues with renewable energy", icon: "☀️", completed: false },
    { id: 6, title: "Plant a Tree Initiative", impact: "Offset carbon emissions", points: 60, tip: "Gift a tree to each guest", icon: "🌳", completed: false }
  ];

  const [steps, setSteps] = useState(sustainableSteps);

  const completeStep = (id) => {
    const step = steps.find(s => s.id === id);
    if (!step.completed) {
      setSteps(steps.map(s => 
        s.id === id ? { ...s, completed: true } : s
      ));
      setPoints(points + step.points);
    }
  };

  const totalPoints = 405;
  const progress = (points / totalPoints) * 100;

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Package size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FDF0F3",
      fontFamily: "'DM Sans', sans-serif",
      paddingBottom: "80px"
    }}>
      {/* Header */}
      <div style={{
        background: "#3E0014",
        padding: "20px",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic",
          fontSize: "24px",
          color: "white",
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Leaf size={24} color="#E77291" /> Sustainable Wedding
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "8px" }}>
          Make your special day kind to the planet
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        {/* Points Card */}
        <div style={{
          background: "linear-gradient(135deg, #2d6a4f, #40916c)",
          borderRadius: "24px",
          padding: "20px",
          marginBottom: "24px",
          color: "white"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <p style={{ fontSize: "12px", opacity: 0.8 }}>Your Green Score</p>
              <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>{points}</p>
              <p style={{ fontSize: "12px", opacity: 0.8 }}>out of {totalPoints} points</p>
            </div>
            <Award size={48} color="#FFD700" />
          </div>
          <div style={{
            height: "8px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "4px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "#FFD700",
              borderRadius: "4px",
              transition: "width 0.3s"
            }} />
          </div>
          <p style={{ fontSize: "12px", marginTop: "12px", opacity: 0.8 }}>
            {points === totalPoints ? "🎉 You're a Green Wedding Champion! 🎉" : `${Math.round(progress)}% to becoming a Green Wedding Champion`}
          </p>
        </div>

        {/* Sustainability Tips Banner */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "24px",
          border: "1px solid #F5D0DA",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <Sparkles size={24} color="#AC1634" />
          <div>
            <p style={{ fontWeight: 600, marginBottom: "4px" }}>Did you know?</p>
            <p style={{ fontSize: "12px", color: "#666" }}>A typical wedding produces 400-600 lbs of waste. Let's reduce that together!</p>
          </div>
        </div>

        {/* Sustainable Steps */}
        <h2 style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#3E0014",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Recycle size={20} /> Green Wedding Checklist
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {steps.map(step => (
            <div key={step.id} style={{
              background: step.completed ? "#E8F5E9" : "white",
              borderRadius: "16px",
              padding: "16px",
              border: `1px solid ${step.completed ? "#4CAF50" : "#F5D0DA"}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: step.completed ? "default" : "pointer",
              transition: "all 0.2s"
            }} onClick={() => !step.completed && completeStep(step.id)}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: step.completed ? "#4CAF50" : "#FDF0F3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
              }}>
                {step.completed ? <CheckCircle size={24} color="white" /> : step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>{step.title}</h3>
                  <span style={{
                    background: step.completed ? "#4CAF50" : "#AC1634",
                    color: "white",
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "999px"
                  }}>+{step.points} pts</span>
                </div>
                <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{step.impact}</p>
                {step.completed && (
                  <p style={{ fontSize: "11px", color: "#4CAF50", marginTop: "4px" }}>✓ Completed! {step.tip}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rewards Section */}
        {points >= 200 && (
          <div style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            borderRadius: "20px",
            padding: "20px",
            marginTop: "24px",
            textAlign: "center"
          }}>
            <Award size={32} color="#3E0014" />
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginTop: "8px", color: "#3E0014" }}>
              🎉 You've Earned a Reward! 🎉
            </h3>
            <p style={{ fontSize: "13px", color: "#3E0014", marginTop: "8px" }}>
              {points >= 300 
                ? "Green Wedding Champion Badge + ₹5000 vendor discount coupon!"
                : "Sustainable Couple Badge + Free eco-friendly wedding consultation!"}
            </p>
            <button style={{
              marginTop: "16px",
              padding: "10px 20px",
              background: "#3E0014",
              color: "white",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: 600
            }}>
              Claim Your Reward
            </button>
          </div>
        )}

        {/* Eco Vendors */}
        <div style={{ marginTop: "24px" }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#3E0014",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <TreePine size={20} /> Eco-Friendly Vendors
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { name: "Green Décor Co", specialty: "Sustainable decorations", rating: "4.9" },
              { name: "Eco Feast Catering", specialty: "Zero-waste catering", rating: "4.8" },
              { name: "Plant-a-Tree Events", specialty: "Tree plantation for each wedding", rating: "4.9" }
            ].map((vendor, i) => (
              <div key={i} style={{
                background: "white",
                borderRadius: "16px",
                padding: "16px",
                border: "1px solid #F5D0DA",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{vendor.name}</p>
                  <p style={{ fontSize: "12px", color: "#666" }}>{vendor.specialty}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>⭐</span>
                    <span style={{ fontWeight: 600 }}>{vendor.rating}</span>
                  </div>
                  <button style={{
                    marginTop: "8px",
                    padding: "6px 16px",
                    background: "#3E0014",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "11px",
                    cursor: "pointer"
                  }}>Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav" style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        borderTop: "1px solid #F5D0DA",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-around",
        zIndex: 100
      }}>
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: window.location.pathname === item.path ? "#AC1634" : "#999",
              fontSize: "10px"
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}