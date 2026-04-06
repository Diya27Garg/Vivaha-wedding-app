import { useNavigate } from "react-router-dom";
export default function Messaging() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0" }}>
      <div style={{ background: "linear-gradient(135deg, #800020, #5a0015)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}>←</button>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#C9A84C", fontSize: 20 }}>Messages</h1>
      </div>
      <div style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>💬</div>
        <p style={{ fontFamily: "Georgia, serif", color: "#800020", fontSize: 22 }}>Messaging</p>
        <p style={{ color: "#6b6b6b", marginTop: 8 }}>Chat with your vendors here</p>
      </div>
    </div>
  );
}