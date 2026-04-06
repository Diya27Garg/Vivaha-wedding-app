import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [tab, setTab] = useState("bookings");

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "vendors", auth.currentUser.uid));
      if (snap.exists()) setVendor(snap.data());
    };
    load();
  }, []);

  const bookings = [
    { couple: "Priya & Rahul", date: "15 Dec 2025", city: "Delhi", status: "pending" },
    { couple: "Meera & Karan", date: "22 Jan 2026", city: "Mumbai", status: "accepted" },
    { couple: "Ananya & Rohit", date: "8 Feb 2026", city: "Jaipur", status: "pending" },
  ];

  const logout = async () => { await signOut(auth); navigate("/"); };

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0", paddingBottom: 40 }}>
      <div style={{
        background: "linear-gradient(135deg, #800020, #5a0015)",
        padding: "20px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#C9A84C", fontSize: 22 }}>Vivaha Vendor</h1>
          <button onClick={logout} style={{ background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "6px 14px", borderRadius: 999, cursor: "pointer", fontSize: 13 }}>Logout</button>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ color: "#e2c97e", fontSize: 13 }}>Welcome back,</p>
          <p style={{ color: "white", fontFamily: "Georgia, serif", fontSize: 20, marginTop: 2 }}>{vendor?.companyName || "Your Business"}</p>
          <p style={{ color: "#C9A84C", fontSize: 13, marginTop: 4 }}>📍 {vendor?.city} · {vendor?.services?.join(", ")}</p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {[["3", "Pending"], ["12", "Bookings"], ["4.8⭐", "Rating"]].map(([val, label]) => (
            <div key={label} style={{
              flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 16,
              padding: "14px", textAlign: "center", border: "1px solid rgba(201,168,76,0.2)"
            }}>
              <p style={{ color: "white", fontWeight: 700, fontSize: 20, fontFamily: "Georgia, serif" }}>{val}</p>
              <p style={{ color: "#e2c97e", fontSize: 12, marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "white", borderBottom: "2px solid #f0e8d8" }}>
        {["bookings", "services", "messages", "reviews"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "14px 4px", border: "none", background: "none",
            color: tab === t ? "#800020" : "#6b6b6b",
            fontWeight: tab === t ? 700 : 500, fontSize: 13, cursor: "pointer",
            borderBottom: tab === t ? "2px solid #800020" : "none",
            textTransform: "capitalize"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "20px 16px", maxWidth: 480, margin: "0 auto" }}>
        {tab === "bookings" && (
          <div>
            {bookings.map((b, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 16, padding: "16px",
                marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, fontFamily: "Georgia, serif" }}>{b.couple}</p>
                    <p style={{ color: "#6b6b6b", fontSize: 13, marginTop: 4 }}>📅 {b.date} · 📍 {b.city}</p>
                  </div>
                  <span style={{
                    padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                    background: b.status === "accepted" ? "#e8f5e9" : "#fff8e7",
                    color: b.status === "accepted" ? "#2e7d32" : "#e65100"
                  }}>{b.status}</span>
                </div>
                {b.status === "pending" && (
                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button style={{
                      flex: 1, padding: "10px", background: "#800020", color: "white",
                      border: "none", borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: "pointer"
                    }}>✓ Accept</button>
                    <button style={{
                      flex: 1, padding: "10px", background: "#f5f0dc", color: "#800020",
                      border: "none", borderRadius: 999, fontWeight: 700, fontSize: 13, cursor: "pointer"
                    }}>✕ Decline</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "services" && (
          <div style={{ background: "white", borderRadius: 20, padding: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily: "Georgia, serif", color: "#800020", fontSize: 18, marginBottom: 16 }}>Your Services</p>
            {vendor?.services?.map(s => (
              <div key={s} style={{ padding: "12px 0", borderBottom: "1px solid #f0e8d8", display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#1a1a1a", fontWeight: 500 }}>{s}</p>
                <button style={{ background: "none", border: "none", color: "#C9A84C", cursor: "pointer", fontWeight: 600 }}>Edit</button>
              </div>
            ))}
            <button style={{
              marginTop: 16, width: "100%", padding: "12px", background: "#800020",
              color: "white", border: "none", borderRadius: 999, fontWeight: 700, cursor: "pointer"
            }}>+ Add Service</button>
          </div>
        )}

        {tab === "messages" && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
            <p style={{ fontFamily: "Georgia, serif", color: "#800020", fontSize: 18 }}>Messages</p>
            <p style={{ color: "#6b6b6b", fontSize: 14, marginTop: 8 }}>Your chats with couples will appear here</p>
          </div>
        )}

        {tab === "reviews" && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
            <p style={{ fontFamily: "Georgia, serif", color: "#800020", fontSize: 18 }}>Reviews</p>
            <p style={{ color: "#6b6b6b", fontSize: 14, marginTop: 8 }}>Ratings from couples will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}