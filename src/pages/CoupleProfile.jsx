import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ClipboardList, Sparkles, Package, User, LogOut, ChevronRight, Bell, Lock, HelpCircle } from "lucide-react";

export default function CoupleProfile({ setUser }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Priya", lastName: "Sharma",
    email: "priya@demo.com", phone: "+91 98765 43210",
    fianceName: "Rahul Mehta", weddingDate: "2025-12-15",
    weddingCity: "Jaipur", budget: "₹20L – ₹25L", venueFinalized: "In Discussion",
  });

  const navItems = [
    { icon: <Home size={20} strokeWidth={1.5} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} strokeWidth={1.5} />, label: "Package", path: "/package" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Profile", path: "/profile" },
  ];

  const logout = () => { setUser(null); navigate("/"); };

  const inputStyle = {
    width: "100%", padding: "11px 14px", border: "1.5px solid #F2D9A0",
    borderRadius: 12, fontSize: 14, outline: "none",
    background: editing ? "white" : "#fafafa", color: "#3B010B",
    fontFamily: "Jost, sans-serif"
  };
  const labelStyle = { fontSize: 11, color: "#75162D", fontWeight: 600, letterSpacing: 1, marginBottom: 4, display: "block" };

  const Field = ({ label, value, field, type = "text" }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} disabled={!editing}
        onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))} style={inputStyle} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      <div style={{
        background: "linear-gradient(135deg, #75162D, #3B010B)",
        padding: "16px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0
      }}>
        <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", color: "#F2D9A0", cursor: "pointer", display: "flex" }}>
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="app-name" style={{ color: "#F2D9A0", fontSize: 22 }}>My Profile</h1>
        <button onClick={() => setEditing(!editing)} style={{
          background: "none", border: "1px solid rgba(242,217,160,0.5)",
          color: "#F2D9A0", borderRadius: 999, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 500, fontFamily: "Jost, sans-serif"
        }}>{editing ? "Cancel" : "Edit"}</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>

        {/* Avatar Card */}
        <div style={{
          background: "linear-gradient(135deg, #75162D, #3B010B)",
          borderRadius: 24, padding: "28px 24px", marginBottom: 20,
          textAlign: "center", boxShadow: "0 8px 32px rgba(59,1,11,0.3)"
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", background: "#F2D9A0",
            margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 700, color: "#3B010B", fontFamily: "Cormorant Garamond, serif"
          }}>{profile.firstName[0]}{profile.lastName[0]}</div>
          <h2 className="app-name" style={{ color: "#F2E5C6", fontSize: 24 }}>
            {profile.firstName} & {profile.fianceName.split(" ")[0]}
          </h2>
          <p style={{ color: "#F2D9A0", fontSize: 13, marginTop: 6, fontWeight: 300 }}>
            {profile.weddingDate} · {profile.weddingCity}
          </p>
          <span style={{
            display: "inline-block", marginTop: 12,
            background: "rgba(242,217,160,0.15)", border: "1px solid #F2D9A0",
            color: "#F2D9A0", borderRadius: 999, padding: "4px 18px", fontSize: 11, fontWeight: 600, letterSpacing: 1
          }}>FREE PLAN</span>
        </div>

        {/* Personal Info */}
        <div style={{ background: "white", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 4px 16px rgba(59,1,11,0.06)" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#560B18", fontSize: 18, marginBottom: 16 }}>Personal Info</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="FIRST NAME" value={profile.firstName} field="firstName" />
              <Field label="LAST NAME" value={profile.lastName} field="lastName" />
            </div>
            <Field label="EMAIL" value={profile.email} field="email" type="email" />
            <Field label="PHONE" value={profile.phone} field="phone" />
          </div>
        </div>

        {/* Fiancé Info */}
        <div style={{ background: "white", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 4px 16px rgba(59,1,11,0.06)" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#560B18", fontSize: 18, marginBottom: 16 }}>Fiancé Info</p>
          <Field label="FIANCÉ NAME" value={profile.fianceName} field="fianceName" />
          <button style={{ width: "100%", padding: "11px", background: "#F2E5C6", border: "1px dashed #F2D9A0", borderRadius: 12, color: "#75162D", fontSize: 13, fontWeight: 500, cursor: "pointer", marginTop: 12, fontFamily: "Jost, sans-serif" }}>
            + Invite Fiancé via Email / Phone
          </button>
        </div>

        {/* Wedding Info */}
        <div style={{ background: "white", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 4px 16px rgba(59,1,11,0.06)" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#560B18", fontSize: 18, marginBottom: 16 }}>Wedding Info</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="WEDDING DATE" value={profile.weddingDate} field="weddingDate" type="date" />
            <Field label="WEDDING CITY" value={profile.weddingCity} field="weddingCity" />
            <div>
              <label style={labelStyle}>BUDGET</label>
              <select disabled={!editing} value={profile.budget}
                onChange={e => setProfile(p => ({ ...p, budget: e.target.value }))} style={inputStyle}>
                <option>₹10L – ₹15L</option>
                <option>₹15L – ₹20L</option>
                <option>₹20L – ₹25L</option>
                <option>₹25L – ₹30L</option>
                <option>₹30L+</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>VENUE FINALIZED?</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Yes", "No", "In Discussion"].map(v => (
                  <button key={v} disabled={!editing}
                    onClick={() => editing && setProfile(p => ({ ...p, venueFinalized: v }))}
                    style={{
                      flex: 1, padding: "10px 4px",
                      border: `1.5px solid ${profile.venueFinalized === v ? "#75162D" : "#F2D9A0"}`,
                      borderRadius: 12,
                      background: profile.venueFinalized === v ? "#75162D" : "white",
                      color: profile.venueFinalized === v ? "#F2E5C6" : "#75162D",
                      fontWeight: 500, fontSize: 12, cursor: editing ? "pointer" : "default",
                      fontFamily: "Jost, sans-serif"
                    }}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Data */}
        <div style={{ background: "white", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 4px 16px rgba(59,1,11,0.06)" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#560B18", fontSize: 18, marginBottom: 16 }}>Saved Data</p>
          {[
            [<Package size={18} strokeWidth={1.5} color="#75162D" />, "My Packages", "2 packages saved", "/package"],
            [<Sparkles size={18} strokeWidth={1.5} color="#75162D" />, "Inspiration Boards", "3 boards created", "/inspiration"],
            [<ClipboardList size={18} strokeWidth={1.5} color="#75162D" />, "Checklist", "8 tasks remaining", "/checklist"],
          ].map(([icon, label, sub, path]) => (
            <div key={label} onClick={() => navigate(path)} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 0", borderBottom: "1px solid #F2E5C6", cursor: "pointer"
            }}>
              {icon}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, color: "#3B010B", fontSize: 14 }}>{label}</p>
                <p style={{ color: "#75162D", fontSize: 12, marginTop: 2, fontWeight: 400 }}>{sub}</p>
              </div>
              <ChevronRight size={16} strokeWidth={1.5} color="#F2D9A0" />
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ background: "white", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 4px 16px rgba(59,1,11,0.06)" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#560B18", fontSize: 18, marginBottom: 16 }}>Settings</p>
          {[
            [<Bell size={18} strokeWidth={1.5} color="#75162D" />, "Notifications", "Manage alerts"],
            [<Lock size={18} strokeWidth={1.5} color="#75162D" />, "Privacy", "Data & security"],
            [<HelpCircle size={18} strokeWidth={1.5} color="#75162D" />, "Help & Support", "FAQs and contact"],
          ].map(([icon, label, sub]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #F2E5C6", cursor: "pointer" }}>
              {icon}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, color: "#3B010B", fontSize: 14 }}>{label}</p>
                <p style={{ color: "#75162D", fontSize: 12, marginTop: 2, fontWeight: 400 }}>{sub}</p>
              </div>
              <ChevronRight size={16} strokeWidth={1.5} color="#F2D9A0" />
            </div>
          ))}
        </div>

        {editing && (
          <button onClick={() => setEditing(false)} style={{
            width: "100%", padding: "14px", background: "#75162D", color: "#F2E5C6",
            border: "none", borderRadius: 999, fontSize: 15, fontWeight: 600,
            cursor: "pointer", marginBottom: 12, fontFamily: "Jost, sans-serif"
          }}>Save Changes</button>
        )}

        <button onClick={logout} style={{
          width: "100%", padding: "14px", background: "white",
          color: "#75162D", border: "1.5px solid #F2D9A0",
          borderRadius: 999, fontSize: 14, fontWeight: 600,
          cursor: "pointer", marginBottom: 8, fontFamily: "Jost, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          <LogOut size={16} strokeWidth={1.5} /> Logout
        </button>

      </div>

      <div className="bottom-nav">
        {navItems.map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 4, background: "none", border: "none", cursor: "pointer",
            color: window.location.pathname === n.path ? "#75162D" : "#999"
          }}>
            {n.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}