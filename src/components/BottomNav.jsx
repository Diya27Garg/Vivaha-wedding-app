// src/components/BottomNav.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, Sparkles, Package, User } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <nav style={styles.bottomNav}>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            ...styles.navItem,
            color: location.pathname === item.path ? "#AC1634" : "#999",
          }}
          onMouseEnter={(e) => {
            if (location.pathname !== item.path) {
              e.currentTarget.style.color = "#E77291";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = location.pathname === item.path ? "#AC1634" : "#999";
          }}
        >
          {item.icon}
          <span style={styles.navLabel}>{item.label}</span>
          {location.pathname === item.path && <span style={styles.activeDot} />}
        </button>
      ))}
    </nav>
  );
}

const styles = {
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "white",
    borderTop: "1px solid #F5D0DA",
    padding: "8px 20px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 100,
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255,255,255,0.98)"
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.2s ease",
    position: "relative",
    fontSize: "10px",
    fontWeight: 500,
    padding: "4px 8px",
    borderRadius: "8px"
  },
  navLabel: {
    fontSize: "10px",
    fontWeight: 500
  },
  activeDot: {
    position: "absolute",
    bottom: "-8px",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#AC1634"
  }
};