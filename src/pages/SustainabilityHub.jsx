// src/pages/SustainabilityHub.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Leaf, Award, Recycle, TreePine, Droplets, Sun, CheckCircle, 
  Sparkles, TrendingUp, Heart, Home, Package, User, ShoppingCart,
  Utensils, Building2, Truck, Calendar, Phone, MapPin, Star,
  Shield, Clock, Users, Gift, Globe, Battery, Wind
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function SustainabilityHub() {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [points, setPoints] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [showNGOs, setShowNGOs] = useState(false);
  const [foodDonationRequest, setFoodDonationRequest] = useState(null);
  const [donatedFood, setDonatedFood] = useState(false);

  const sustainableSteps = [
    { id: 1, title: "Digital Invitations", impact: "Save 500+ papers", points: 50, tip: "Use Canva for beautiful e-invites", icon: "📧", completed: false },
    { id: 2, title: "Local & Seasonal Flowers", impact: "Reduce carbon footprint", points: 75, tip: "Choose local florists for fresh flowers", icon: "🌸", completed: false },
    { id: 3, title: "Compostable Cutlery", impact: "Zero plastic waste", points: 40, tip: "Use bamboo or palm leaf plates", icon: "🍽️", completed: false },
    { id: 4, title: "Food Donation", impact: "Feed 100+ people", points: 100, tip: "Donate excess food to local NGOs", icon: "🍲", completed: false },
    { id: 5, title: "Solar-Powered Venue", impact: "Reduce energy consumption", points: 80, tip: "Choose venues with renewable energy", icon: "☀️", completed: false },
    { id: 6, title: "Plant a Tree Initiative", impact: "Offset carbon emissions", points: 60, tip: "Gift a tree to each guest", icon: "🌳", completed: false }
  ];

  // NGOs database by city
  const ngosByCity = {
    mumbai: [
      { id: 1, name: "Robin Hood Army - Mumbai", address: "Andheri East, Mumbai", phone: "+91 98765 43210", capacity: "500 meals", rating: 4.9, established: 2014 },
      { id: 2, name: "Akshaya Patra - Mumbai", address: "Vikhroli, Mumbai", phone: "+91 87654 32109", capacity: "1000 meals", rating: 4.8, established: 2000 },
      { id: 3, name: "Feeding India - Mumbai", address: "Bandra West, Mumbai", phone: "+91 76543 21098", capacity: "300 meals", rating: 4.7, established: 2016 }
    ],
    delhi: [
      { id: 1, name: "Robin Hood Army - Delhi", address: "South Extension, Delhi", phone: "+91 99887 66554", capacity: "600 meals", rating: 4.9, established: 2014 },
      { id: 2, name: "Akshaya Patra - Delhi", address: "Dwarka, Delhi", phone: "+91 88776 55443", capacity: "1200 meals", rating: 4.8, established: 2000 },
      { id: 3, name: "Delhi Food Bank", address: "Connaught Place, Delhi", phone: "+91 77665 44332", capacity: "400 meals", rating: 4.7, established: 2018 }
    ],
    jaipur: [
      { id: 1, name: "Annapurna Food Bank", address: "Jaipur, Rajasthan", phone: "+91 99887 12345", capacity: "350 meals", rating: 4.8, established: 2015 },
      { id: 2, name: "Rajasthan Food Foundation", address: "Civil Lines, Jaipur", phone: "+91 88776 23456", capacity: "450 meals", rating: 4.7, established: 2017 }
    ],
    bangalore: [
      { id: 1, name: "Bangalore Food Bank", address: "Indiranagar, Bangalore", phone: "+91 99887 34567", capacity: "700 meals", rating: 4.9, established: 2013 },
      { id: 2, name: "Robin Hood Army - Bangalore", address: "Koramangala, Bangalore", phone: "+91 88776 45678", capacity: "500 meals", rating: 4.8, established: 2014 }
    ]
  };

  // Green Vendors (eco-friendly vendors)
  const greenVendors = [
    { id: 1, name: "Eco Decor Co", category: "Decor", greenRating: 5, description: "100% recycled materials, zero plastic", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", price: "₹1,00,000" },
    { id: 2, name: "Green Feast Caterers", category: "Catering", greenRating: 4, description: "Compostable cutlery, local sourcing", image: "https://images.unsplash.com/photo-1555244162-803834f70033", price: "₹1,50,000" },
    { id: 3, name: "Solar Events", category: "Lighting", greenRating: 5, description: "Solar-powered lighting solutions", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3", price: "₹80,000" },
    { id: 4, name: "Eco Invites", category: "Stationery", greenRating: 4, description: "Seed paper invitations, plantable", image: "https://images.unsplash.com/photo-1519741497674-611481863552", price: "₹25,000" }
  ];

  const cities = ["Mumbai", "Delhi", "Jaipur", "Bangalore", "Chennai", "Kolkata"];

  useEffect(() => {
    const savedPoints = localStorage.getItem("sustainabilityPoints");
    const savedSteps = localStorage.getItem("sustainabilitySteps");
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));
  }, []);

  useEffect(() => {
    localStorage.setItem("sustainabilityPoints", points);
    localStorage.setItem("sustainabilitySteps", JSON.stringify(completedSteps));
  }, [points, completedSteps]);

  const completeStep = (id) => {
    const step = sustainableSteps.find(s => s.id === id);
    if (!step.completed && !completedSteps.includes(id)) {
      setCompletedSteps([...completedSteps, id]);
      setPoints(points + step.points);
      
      if (step.title === "Food Donation") {
        setShowNGOs(true);
      }
    }
  };

  const requestFoodDonation = (ngo) => {
    setFoodDonationRequest(ngo);
    setTimeout(() => {
      setDonatedFood(true);
      alert(`✅ Food donation request sent to ${ngo.name}!\n\nThey will contact you within 2 hours to arrange pickup. Thank you for making a difference! 🙏`);
      setShowNGOs(false);
      setFoodDonationRequest(null);
    }, 1500);
  };

  const totalPoints = 405;
  const progress = (points / totalPoints) * 100;

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Package size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <div style={{ width: "70px" }} />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>Sustainable Wedding</h1>
          <p style={styles.subtitle}>Make your special day kind to the planet</p>
        </div>

        {/* Points Card */}
        <div style={styles.pointsCard}>
          <div style={styles.pointsHeader}>
            <div>
              <p style={styles.pointsLabel}>Your Green Score</p>
              <p style={styles.pointsValue}>{points}</p>
              <p style={styles.pointsTotal}>out of {totalPoints} points</p>
            </div>
            <Award size={48} color="#FFD700" />
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <p style={styles.progressText}>
            {points === totalPoints ? "🎉 You're a Green Wedding Champion! 🎉" : `${Math.round(progress)}% to becoming a Green Wedding Champion`}
          </p>
        </div>

        {/* Food Donation Section */}
        <div style={styles.donationSection}>
          <h2 style={styles.sectionTitle}>
            <Utensils size={20} color="#AC1634" /> Feed the Hungry
          </h2>
          <p style={styles.sectionSubtitle}>Donate your wedding feast to those in need</p>
          
          {!donatedFood ? (
            <>
              <div style={styles.citySelector}>
                <label>Select your wedding city:</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={styles.citySelect}
                >
                  <option value="">Select City</option>
                  {cities.map(city => <option key={city} value={city.toLowerCase()}>{city}</option>)}
                </select>
              </div>

              {selectedCity && ngosByCity[selectedCity] && (
                <div style={styles.ngoList}>
                  <h3>Nearby NGOs for Food Donation</h3>
                  {ngosByCity[selectedCity].map(ngo => (
                    <div key={ngo.id} style={styles.ngoCard}>
                      <div style={styles.ngoIcon}>🏢</div>
                      <div style={styles.ngoInfo}>
                        <h4>{ngo.name}</h4>
                        <p><MapPin size={12} /> {ngo.address}</p>
                        <p><Phone size={12} /> {ngo.phone}</p>
                        <p><Users size={12} /> Capacity: {ngo.capacity}</p>
                        <div style={styles.ngoRating}>⭐ {ngo.rating} • Est. {ngo.established}</div>
                      </div>
                      <button 
                        style={styles.donateBtn}
                        onClick={() => requestFoodDonation(ngo)}
                      >
                        <Truck size={14} /> Request Pickup
                      </button>
                    </div>
                  ))}
                  <div style={styles.donationNote}>
                    <Truck size={16} color="#4CAF50" />
                    <span>Free pickup service provided by Vivaha • 100% of food reaches the needy</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={styles.donationSuccess}>
              <CheckCircle size={48} color="#4CAF50" />
              <h3>Thank You for Your Kindness! 🙏</h3>
              <p>Your food donation request has been received. An NGO partner will contact you within 2 hours to coordinate pickup.</p>
              <p style={styles.impactText}>You've helped feed approximately 200 hungry people! 🌟</p>
            </div>
          )}
        </div>

        {/* Green Vendors Section */}
        <div style={styles.greenVendorsSection}>
          <h2 style={styles.sectionTitle}>
            <Leaf size={20} color="#2d6a4f" /> Green Certified Vendors
          </h2>
          <p style={styles.sectionSubtitle}>Eco-friendly vendors who care about the planet</p>
          
          <div style={styles.greenVendorsGrid}>
            {greenVendors.map(vendor => (
              <div key={vendor.id} style={styles.greenVendorCard}>
                <div style={styles.greenBadge}>
                  <Leaf size={12} color="#2d6a4f" /> Green Certified
                </div>
                <img src={vendor.image} alt={vendor.name} style={styles.greenVendorImage} />
                <div style={styles.greenVendorInfo}>
                  <h4>{vendor.name}</h4>
                  <p>{vendor.category}</p>
                  <div style={styles.greenRating}>
                    {[...Array(5)].map((_, i) => (
                      <Leaf key={i} size={12} fill={i < vendor.greenRating ? "#2d6a4f" : "none"} color="#2d6a4f" />
                    ))}
                  </div>
                  <p style={styles.greenDesc}>{vendor.description}</p>
                  <p style={styles.greenPrice}>{vendor.price}</p>
                  <button style={styles.greenBookBtn}>Book Now →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainable Steps Checklist */}
        <div style={styles.stepsSection}>
          <h2 style={styles.sectionTitle}>
            <Recycle size={20} /> Green Wedding Checklist
          </h2>
          <div style={styles.stepsList}>
            {sustainableSteps.map(step => (
              <div key={step.id} style={{
                ...styles.stepCard,
                background: completedSteps.includes(step.id) ? "#E8F5E9" : "white"
              }}>
                <button 
                  onClick={() => completeStep(step.id)}
                  disabled={completedSteps.includes(step.id)}
                  style={styles.stepCheckbox}
                >
                  {completedSteps.includes(step.id) ? <CheckCircle size={20} color="#4CAF50" /> : <div style={styles.uncheckedCircle} />}
                </button>
                <div style={styles.stepIcon}>{step.icon}</div>
                <div style={styles.stepContent}>
                  <h4>{step.title}</h4>
                  <p>{step.impact}</p>
                  {completedSteps.includes(step.id) && <p style={styles.stepTip}>💡 {step.tip}</p>}
                </div>
                <div style={styles.stepPoints}>+{step.points}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        {points >= 200 && (
          <div style={styles.rewardsCard}>
            <Award size={32} color="#FFD700" />
            <h3>🎉 You've Earned a Reward! 🎉</h3>
            <p>{points >= 300 ? "Green Wedding Champion Badge + ₹5000 vendor discount coupon!" : "Sustainable Couple Badge + Free eco-friendly wedding consultation!"}</p>
            <button style={styles.claimBtn}>Claim Your Reward</button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav" style={styles.bottomNav}>
        {navItems.map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} style={styles.navItem}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "48px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  pointsCard: { background: "linear-gradient(135deg, #2d6a4f, #40916c)", borderRadius: "24px", padding: "24px", marginBottom: "32px", color: "white" },
  pointsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  pointsLabel: { fontSize: "12px", opacity: 0.8 },
  pointsValue: { fontSize: "48px", fontWeight: "bold", margin: 0 },
  pointsTotal: { fontSize: "12px", opacity: 0.8 },
  progressBar: { height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "4px", overflow: "hidden", marginBottom: "12px" },
  progressFill: { height: "100%", background: "#FFD700", borderRadius: "4px", transition: "width 0.3s" },
  progressText: { fontSize: "12px", opacity: 0.8 },
  donationSection: { background: "white", borderRadius: "24px", padding: "24px", marginBottom: "32px", border: "1px solid #F5D0DA" },
  sectionTitle: { fontSize: "22px", fontWeight: 600, color: "#3E0014", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" },
  sectionSubtitle: { fontSize: "14px", color: "#666", marginBottom: "20px" },
  citySelector: { marginBottom: "20px" },
  citySelect: { width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", marginTop: "8px" },
  ngoList: { marginTop: "20px" },
  ngoCard: { display: "flex", gap: "16px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", marginBottom: "12px", alignItems: "center", flexWrap: "wrap" },
  ngoIcon: { fontSize: "40px" },
  ngoInfo: { flex: 1 },
  ngoRating: { fontSize: "11px", color: "#999", marginTop: "4px" },
  donateBtn: { background: "#AC1634", color: "white", border: "none", padding: "10px 20px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  donationNote: { display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "#E8F5E9", borderRadius: "12px", marginTop: "12px", fontSize: "12px" },
  donationSuccess: { textAlign: "center", padding: "32px" },
  impactText: { color: "#2d6a4f", fontWeight: 600, marginTop: "12px" },
  greenVendorsSection: { marginBottom: "32px" },
  greenVendorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  greenVendorCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA", position: "relative" },
  greenBadge: { position: "absolute", top: "12px", left: "12px", background: "#E8F5E9", color: "#2d6a4f", padding: "4px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", zIndex: 1 },
  greenVendorImage: { width: "100%", height: "160px", objectFit: "cover" },
  greenVendorInfo: { padding: "16px" },
  greenRating: { display: "flex", gap: "2px", margin: "8px 0" },
  greenDesc: { fontSize: "12px", color: "#666", marginBottom: "8px" },
  greenPrice: { fontSize: "16px", fontWeight: 700, color: "#AC1634", marginBottom: "12px" },
  greenBookBtn: { width: "100%", padding: "10px", borderRadius: "999px", background: "#2d6a4f", color: "white", border: "none", cursor: "pointer" },
  stepsSection: { marginBottom: "32px" },
  stepsList: { display: "flex", flexDirection: "column", gap: "12px" },
  stepCard: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "16px", border: "1px solid #F5D0DA" },
  stepCheckbox: { background: "none", border: "none", cursor: "pointer" },
  uncheckedCircle: { width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #AC1634" },
  stepIcon: { fontSize: "32px" },
  stepContent: { flex: 1 },
  stepTip: { fontSize: "11px", color: "#2d6a4f", marginTop: "4px" },
  stepPoints: { fontSize: "14px", fontWeight: 600, color: "#AC1634" },
  rewardsCard: { background: "linear-gradient(135deg, #FFD700, #FFA500)", borderRadius: "20px", padding: "24px", textAlign: "center", marginTop: "24px" },
  claimBtn: { marginTop: "16px", padding: "10px 24px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #F5D0DA", padding: "12px 32px", display: "flex", justifyContent: "center", gap: "48px", zIndex: 100 },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "11px" }
};