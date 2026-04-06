import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, MessageCircle, Home, ClipboardList,
  Sparkles, Package, User, LogOut, Star
} from "lucide-react";

export default function CoupleDashboard({ user }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { icon: <Home size={20} strokeWidth={1.5} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} strokeWidth={1.5} />, label: "Package", path: "/package" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Profile", path: "/profile" },
  ];

  const offers = [
    { name: "Lens & Love Studio", service: "Photography", price: "₹85,000", rating: "4.9" },
    { name: "Royal Blooms Decor", service: "Decoration", price: "₹1,20,000", rating: "4.8" },
    { name: "Glam by Priya", service: "Makeup", price: "₹45,000", rating: "5.0" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#3E0014",
        padding: "20px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0
      }}>
        <button onClick={() => setMenuOpen(true)} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex",
          padding: "8px", borderRadius: 10
        }}>
          <Menu size={20} strokeWidth={1.5} />
        </button>

        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            color: "#FFFFFF",
            fontSize: 28,
            letterSpacing: 1
          }}>Vivaha</h1>
        </div>

        <button onClick={() => navigate("/messages")} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex",
          padding: "8px", borderRadius: 10
        }}>
          <MessageCircle size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Slide Menu */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{
            position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", zIndex: 998
          }} />
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
            background: "#3E0014", zIndex: 999, padding: "36px 20px",
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#FFFFFF", fontSize: 26 }}>Vivaha</h2>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "#E77291", cursor: "pointer", display: "flex" }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            {navItems.map(n => (
              <div key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 16px", borderRadius: 14, cursor: "pointer",
                color: "#FFFFFF", fontSize: 15, marginBottom: 4,
                background: "rgba(231,114,145,0.08)"
              }}>
                <span style={{ color: "#E77291" }}>{n.icon}</span>
                {n.label}
              </div>
            ))}
            <div style={{ marginTop: "auto" }}>
              <div onClick={() => navigate("/")} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 16px", borderRadius: 14, cursor: "pointer", color: "#E77291", fontSize: 15
              }}>
                <LogOut size={20} strokeWidth={1.5} /> Logout
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Hero Card — full width, bold */}
        <div style={{
          background: "linear-gradient(160deg, #3E0014 0%, #7A002B 60%, #AC1634 100%)",
          padding: "32px 24px 40px",
          position: "relative", overflow: "hidden"
        }}>
          {/* Decorative circle */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 180, height: 180, borderRadius: "50%",
            background: "rgba(231,114,145,0.08)"
          }} />
          <div style={{
            position: "absolute", bottom: -20, right: 40,
            width: 100, height: 100, borderRadius: "50%",
            background: "rgba(231,114,145,0.05)"
          }} />

          <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 3, fontWeight: 600, marginBottom: 10 }}>
            YOUR WEDDING
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            color: "#FFFFFF", fontSize: 32, marginBottom: 24, lineHeight: 1.2
          }}>
            Welcome,<br />{user?.name || "Guest"} 💍
          </h2>

          <div style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 16, padding: "16px 18px",
            border: "1px solid rgba(255,255,255,0.1)", marginBottom: 20
          }}>
            {[
              ["Wedding Date", "Not set yet"],
              ["City", "Not set yet"],
              ["Budget", "Not set yet"],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)"
              }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{label}</p>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>{val}</p>
              </div>
            ))}
          </div>

          <button style={{
            padding: "11px 24px",
            background: "transparent",
            border: "1.5px solid #E77291",
            color: "#E77291", borderRadius: 999, fontSize: 13,
            cursor: "pointer", fontWeight: 500
          }}>+ Add Fiancé</button>
        </div>

        {/* Content below hero */}
        <div style={{ padding: "24px 16px" }}>

          {/* Vendor Offers heading */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 20 }}>
              Live Vendor Offers
            </p>
            <span style={{
              background: "#AC1634", color: "white",
              fontSize: 10, padding: "4px 12px", borderRadius: 99,
              fontWeight: 600, letterSpacing: 1
            }}>LIVE</span>
          </div>

          {/* Vendor Cards */}
          {offers.map((o, i) => (
            <div key={i} style={{
              background: "#FFFFFF",
              borderRadius: 20, padding: "18px 18px",
              marginBottom: 12,
              boxShadow: "0 4px 20px rgba(62,0,20,0.08)",
              border: "1px solid #F5D0DA",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <p style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 15, marginBottom: 4 }}>{o.name}</p>
                <p style={{ color: "#7A5560", fontSize: 13 }}>{o.service}</p>
                <p style={{ color: "#AC1634", fontWeight: 700, fontSize: 16, marginTop: 8 }}>{o.price}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginBottom: 12 }}>
                  <Star size={13} fill="#E77291" color="#E77291" />
                  <p style={{ color: "#3E0014", fontWeight: 600, fontSize: 14 }}>{o.rating}</p>
                </div>
                <button onClick={() => navigate("/package")} style={{
                  padding: "9px 20px", background: "#3E0014",
                  color: "white", border: "none", borderRadius: 999,
                  fontSize: 13, cursor: "pointer", fontWeight: 500
                }}>Book</button>
              </div>
            </div>
          ))}

          {/* Premium Banner */}
          <div style={{
            background: "linear-gradient(135deg, #5B002C, #AC1634)",
            borderRadius: 24, padding: "28px 24px",
            boxShadow: "0 8px 32px rgba(91,0,44,0.35)",
            marginTop: 8, marginBottom: 8
          }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>PREMIUM</p>
            <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 22, marginBottom: 8 }}>
              Unlock Everything
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
              All vendor offers, AI planning tools & priority support for your big day.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 28 }}>₹10,000</p>
              <button style={{
                padding: "12px 28px", background: "#FFFFFF",
                color: "#AC1634", border: "none", borderRadius: 999,
                fontSize: 13, fontWeight: 700, cursor: "pointer"
              }}>Upgrade Now</button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {navItems.map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 5, background: "none", border: "none", cursor: "pointer",
            color: window.location.pathname === n.path ? "#AC1634" : "#CCBBBB"
          }}>
            {n.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}