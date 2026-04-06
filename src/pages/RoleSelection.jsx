import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    { label: "Bride", emoji: "👰", desc: "Plan your dream wedding", color: "#800020" },
    { label: "Groom", emoji: "🤵", desc: "Be part of every detail", color: "#5a0015" },
    { label: "Vendor", emoji: "🎨", desc: "Grow your business", color: "#C9A84C" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #800020 0%, #5a0015 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px"
    }}>
      <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>WELCOME TO VIVAHA</p>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, color: "white", marginBottom: 8, textAlign: "center" }}>Who are you?</h1>
      <p style={{ color: "#e2c97e", fontSize: 14, marginBottom: 40, opacity: 0.85 }}>Choose your role to get started</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 360 }}>
        {roles.map(r => (
          <div key={r.label} onClick={() => navigate("/login", { state: { role: r.label.toLowerCase() } })}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 20,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <div style={{ fontSize: 40 }}>{r.emoji}</div>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: 18, fontFamily: "Georgia, serif" }}>{r.label}</p>
              <p style={{ color: "#e2c97e", fontSize: 13, marginTop: 2 }}>{r.desc}</p>
            </div>
            <div style={{ marginLeft: "auto", color: "#C9A84C", fontSize: 20 }}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}