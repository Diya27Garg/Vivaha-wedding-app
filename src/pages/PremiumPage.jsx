import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, Check } from "lucide-react";

export default function PremiumPage({ user, setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2500));
    setProcessing(false);
    setSuccess(true);
    setUser(u => ({ ...u, premium: true }));
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

  if (success) return (
    <div style={{
      minHeight: "100vh", background: "#3E0014",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", fontFamily: "'DM Sans', sans-serif",
      textAlign: "center"
    }}>
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        background: "rgba(231,114,145,0.2)",
        border: "2px solid #E77291",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24
      }}>
        <Check size={40} color="#E77291" strokeWidth={2} />
      </div>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
        color: "#FFFFFF", fontSize: 32, marginBottom: 12
      }}>Welcome to Premium!</h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 8, lineHeight: 1.7 }}>
        You now have full access to all vendors, AI planning, and priority support.
      </p>
      <div style={{
        background: "rgba(231,114,145,0.15)",
        border: "1px solid rgba(231,114,145,0.3)",
        borderRadius: 16, padding: "16px 28px", marginBottom: 36, marginTop: 8
      }}>
        <p style={{ color: "#E77291", fontSize: 13, fontWeight: 600 }}>
          ₹10,000 paid successfully ✓
        </p>
      </div>
      <button onClick={() => navigate("/home")} style={{
        padding: "15px 48px", background: "#E77291",
        color: "white", border: "none", borderRadius: 999,
        fontSize: 16, fontWeight: 700, cursor: "pointer"
      }}>Start Planning →</button>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#FDF0F3",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "#3E0014", padding: "20px",
        display: "flex", alignItems: "center", gap: 16, flexShrink: 0
      }}>
        <button onClick={() => navigate("/home")} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "8px", borderRadius: 10
        }}>
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <div>
          <p style={{ color: "#E77291", fontSize: 10, letterSpacing: 2, fontWeight: 700 }}>UPGRADE TO</p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
            color: "white", fontSize: 22
          }}>Vivaha Premium</h1>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>

        {step === 1 && (
          <>
            {/* Benefits Card */}
            <div style={{
              background: "#3E0014", borderRadius: 24,
              padding: "28px 24px", marginBottom: 20,
              boxShadow: "0 8px 32px rgba(62,0,20,0.25)"
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(231,114,145,0.2)", border: "1px solid rgba(231,114,145,0.4)",
                borderRadius: 99, padding: "5px 16px", marginBottom: 20
              }}>
                <Crown size={13} color="#E77291" />
                <p style={{ color: "#E77291", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>PREMIUM BENEFITS</p>
              </div>

              {[
                ["50+", "Verified wedding vendors"],
                ["AI", "Powered planning assistant"],
                ["∞", "Unlimited inspiration boards"],
                ["1:1", "Dedicated wedding coordinator"],
                ["⚡", "Priority vendor bookings"],
              ].map(([icon, text]) => (
                <div key={text} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.07)"
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(231,114,145,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#E77291", fontWeight: 700, fontSize: 13, flexShrink: 0
                  }}>{icon}</div>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>{text}</p>
                  <Check size={16} color="#E77291" strokeWidth={2} style={{ marginLeft: "auto" }} />
                </div>
              ))}

              <div style={{
                marginTop: 24, display: "flex",
                justifyContent: "space-between", alignItems: "flex-end"
              }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 4 }}>ONE-TIME PAYMENT</p>
                  <p style={{
                    fontFamily: "'DM Serif Display', serif",
                    color: "white", fontSize: 38
                  }}>₹10,000</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>No recurring charges</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#E77291", fontSize: 12, fontWeight: 600 }}>Lifetime access</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>For your wedding</p>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} style={{
              width: "100%", padding: "16px", background: "#3E0014",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 16, fontWeight: 700, cursor: "pointer"
            }}>Proceed to Payment →</button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              color: "#3E0014", fontSize: 20, marginBottom: 20
            }}>Choose payment method</p>

            {/* Payment Method Toggle */}
            <div style={{
              display: "flex", background: "white",
              borderRadius: 14, padding: 4, marginBottom: 24,
              border: "1px solid #F5D0DA"
            }}>
              {["upi", "card"].map(m => (
                <button key={m} onClick={() => setPayMethod(m)} style={{
                  flex: 1, padding: "12px",
                  background: payMethod === m ? "#3E0014" : "transparent",
                  color: payMethod === m ? "white" : "#7A5560",
                  border: "none", borderRadius: 10,
                  fontWeight: 600, fontSize: 14, cursor: "pointer",
                  transition: "all 0.2s", textTransform: "uppercase"
                }}>{m === "upi" ? "UPI" : "Credit / Debit Card"}</button>
              ))}
            </div>

            {payMethod === "upi" && (
              <div style={{
                background: "white", borderRadius: 20, padding: "24px",
                border: "1px solid #F5D0DA", marginBottom: 20
              }}>
                <label style={labelStyle}>YOUR UPI ID</label>
                <input style={inputStyle} placeholder="yourname@upi"
                  value={upi} onChange={e => setUpi(e.target.value)} />
                <p style={{ color: "#7A5560", fontSize: 12, marginTop: 10 }}>
                  e.g. 9876543210@paytm, name@gpay, name@phonepe
                </p>

                <div style={{
                  marginTop: 20, background: "#FDF0F3",
                  borderRadius: 14, padding: "14px",
                  border: "1px solid #F5D0DA"
                }}>
                  <p style={{ color: "#AC1634", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    PAYMENT SUMMARY
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ color: "#7A5560", fontSize: 13 }}>Vivaha Premium</p>
                    <p style={{ color: "#3E0014", fontWeight: 700, fontSize: 13 }}>₹10,000</p>
                  </div>
                </div>
              </div>
            )}

            {payMethod === "card" && (
              <div style={{
                background: "white", borderRadius: 20, padding: "24px",
                border: "1px solid #F5D0DA", marginBottom: 20
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>CARD NUMBER</label>
                    <input style={inputStyle} placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={card.number}
                      onChange={e => setCard(c => ({ ...c, number: e.target.value }))} />
                  </div>
                  <div>
                    <label style={labelStyle}>CARDHOLDER NAME</label>
                    <input style={inputStyle} placeholder="Priya Sharma"
                      value={card.name}
                      onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>EXPIRY</label>
                      <input style={inputStyle} placeholder="MM/YY"
                        maxLength={5}
                        value={card.expiry}
                        onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))} />
                    </div>
                    <div>
                      <label style={labelStyle}>CVV</label>
                      <input style={inputStyle} placeholder="•••"
                        maxLength={3} type="password"
                        value={card.cvv}
                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} />
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: 20, background: "#FDF0F3",
                  borderRadius: 14, padding: "14px",
                  border: "1px solid #F5D0DA"
                }}>
                  <p style={{ color: "#AC1634", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                    PAYMENT SUMMARY
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ color: "#7A5560", fontSize: 13 }}>Vivaha Premium</p>
                    <p style={{ color: "#3E0014", fontWeight: 700, fontSize: 13 }}>₹10,000</p>
                  </div>
                </div>
              </div>
            )}

            <button onClick={handlePayment} disabled={processing} style={{
              width: "100%", padding: "16px",
              background: processing ? "#ccc" : "#3E0014",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 16, fontWeight: 700, cursor: processing ? "not-allowed" : "pointer"
            }}>
              {processing ? "Processing payment..." : "Pay ₹10,000 →"}
            </button>

            <p style={{ color: "#7A5560", fontSize: 12, textAlign: "center", marginTop: 12 }}>
              🔒 Secure payment · No recurring charges
            </p>
          </>
        )}
      </div>
    </div>
  );
}