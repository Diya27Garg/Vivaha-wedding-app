import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Palette, Sparkles, Leaf, Star, Sun, Moon, Flower, Check } from "lucide-react";

export default function CoupleForm({ setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [consentGiven, setConsentGiven] = useState({
    religion: false,
    caste: false
  });
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    spouseName: "",
    religion: "",
    caste: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    weddingDateDecided: false,
    weddingDate: "",
    probableMonth: "",
    weddingDestination: "",
    weddingCity: "",
    weddingState: "",
    weddingStyles: [],
    budget: ""
  });

  const religions = ["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain", "Other"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const weddingStyles = [
    { id: "traditional", name: "Traditional", icon: Star, color: "#AC1634", description: "Rich colors, rituals, and grandeur" },
    { id: "minimal", name: "Minimal", icon: Sparkles, color: "#7A002B", description: "Clean lines, neutral tones, simplicity" },
    { id: "sustainable", name: "Sustainable", icon: Leaf, color: "#2d6a4f", description: "Eco-friendly, zero waste, natural" },
    { id: "bohemian", name: "Bohemian", icon: Flower, color: "#d4a373", description: "Free-spirited, earthy, artistic" },
    { id: "luxury", name: "Luxury", icon: Sparkles, color: "#ffd700", description: "Opulent, premium, extravagant" },
    { id: "beach", name: "Beach", icon: Sun, color: "#48cae4", description: "Coastal, relaxed, breezy" },
    { id: "garden", name: "Garden", icon: Flower, color: "#74c69d", description: "Floral, outdoor, romantic" },
    { id: "fusion", name: "Fusion", icon: Palette, color: "#9d4edd", description: "Mix of modern & traditional" }
  ];

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleStyle = (styleId) => {
    setForm(prev => {
      if (prev.weddingStyles.includes(styleId)) {
        return { ...prev, weddingStyles: prev.weddingStyles.filter(s => s !== styleId) };
      } else if (prev.weddingStyles.length < 4) {
        return { ...prev, weddingStyles: [...prev.weddingStyles, styleId] };
      }
      return prev;
    });
  };

  const finish = () => {
    setUser(u => ({ 
      ...u, 
      ...form, 
      consentGiven,
      fullName: `${form.firstName} ${form.lastName}`,
      onboarded: true 
    }));
    navigate("/home");
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

  const steps = ["Personal", "Wedding", "Style", "Budget"];

  return (
    <div style={{
      minHeight: "100vh", background: "#FDF0F3",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "#3E0014", padding: "20px 24px"
      }}>
        <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>
          STEP {step} OF {steps.length}
        </p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic", color: "white", fontSize: 24
        }}>
          {step === 1 ? "About the Couple" :
           step === 2 ? "Wedding Details" :
           step === 3 ? "Your Wedding Style" :
           "Budget & Finish"}
        </h1>
        <div style={{
          marginTop: 16, background: "rgba(255,255,255,0.15)",
          borderRadius: 99, height: 4, overflow: "hidden"
        }}>
          <div style={{
            width: `${(step / steps.length) * 100}%`, height: "100%",
            background: "#E77291", borderRadius: 99,
            transition: "width 0.4s ease"
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px" }}>
        {/* Step 1 - Personal Details */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              border: "1px solid #F5D0DA"
            }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", fontSize: 18, color: "#3E0014",
                marginBottom: 16, display: "flex", alignItems: "center", gap: 8
              }}>
                <Heart size={20} color="#AC1634" /> Your Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>FIRST NAME</label>
                  <input style={inputStyle} placeholder="Priya"
                    value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>LAST NAME</label>
                  <input style={inputStyle} placeholder="Sharma"
                    value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>SPOUSE/PARTNER NAME</label>
                <input style={inputStyle} placeholder="Rajesh Kumar"
                  value={form.spouseName} onChange={e => update("spouseName", e.target.value)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>PHONE NUMBER</label>
                <input style={inputStyle} type="tel" placeholder="+91 98765 43210"
                  value={form.phone} onChange={e => update("phone", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input style={inputStyle} type="email" placeholder="priya@example.com"
                  value={form.email} onChange={e => update("email", e.target.value)} />
              </div>
            </div>

            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              border: "1px solid #F5D0DA"
            }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", fontSize: 18, color: "#3E0014",
                marginBottom: 16
              }}>Religious & Cultural Details</h3>
              
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>RELIGION</label>
                <select style={inputStyle} value={form.religion}
                  onChange={e => update("religion", e.target.value)}>
                  <option value="">Select religion</option>
                  {religions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {form.religion && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <input type="checkbox" id="casteConsent" checked={consentGiven.caste}
                      onChange={(e) => setConsentGiven({ ...consentGiven, caste: e.target.checked })} />
                    <label htmlFor="casteConsent" style={{ fontSize: 13, color: "#666" }}>
                      I consent to share my caste information for better vendor matching
                    </label>
                  </div>
                  {consentGiven.caste && (
                    <input style={inputStyle} placeholder="Caste (optional)"
                      value={form.caste} onChange={e => update("caste", e.target.value)} />
                  )}
                </div>
              )}
            </div>

            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              border: "1px solid #F5D0DA"
            }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", fontSize: 18, color: "#3E0014",
                marginBottom: 16
              }}>Address</h3>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>ADDRESS</label>
                <input style={inputStyle} placeholder="123, MG Road"
                  value={form.address} onChange={e => update("address", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>CITY</label>
                  <input style={inputStyle} placeholder="Delhi"
                    value={form.city} onChange={e => update("city", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>STATE</label>
                  <input style={inputStyle} placeholder="Delhi"
                    value={form.state} onChange={e => update("state", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>ZIP CODE</label>
                <input style={inputStyle} placeholder="110001"
                  value={form.zipCode} onChange={e => update("zipCode", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 - Wedding Details */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              border: "1px solid #F5D0DA"
            }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", fontSize: 18, color: "#3E0014",
                marginBottom: 16, display: "flex", alignItems: "center", gap: 8
              }}>
                <Calendar size={20} color="#AC1634" /> Wedding Timeline
              </h3>
              
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>IS YOUR WEDDING DATE DECIDED?</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {[true, false].map(v => (
                    <button key={v} onClick={() => update("weddingDateDecided", v)} style={{
                      flex: 1, padding: "12px",
                      border: `2px solid ${form.weddingDateDecided === v ? "#3E0014" : "#F5D0DA"}`,
                      borderRadius: 14, background: form.weddingDateDecided === v ? "#3E0014" : "white",
                      color: form.weddingDateDecided === v ? "white" : "#7A5560",
                      fontWeight: 600, fontSize: 14, cursor: "pointer"
                    }}>{v ? "Yes, Date Fixed" : "Not Yet"}</button>
                  ))}
                </div>
              </div>

              {form.weddingDateDecided ? (
                <div>
                  <label style={labelStyle}>WEDDING DATE</label>
                  <input style={inputStyle} type="date"
                    value={form.weddingDate} onChange={e => update("weddingDate", e.target.value)} />
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>PROBABLE MONTH</label>
                  <select style={inputStyle} value={form.probableMonth}
                    onChange={e => update("probableMonth", e.target.value)}>
                    <option value="">Select month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              border: "1px solid #F5D0DA"
            }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", fontSize: 18, color: "#3E0014",
                marginBottom: 16, display: "flex", alignItems: "center", gap: 8
              }}>
                <MapPin size={20} color="#AC1634" /> Wedding Location
              </h3>
              
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>IS THIS A DESTINATION WEDDING?</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["yes", "no"].map(v => (
                    <button key={v} onClick={() => update("weddingDestination", v)} style={{
                      flex: 1, padding: "12px",
                      border: `2px solid ${form.weddingDestination === v ? "#3E0014" : "#F5D0DA"}`,
                      borderRadius: 14, background: form.weddingDestination === v ? "#3E0014" : "white",
                      color: form.weddingDestination === v ? "white" : "#7A5560",
                      fontWeight: 600, fontSize: 14, cursor: "pointer"
                    }}>{v === "yes" ? "Yes ✈️" : "No 🏠"}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>WEDDING CITY</label>
                <input style={inputStyle} placeholder="Jaipur / Udaipur / Goa"
                  value={form.weddingCity} onChange={e => update("weddingCity", e.target.value)} />
              </div>
              
              <div>
                <label style={labelStyle}>WEDDING STATE</label>
                <input style={inputStyle} placeholder="Rajasthan"
                  value={form.weddingState} onChange={e => update("weddingState", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Wedding Style */}
        {step === 3 && (
          <div style={{
            background: "white", borderRadius: 20, padding: 20,
            border: "1px solid #F5D0DA"
          }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic", fontSize: 20, color: "#3E0014",
              marginBottom: 8, display: "flex", alignItems: "center", gap: 8
            }}>
              <Palette size={24} color="#AC1634" /> Choose Your Wedding Style
            </h3>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
              Select up to 4 styles that best describe your dream wedding
            </p>
            <p style={{ fontSize: 12, color: "#AC1634", marginBottom: 16, fontWeight: 600 }}>
              Selected: {form.weddingStyles.length}/4
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16
            }}>
              {weddingStyles.map(style => {
                const IconComponent = style.icon;
                const isSelected = form.weddingStyles.includes(style.id);
                return (
                  <button
                    key={style.id}
                    onClick={() => toggleStyle(style.id)}
                    style={{
                      padding: "20px 16px",
                      background: isSelected ? "#3E0014" : "white",
                      border: `2px solid ${isSelected ? "#AC1634" : "#F5D0DA"}`,
                      borderRadius: 20,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "center",
                      position: "relative"
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: "absolute", top: 12, right: 12,
                        width: 24, height: 24, borderRadius: "50%",
                        background: "#E77291", display: "flex",
                        alignItems: "center", justifyContent: "center"
                      }}>
                        <Check size={14} color="white" />
                      </div>
                    )}
                    <IconComponent size={40} color={isSelected ? "#E77291" : style.color} style={{ marginBottom: 12 }} />
                    <h4 style={{
                      fontSize: 16, fontWeight: 700, marginBottom: 6,
                      color: isSelected ? "white" : "#3E0014"
                    }}>{style.name}</h4>
                    <p style={{
                      fontSize: 11, color: isSelected ? "rgba(255,255,255,0.7)" : "#999",
                      lineHeight: 1.4
                    }}>{style.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4 - Budget */}
        {step === 4 && (
          <div style={{
            background: "white", borderRadius: 20, padding: 20,
            border: "1px solid #F5D0DA"
          }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic", fontSize: 20, color: "#3E0014",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 8
            }}>
              <Heart size={24} color="#AC1634" /> Set Your Wedding Budget
            </h3>

            {["₹10L – ₹15L", "₹15L – ₹20L", "₹20L – ₹25L", "₹25L – ₹30L", "₹30L – ₹40L", "₹40L+"].map(b => (
              <div key={b} onClick={() => update("budget", b)} style={{
                padding: "18px 20px", marginBottom: 12,
                border: `2px solid ${form.budget === b ? "#3E0014" : "#F5D0DA"}`,
                borderRadius: 16, cursor: "pointer",
                background: form.budget === b ? "#3E0014" : "white",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <p style={{
                  fontWeight: 600, fontSize: 16,
                  color: form.budget === b ? "white" : "#1A1A1A"
                }}>{b}</p>
                {form.budget === b && (
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "#E77291",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: 14, fontWeight: 700
                  }}>✓</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div style={{
        padding: "20px", background: "white",
        borderTop: "1px solid #F5D0DA",
        display: "flex", gap: 12
      }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            flex: 1, padding: "15px", background: "#FDF0F3",
            color: "#AC1634", border: "1px solid #F5D0DA",
            borderRadius: 999, fontWeight: 600, fontSize: 15, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <ChevronLeft size={18} /> Back
          </button>
        )}
        <button onClick={() => step < steps.length ? setStep(s => s + 1) : finish()} style={{
          flex: 2, padding: "15px", background: "#3E0014",
          color: "white", border: "none", borderRadius: 999,
          fontWeight: 600, fontSize: 15, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6
        }}>
          {step < steps.length ? "Continue →" : "Start Planning 💍"} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}