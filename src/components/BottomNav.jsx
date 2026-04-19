import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, Sparkles, Package, User } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={22} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={22} />, label: "Inspo", path: "/inspiration" },
    { icon: <Package size={22} />, label: "Package", path: "/package" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="bottom-nav" style={styles.bottomNav}>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            ...styles.navItem,
            color: location.pathname === item.path ? "#AC1634" : "#999",
          }}
        >
          {item.icon}
          <span style={styles.navLabel}>{item.label}</span>
        </button>
      ))}
    </div>
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
    padding: "12px 32px",
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    zIndex: 100,
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  navLabel: {
    fontSize: "11px",
    fontWeight: 500,
  },
};