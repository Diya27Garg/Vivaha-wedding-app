import { useState } from "react";
import { useNavigate } from "react-router-dom";

const servicesList = [
  "Photographer", "Videographer", "Makeup Artist",
  "Decorator", "Caterer", "Wedding Planner",
  "Venue Provider", "DJ / Entertainment",
  "Bridal Wear", "Groom Wear", "Transportation", "Other"
];

export default function VendorOnboarding({ setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "", address: "", city: "", state: "", zip: "",
    services: [], powerPairName: "", powerPairService: "",
    gst: "", aadhaar: "", govId: "", businessProof: ""
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleService = (s) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter(x => x !== s)
        : [...f.services, s]
    }));
  };

  const finish = () => {
    setUser(u => ({ ...u, ...form, onboarded: true }));
    navigate("/vendor/dashboard");
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    border: "1.5px solid #F5D0DA", borderRadius: 14,
    fontSize: 15, outline: "none", background: "white",
    color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif"
  };

  const labelStyle = {
    fontSize: 11, color: "#AC1634", fontWeight: 700,
    letterSpacing: 1, marginBottom: 6, display: "block"
  };

  const stepTitles = [
    "Business info",
    "Your services",
    "Power pair",
    "Verification"
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#FDF0F3",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{ background: "#3E0014", padding: "20px 24px" }}>
        <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>
          STEP {step} OF 4
        </p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic", color: "white", fontSize: 24
        }}>{stepTitles[step - 1]}</h1>
        <div style={{
          marginTop: 16, background: "rgba(255,255,255,0.15)",
          borderRadius: 99, height: 4, overflow: "hidden"
        }}>
          <div style={{
            width: `${(step / 4) * 100}%`, height: "100%",
            background: "#E77291", borderRadius: 99,
            transition: "width 0.4s ease"
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px" }}>

        {/* Step 1 — Business Info */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>COMPANY NAME</label>
              <input style={inputStyle} placeholder="Lens & Love Studio"
                value={form.companyName} onChange={e => update("companyName", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>BUSINESS ADDRESS</label>
              <input style={inputStyle} placeholder="123, Park Street"
                value={form.address} onChange={e => update("address", e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>CITY</label>
                <input style={inputStyle} placeholder="Mumbai"
                  value={form.city} onChange={e => update("city", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>STATE</label>
                <input style={inputStyle} placeholder="Maharashtra"
                  value={form.state} onChange={e => update("state", e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>ZIP CODE</label>
              <input style={inputStyle} placeholder="400001"
                value={form.zip} onChange={e => update("zip", e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 2 — Services */}
        {step === 2 && (
          <div>
            <p style={{ color: "#7A5560", fontSize: 14, marginBottom: 20 }}>
              Select all services you offer
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {servicesList.map(s => (
                <button key={s} onClick={() => toggleService(s)} style={{
                  padding: "10px 18px", borderRadius: 999,
                  border: `2px solid ${form.services.includes(s) ? "#3E0014" : "#F5D0DA"}`,
                  background: form.services.includes(s) ? "#3E0014" : "white",
                  color: form.services.includes(s) ? "white" : "#7A5560",
                  fontWeight: 500, fontSize: 14, cursor: "pointer",
                  transition: "all 0.2s"
                }}>{s}</button>
              ))}
            </div>
            {form.services.length > 0 && (
              <div style={{
                marginTop: 24, background: "white",
                borderRadius: 16, padding: "16px",
                border: "1px solid #F5D0DA"
              }}>
                <p style={{ color: "#AC1634", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                  SELECTED ({form.services.length})
                </p>
                <p style={{ color: "#3E0014", fontSize: 14 }}>
                  {form.services.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Power Pair */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              background: "white", borderRadius: 20, padding: "20px",
              border: "1px solid #F5D0DA"
            }}>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#3E0014", fontSize: 18, marginBottom: 8
              }}>What is a Power Pair?</p>
              <p style={{ color: "#7A5560", fontSize: 14, lineHeight: 1.7 }}>
                Link with another vendor you frequently collaborate with.
                Together you become a Power Pair — featured prominently to couples.
              </p>
              <div style={{
                marginTop: 16, display: "flex", gap: 10,
                flexWrap: "wrap"
              }}>
                {["Photographer + Decorator", "Venue + Caterer", "Makeup + Mehendi"].map(ex => (
                  <span key={ex} style={{
                    background: "#FDF0F3", border: "1px solid #F5D0DA",
                    color: "#AC1634", fontSize: 12, padding: "5px 12px",
                    borderRadius: 99, fontWeight: 500
                  }}>{ex}</span>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>POWER PAIR VENDOR NAME (optional)</label>
              <input style={inputStyle} placeholder="e.g. Royal Blooms Decor"
                value={form.powerPairName} onChange={e => update("powerPairName", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>THEIR SERVICE</label>
              <input style={inputStyle} placeholder="e.g. Decorator"
                value={form.powerPairService} onChange={e => update("powerPairService", e.target.value)} />
            </div>

            <p style={{ color: "#7A5560", fontSize: 13, textAlign: "center" }}>
              You can skip this and add a Power Pair later from your dashboard
            </p>
          </div>
        )}

        {/* Step 4 — Verification */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "white", borderRadius: 16, padding: "16px",
              border: "1px solid #F5D0DA", marginBottom: 8
            }}>
              <p style={{ color: "#AC1634", fontSize: 13, fontWeight: 600 }}>
                🔒 Why verification?
              </p>
              <p style={{ color: "#7A5560", fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
                Verification builds trust with couples and gives you a verified badge on your profile.
              </p>
            </div>
            <div>
              <label style={labelStyle}>GST NUMBER</label>
              <input style={inputStyle} placeholder="22AAAAA0000A1Z5"
                value={form.gst} onChange={e => update("gst", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>AADHAAR NUMBER</label>
              <input style={inputStyle} placeholder="XXXX XXXX XXXX"
                value={form.aadhaar} onChange={e => update("aadhaar", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>GOVERNMENT ID TYPE</label>
              <select style={inputStyle}
                value={form.govId} onChange={e => update("govId", e.target.value)}>
                <option value="">Select ID type</option>
                <option>PAN Card</option>
                <option>Passport</option>
                <option>Voter ID</option>
                <option>Driving License</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>BUSINESS PROOF</label>
              <select style={inputStyle}
                value={form.businessProof} onChange={e => update("businessProof", e.target.value)}>
                <option value="">Select proof type</option>
                <option>GST Certificate</option>
                <option>Shop & Establishment Certificate</option>
                <option>MSME Registration</option>
                <option>Trade License</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "20px", background: "white",
        borderTop: "1px solid #F5D0DA",
        display: "flex", gap: 12
      }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            flex: 1, padding: "15px", background: "#FDF0F3",
            color: "#AC1634", border: "1px solid #F5D0DA",
            borderRadius: 999, fontWeight: 600, fontSize: 15, cursor: "pointer"
          }}>← Back</button>
        )}
        <button onClick={() => step < 4 ? setStep(s => s + 1) : finish()} style={{
          flex: 2, padding: "15px", background: "#3E0014",
          color: "white", border: "none", borderRadius: 999,
          fontWeight: 600, fontSize: 15, cursor: "pointer"
        }}>
          {step === 3 ? (form.powerPairName ? "Continue →" : "Skip for now →") :
           step < 4 ? "Continue →" : "Go to Dashboard →"}
        </button>
      </div>
    </div>
  );
}