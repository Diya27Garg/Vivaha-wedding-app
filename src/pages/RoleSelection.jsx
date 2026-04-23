// src/pages/RoleSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, Sparkles, ArrowRight, Crown, Star } from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function RoleSelection({ user, setUser }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
  console.log("Role selected:", role);
  console.log("Current user:", user);
  console.log("isNewUser value:", user?.isNewUser);
  
  setSelectedRole(role);
  
  // Update user with selected role
  setUser(prev => ({ ...prev, role: role }));
  
  // Use a small delay to ensure state updates
  setTimeout(() => {
    // Check if user is new (from sign up) or existing (from login)
    if (user?.isNewUser === true) {
      console.log("NEW USER - Going to onboarding");
      if (role === "vendor") {
        navigate("/onboarding/vendor");
      } else {
        navigate("/couple-form");
      }
    } else {
      console.log("EXISTING USER - Going to dashboard");
      if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, 300);
};
  const roles = [
    {
      id: "bride",
      title: "Bride",
      emoji: "👰",
      description: "Plan your dream wedding with personalised tools, vendor picks, and budget tracking",
      color: "#AC1634",
      accentColor: "#E77291",
      features: ["Vendor Discovery", "Budget Planner", "Wedding Checklist", "Inspiration Board"],
      popular: true
    },
    {
      id: "groom",
      title: "Groom",
      emoji: "🤵",
      description: "Stay on top of every detail — from vendor bookings to your big day countdown",
      color: "#3E0014",
      accentColor: "#7A002B",
      features: ["Vendor Discovery", "Budget Planner", "Wedding Checklist", "Invitation Design"],
      popular: false
    },
    {
      id: "vendor",
      title: "Vendor",
      emoji: "💼",
      description: "Showcase your services, connect with couples, and grow your wedding business",
      color: "#5C3D11",
      accentColor: "#9C6B2E",
      features: ["Business Profile", "Booking Management", "Client Messaging", "Analytics"],
      popular: false
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />
      <div style={styles.bgCircle3} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoWrapper}>
          <HindiLogo size="large" />
        </div>
        <div style={styles.tagline}>
          <Sparkles size={14} color="#E77291" />
          <span>Complete your profile to continue</span>
          <Sparkles size={14} color="#E77291" />
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.mainTitle}>Choose Your Role</h1>
        <p style={styles.subtitle}>Tell us how you'd like to use Vivaha</p>

        <div style={styles.rolesContainer}>
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                style={{
                  ...styles.roleCard,
                  borderColor: isSelected ? role.accentColor : "#F5D0DA",
                  boxShadow: isSelected
                    ? `0 20px 40px ${role.accentColor}30`
                    : "0 4px 16px rgba(62,0,20,0.08)",
                  transform: isSelected ? "translateY(-8px)" : "translateY(0)"
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = `0 16px 32px ${role.accentColor}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(62,0,20,0.08)";
                  }
                }}
              >
                {role.popular && (
                  <div style={styles.popularBadge}>
                    <Crown size={12} color="#E77291" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Emoji icon */}
                <div
                  style={{
                    ...styles.iconCircle,
                    background: `${role.accentColor}12`,
                    borderColor: `${role.accentColor}30`
                  }}
                >
                  <span style={{ fontSize: "40px", lineHeight: 1 }}>{role.emoji}</span>
                </div>

                <h2 style={{ ...styles.roleTitle, color: role.color }}>{role.title}</h2>
                <p style={styles.roleDescription}>{role.description}</p>

                <div style={styles.featuresList}>
                  {role.features.map((feature, i) => (
                    <div key={i} style={styles.featureItem}>
                      <Star size={11} color={role.accentColor} fill={role.accentColor} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    ...styles.actionButton,
                    background: isSelected
                      ? `linear-gradient(135deg, ${role.color}, ${role.accentColor})`
                      : `linear-gradient(135deg, ${role.color}DD, ${role.accentColor}DD)`
                  }}
                >
                  <span>
                    Continue as{" "}
                    {role.id === "bride"
                      ? "Bride"
                      : role.id === "groom"
                      ? "Groom"
                      : "Vendor"}
                  </span>
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Couple note */}
        <p style={styles.coupleNote}>
          💍 Bride &amp; Groom accounts link together — invite your partner after onboarding
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>⚡ All roles are free to start · No credit card required</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FDF0F3 0%, #FFF5F7 50%, #FDF0F3 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px"
  },
  bgCircle1: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(231,114,145,0.08) 0%, transparent 70%)"
  },
  bgCircle2: {
    position: "absolute",
    bottom: "-10%",
    left: "-5%",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(172,22,52,0.06) 0%, transparent 70%)"
  },
  bgCircle3: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(231,114,145,0.05) 0%, transparent 70%)"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    zIndex: 2
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px"
  },
  tagline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "12px",
    color: "#E77291",
    letterSpacing: "2px"
  },
  content: {
    maxWidth: "1200px",
    width: "100%",
    zIndex: 2
  },
  mainTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontStyle: "italic",
    fontSize: "36px",
    color: "#3E0014",
    textAlign: "center",
    marginBottom: "12px"
  },
  subtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "16px",
    color: "#7A5560",
    textAlign: "center",
    marginBottom: "40px"
  },
  rolesContainer: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap"
  },
  roleCard: {
    flex: 1,
    minWidth: "260px",
    maxWidth: "340px",
    padding: "36px 28px",
    background: "white",
    borderRadius: "32px",
    border: "2px solid #F5D0DA",
    cursor: "pointer",
    transition: "all 0.25s ease",
    textAlign: "center",
    position: "relative"
  },
  popularBadge: {
    position: "absolute",
    top: "-14px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    padding: "6px 16px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#E77291",
    border: "1px solid #F5D0DA",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    whiteSpace: "nowrap"
  },
  iconCircle: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    border: "2px solid",
    transition: "all 0.25s ease"
  },
  roleTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontStyle: "italic",
    fontSize: "26px",
    marginBottom: "10px"
  },
  roleDescription: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.55,
    marginBottom: "20px"
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "28px",
    padding: "0 8px",
    textAlign: "left"
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#555"
  },
  actionButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "13px 24px",
    borderRadius: "999px",
    color: "white",
    fontWeight: 600,
    fontSize: "13px",
    width: "100%",
    boxSizing: "border-box",
    transition: "opacity 0.2s"
  },
  coupleNote: {
    textAlign: "center",
    marginTop: "28px",
    fontSize: "13px",
    color: "#AC1634",
    background: "#FDF0F3",
    padding: "12px 24px",
    borderRadius: "999px",
    display: "inline-block",
    width: "auto"
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "12px",
    color: "#999",
    zIndex: 2
  }
};
