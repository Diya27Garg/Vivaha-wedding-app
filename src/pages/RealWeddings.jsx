import { useState } from "react";
import { useNavigate } from "react-router-dom";

const weddings = [
  { id: 1, couple: "Riya & Arjun", city: "Udaipur", type: "Destination", guests: 250, budget: "₹25L–30L", story: "A royal lakeside wedding with a breathtaking sunset ceremony at Lake Pichola.", highlights: ["Lake venue", "Royal theme", "500 floral arrangements"], vendors: { photographer: "Lens & Love Studio", decorator: "Royal Blooms", makeup: "Glam by Priya", venue: "Taj Lake Palace" }, emoji: "🏰" },
  { id: 2, couple: "Meera & Karan", city: "Goa", type: "Beach", guests: 120, budget: "₹15L–20L", story: "An intimate barefoot beach wedding at sunset with bohemian florals and fairy lights.", highlights: ["Beach ceremony", "Boho decor", "Live music"], vendors: { photographer: "Golden Hour Films", decorator: "Bloom & Breeze", makeup: "Coastal Glow", venue: "W Goa" }, emoji: "🌊" },
  { id: 3, couple: "Ananya & Rohan", city: "Jaipur", type: "Traditional", guests: 500, budget: "₹20L–25L", story: "A grand Rajasthani wedding with elephant processions and traditional folk performances.", highlights: ["Elephant entry", "Folk dance", "Royal cuisine"], vendors: { photographer: "Heritage Clicks", decorator: "Marigold Magic", makeup: "Rajwadi Beauty", venue: "Jai Mahal Palace" }, emoji: "🐘" },
  { id: 4, couple: "Priya & Vikram", city: "Mumbai", type: "Intimate", guests: 80, budget: "₹10L–15L", story: "A chic rooftop wedding overlooking the city skyline with minimalist luxury decor.", highlights: ["City skyline", "Minimalist decor", "Gourmet catering"], vendors: { photographer: "City Frames", decorator: "Pure White Decor", makeup: "Studio Luxe", venue: "The Taj Mahal Hotel" }, emoji: "🌆" },
];

export default function RealWeddings() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0", padding: "0 0 40px" }}>
      <div style={{
        background: "linear-gradient(135deg, #800020, #5a0015)",
        padding: "48px 24px 32px",
        textAlign: "center"
      }}>
        <p style={{ color: "#C9A84C", fontSize: 13, letterSpacing: 3, marginBottom: 8 }}>REAL WEDDINGS BY</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "white", marginBottom: 8 }}>Vivaha</h1>
        <p style={{ color: "#e2c97e", fontSize: 14, opacity: 0.9 }}>See how couples planned their dream weddings with us</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
        padding: "24px 16px",
        maxWidth: 600,
        margin: "0 auto"
      }}>
        {weddings.map(w => (
          <div key={w.id} onClick={() => setSelected(w)} style={{
            background: "white",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              height: 100,
              background: "linear-gradient(135deg, #800020, #C9A84C)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40
            }}>{w.emoji}</div>
            <div style={{ padding: "12px" }}>
              <p style={{ fontWeight: 700, color: "#800020", fontSize: 14, fontFamily: "Georgia, serif" }}>{w.couple}</p>
              <p style={{ color: "#6b6b6b", fontSize: 12, marginTop: 2 }}>{w.city} · {w.type}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <button onClick={() => navigate("/role")} style={{
          background: "#800020",
          color: "white",
          border: "none",
          borderRadius: 999,
          padding: "14px 40px",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer"
        }}>Start Planning Your Wedding →</button>
      </div>

      {selected && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 999, padding: 16
        }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "white",
            borderRadius: 24,
            width: "100%",
            maxWidth: 480,
            maxHeight: "85vh",
            overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}>
            <div style={{
              height: 140,
              background: "linear-gradient(135deg, #800020, #C9A84C)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 60, borderRadius: "24px 24px 0 0"
            }}>{selected.emoji}</div>
            <div style={{ padding: "24px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#800020" }}>{selected.couple}</h2>
              <p style={{ color: "#6b6b6b", fontSize: 13, marginTop: 4 }}>{selected.city} · {selected.type} · {selected.guests} guests</p>
              <p style={{ color: "#C9A84C", fontSize: 13, fontWeight: 600, marginTop: 2 }}>{selected.budget}</p>

              <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>{selected.story}</p>

              <div style={{ marginTop: 20 }}>
                <p style={{ fontWeight: 700, color: "#800020", fontSize: 13, marginBottom: 8 }}>HIGHLIGHTS</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.highlights.map(h => (
                    <span key={h} style={{
                      background: "#fff8e7",
                      border: "1px solid #C9A84C",
                      color: "#8a6000",
                      padding: "4px 12px",
                      borderRadius: 99,
                      fontSize: 12
                    }}>{h}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <p style={{ fontWeight: 700, color: "#800020", fontSize: 13, marginBottom: 8 }}>VENDORS USED</p>
                {Object.entries(selected.vendors).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ color: "#6b6b6b", fontSize: 13, textTransform: "capitalize" }}>{key}</span>
                    <span style={{ color: "#1a1a1a", fontSize: 13, fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button onClick={() => navigate("/role")} style={{
                  flex: 1, padding: "12px", background: "#800020", color: "white",
                  border: "none", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer"
                }}>View Similar Package</button>
                <button onClick={() => setSelected(null)} style={{
                  padding: "12px 20px", background: "#f5f0dc", color: "#800020",
                  border: "none", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer"
                }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}