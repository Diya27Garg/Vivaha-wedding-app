import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0" }}>
      <div style={{ background: "linear-gradient(135deg, #800020, #5a0015)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#C9A84C", fontSize: 20 }}>Admin Panel</h1>
        <button onClick={async () => { await signOut(auth); navigate("/"); }} style={{ background: "none", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", padding: "6px 12px", borderRadius: 999, cursor: "pointer", fontSize: 12 }}>Logout</button>
      </div>
      <div style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛠️</div>
        <p style={{ fontFamily: "Georgia, serif", color: "#800020", fontSize: 22 }}>Admin Dashboard</p>
        <p style={{ color: "#6b6b6b", marginTop: 8 }}>Manage users, vendors and bookings</p>
      </div>
    </div>
  );
}