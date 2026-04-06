import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CoupleForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "",
    address: "", city: "", state: "", zip: "",
    weddingDate: "", weddingCity: "", weddingZip: "",
    budget: "", venueFinalized: ""
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    padding: "13px 16px", border: "1.5px solid #e0d5c0",
    borderRadius: 12, fontSize: 15, outline: "none",
    background: "#fafafa", width: "100%", fontFamily: "Inter, sans-serif"
  };

  const labelStyle = { fontSize: 12, color: "#800020", fontWeight: 600, marginBottom: 4, display: "block", letterSpacing: 0.5 };

  const submit = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "couples", auth.currentUser.uid), {
        ...form, uid: auth.currentUser.uid, createdAt: new Date()
      });
      navigate("/home");
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFF0", padding: "24px 16px" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#800020" }}>Tell us about you 💍</h1>
          <p style={{ color: "#6b6b6b", fontSize: 14, marginTop: 6 }}>Step {step} of 2</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            {[1,2].map(i => (
              <div key={i} style={{ height: 4, width: 60, borderRadius: 99, background: i <= step ? "#800020" : "#e0d5c0" }}/>
            ))}
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>FIRST NAME</label>
                  <input style={inputStyle} placeholder="Priya" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>LAST NAME</label>
                  <input style={inputStyle} placeholder="Sharma" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>DATE OF BIRTH</label>
                <input style={inputStyle} type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>ADDRESS</label>
                <input style={inputStyle} placeholder="123, MG Road" value={form.address} onChange={e => update("address", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>CITY</label>
                  <input style={inputStyle} placeholder="Delhi" value={form.city} onChange={e => update("city", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>STATE</label>
                  <input style={inputStyle} placeholder="Delhi" value={form.state} onChange={e => update("state", e.target.value)} />
                </div>
              </div>
              <button onClick={() => setStep(2)} style={{
                padding: "14px", background: "#800020", color: "white",
                border: "none", borderRadius: 999, fontSize: 15,
                fontWeight: 700, cursor: "pointer", marginTop: 8
              }}>Next →</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>WEDDING DATE</label>
                <input style={inputStyle} type="date" value={form.weddingDate} onChange={e => update("weddingDate", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>WEDDING CITY</label>
                <input style={inputStyle} placeholder="Jaipur" value={form.weddingCity} onChange={e => update("weddingCity", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>BUDGET</label>
                <select style={inputStyle} value={form.budget} onChange={e => update("budget", e.target.value)}>
                  <option value="">Select budget range</option>
                  <option>₹10L – ₹15L</option>
                  <option>₹15L – ₹20L</option>
                  <option>₹20L – ₹25L</option>
                  <option>₹25L – ₹30L</option>
                  <option>₹30L+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>VENUE FINALIZED?</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Yes", "No", "In Discussion"].map(v => (
                    <button key={v} onClick={() => update("venueFinalized", v)} style={{
                      flex: 1, padding: "10px", border: `2px solid ${form.venueFinalized === v ? "#800020" : "#e0d5c0"}`,
                      borderRadius: 12, background: form.venueFinalized === v ? "#800020" : "white",
                      color: form.venueFinalized === v ? "white" : "#6b6b6b",
                      fontWeight: 600, fontSize: 13, cursor: "pointer"
                    }}>{v}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={{
                  flex: 1, padding: "14px", background: "#f5f0dc", color: "#800020",
                  border: "none", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}>← Back</button>
                <button onClick={submit} disabled={loading} style={{
                  flex: 2, padding: "14px", background: loading ? "#ccc" : "#800020",
                  color: "white", border: "none", borderRadius: 999,
                  fontSize: 15, fontWeight: 700, cursor: "pointer"
                }}>{loading ? "Saving..." : "Let's Plan! 💍"}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}