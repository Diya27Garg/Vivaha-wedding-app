// src/pages/BuildPackage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, MapPin, CheckCircle, ShoppingCart, Plus, Sparkles, Package, User, Home } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

const vendors = [
  { id: 1, name: "Lens & Love Studio", category: "Photography", price: "₹85,000", originalPrice: "₹1,00,000", discount: "Save ₹15,000", location: "Mumbai, Delhi, Jaipur", image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da", rating: 4.9, trustBadges: ["Top Rated", "Verified"] },
  { id: 2, name: "Royal Blooms Decor", category: "Decor", price: "₹1,20,000", originalPrice: "₹1,50,000", discount: "Save ₹30,000", location: "Delhi NCR, Jaipur", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", rating: 4.9, trustBadges: ["Top Rated", "Luxury"] },
  { id: 3, name: "Glam by Priya", category: "Makeup", price: "₹45,000", originalPrice: "₹55,000", discount: "Save ₹10,000", location: "Mumbai, Delhi", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2", rating: 5.0, trustBadges: ["Top Rated", "Celebrity"] },
  { id: 4, name: "Grand Feast Caterers", category: "Catering", price: "₹1,80,000", originalPrice: "₹2,10,000", discount: "Save ₹30,000", location: "Pan India", image: "https://images.unsplash.com/photo-1555244162-803834f70033", rating: 4.7, trustBadges: ["Popular"] },
];

export default function BuildPackage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (vendor) => { if (!cart.find(v => v.id === vendor.id)) setCart([...cart, vendor]); };
  const removeFromCart = (id) => setCart(cart.filter(v => v.id !== id));
  const getTotalSavings = () => cart.reduce((total, v) => total + (parseInt(v.originalPrice?.replace(/[^0-9]/g, '') || 0) - parseInt(v.price?.replace(/[^0-9]/g, '') || 0)), 0);

  const powerPairs = [
    { title: "Photography + Cinematography", vendors: ["Lens & Love Studio", "Golden Hour Films"], savings: "₹25,000" },
    { title: "Decor + Lighting", vendors: ["Royal Blooms Decor", "Luminary Events"], savings: "₹30,000" },
    { title: "Makeup + Mehendi", vendors: ["Glam by Priya", "Mehendi Artistry"], savings: "₹15,000" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <button onClick={() => setShowCart(true)} style={styles.cartBtn}><ShoppingCart size={22} />{cart.length > 0 && <span style={styles.cartCount}>{cart.length}</span>}</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.heroSection}><h1 style={styles.title}>Build Your Package</h1><p style={styles.subtitle}>Curate your perfect wedding vendor team</p></div>

        <div style={styles.powerPairsSection}>
          <h2 style={styles.sectionTitle}><Sparkles size={24} color="#E77291" /> Power Pairs <span style={styles.sectionSubtitle}>Save up to ₹50,000</span></h2>
          <div style={styles.powerPairsGrid}>
            {powerPairs.map((pair, i) => (
              <div key={i} style={styles.powerPairCard}>
                <h3>{pair.title}</h3>
                <div style={styles.powerPairDiscount}><Sparkles size={14} /> Save {pair.savings} when booked together</div>
                <button style={styles.powerPairBtn}>Book Power Pair →</button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.vendorsSection}>
          <h2 style={styles.sectionTitle}>All Vendors</h2>
          <div style={styles.vendorsGrid}>
            {vendors.map(vendor => (
              <div key={vendor.id} style={styles.vendorCard}>
                <img src={vendor.image} alt={vendor.name} style={styles.vendorImage} />
                <div style={styles.vendorInfo}>
                  <h3>{vendor.name}</h3>
                  <p>{vendor.category}</p>
                  <p><MapPin size={12} /> {vendor.location}</p>
                  <div><span>{vendor.price}</span><span>{vendor.originalPrice}</span></div>
                  <div><button onClick={() => {}}>View Details</button><button onClick={() => addToCart(vendor)}><Plus size={14} /> Add</button></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCart && (
        <div style={styles.modalOverlay} onClick={() => setShowCart(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Your Package ({cart.length})</h3><button onClick={() => setShowCart(false)}>✕</button></div>
            <div style={styles.modalContent}>
              {cart.length === 0 ? <p>Your package is empty</p> : <>
                {cart.map(v => <div key={v.id}><img src={v.image} /><div><strong>{v.name}</strong><br />{v.price}</div><button onClick={() => removeFromCart(v.id)}>Remove</button></div>)}
                <div><p>Total Savings: ₹{getTotalSavings().toLocaleString()}</p><button>Request Quotes</button></div>
              </>}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px" },
  cartBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 12px", borderRadius: "10px", position: "relative" },
  cartCount: { position: "absolute", top: "-5px", right: "-5px", background: "#AC1634", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "48px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  powerPairsSection: { marginBottom: "48px" },
  sectionTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#3E0014", display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" },
  sectionSubtitle: { fontSize: "14px", color: "#AC1634", fontWeight: "normal" },
  powerPairsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" },
  powerPairCard: { background: "white", borderRadius: "20px", padding: "24px", textAlign: "center", border: "1px solid #F5D0DA" },
  powerPairDiscount: { background: "#FDF0F3", padding: "12px", borderRadius: "12px", marginBottom: "16px", color: "#AC1634" },
  powerPairBtn: { width: "100%", padding: "12px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer" },
  vendorsSection: { marginTop: "24px" },
  vendorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" },
  vendorCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA" },
  vendorImage: { width: "100%", height: "200px", objectFit: "cover" },
  vendorInfo: { padding: "20px" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "450px" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalContent: { padding: "20px" }
};