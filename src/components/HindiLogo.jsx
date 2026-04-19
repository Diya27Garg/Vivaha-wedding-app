// src/components/HindiLogo.jsx
import { useEffect, useState } from "react";

export default function HindiLogo({ animated = false, size = "large" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const getFontSize = () => {
    switch(size) {
      case "small": return "32px";
      case "large": return "56px";
      case "xl": return "80px";
      default: return "44px";
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Rozha One', 'Noto Sans Devanagari', cursive",
        fontWeight: 400,
        fontSize: getFontSize(),
        background: "linear-gradient(135deg, #FFD6E0 0%, #E77291 30%, #AC1634 70%, #3E0014 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)",
        transition: "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)",
        display: "inline-block",
        lineHeight: 1.2,
        letterSpacing: "4px"
      }}
    >
      विवाह
    </div>
  );
}