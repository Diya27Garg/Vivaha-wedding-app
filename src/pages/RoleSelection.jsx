// src/pages/RoleSelection.jsx
import { useNavigate } from 'react-router-dom';
import { Heart, Briefcase } from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Navigate to login with the selected role
    navigate('/login', { state: { role: role } });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FDF0F3",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px 20px"
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic",
          fontSize: "32px",
          color: "#3E0014",
          marginBottom: "12px"
        }}>
          Choose Your Role
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "16px",
          color: "#7A002B"
        }}>
          Tell us how you'd like to use Vivaha
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: "20px",
        flexWrap: "wrap"
      }}>
        {/* Bride/Groom Card */}
        <button
          onClick={() => handleRoleSelect("bride")}
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "360px",
            padding: "40px 24px",
            background: "white",
            borderRadius: "24px",
            border: "1px solid #F5D0DA",
            boxShadow: "0 4px 16px rgba(62,0,20,0.08)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textAlign: "center"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(62,0,20,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(62,0,20,0.08)";
          }}
        >
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#AC163410",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px"
          }}>
            <Heart size={48} color="#AC1634" />
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: "28px",
            color: "#3E0014",
            marginBottom: "12px"
          }}>
            Bride/Groom
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "#666"
          }}>
            Plan your dream wedding
          </p>
        </button>

        {/* Vendor Card */}
        <button
          onClick={() => handleRoleSelect("vendor")}
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "360px",
            padding: "40px 24px",
            background: "white",
            borderRadius: "24px",
            border: "1px solid #F5D0DA",
            boxShadow: "0 4px 16px rgba(62,0,20,0.08)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textAlign: "center"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(62,0,20,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(62,0,20,0.08)";
          }}
        >
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#7A002B10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px"
          }}>
            <Briefcase size={48} color="#7A002B" />
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: "28px",
            color: "#3E0014",
            marginBottom: "12px"
          }}>
            Vendor
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "#666"
          }}>
            Showcase your services
          </p>
        </button>
      </div>
    </div>
  );
}