import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import SplashScreen from "./pages/SplashScreen";
import IntroScreens from "./pages/IntroScreens";
import RealWeddings from "./pages/RealWeddings";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import CoupleForm from "./pages/CoupleForm";
import VendorForm from "./pages/VendorForm";
import CoupleDashboard from "./pages/CoupleDashboard";
import Checklist from "./pages/Checklist";
import InspirationBoard from "./pages/InspirationBoard";
import BuildPackage from "./pages/BuildPackage";
import CoupleProfile from "./pages/CoupleProfile";
import VendorDashboard from "./pages/VendorDashboard";
import Messaging from "./pages/Messaging";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState({ name: "Guest", role: "couple" });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/intro" element={<IntroScreens />} />
        <Route path="/real-weddings" element={<RealWeddings />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/onboarding/couple" element={<CoupleForm />} />
        <Route path="/onboarding/vendor" element={<VendorForm />} />
        <Route path="/home" element={<CoupleDashboard user={user} />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/inspiration" element={<InspirationBoard />} />
        <Route path="/package" element={<BuildPackage />} />
        <Route path="/profile" element={<CoupleProfile setUser={setUser} />} />
        <Route path="/messages" element={<Messaging />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard user={user} setUser={setUser} />} />
        <Route path="/admin" element={<AdminDashboard setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;