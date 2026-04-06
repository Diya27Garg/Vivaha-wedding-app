import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const servicesList = ["Photography", "Cinematography", "Decoration", "Catering", "Makeup", "Mehendi", "Music/DJ", "Venue", "Lighting", "Invitations"];

export default function VendorForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ companyName: "", services: [], gst: "", city: "" });
  const [loading, setLoading] = useState(false);

  const toggleService = (s) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s]
    }));
  };

  const submit = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "vendors", auth.currentUser.uid), {
        ...form, uid: auth.currentUser.uid, approved: false, createdAt: new Date()
      });
      navigate("/vendor/dashboard");
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  const inputStyle = {
    padding: "13px 16px", border: "1.5px solid #e0d5c0",
    borderRadius: 12, fontSize: 15, outline: "none",
    background: "#fafafa", width: "100%"
  };
  const labelStyle = { fontSize: 12, color: "#800020", fontWeight: 600, marginBottom: 4, display: "block", letterSpacing: 0.5 };

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0", padding: "24px 16px" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#800020" }}>Set up your business 🎨</h1>
          <p style={{ color: "#6b6b6b", fontSize: 14, marginTop: 6 }}>Tell couples what you offer</p>
        </div>
        <div style={{ background: "white", borderRadius: 24, padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>COMPANY NAME</label>
              <input style={inputStyle} placeholder="Lens & Love Studio" value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>YOUR CITY</label>
              <input style={inputStyle} placeholder="Mumbai" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>GST NUMBER</label>
              <input style={inputStyle} placeholder="22AAAAA0000A1Z5" value={form.gst} onChange={e => setForm(f => ({ ...f, gst: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>SERVICES YOU OFFER</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                {servicesList.map(s => (
                  <button key={s} onClick={() => toggleService(s)} style={{
                    padding: "8px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                    border: `2px solid ${form.services.includes(s) ? "#800020" : "#e0d5c0"}`,
                    background: form.services.includes(s) ? "#800020" : "white",
                    color: form.services.includes(s) ? "white" : "#6b6b6b",
                    fontWeight: 500, transition: "all 0.2s"
                  }}>{s}</button>
                ))}
              </div>
            </div>
            <button onClick={submit} disabled={loading} style={{
              padding: "14px", background: loading ? "#ccc" : "#C9A84C",
              color: "#1a1a1a", border: "none", borderRadius: 999,
              fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8
            }}>{loading ? "Setting up..." : "Start Receiving Bookings →"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}