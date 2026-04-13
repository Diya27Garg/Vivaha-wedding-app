import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "bride";

  const handle = async () => {
    if (!email || !password) return;
    setVerifying(true);
    await new Promise(r => setTimeout(r, 2000));
    setUser({ email, name: email.split("@")[0], role, premium: false });
navigate("/home");
  };

  if (verifying) return (
    <div style={{
      minHeight: "100vh", background: "#3E0014",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 20, fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ fontSize: 56 }}>💍</div>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontStyle: "italic", color: "#FFFFFF", fontSize: 28
      }}>Verifying...</h2>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
        Authenticating your account
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#E77291",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>
      <div style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(231,114,145,0.3)",
        borderRadius: 16, padding: "16px 32px", textAlign: "center", marginTop: 8
      }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Signing in as</p>
        <p style={{ color: "white", fontWeight: 600, fontSize: 15, marginTop: 4 }}>{email}</p>
        <p style={{ color: "#E77291", fontSize: 12, marginTop: 4, textTransform: "capitalize" }}>
          {role}
        </p>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0);opacity:0.4}50%{transform:translateY(-12px);opacity:1}}`}</style>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#3E0014",
      display: "flex", alignItems: "center",
      justifyContent: "center", padding: "24px",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        background: "white", borderRadius: 28,
        padding: "40px 28px", width: "100%", maxWidth: 400,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>💍</div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic", fontSize: 32,
            color: "#3E0014", marginBottom: 6
          }}>Vivaha</h1>
          <p style={{ color: "#7A5560", fontSize: 14 }}>
            Signing in as <strong style={{ color: "#AC1634", textTransform: "capitalize" }}>{role}</strong>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "14px 16px", border: "1.5px solid #F5D0DA",
              borderRadius: 14, fontSize: 15, outline: "none",
              background: "#FDF8F9", color: "#1A1A1A",
              fontFamily: "'DM Sans', sans-serif"
            }} />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            style={{
              padding: "14px 16px", border: "1.5px solid #F5D0DA",
              borderRadius: 14, fontSize: 15, outline: "none",
              background: "#FDF8F9", color: "#1A1A1A",
              fontFamily: "'DM Sans', sans-serif"
            }} />

          <button onClick={handle} style={{
            padding: "15px", background: "#3E0014",
            color: "white", border: "none", borderRadius: 999,
            fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 4
          }}>Continue →</button>
        </div>

        <div style={{
          marginTop: 20, background: "#FDF0F3",
          border: "1px solid #F5D0DA", borderRadius: 16,
          padding: "14px", textAlign: "center"
        }}>
          <p style={{ color: "#AC1634", fontSize: 13 }}>
            Enter any email and password to continue
          </p>
        </div>

        <p onClick={() => navigate("/role")} style={{
          textAlign: "center", marginTop: 16,
          color: "#E77291", fontSize: 13, cursor: "pointer"
        }}>← Change role</p>
      </div>
    </div>
  );
}