import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      label: "Bride",
      emoji: "👰",
      desc: "Plan your dream wedding",
      color: "#E77291",
      role: "bride"
    },
    {
      label: "Groom",
      emoji: "🤵",
      desc: "Be part of every detail",
      color: "#AC1634",
      role: "groom"
    },
    {
      label: "Vendor",
      emoji: "🎨",
      desc: "Grow your business",
      color: "#7A002B",
      role: "vendor"
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #3E0014 0%, #7A002B 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", fontFamily: "'DM Sans', sans-serif"
    }}>
      <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 3, marginBottom: 12, fontWeight: 600 }}>
        WELCOME TO VIVAHA
      </p>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
        fontSize: 36, color: "white", marginBottom: 8, textAlign: "center"
      }}>Who are you?</h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 48 }}>
        Choose your role to get started
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 360 }}>
        {roles.map(r => (
          <div key={r.label}
            onClick={() => navigate("/login", { state: { role: r.role } })}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(231,114,145,0.3)",
              borderRadius: 20, padding: "20px 24px",
              display: "flex", alignItems: "center", gap: 16,
              cursor: "pointer", transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          >
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: `${r.color}30`,
              border: `1.5px solid ${r.color}`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 24, flexShrink: 0
            }}>{r.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "white", fontWeight: 600, fontSize: 18 }}>{r.label}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 3 }}>{r.desc}</p>
            </div>
            <p style={{ color: "#E77291", fontSize: 20 }}>→</p>
          </div>
        ))}
      </div>
    </div>
  );
}