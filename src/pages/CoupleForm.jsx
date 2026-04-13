import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CoupleForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "",
    address: "", city: "", state: "", zip: "",
    weddingDate: "", weddingCityDecided: "",
    weddingCity: "", weddingZip: "", budget: ""
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    border: "1.5px solid rgba(231,114,145,0.25)",
    borderRadius: 14, fontSize: 15, outline: "none",
    background: "rgba(255,255,255,0.06)",
    color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box"
  };

  const labelStyle = {
    fontSize: 11, color: "#E77291", fontWeight: 600,
    letterSpacing: 1.5, marginBottom: 6, display: "block"
  };

  const submit = async () => {
  setLoading(true);
  try {
    // If no Firebase auth user, just navigate directly (demo mode)
    if (!auth.currentUser) {
      navigate("/home");
      return;
    }
    await setDoc(doc(db, "couples", auth.currentUser.uid), {
      ...form, uid: auth.currentUser.uid, createdAt: new Date()
    });
    navigate("/home");
  } catch (e) { alert(e.message); }
  setLoading(false);
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #3E0014 0%, #1a0008 100%)",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column",
      overflowY: "auto"
    }}>

      {/* Header */}
      <div style={{ padding: "48px 24px 24px", textAlign: "center" }}>
        <p style={{
          color: "#E77291", fontSize: 11,
          letterSpacing: 4, fontWeight: 600, marginBottom: 8
        }}>STEP {step} OF 2</p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic", color: "#FFFFFF",
          fontSize: 30, marginBottom: 8
        }}>
          {step === 1 ? "Tell us about you" : "Your Wedding Details"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
          {step === 1
            ? "We'll personalise your experience"
            : "Help us understand your big day"}
        </p>

        {/* Progress bar */}
        <div style={{
          display: "flex", gap: 8, marginTop: 24,
          justifyContent: "center"
        }}>
          {[1, 2].map(i => (
            <div key={i} style={{
              height: 4, borderRadius: 99,
              width: i === step ? 48 : 24,
              background: i <= step
                ? "linear-gradient(90deg, #E77291, #AC1634)"
                : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease"
            }} />
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div style={{
        flex: 1, margin: "0 16px 32px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(231,114,145,0.15)",
        borderRadius: 28, padding: "28px 20px",
        backdropFilter: "blur(10px)",
        overflowY: "auto"
      }}>

        {/* ── STEP 1 — Personal Details ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>FIRST NAME</label>
                <input style={inputStyle} placeholder="Priya"
                  value={form.firstName}
                  onChange={e => update("firstName", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>LAST NAME</label>
                <input style={inputStyle} placeholder="Sharma"
                  value={form.lastName}
                  onChange={e => update("lastName", e.target.value)} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>DATE OF BIRTH</label>
              <input
                style={{ ...inputStyle, colorScheme: "dark" }}
                type="date" value={form.dob}
                onChange={e => update("dob", e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>ADDRESS</label>
              <input style={inputStyle} placeholder="123, MG Road"
                value={form.address}
                onChange={e => update("address", e.target.value)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>CITY</label>
                <input style={inputStyle} placeholder="Delhi"
                  value={form.city}
                  onChange={e => update("city", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>STATE</label>
                <input style={inputStyle} placeholder="Delhi"
                  value={form.state}
                  onChange={e => update("state", e.target.value)} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>ZIP CODE</label>
              <input style={inputStyle} placeholder="110001"
                value={form.zip}
                onChange={e => update("zip", e.target.value)} />
            </div>

            <button onClick={() => setStep(2)} style={{
              marginTop: 8, padding: "16px",
              background: "linear-gradient(135deg, #AC1634, #3E0014)",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 15, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(172,22,52,0.35)",
              fontFamily: "'DM Sans', sans-serif"
            }}>Continue →</button>
          </div>
        )}

        {/* ── STEP 2 — Wedding Details ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            <div>
              <label style={labelStyle}>DATE OF MARRIAGE</label>
              <input
                style={{ ...inputStyle, colorScheme: "dark" }}
                type="date" value={form.weddingDate}
                onChange={e => update("weddingDate", e.target.value)} />
            </div>

            {/* Wedding city decision */}
            <div>
              <label style={labelStyle}>IS THE WEDDING CITY DECIDED?</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Yes", "No"].map(v => (
                  <button key={v}
                    onClick={() => update("weddingCityDecided", v)}
                    style={{
                      flex: 1, padding: "13px",
                      border: `1.5px solid ${form.weddingCityDecided === v
                        ? "#E77291" : "rgba(231,114,145,0.2)"}`,
                      borderRadius: 14,
                      background: form.weddingCityDecided === v
                        ? "rgba(231,114,145,0.15)" : "transparent",
                      color: form.weddingCityDecided === v
                        ? "#E77291" : "rgba(255,255,255,0.5)",
                      fontWeight: 600, fontSize: 14,
                      cursor: "pointer", transition: "all 0.2s",
                      fontFamily: "'DM Sans', sans-serif"
                    }}>{v}</button>
                ))}
              </div>
            </div>

            {/* Conditional city fields */}
            {form.weddingCityDecided === "Yes" && (
              <div style={{
                display: "flex", flexDirection: "column", gap: 14,
                padding: "16px",
                background: "rgba(231,114,145,0.06)",
                border: "1px solid rgba(231,114,145,0.15)",
                borderRadius: 16
              }}>
                <div>
                  <label style={labelStyle}>WEDDING CITY</label>
                  <input style={inputStyle} placeholder="Jaipur"
                    value={form.weddingCity}
                    onChange={e => update("weddingCity", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>WEDDING CITY ZIP CODE</label>
                  <input style={inputStyle} placeholder="302001"
                    value={form.weddingZip}
                    onChange={e => update("weddingZip", e.target.value)} />
                </div>
              </div>
            )}

            {/* Budget */}
            <div>
              <label style={labelStyle}>WEDDING BUDGET</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["₹10L – ₹15L", "₹15L – ₹20L", "₹20L – ₹25L", "₹25L – ₹30L", "₹30L+"].map(b => (
                  <button key={b}
                    onClick={() => update("budget", b)}
                    style={{
                      padding: "13px 16px", textAlign: "left",
                      border: `1.5px solid ${form.budget === b
                        ? "#E77291" : "rgba(231,114,145,0.2)"}`,
                      borderRadius: 14,
                      background: form.budget === b
                        ? "rgba(231,114,145,0.12)" : "transparent",
                      color: form.budget === b
                        ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      fontWeight: form.budget === b ? 600 : 400,
                      fontSize: 14, cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                    {b}
                    {form.budget === b && (
                      <span style={{ color: "#E77291" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: "16px",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999, fontSize: 15,
                fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif"
              }}>← Back</button>

              <button onClick={submit} disabled={loading} style={{
                flex: 2, padding: "16px",
                background: loading
                  ? "rgba(172,22,52,0.4)"
                  : "linear-gradient(135deg, #AC1634, #3E0014)",
                color: "white", border: "none", borderRadius: 999,
                fontSize: 15, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: loading ? "none" : "0 8px 24px rgba(172,22,52,0.35)"
              }}>
                {loading ? "Saving..." : "Let's Plan! 💍"}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
