import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    emoji: "📋",
    title: "Wedding Planning Made Simple",
    desc: "Manage every detail of your big day in one beautiful place — checklists, vendors, budgets and more."
  },
  {
    emoji: "🤝",
    title: "Power Pair Vendor Discovery",
    desc: "Find perfectly matched vendor combos — photographers with cinematographers, decor with lighting."
  },
  {
    emoji: "🤖",
    title: "AI-Assisted Planning",
    desc: "Let our AI assistant create timelines, suggest vendors, and keep you on track effortlessly."
  }
];

export default function IntroScreens() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigate("/real-weddings");
  };

  const s = slides[current];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFFFF0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px"
    }}>
      <div style={{
        background: "white",
        borderRadius: 28,
        padding: "48px 32px",
        maxWidth: 420,
        width: "100%",
        boxShadow: "0 8px 40px rgba(128,0,32,0.12)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>{s.emoji}</div>
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: 26,
          color: "#800020",
          marginBottom: 16,
          lineHeight: 1.3
        }}>{s.title}</h2>
        <p style={{
          color: "#6b6b6b",
          fontSize: 15,
          lineHeight: 1.7,
          marginBottom: 40
        }}>{s.desc}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 99,
              background: i === current ? "#800020" : "#e2c97e",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}/>
          ))}
        </div>

        <button onClick={next} style={{
          width: "100%",
          padding: "14px",
          background: "#800020",
          color: "white",
          border: "none",
          borderRadius: 999,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: 0.5
        }}>
          {current === slides.length - 1 ? "Let's Get You Married 💍" : "Next →"}
        </button>

        <p onClick={() => navigate("/real-weddings")} style={{
          marginTop: 16,
          color: "#C9A84C",
          fontSize: 13,
          cursor: "pointer"
        }}>Skip</p>
      </div>
    </div>
  );
}