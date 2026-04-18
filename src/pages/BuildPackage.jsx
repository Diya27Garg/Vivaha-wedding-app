// src/pages/BuildPackage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, Heart, Award, Clock, MapPin, CheckCircle, Camera, 
  Users, Calendar, TrendingUp, Sparkles, ChevronRight, X, 
  ShoppingCart, Plus, Minus, Verified, Home, Package, User,
  Briefcase, MessageCircle, Phone, Mail
} from "lucide-react";
import { bookingService } from "../services/bookingService";
import BookingRequestModal from "../components/BookingRequestModal";

export default function BuildPackage() {
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [savedVendors, setSavedVendors] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVendorForBooking, setSelectedVendorForBooking] = useState(null);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    loadMyBookings();
  }, []);

  const loadMyBookings = async () => {
    const bookings = await bookingService.getCoupleBookings();
    setMyBookings(bookings);
  };

  const vendors = [
    {
      id: 1,
      name: "Lens & Love Studio",
      category: "Photography",
      subCategory: "Photography + Cinematography",
      rating: 4.9,
      reviews: 234,
      price: "₹85,000",
      originalPrice: "₹1,00,000",
      discount: "Save ₹15,000",
      location: "Mumbai, Delhi, Jaipur",
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da",
      coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      description: "Award-winning wedding photographers capturing candid moments with artistic vision. Specializing in cinematic storytelling and natural light photography.",
      experience: "10+ years",
      weddingsDone: 450,
      team: 8,
      responseTime: "< 1 hour",
      certifications: ["ISO Certified", "Wedding Academy Award 2024"],
      portfolio: [
        "https://images.unsplash.com/photo-1519741497674-611481863552",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
        "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b"
      ],
      testimonials: [
        { name: "Priya & Raj", text: "Absolutely amazing! Captured every moment perfectly.", rating: 5, date: "Dec 2024" }
      ],
      trustBadges: ["Top Rated", "Verified", "Popular Choice"],
      isPremium: true,
      powerPair: "Golden Hour Films",
      pairDiscount: "Book together and save ₹20,000"
    },
    {
      id: 2,
      name: "Royal Blooms Decor",
      category: "Decor",
      subCategory: "Decor + Lighting",
      rating: 4.9,
      reviews: 456,
      price: "₹1,20,000",
      originalPrice: "₹1,50,000",
      discount: "Save ₹30,000",
      location: "Delhi NCR, Jaipur, Mumbai",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      description: "Luxury floral decorations and venue styling. Creating dream wedding setups with fresh flowers.",
      experience: "12+ years",
      weddingsDone: 680,
      team: 25,
      responseTime: "< 1 hour",
      certifications: ["Best Decor Award 2024"],
      portfolio: ["https://images.unsplash.com/photo-1519225421980-715cb0215aed"],
      testimonials: [{ name: "Riya & Karan", text: "The decor was beyond our imagination!", rating: 5, date: "Feb 2025" }],
      trustBadges: ["Top Rated", "Luxury Specialist"],
      isPremium: true,
      powerPair: "Luminary Events"
    },
    {
      id: 3,
      name: "Glam by Priya",
      category: "Makeup",
      subCategory: "Makeup + Mehendi",
      rating: 5.0,
      reviews: 567,
      price: "₹45,000",
      originalPrice: "₹55,000",
      discount: "Save ₹10,000",
      location: "Mumbai, Delhi, Bangalore",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
      coverImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
      description: "Celebrity makeup artist team specializing in bridal makeup. Airbrush techniques and custom looks.",
      experience: "10+ years",
      weddingsDone: 890,
      team: 12,
      responseTime: "< 30 min",
      certifications: ["Best Bridal Makeup Artist 2024"],
      portfolio: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2"],
      testimonials: [{ name: "Priyanka & Rohit", text: "Made me look like a princess!", rating: 5, date: "Jan 2025" }],
      trustBadges: ["Top Rated", "Celebrity MUA"],
      isPremium: true,
      powerPair: "Mehendi Artistry"
    },
    {
      id: 4,
      name: "Grand Feast Caterers",
      category: "Catering",
      subCategory: "Catering",
      rating: 4.7,
      reviews: 890,
      price: "₹1,80,000",
      originalPrice: "₹2,10,000",
      discount: "Save ₹30,000",
      location: "Pan India",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033",
      coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033",
      description: "Exquisite multi-cuisine catering with 500+ wedding menus.",
      experience: "15+ years",
      weddingsDone: 2500,
      team: 200,
      responseTime: "< 1 hour",
      certifications: ["FSSAI Certified", "Best Caterer Award 2024"],
      portfolio: ["https://images.unsplash.com/photo-1555244162-803834f70033"],
      testimonials: [{ name: "Meera & Arjun", text: "The food was the highlight!", rating: 5, date: "Feb 2025" }],
      trustBadges: ["Hygiene Certified", "Popular Choice"],
      isPremium: false
    },
    {
      id: 5,
      name: "Beat Masters DJ",
      category: "Music",
      subCategory: "Entertainment",
      rating: 4.6,
      reviews: 345,
      price: "₹60,000",
      originalPrice: "₹75,000",
      discount: "Save ₹15,000",
      location: "Pan India",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
      coverImage: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
      description: "Professional DJ services with latest sound equipment and lighting.",
      experience: "8+ years",
      weddingsDone: 1200,
      team: 5,
      responseTime: "< 2 hours",
      certifications: ["Best DJ Award 2024"],
      portfolio: ["https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec"],
      testimonials: [{ name: "Neha & Amit", text: "Kept the party going all night!", rating: 4.8, date: "Jan 2025" }],
      trustBadges: ["Popular Choice"],
      isPremium: false
    },
    {
      id: 6,
      name: "Dream Venues",
      category: "Venue",
      subCategory: "Venue",
      rating: 4.9,
      reviews: 567,
      price: "₹5,00,000",
      originalPrice: "₹6,00,000",
      discount: "Save ₹1,00,000",
      location: "Jaipur, Udaipur, Goa",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      description: "Luxury heritage venues for royal weddings.",
      experience: "25+ years",
      weddingsDone: 1200,
      team: 150,
      responseTime: "< 2 hours",
      certifications: ["Luxury Hotel Award", "Best Destination Venue"],
      portfolio: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"],
      testimonials: [{ name: "Sarah & Michael", text: "Royal treatment! Unforgettable!", rating: 5, date: "Jan 2025" }],
      trustBadges: ["Luxury Certified", "Top Venue"],
      isPremium: true
    }
  ];

  const soloExperts = vendors.filter(v => v.category === "Photography" || v.category === "Cinematography");
  const topVendors = vendors.filter(v => v.rating >= 4.8);

  const addToCart = (vendor) => {
    if (!cart.find(v => v.id === vendor.id)) {
      setCart([...cart, vendor]);
    }
  };

  const removeFromCart = (vendorId) => {
    setCart(cart.filter(v => v.id !== vendorId));
  };

  const toggleSaveVendor = (vendorId) => {
    if (savedVendors.includes(vendorId)) {
      setSavedVendors(savedVendors.filter(id => id !== vendorId));
    } else {
      setSavedVendors([...savedVendors, vendorId]);
    }
  };

  const getTotalSavings = () => {
    return cart.reduce((total, vendor) => {
      const original = parseInt(vendor.originalPrice?.replace(/[^0-9]/g, '') || 0);
      const current = parseInt(vendor.price?.replace(/[^0-9]/g, '') || 0);
      return total + (original - current);
    }, 0);
  };

  const handleBookingRequest = async (vendor, requirements) => {
    try {
      const result = await bookingService.sendBookingRequest(vendor.id, {}, requirements);
      if (result) {
        alert(`✅ Booking request sent to ${vendor.name}!\n\nThey will review and respond within 24 hours.`);
        setShowBookingModal(false);
        loadMyBookings();
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const VendorCard = ({ vendor }) => (
    <div style={styles.vendorCard}>
      <div style={styles.cardImageContainer}>
        <img src={vendor.image} alt={vendor.name} style={styles.cardImage} />
        <button style={styles.saveBtn} onClick={() => toggleSaveVendor(vendor.id)}>
          <Heart size={18} fill={savedVendors.includes(vendor.id) ? "#E77291" : "none"} color={savedVendors.includes(vendor.id) ? "#E77291" : "#999"} />
        </button>
        {vendor.discount && <div style={styles.discountBadge}>{vendor.discount}</div>}
      </div>
      <div style={styles.cardContent}>
        <div style={styles.cardHeader}>
          <h3 style={styles.vendorName}>{vendor.name}</h3>
          <div style={styles.rating}><Star size={14} fill="#FFD700" color="#FFD700" /><span>{vendor.rating}</span></div>
        </div>
        <p style={styles.vendorCategory}>{vendor.category}</p>
        <p style={styles.vendorLocation}><MapPin size={12} /> {vendor.location}</p>
        <div style={styles.priceRow}>
          <p style={styles.currentPrice}>{vendor.price}</p>
          {vendor.originalPrice && <p style={styles.originalPrice}>{vendor.originalPrice}</p>}
        </div>
        <div style={styles.trustBadges}>
          {vendor.trustBadges?.slice(0, 2).map((badge, i) => (
            <span key={i} style={styles.trustBadge}><CheckCircle size={10} /> {badge}</span>
          ))}
        </div>
        <div style={styles.cardActions}>
          <button style={styles.detailsBtn} onClick={() => setSelectedVendor(vendor)}>View Details</button>
          <button style={styles.bookBtn} onClick={() => {
            setSelectedVendorForBooking(vendor);
            setShowBookingModal(true);
          }}>Book Now</button>
        </div>
      </div>
    </div>
  );

  const VendorDetailModal = ({ vendor, onClose }) => (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={modalStyles.closeBtn} onClick={onClose}><X size={24} /></button>
        <div style={modalStyles.coverContainer}>
          <img src={vendor.coverImage} alt={vendor.name} style={modalStyles.coverImage} />
        </div>
        <div style={modalStyles.content}>
          <h2 style={modalStyles.name}>{vendor.name}</h2>
          <p style={modalStyles.category}>{vendor.category}</p>
          <div style={modalStyles.rating}><Star size={18} fill="#FFD700" /> {vendor.rating} ({vendor.reviews} reviews)</div>
          <p style={modalStyles.description}>{vendor.description}</p>
          <div style={modalStyles.stats}>
            <div><strong>{vendor.weddingsDone}+</strong> Weddings</div>
            <div><strong>{vendor.responseTime}</strong> Response</div>
            <div><strong>{vendor.team}</strong> Team</div>
          </div>
          <div style={modalStyles.priceSection}>
            <p style={modalStyles.price}>{vendor.price}</p>
            {vendor.originalPrice && <p style={modalStyles.originalPrice}>{vendor.originalPrice}</p>}
          </div>
          <button style={modalStyles.bookBtn} onClick={() => {
            setSelectedVendorForBooking(vendor);
            setShowBookingModal(true);
            onClose();
          }}>Book This Vendor</button>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Package size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Build Your Package</h1>
        <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
          <ShoppingCart size={20} />
          {cart.length > 0 && <span style={styles.cartCount}>{cart.length}</span>}
        </button>
      </div>

      <div style={styles.tabs}>
        <button style={{...styles.tab, ...(activeCategory === "all" ? styles.activeTab : {})}} onClick={() => setActiveCategory("all")}>All</button>
        <button style={{...styles.tab, ...(activeCategory === "solo" ? styles.activeTab : {})}} onClick={() => setActiveCategory("solo")}>Solo Experts</button>
        <button style={{...styles.tab, ...(activeCategory === "top" ? styles.activeTab : {})}} onClick={() => setActiveCategory("top")}>Top Rated</button>
      </div>

      <div style={styles.content}>
        {activeCategory === "solo" && (
          <div style={styles.vendorsGrid}>
            {soloExperts.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
          </div>
        )}

        {activeCategory === "top" && (
          <div style={styles.vendorsGrid}>
            {topVendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
          </div>
        )}

        {activeCategory === "all" && (
          <>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}><Briefcase size={20} /> All Vendors</h2>
              <div style={styles.vendorsGrid}>
                {vendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div style={modalStyles.overlay} onClick={() => setShowCart(false)}>
          <div style={{...modalStyles.modal, maxWidth: 500}} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.cartHeader}>
              <h3>Your Package ({cart.length} items)</h3>
              <button onClick={() => setShowCart(false)} style={modalStyles.closeBtn}><X size={20} /></button>
            </div>
            <div style={modalStyles.cartContent}>
              {cart.length === 0 ? (
                <p style={{ textAlign: "center", padding: 40 }}>Your package is empty</p>
              ) : (
                <>
                  {cart.map(vendor => (
                    <div key={vendor.id} style={modalStyles.cartItem}>
                      <img src={vendor.image} style={modalStyles.cartItemImage} />
                      <div style={{ flex: 1 }}><strong>{vendor.name}</strong><br />{vendor.price}</div>
                      <button onClick={() => removeFromCart(vendor.id)} style={modalStyles.removeBtn}>Remove</button>
                    </div>
                  ))}
                  <div style={modalStyles.cartFooter}>
                    <p>Total Savings: ₹{getTotalSavings().toLocaleString()}</p>
                    <button style={modalStyles.checkoutBtn}>Request Quotes</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Vendor Detail Modal */}
      {selectedVendor && <VendorDetailModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />}

      {/* Booking Request Modal */}
      {showBookingModal && selectedVendorForBooking && (
        <BookingRequestModal
          vendor={selectedVendorForBooking}
          onClose={() => setShowBookingModal(false)}
          onSubmit={(requirements) => handleBookingRequest(selectedVendorForBooking, requirements)}
        />
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav" style={styles.bottomNav}>
        {navItems.map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} style={{
            ...styles.navItem,
            ...(window.location.pathname === item.path ? styles.navItemActive : {})
          }}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif", paddingBottom: "80px" },
  header: { background: "#3E0014", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 },
  title: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "24px", color: "white", margin: 0 },
  cartBtn: { background: "#E77291", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" },
  cartCount: { position: "absolute", top: -5, right: -5, background: "#AC1634", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  tabs: { display: "flex", gap: "8px", padding: "16px", background: "white", borderBottom: "1px solid #F5D0DA" },
  tab: { flex: 1, padding: "10px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  activeTab: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  content: { padding: "16px" },
  section: { marginBottom: "32px" },
  sectionTitle: { fontSize: "20px", fontWeight: 600, color: "#3E0014", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
  vendorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" },
  vendorCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA", transition: "transform 0.2s", cursor: "pointer" },
  cardImageContainer: { position: "relative" },
  cardImage: { width: "100%", height: "200px", objectFit: "cover" },
  saveBtn: { position: "absolute", top: "12px", right: "12px", background: "white", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  discountBadge: { position: "absolute", bottom: "12px", left: "12px", background: "#AC1634", color: "white", padding: "4px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600 },
  cardContent: { padding: "16px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  vendorName: { fontSize: "16px", fontWeight: 600, color: "#3E0014", margin: 0 },
  rating: { display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" },
  vendorCategory: { fontSize: "12px", color: "#E77291", marginBottom: "6px" },
  vendorLocation: { fontSize: "11px", color: "#999", marginBottom: "10px", display: "flex", alignItems: "center", gap: "4px" },
  priceRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" },
  currentPrice: { fontSize: "16px", fontWeight: 700, color: "#AC1634", margin: 0 },
  originalPrice: { fontSize: "12px", color: "#999", textDecoration: "line-through", margin: 0 },
  trustBadges: { display: "flex", gap: "8px", marginBottom: "12px" },
  trustBadge: { fontSize: "9px", padding: "2px 6px", background: "#FDF0F3", borderRadius: "999px", display: "flex", alignItems: "center", gap: "4px" },
  cardActions: { display: "flex", gap: "10px" },
  detailsBtn: { flex: 1, padding: "8px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "12px" },
  bookBtn: { flex: 1, padding: "8px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #F5D0DA", padding: "10px 20px", display: "flex", justifyContent: "space-around", zIndex: 100 },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "10px" },
  navItemActive: { color: "#AC1634" }
};

const modalStyles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: 500, maxHeight: "80vh", overflow: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: 16, right: 16, background: "white", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 },
  coverContainer: { height: 200, overflow: "hidden" },
  coverImage: { width: "100%", height: "100%", objectFit: "cover" },
  content: { padding: 24 },
  name: { fontSize: 24, fontWeight: 700, color: "#3E0014", marginBottom: 8 },
  category: { fontSize: 14, color: "#E77291", marginBottom: 12 },
  rating: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16 },
  description: { fontSize: 14, color: "#666", lineHeight: 1.5, marginBottom: 20 },
  stats: { display: "flex", justifyContent: "space-around", padding: 16, background: "#FDF0F3", borderRadius: 16, marginBottom: 20, textAlign: "center", fontSize: 14 },
  priceSection: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 },
  price: { fontSize: 28, fontWeight: 700, color: "#AC1634", margin: 0 },
  originalPrice: { fontSize: 16, color: "#999", textDecoration: "line-through", margin: 0 },
  bookBtn: { width: "100%", padding: 14, borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600 },
  cartHeader: { padding: 20, borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  cartContent: { padding: 20 },
  cartItem: { display: "flex", alignItems: "center", gap: 12, padding: 12, borderBottom: "1px solid #F5D0DA" },
  cartItemImage: { width: 50, height: 50, borderRadius: 8, objectFit: "cover" },
  removeBtn: { background: "none", border: "none", cursor: "pointer", color: "#999" },
  cartFooter: { marginTop: 20, paddingTop: 16, borderTop: "1px solid #F5D0DA" },
  checkoutBtn: { width: "100%", padding: 12, borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", fontWeight: 600, marginTop: 12 }
};