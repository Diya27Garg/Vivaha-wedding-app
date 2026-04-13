import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, MessageCircle, Home, ClipboardList,
  Sparkles, Package, User, LogOut, Star,
  Copy, Check, Crown, Lock, Calendar, MapPin, Wallet
} from "lucide-react";

const vendors = [
  {
    id: 1, name: "Glam by Priya", service: "Makeup Artist",
    price: "₹45,000", rating: "5.0",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    tag: "Top Rated"
  },
  {
    id: 2, name: "Lens & Love Studio", service: "Photography",
    price: "₹85,000", rating: "4.9",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80",
    tag: "Most Booked"
  },
  {
    id: 3, name: "Royal Blooms Decor", service: "Decoration",
    price: "₹1,20,000", rating: "4.8",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
    tag: "Premium"
  },
  {
    id: 4, name: "Grand Feast Caterers", service: "Catering",
    price: "₹1,80,000", rating: "4.7",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80",
    tag: "New"
  },
  {
    id: 5, name: "Beat Masters DJ", service: "Music & DJ",
    price: "₹60,000", rating: "4.6",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80",
    tag: "Popular"
  },
  {
    id: 6, name: "Dream Venues", service: "Venue",
    price: "₹5,00,000", rating: "4.9",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
    tag: "Luxury"
  },
];

const premiumBenefits = [
  { icon: "✦", text: "Unlock all live vendor offers" },
  { icon: "✦", text: "AI-powered wedding timeline" },
  { icon: "✦", text: "Priority vendor booking" },
  { icon: "✦", text: "Dedicated wedding coordinator" },
  { icon: "✦", text: "Exclusive Power Pair deals" },
  { icon: "✦", text: "Budget tracking & alerts" },
];

export default function CoupleDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [loveCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const isPremium = user?.premium || false;

  const inviteUrl = `https://vivaha.app/join?code=${loveCode}`;
  const inviteMessage = `💍 Hey! I'm planning our wedding on Vivaha. Join me using our Love Code: ${loveCode} or click here: ${inviteUrl}`;

  const copyCode = () => {
    navigator.clipboard.writeText(loveCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(inviteMessage);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const navItems = [
    { icon: <Home size={20} strokeWidth={1.5} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} strokeWidth={1.5} />, label: "Package", path: "/package" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#3E0014", padding: "18px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0
      }}>
        <button onClick={() => setMenuOpen(true)} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "8px", borderRadius: 10
        }}>
          <Menu size={20} strokeWidth={1.5} />
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#FFFFFF", fontSize: 26 }}>
          Vivaha
        </h1>
        <button onClick={() => navigate("/messages")} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "8px", borderRadius: 10
        }}>
          <MessageCircle size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Hamburger Menu */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", zIndex: 998 }} />
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
              <div onClick={() => { setUser(null); navigate("/"); }} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 16px", borderRadius: 14, cursor: "pointer", color: "#E77291", fontSize: 15
              }}>
                <LogOut size={20} strokeWidth={1.5} /> Logout
              </div>
            </div>
          </div>
        </>
      )}

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Hero Wedding Card */}
        <div style={{
          background: "linear-gradient(160deg, #3E0014 0%, #7A002B 60%, #AC1634 100%)",
          padding: "28px 20px 36px", position: "relative", overflow: "hidden"
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(231,114,145,0.06)" }} />
          <div style={{ position: "absolute", bottom: -30, right: 30, width: 120, height: 120, borderRadius: "50%", background: "rgba(231,114,145,0.04)" }} />

          <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 3, fontWeight: 600, marginBottom: 6 }}>YOUR WEDDING</p>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 28, marginBottom: 20, lineHeight: 1.2 }}>
            Welcome,<br />{user?.name || "Guest"} 💍
          </h2>

          {/* Info Pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              [<Calendar size={14} />, "Wedding Date", "Not set yet"],
              [<MapPin size={14} />, "City", "Not set yet"],
              [<Wallet size={14} />, "Budget", "Not set yet"],
            ].map(([icon, label, val]) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "10px 14px",
                border: "1px solid rgba(255,255,255,0.08)"
              }}>
                <span style={{ color: "#E77291" }}>{icon}</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, flex: 1 }}>{label}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Invite Fiancé Button */}
          <button onClick={() => setInviteOpen(true)} style={{
            width: "100%", padding: "12px",
            background: "rgba(231,114,145,0.15)",
            border: "1.5px dashed #E77291",
            color: "#E77291", borderRadius: 14,
            fontSize: 14, cursor: "pointer", fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.2s"
          }}>
            💌 Invite your Fiancé to plan together
          </button>
        </div>

        <div style={{ padding: "20px 16px" }}>

          {/* Live Vendor Offers */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 20 }}>
                Live Vendor Offers
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {!isPremium && (
                  <span style={{ background: "#FDF0F3", border: "1px solid #F5D0DA", color: "#AC1634", fontSize: 10, padding: "3px 8px", borderRadius: 99, fontWeight: 600 }}>
                    UNLOCK WITH PREMIUM
                  </span>
                )}
                <span style={{ background: "#AC1634", color: "white", fontSize: 10, padding: "3px 10px", borderRadius: 99, fontWeight: 600, letterSpacing: 1 }}>LIVE</span>
              </div>
            </div>

            {/* Vendor Tiles Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {vendors.map((v, i) => (
                <div key={v.id} style={{
                  background: "white", borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(62,0,20,0.08)",
                  border: "1px solid #F5D0DA",
                  position: "relative",
                  filter: !isPremium && i > 1 ? "blur(4px)" : "none",
                  cursor: !isPremium && i > 1 ? "not-allowed" : "pointer",
                  transition: "transform 0.2s"
                }}
                  onClick={() => !isPremium && i > 1 ? navigate("/premium") : navigate("/package")}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: 100 }}>
                    <img src={v.image} alt={v.service} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,0,20,0.6), transparent)" }} />
                    <span style={{
                      position: "absolute", top: 8, left: 8,
                      background: "rgba(62,0,20,0.8)", color: "#E77291",
                      fontSize: 9, padding: "3px 8px", borderRadius: 99, fontWeight: 600
                    }}>{v.tag}</span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "10px 12px 12px" }}>
                    <p style={{ fontWeight: 600, color: "#3E0014", fontSize: 13, marginBottom: 2 }}>{v.name}</p>
                    <p style={{ color: "#7A5560", fontSize: 11, marginBottom: 6 }}>{v.service}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ color: "#AC1634", fontWeight: 700, fontSize: 13 }}>{v.price}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Star size={10} fill="#E77291" color="#E77291" />
                        <p style={{ color: "#3E0014", fontWeight: 600, fontSize: 11 }}>{v.rating}</p>
                      </div>
                    </div>
                  </div>

                  {/* Lock overlay for non-premium */}
                  {!isPremium && i > 1 && (
                    <div style={{
                      position: "absolute", inset: 0, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: "rgba(255,255,255,0.1)"
                    }}>
                      <Lock size={22} color="#AC1634" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isPremium && (
              <button onClick={() => navigate("/premium")} style={{
                width: "100%", marginTop: 14, padding: "12px",
                background: "linear-gradient(135deg, #AC1634, #3E0014)",
                color: "white", border: "none", borderRadius: 999,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}>
                <Crown size={15} strokeWidth={1.5} /> Unlock All Vendors with Premium
              </button>
            )}
          </div>

          {/* Premium Card */}
          {!isPremium && (
            <div style={{
              background: "linear-gradient(160deg, #3E0014, #7A002B)",
              borderRadius: 24, padding: "24px",
              boxShadow: "0 8px 32px rgba(62,0,20,0.3)",
              marginBottom: 20, position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(231,114,145,0.06)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Crown size={16} color="#E77291" strokeWidth={1.5} />
                <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>VIVAHA PREMIUM</p>
              </div>

              <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 22, marginBottom: 16, lineHeight: 1.3 }}>
                Your complete wedding concierge experience
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {premiumBenefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#E77291", fontSize: 10 }}>{b.icon}</span>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 300 }}>{b.text}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 2 }}>One-time plan</p>
                  <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 28 }}>₹10,000</p>
                </div>
                <button onClick={() => navigate("/premium")} style={{
                  padding: "12px 24px", background: "#E77291",
                  color: "white", border: "none", borderRadius: 999,
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(231,114,145,0.4)"
                }}>
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Invite Fiancé Modal */}
      {inviteOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "flex-end", zIndex: 999 }}>
          <div style={{
            background: "white", width: "100%", maxWidth: 430, margin: "0 auto",
            borderRadius: "28px 28px 0 0", padding: "28px 20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 22 }}>
                Invite your Fiancé 💍
              </h3>
              <button onClick={() => setInviteOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#AC1634", display: "flex" }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <p style={{ color: "#7A5560", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
              Share your unique Love Code or invite link so your fiancé can join and plan together with you!
            </p>

            {/* Love Code */}
            <div style={{ background: "#FDF0F3", border: "1.5px solid #F5D0DA", borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
              <p style={{ color: "#AC1634", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>YOUR LOVE CODE</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 32, letterSpacing: 6 }}>{loveCode}</p>
                <button onClick={copyCode} style={{
                  background: codeCopied ? "#3E0014" : "white",
                  border: "1.5px solid #F5D0DA", borderRadius: 12,
                  padding: "8px 14px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  color: codeCopied ? "white" : "#AC1634", fontSize: 13, fontWeight: 600,
                  transition: "all 0.2s"
                }}>
                  {codeCopied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.5} />}
                  {codeCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Copy invite message */}
            <button onClick={copyUrl} style={{
              width: "100%", padding: "14px",
              background: urlCopied ? "#3E0014" : "linear-gradient(135deg, #AC1634, #3E0014)",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s", marginBottom: 10
            }}>
              {urlCopied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.5} />}
              {urlCopied ? "Message Copied! Send it to your Fiancé" : "Copy Invite Message"}
            </button>

            <p style={{ color: "#7A5560", fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
              Your fiancé can enter this code at vivaha.app/join to connect with your wedding plan
            </p>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {navItems.map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 4, background: "none", border: "none", cursor: "pointer",
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