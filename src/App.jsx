import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

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

function App() {
  const [user, setUser] = useState({ 
    name: "Guest", 
    role: "couple", 
    premium: false 
  });
  
  const [admin, setAdmin] = useState(null);

  // Debug log to check if App is rendering
  console.log("App rendering, user:", user);

  return (
    <BrowserRouter>
      <Routes>
        // In App.jsx, make sure routes are in this order:
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
        <Route path="/package" element={<BuildPackage />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;