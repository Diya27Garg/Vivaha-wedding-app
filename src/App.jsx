// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Import all pages
import SplashScreen from "./pages/SplashScreen";
import IntroScreens from "./pages/IntroScreens";
import RealWeddings from "./pages/RealWeddings";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import CoupleForm from "./pages/CoupleForm";
import VendorOnboarding from "./pages/VendorForm";
import CoupleDashboard from "./pages/CoupleDashboard";
import Checklist from "./pages/Checklist";
import InspirationBoard from "./pages/InspirationBoard";
import BuildPackage from "./pages/BuildPackage";
import CoupleProfile from "./pages/CoupleProfile";
import VendorDashboard from "./pages/VendorDashboard";
import Messaging from "./pages/Messaging";
import AdminDashboard from "./pages/AdminDashboard";
import PremiumPage from "./pages/PremiumPage";
import InvitationDesign from "./pages/InvitationDesign";
import BudgetPlanner from "./pages/BudgetPlanner";
import WellnessHub from "./pages/WellnessHub";
import SustainabilityHub from "./pages/SustainabilityHub";
import AdminLogin from "./pages/AdminLogin";
import RasamRiwaz from "./pages/RasamRiwaz";
import LegalDocs from "./pages/LegalDocs";
import AIAssistantPage from "./pages/AIAssistantPage";
import ScheduleMeeting from "./pages/ScheduleMeeting";

function App() {
  const [user, setUser] = useState({ 
    name: "Guest", 
    role: "couple", 
    premium: false 
  });
  const [admin, setAdmin] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  // Back to Top Button Logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Debug log to check if App is rendering
  console.log("App rendering, user:", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/real-weddings" element={<RealWeddings />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/role" element={<RoleSelection user={user} setUser={setUser} />} />
        <Route path="/couple-form" element={<CoupleForm setUser={setUser} />} />
        <Route path="/onboarding/vendor" element={<VendorOnboarding setUser={setUser} />} />
        <Route path="/home" element={<CoupleDashboard user={user} setUser={setUser} />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard user={user} setUser={setUser} />} />
        <Route path="/checklist" element={<Checklist user={user} />} />
        <Route path="/inspiration" element={<InspirationBoard user={user} />} />
        <Route path="/package" element={<BuildPackage user={user} setUser={setUser} />} />
        <Route path="/profile" element={<CoupleProfile setUser={setUser} user={user} />} />
        <Route path="/messages" element={<Messaging />} />
        <Route path="/admin-login" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin" element={<AdminDashboard admin={admin} setAdmin={setAdmin} />} />
        <Route path="/premium" element={<PremiumPage user={user} setUser={setUser} />} />
        <Route path="/invitation-design" element={<InvitationDesign />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/wellness" element={<WellnessHub />} />
        <Route path="/sustainability" element={<SustainabilityHub />} />
        <Route path="/rasam-riwaz" element={<RasamRiwaz />} />
        <Route path="/legal-docs" element={<LegalDocs />} />
        <Route path="/ai-assistant" element={<AIAssistantPage user={user} />} />
        <Route path="/schedule-meeting/:bookingId" element={<ScheduleMeeting />} />
      </Routes>
      
      {/* Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "#AC1634",
            color: "white",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            zIndex: 1000,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.background = "#E77291";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#AC1634";
          }}
        >
          ↑
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;