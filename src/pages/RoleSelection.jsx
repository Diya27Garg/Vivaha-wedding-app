// src/pages/RoleSelection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, Sparkles, ArrowRight, Crown, Star } from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setTimeout(() => {
      navigate("/login", { state: { role: role } });
    }, 500);
  };

  const roles = [
    {
      id: "bride",
      title: "Bride / Groom",
      icon: Heart,
      description: "Plan your dream wedding with personalized tools, vendor recommendations, and budget tracking",
      color: "#E77291",
      bgColor: "linear-gradient(135deg, rgba(231,114,145,0.1) 0%, rgba(231,114,145,0.05) 100%)",
      features: ["Vendor Discovery", "Budget Planner", "Wedding Checklist", "Inspiration Board"],
      popular: true
    },
    {
      id: "vendor",
      title: "Vendor",
      icon: Briefcase,
      description: "Showcase your services, connect with couples, and grow your wedding business",
      color: "#AC1634",
      bgColor: "linear-gradient(135deg, rgba(172,22,52,0.1) 0%, rgba(172,22,52,0.05) 100%)",
      features: ["Business Profile", "Booking Management", "Client Messaging", "Performance Analytics"],
      popular: false
    }
  ];

  return (
    <div style={styles.container}>
      {/* Decorative Background Elements */}
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
          <span>Your wedding journey begins here</span>
          <Sparkles size={14} color="#E77291" />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.mainTitle}>
          Choose Your Role
        </h1>
        <p style={styles.subtitle}>
          Tell us how you'd like to use Vivaha
        </p>

        <div style={styles.rolesContainer}>
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                style={{
                  ...styles.roleCard,
                  ...(animate ? styles.roleCardAnimate : {}),
                  animationDelay: `${index * 0.15}s`,
                  background: isSelected ? role.bgColor : "white",
                  borderColor: isSelected ? role.color : "#F5D0DA",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                  boxShadow: isSelected ? `0 20px 40px ${role.color}20` : "0 4px 16px rgba(62,0,20,0.08)"
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 24px 48px ${role.color}15`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(62,0,20,0.08)";
                  }
                }}
              >
                {/* Popular Badge */}
                {role.popular && (
                  <div style={styles.popularBadge}>
                    <Crown size={12} color="#E77291" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Icon Circle */}
                <div style={{
                  ...styles.iconCircle,
                  background: `${role.color}15`,
                  borderColor: `${role.color}30`
                }}>
                  <IconComponent size={48} color={role.color} strokeWidth={1.2} />
                </div>

                {/* Title */}
                <h2 style={styles.roleTitle}>{role.title}</h2>
                
                {/* Description */}
                <p style={styles.roleDescription}>{role.description}</p>

                {/* Features List */}
                <div style={styles.featuresList}>
                  {role.features.map((feature, i) => (
                    <div key={i} style={styles.featureItem}>
                      <Star size={12} color={role.color} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div style={{
                  ...styles.actionButton,
                  background: role.color,
                  opacity: isSelected ? 1 : 0.9
                }}>
                  <span>Continue as {role.id === "bride" ? "Couple" : "Vendor"}</span>
                  <ArrowRight size={16} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Note */}
      <div style={styles.footer}>
        <p>⚡ Both roles are free to start • No credit card required</p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
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
    background: "radial-gradient(circle, rgba(231,114,145,0.08) 0%, transparent 70%)",
    animation: "float 8s ease-in-out infinite"
  },
  bgCircle2: {
    position: "absolute",
    bottom: "-10%",
    left: "-5%",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(172,22,52,0.06) 0%, transparent 70%)",
    animation: "float 10s ease-in-out infinite reverse"
  },
  bgCircle3: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(231,114,145,0.05) 0%, transparent 70%)",
    animation: "float 12s ease-in-out infinite"
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
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
    marginBottom: "48px"
  },
  rolesContainer: {
    display: "flex",
    gap: "32px",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap"
  },
  roleCard: {
    flex: 1,
    minWidth: "320px",
    maxWidth: "450px",
    padding: "40px 32px",
    background: "white",
    borderRadius: "32px",
    border: "2px solid #F5D0DA",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
    textAlign: "center",
    position: "relative",
    opacity: 0,
    transform: "translateY(30px)"
  },
  roleCardAnimate: {
    animation: "fadeInUp 0.6s ease-out forwards"
  },
  popularBadge: {
    position: "absolute",
    top: "-12px",
    right: "24px",
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
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  iconCircle: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    border: "2px solid",
    transition: "all 0.3s ease"
  },
  roleTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontStyle: "italic",
    fontSize: "28px",
    color: "#3E0014",
    marginBottom: "12px"
  },
  roleDescription: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#666",
    lineHeight: 1.5,
    marginBottom: "24px"
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "32px",
    padding: "0 16px"
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13px",
    color: "#555"
  },
  actionButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "999px",
    color: "white",
    fontWeight: 600,
    fontSize: "14px",
    transition: "all 0.3s ease",
    marginTop: "8px"
  },
  footer: {
    marginTop: "60px",
    textAlign: "center",
    fontSize: "12px",
    color: "#999",
    zIndex: 2
  }
};