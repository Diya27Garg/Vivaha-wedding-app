// src/pages/BuildPackage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, Heart, Award, Clock, MapPin, CheckCircle, Camera, 
  Users, Calendar, TrendingUp, Sparkles, ChevronRight, X, 
  ShoppingCart, Plus, Verified, Home, Package, User,
  Briefcase, MessageCircle, Phone, Mail, Tag, Gift, Zap,
  Shield, Truck, Leaf, Music, Palette, Utensils, Menu,
  Filter, Sliders, ChevronDown
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import { bookingService } from "../services/bookingService";
import GlobalNotifications from "../components/GlobalNotifications";
import BookingRequestModal from "../components/BookingRequestModal";

export default function BuildPackage({ user, setUser }) {
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVendorForBooking, setSelectedVendorForBooking] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [hoveredVendor, setHoveredVendor] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Persistent Category Filter
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Power pair selections
  const [powerPair1Cat1, setPowerPair1Cat1] = useState("Photography");
  const [powerPair1Cat2, setPowerPair1Cat2] = useState("Cinematography");
  const [selectedPhotoVendor, setSelectedPhotoVendor] = useState(null);
  const [selectedCineVendor, setSelectedCineVendor] = useState(null);
  
  const [powerPair2Cat1, setPowerPair2Cat1] = useState("Decor");
  const [powerPair2Cat2, setPowerPair2Cat2] = useState("Lighting");
  const [selectedDecorVendor, setSelectedDecorVendor] = useState(null);
  const [selectedLightVendor, setSelectedLightVendor] = useState(null);
  
  const [powerPair3Cat1, setPowerPair3Cat1] = useState("Makeup");
  const [powerPair3Cat2, setPowerPair3Cat2] = useState("Mehendi");
  const [selectedMakeupVendor, setSelectedMakeupVendor] = useState(null);
  const [selectedMehendiVendor, setSelectedMehendiVendor] = useState(null);

  const vendors = [
    {
      id: 1, name: "Lens & Love Studio", category: "Photography",
      rating: 4.9, reviews: 234, price: "₹85,000", originalPrice: "₹1,00,000",
      discount: "Save ₹15,000", location: "Mumbai, Delhi, Jaipur",
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da",
      experience: "10+ years", weddingsDone: 450, responseTime: "< 1 hour",
      trustBadges: ["Top Rated", "Verified"], isPremium: true, ecoFriendly: true,
      description: "Award-winning wedding photographers capturing candid moments."
    },
    {
      id: 2, name: "Golden Hour Films", category: "Cinematography",
      rating: 4.8, reviews: 189, price: "₹1,20,000", originalPrice: "₹1,40,000",
      discount: "Save ₹20,000", location: "Pan India",
      image: "https://images.unsplash.com/photo-1536240474400-3d6d5b6a6b3c",
      experience: "8+ years", weddingsDone: 320, responseTime: "< 2 hours",
      trustBadges: ["Top Rated"], isPremium: true, ecoFriendly: true,
      description: "Cinematic wedding films that tell your unique love story."
    },
    {
      id: 3, name: "Royal Blooms Decor", category: "Decor",
      rating: 4.9, reviews: 456, price: "₹1,20,000", originalPrice: "₹1,50,000",
      discount: "Save ₹30,000", location: "Delhi NCR, Jaipur, Mumbai",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      experience: "12+ years", weddingsDone: 680, responseTime: "< 1 hour",
      trustBadges: ["Top Rated", "Luxury Specialist"], isPremium: true, ecoFriendly: true,
      description: "Luxury floral decorations and venue styling."
    },
    {
      id: 4, name: "Luminary Events", category: "Lighting",
      rating: 4.7, reviews: 234, price: "₹80,000", originalPrice: "₹1,00,000",
      discount: "Save ₹20,000", location: "Pan India",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      experience: "8+ years", weddingsDone: 420, responseTime: "< 2 hours",
      trustBadges: ["Creative Excellence"], isPremium: false, ecoFriendly: true,
      description: "Transform your venue with magical lighting designs."
    },
    {
      id: 5, name: "Glam by Priya", category: "Makeup",
      rating: 5.0, reviews: 567, price: "₹45,000", originalPrice: "₹55,000",
      discount: "Save ₹10,000", location: "Mumbai, Delhi, Bangalore",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
      experience: "10+ years", weddingsDone: 890, responseTime: "< 30 min",
      trustBadges: ["Top Rated", "Celebrity MUA"], isPremium: true, ecoFriendly: false,
      description: "Celebrity makeup artist team specializing in bridal makeup."
    },
    {
      id: 6, name: "Mehendi Artistry", category: "Mehendi",
      rating: 4.8, reviews: 423, price: "₹35,000", originalPrice: "₹45,000",
      discount: "Save ₹10,000", location: "Pan India",
      image: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b",
      experience: "12+ years", weddingsDone: 1200, responseTime: "< 1 hour",
      trustBadges: ["Top Rated"], isPremium: false, ecoFriendly: true,
      description: "Award-winning mehendi artists creating intricate designs."
    },
    {
      id: 7, name: "Grand Feast Caterers", category: "Catering",
      rating: 4.7, reviews: 890, price: "₹1,80,000", originalPrice: "₹2,10,000",
      discount: "Save ₹30,000", location: "Pan India",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033",
      experience: "15+ years", weddingsDone: 2500, responseTime: "< 1 hour",
      trustBadges: ["Hygiene Certified", "Popular Choice"], isPremium: false, ecoFriendly: true,
      description: "Exquisite multi-cuisine catering with 500+ wedding menus."
    },
    {
      id: 8, name: "Beat Masters DJ", category: "Music",
      rating: 4.6, reviews: 345, price: "₹60,000", originalPrice: "₹75,000",
      discount: "Save ₹15,000", location: "Pan India",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
      experience: "8+ years", weddingsDone: 1200, responseTime: "< 2 hours",
      trustBadges: ["Popular Choice"], isPremium: false, ecoFriendly: false,
      description: "Professional DJ services with latest sound equipment."
    },
    {
      id: 9, name: "Dream Venues", category: "Venue",
      rating: 4.9, reviews: 567, price: "₹5,00,000", originalPrice: "₹6,00,000",
      discount: "Save ₹1,00,000", location: "Jaipur, Udaipur, Goa",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      experience: "25+ years", weddingsDone: 1200, responseTime: "< 2 hours",
      trustBadges: ["Luxury Certified", "Top Venue"], isPremium: true, ecoFriendly: true,
      description: "Luxury heritage venues for royal weddings."
    }
  ];

  const allCategories = ["all", ...new Set(vendors.map(v => v.category))];
  const filteredVendors = selectedCategory === "all" ? vendors : vendors.filter(v => v.category === selectedCategory);
  const topVendors = vendors.filter(v => v.rating >= 4.8);
  const soloExperts = vendors.filter(v => v.category === "Photography" || v.category === "Cinematography" || v.category === "Makeup");

  const addToCart = (vendor) => {
    if (!cart.find(v => v.id === vendor.id)) {
      setCart([...cart, vendor]);
    }
  };

  const removeFromCart = (vendorId) => {
    setCart(cart.filter(v => v.id !== vendorId));
  };

  const getTotalSavings = () => {
    return cart.reduce((total, vendor) => {
      const original = parseInt(vendor.originalPrice?.replace(/[^0-9]/g, '') || 0);
      const current = parseInt(vendor.price?.replace(/[^0-9]/g, '') || 0);
      return total + (original - current);
    }, 0);
  };

  const getBulkDiscount = () => {
    const vendorCount = cart.length;
    if (vendorCount >= 3) {
      return { applied: true, discount: 15, message: "15% OFF on total booking!" };
    }
    return { applied: false, discount: 0, message: `Book ${3 - vendorCount} more to get 15% OFF` };
  };

  const bulkDiscount = getBulkDiscount();

  const handleBookingRequest = async (vendor, requirements) => {
    try {
      const result = await bookingService.sendBookingRequest(vendor.id, {}, requirements);
      if (result) {
        alert(`✅ Booking request sent to ${vendor.name}!\n\nThey will review and respond within 24 hours.`);
        setShowBookingModal(false);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const VendorCard = ({ vendor }) => (
    <div style={styles.vendorCard} onMouseEnter={() => setHoveredVendor(vendor.id)} onMouseLeave={() => setHoveredVendor(null)}>
      <div style={styles.cardImageContainer}>
        <img src={vendor.image} alt={vendor.name} style={styles.cardImage} />
        {vendor.discount && <div style={styles.discountBadge}>{vendor.discount}</div>}
        {vendor.ecoFriendly && <div style={styles.ecoBadge}>🌿 Eco-Friendly</div>}
      </div>
      <div style={styles.cardContent}>
        <div style={styles.cardHeader}>
          <h3 style={styles.vendorName}>{vendor.name}</h3>
          <div style={styles.rating}><Star size={14} fill="#FFD700" /> {vendor.rating}</div>
        </div>
        <p style={styles.vendorCategory}>{vendor.category}</p>
        <p style={styles.vendorLocation}><MapPin size={12} /> {vendor.location}</p>
        <div style={styles.priceRow}>
          <p style={styles.currentPrice}>{vendor.price}</p>
          {vendor.originalPrice && <p style={styles.originalPrice}>{vendor.originalPrice}</p>}
        </div>
        <div style={styles.cardActions}>
          <button style={styles.detailsBtn} onClick={() => setSelectedVendor(vendor)}>View Details</button>
          <button style={styles.bookBtn} onClick={() => { setSelectedVendorForBooking(vendor); setShowBookingModal(true); }}>Book Now</button>
        </div>
      </div>
    </div>
  );

  const VendorDetailModal = ({ vendor, onClose }) => {
    if (!vendor) return null;
    
    return (
      <div style={modalStyles.overlay} onClick={onClose}>
        <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
          <button style={modalStyles.closeBtn} onClick={onClose}><X size={24} /></button>
          <div style={modalStyles.coverContainer}>
            <img src={vendor.image} alt={vendor.name} style={modalStyles.coverImage} />
            {vendor.ecoFriendly && <div style={modalStyles.ecoTag}>🌿 Eco-Friendly Vendor</div>}
          </div>
          <div style={modalStyles.content}>
            <h2 style={modalStyles.name}>{vendor.name}</h2>
            <div style={modalStyles.rating}>
              <Star size={18} fill="#FFD700" color="#FFD700" />
              <span>{vendor.rating}</span>
              <span style={modalStyles.reviews}>({vendor.reviews} reviews)</span>
            </div>
            <div style={modalStyles.badges}>
              {vendor.trustBadges?.map((badge, i) => (<span key={i} style={modalStyles.badge}>✅ {badge}</span>))}
              {vendor.isPremium && <span style={modalStyles.premiumBadge}>👑 Premium</span>}
            </div>
            <p style={modalStyles.description}>{vendor.description}</p>
            <div style={modalStyles.statsGrid}>
              <div style={modalStyles.statItem}><Clock size={16} color="#AC1634" /><div><p style={modalStyles.statValue}>{vendor.responseTime}</p><p style={modalStyles.statLabel}>Response Time</p></div></div>
              <div style={modalStyles.statItem}><Users size={16} color="#AC1634" /><div><p style={modalStyles.statValue}>{vendor.weddingsDone}+</p><p style={modalStyles.statLabel}>Weddings Done</p></div></div>
              <div style={modalStyles.statItem}><Award size={16} color="#AC1634" /><div><p style={modalStyles.statValue}>{vendor.experience}</p><p style={modalStyles.statLabel}>Experience</p></div></div>
            </div>
            <div style={modalStyles.priceSection}>
              <div>
                <p style={modalStyles.priceLabel}>Starting Price</p>
                <p style={modalStyles.price}>{vendor.price}</p>
                {vendor.originalPrice && <p style={modalStyles.originalPrice}>{vendor.originalPrice}</p>}
              </div>
              <button style={modalStyles.bookBtn} onClick={() => { setSelectedVendorForBooking(vendor); setShowBookingModal(true); onClose(); }}>Book Now <ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PowerPairCard = ({ title, category1, category2, category1Value, category2Value, onCategory1Change, onCategory2Change, leftVendors, rightVendors, selectedLeft, selectedRight, onLeftSelect, onRightSelect, savings }) => (
    <div style={styles.powerPairCard}>
      <h3 style={styles.powerPairTitle}>{title}</h3>
      <div style={styles.powerPairCategorySelectors}>
        <div style={styles.powerPairCategoryWrapper}>
          <label>Select Category 1</label>
          <select value={category1Value} onChange={(e) => onCategory1Change(e.target.value)}>
            {allCategories.filter(c => c !== "all").map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
        <div style={styles.powerPairPlus}>+</div>
        <div style={styles.powerPairCategoryWrapper}>
          <label>Select Category 2</label>
          <select value={category2Value} onChange={(e) => onCategory2Change(e.target.value)}>
            {allCategories.filter(c => c !== "all").map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
      </div>
      <div style={styles.powerPairVendors}>
        <div style={styles.powerPairVendor}>
          <label>Select {category1Value} Vendor</label>
          <select value={selectedLeft?.id || ""} onChange={(e) => { const vendor = leftVendors.find(v => v.id === parseInt(e.target.value)); onLeftSelect(vendor); }}>
            <option value="">Choose {category1Value} vendor...</option>
            {leftVendors.map(v => (<option key={v.id} value={v.id}>{v.name} - {v.price} ⭐ {v.rating}</option>))}
          </select>
          {selectedLeft && (<div style={styles.powerPairPreview}><img src={selectedLeft.image} alt={selectedLeft.name} style={styles.powerPairPreviewImg} /><div><p>{selectedLeft.name}</p><small>⭐ {selectedLeft.rating}</small></div></div>)}
        </div>
        <div style={styles.powerPairPlus}>+</div>
        <div style={styles.powerPairVendor}>
          <label>Select {category2Value} Vendor</label>
          <select value={selectedRight?.id || ""} onChange={(e) => { const vendor = rightVendors.find(v => v.id === parseInt(e.target.value)); onRightSelect(vendor); }}>
            <option value="">Choose {category2Value} vendor...</option>
            {rightVendors.map(v => (<option key={v.id} value={v.id}>{v.name} - {v.price} ⭐ {v.rating}</option>))}
          </select>
          {selectedRight && (<div style={styles.powerPairPreview}><img src={selectedRight.image} alt={selectedRight.name} style={styles.powerPairPreviewImg} /><div><p>{selectedRight.name}</p><small>⭐ {selectedRight.rating}</small></div></div>)}
        </div>
      </div>
      <div style={styles.powerPairDiscount}><Sparkles size={14} /> Save {savings} when booked together!</div>
      <button style={styles.powerPairBtn} onClick={() => { if (selectedLeft && selectedRight) { addToCart(selectedLeft); addToCart(selectedRight); alert(`✅ Added ${selectedLeft.name} and ${selectedRight.name} to your package!`); } else { alert("⚠️ Please select both vendors first"); } }}>Book Power Pair → <ChevronRight size={14} /></button>
    </div>
  );

  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/home" },
    { icon: <Package size={22} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={22} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={22} />, label: "Package", path: "/package" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" }
  ];

  const menuItems = [
    { icon: "💌", label: "Invitation Designer", path: "/invitation-design" },
    { icon: "💰", label: "Budget Planner", path: "/budget-planner" },
    { icon: "🧘", label: "Emotional Wellness", path: "/wellness" },
    { icon: "🌿", label: "Sustainable Wedding", path: "/sustainability" },
    { icon: "🤖", label: "AI Wedding Assistant", isModal: true },
    { icon: "🕉️", label: "Rasam & Riwaz", path: "/rasam-riwaz" },
    { icon: "📜", label: "Legal & Documents", path: "/legal-docs" }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => setMenuOpen(true)} style={styles.menuBtn}><Menu size={22} /></button>
          <HindiLogo size="small" />
          <div style={styles.headerRight}>
            <GlobalNotifications user={user} />
            <button onClick={() => setShowAIAssistant(true)} style={styles.aiBtn}><Sparkles size={20} /></button>
            <button onClick={() => setShowCart(true)} style={styles.cartBtn}><ShoppingCart size={22} />{cart.length > 0 && <span style={styles.cartCount}>{cart.length}</span>}</button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={styles.overlay} />
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}><HindiLogo size="small" /><button onClick={() => setMenuOpen(false)} style={styles.closeBtn}><X size={22} /></button></div>
            {navItems.map(n => (<div key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }} style={styles.sidebarItem}><span style={styles.sidebarIcon}>{n.icon}</span>{n.label}</div>))}
            <div style={styles.divider} /><p style={styles.sidebarSectionTitle}>WEDDING TOOLS</p>
            {menuItems.map(item => (<div key={item.label} onClick={() => { if (item.isModal) { setShowAIAssistant(true); } else if (item.path) { navigate(item.path); } setMenuOpen(false); }} style={styles.sidebarItem}><span style={styles.sidebarEmoji}>{item.icon}</span>{item.label}</div>))}
            <div style={styles.sidebarFooter}><div onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}><LogOut size={18} /> Logout</div></div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}><h1 style={styles.title}>Build Your Package</h1><p style={styles.subtitle}>Curate your perfect wedding vendor team</p></div>

        {/* Offer Banner */}
        <div style={styles.offerBanner}>
          <div style={styles.offerIcon}><Gift size={24} color="#E77291" /><Tag size={20} color="#E77291" /></div>
          <div style={styles.offerText}><h4>🎉 Bundle & Save Big! 🎉</h4><p>Book <strong>3 or more vendors</strong> and get <strong>15% OFF</strong> on your total booking!</p>
          {!bulkDiscount.applied && cart.length > 0 && <p style={styles.offerProgress}>Book {3 - cart.length} more to unlock 15% OFF</p>}
          {bulkDiscount.applied && <p style={styles.offerActive}>✅ 15% OFF Applied to your package!</p>}</div>
          <button style={styles.offerBtn} onClick={() => setShowOfferModal(true)}>Details</button>
        </div>

        {/* Persistent Category Filter */}
        <div style={styles.filterSection}>
          <div style={styles.filterLabel}><Filter size={16} /> Filter by Category:</div>
          <select style={styles.categoryFilterSelect} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {allCategories.map(cat => (<option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>))}
          </select>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button style={{...styles.tab, ...(activeTab === "all" ? styles.activeTab : {})}} onClick={() => setActiveTab("all")}>All Vendors</button>
          <button style={{...styles.tab, ...(activeTab === "pairs" ? styles.activeTab : {})}} onClick={() => setActiveTab("pairs")}>Power Pairs</button>
          <button style={{...styles.tab, ...(activeTab === "solo" ? styles.activeTab : {})}} onClick={() => setActiveTab("solo")}>Solo Experts</button>
          <button style={{...styles.tab, ...(activeTab === "top" ? styles.activeTab : {})}} onClick={() => setActiveTab("top")}>Top Rated</button>
        </div>

        {/* All Vendors Tab */}
        {activeTab === "all" && (<div style={styles.vendorsGrid}>{filteredVendors.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}</div>)}

        {/* Power Pairs Tab */}
        {activeTab === "pairs" && (
          <div style={styles.powerPairsContainer}>
            <PowerPairCard title="📸 Photography + Cinematography Package" category1="Photography" category2="Cinematography" category1Value={powerPair1Cat1} category2Value={powerPair1Cat2}
              onCategory1Change={(cat) => { setPowerPair1Cat1(cat); setSelectedPhotoVendor(null); }}
              onCategory2Change={(cat) => { setPowerPair1Cat2(cat); setSelectedCineVendor(null); }}
              leftVendors={vendors.filter(v => v.category === powerPair1Cat1)} rightVendors={vendors.filter(v => v.category === powerPair1Cat2)}
              selectedLeft={selectedPhotoVendor} selectedRight={selectedCineVendor}
              onLeftSelect={setSelectedPhotoVendor} onRightSelect={setSelectedCineVendor} savings="₹25,000" />
            
            <PowerPairCard title="🎨 Decor + Lighting Package" category1="Decor" category2="Lighting" category1Value={powerPair2Cat1} category2Value={powerPair2Cat2}
              onCategory1Change={(cat) => { setPowerPair2Cat1(cat); setSelectedDecorVendor(null); }}
              onCategory2Change={(cat) => { setPowerPair2Cat2(cat); setSelectedLightVendor(null); }}
              leftVendors={vendors.filter(v => v.category === powerPair2Cat1)} rightVendors={vendors.filter(v => v.category === powerPair2Cat2)}
              selectedLeft={selectedDecorVendor} selectedRight={selectedLightVendor}
              onLeftSelect={setSelectedDecorVendor} onRightSelect={setSelectedLightVendor} savings="₹30,000" />
            
            <PowerPairCard title="💄 Makeup + Mehendi Package" category1="Makeup" category2="Mehendi" category1Value={powerPair3Cat1} category2Value={powerPair3Cat2}
              onCategory1Change={(cat) => { setPowerPair3Cat1(cat); setSelectedMakeupVendor(null); }}
              onCategory2Change={(cat) => { setPowerPair3Cat2(cat); setSelectedMehendiVendor(null); }}
              leftVendors={vendors.filter(v => v.category === powerPair3Cat1)} rightVendors={vendors.filter(v => v.category === powerPair3Cat2)}
              selectedLeft={selectedMakeupVendor} selectedRight={selectedMehendiVendor}
              onLeftSelect={setSelectedMakeupVendor} onRightSelect={setSelectedMehendiVendor} savings="₹15,000" />
          </div>
        )}

        {/* Solo Experts Tab */}
        {activeTab === "solo" && (<div style={styles.vendorsGrid}>{soloExperts.filter(v => selectedCategory === "all" || v.category === selectedCategory).map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}</div>)}

        {/* Top Rated Tab */}
        {activeTab === "top" && (<div style={styles.vendorsGrid}>{topVendors.filter(v => selectedCategory === "all" || v.category === selectedCategory).map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}</div>)}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div style={styles.modalOverlay} onClick={() => setShowCart(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Your Package ({cart.length} items)</h3><button onClick={() => setShowCart(false)} style={styles.modalClose}>✕</button></div>
            <div style={styles.modalContent}>
              {cart.length === 0 ? (<div style={styles.emptyCart}><ShoppingCart size={48} color="#CCC" /><p>Your package is empty</p><button onClick={() => setShowCart(false)} style={styles.browseBtn}>Browse Vendors</button></div>) : (
                <>
                  {cart.map(vendor => (<div key={vendor.id} style={styles.cartItem}><img src={vendor.image} alt={vendor.name} style={styles.cartItemImage} /><div style={styles.cartItemInfo}><p style={styles.cartItemName}>{vendor.name}</p><p style={styles.cartItemPrice}>{vendor.price}</p></div><button onClick={() => removeFromCart(vendor.id)} style={styles.removeBtn}>Remove</button></div>))}
                  <div style={styles.cartSummary}>
                    <div style={styles.summaryRow}><span>Subtotal:</span><span>₹{(cart.reduce((sum, v) => sum + parseInt(v.price.replace(/[^0-9]/g, '')), 0)).toLocaleString()}</span></div>
                    <div style={styles.summaryRow}><span>Savings:</span><span style={{ color: "#4CAF50" }}>- ₹{getTotalSavings().toLocaleString()}</span></div>
                    {bulkDiscount.applied && (<div style={styles.summaryRow}><span>Bulk Discount (15%):</span><span style={{ color: "#4CAF50" }}>- ₹{Math.floor(cart.reduce((sum, v) => sum + parseInt(v.price.replace(/[^0-9]/g, '')), 0) * 0.15).toLocaleString()}</span></div>)}
                    <div style={styles.summaryTotal}><span>Total:</span><span>₹{Math.floor(cart.reduce((sum, v) => sum + parseInt(v.price.replace(/[^0-9]/g, '')), 0) * (bulkDiscount.applied ? 0.85 : 1)).toLocaleString()}</span></div>
                  </div>
                  <button style={styles.requestQuoteBtn}>Request Quotes from Selected Vendors →</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {showOfferModal && (
        <div style={styles.modalOverlay} onClick={() => setShowOfferModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Bundle Offer Details</h3><button onClick={() => setShowOfferModal(false)} style={styles.modalClose}>✕</button></div>
            <div style={styles.modalContent}><div style={styles.offerDetailCard}><Gift size={32} color="#E77291" /><h4>Book 3+ Vendors, Save 15%</h4><p>When you book 3 or more vendors from Vivaha, you automatically get 15% off your total booking amount!</p><ul style={styles.offerList}><li>✅ Valid on all vendor categories</li><li>✅ Stackable with vendor discounts</li><li>✅ Free wedding coordination consultation included</li><li>✅ Priority support throughout planning</li></ul><button style={styles.offerCloseBtn} onClick={() => setShowOfferModal(false)}>Got it!</button></div></div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedVendorForBooking && (
        <BookingRequestModal vendor={selectedVendorForBooking} onClose={() => setShowBookingModal(false)} onSubmit={(requirements) => handleBookingRequest(selectedVendorForBooking, requirements)} />
      )}

      {/* Vendor Detail Modal */}
      {selectedVendor && <VendorDetailModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />}

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  menuBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  headerRight: { display: "flex", gap: "12px", alignItems: "center" },
  aiBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  cartBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px", position: "relative" },
  cartCount: { position: "absolute", top: "-5px", right: "-5px", background: "#AC1634", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "32px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  offerBanner: { display: "flex", alignItems: "center", gap: "16px", background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "20px", padding: "20px", marginBottom: "32px", color: "white", flexWrap: "wrap" },
  offerIcon: { display: "flex", alignItems: "center", gap: "4px" },
  offerText: { flex: 1 },
  offerProgress: { fontSize: "11px", color: "#E77291", marginTop: "4px" },
  offerActive: { fontSize: "12px", color: "#4CAF50", marginTop: "4px" },
  offerBtn: { background: "#E77291", color: "#3E0014", border: "none", padding: "8px 20px", borderRadius: "999px", cursor: "pointer", fontWeight: 600 },
  filterSection: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", padding: "12px 16px", background: "white", borderRadius: "16px", border: "1px solid #F5D0DA", flexWrap: "wrap" },
  filterLabel: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#3E0014" },
  categoryFilterSelect: { padding: "10px 20px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none", background: "white", cursor: "pointer", minWidth: "180px" },
  tabs: { display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap", justifyContent: "center" },
  tab: { padding: "10px 24px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "14px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" },
  activeTab: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  vendorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" },
  vendorCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA", transition: "transform 0.2s", cursor: "pointer" },
  cardImageContainer: { position: "relative", height: "200px" },
  cardImage: { width: "100%", height: "100%", objectFit: "cover" },
  discountBadge: { position: "absolute", bottom: "12px", left: "12px", background: "#AC1634", color: "white", padding: "4px 10px", borderRadius: "999px", fontSize: "11px" },
  ecoBadge: { position: "absolute", top: "12px", right: "12px", background: "#2d6a4f", color: "white", padding: "4px 10px", borderRadius: "999px", fontSize: "10px" },
  cardContent: { padding: "16px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  vendorName: { fontSize: "16px", fontWeight: 600, color: "#3E0014", margin: 0 },
  rating: { display: "flex", alignItems: "center", gap: "4px", fontSize: "13px" },
  vendorCategory: { fontSize: "13px", color: "#E77291", marginBottom: "6px" },
  vendorLocation: { fontSize: "12px", color: "#999", marginBottom: "10px", display: "flex", alignItems: "center", gap: "4px" },
  priceRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" },
  currentPrice: { fontSize: "16px", fontWeight: 700, color: "#AC1634", margin: 0 },
  originalPrice: { fontSize: "13px", color: "#999", textDecoration: "line-through", margin: 0 },
  cardActions: { display: "flex", gap: "12px" },
  detailsBtn: { flex: 1, padding: "10px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "13px" },
  bookBtn: { flex: 1, padding: "10px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  powerPairsContainer: { display: "flex", flexDirection: "column", gap: "32px" },
  powerPairCard: { background: "white", borderRadius: "24px", padding: "24px", border: "1px solid #F5D0DA" },
  powerPairTitle: { fontSize: "20px", fontWeight: 600, marginBottom: "20px", color: "#3E0014" },
  powerPairCategorySelectors: { display: "flex", alignItems: "flex-end", gap: "20px", marginBottom: "24px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", flexWrap: "wrap" },
  powerPairCategoryWrapper: { flex: 1, minWidth: "180px", "& label": { display: "block", fontSize: "12px", fontWeight: 600, color: "#AC1634", marginBottom: "6px" }, "& select": { width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #F5D0DA", fontSize: "13px" } },
  powerPairVendors: { display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" },
  powerPairVendor: { flex: 1, minWidth: "250px", "& label": { display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px", color: "#666" }, "& select": { width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", cursor: "pointer" } },
  powerPairPlus: { fontSize: "28px", fontWeight: "bold", color: "#E77291", alignSelf: "center" },
  powerPairPreview: { display: "flex", alignItems: "center", gap: "10px", marginTop: "12px", padding: "10px", background: "#FDF0F3", borderRadius: "10px" },
  powerPairPreviewImg: { width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" },
  powerPairDiscount: { background: "#FDF0F3", padding: "12px", borderRadius: "12px", textAlign: "center", marginBottom: "16px", color: "#AC1634" },
  powerPairBtn: { width: "100%", padding: "12px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  overlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", zIndex: 998 },
  sidebar: { position: "fixed", top: 0, left: 0, bottom: 0, width: 300, background: "#3E0014", zIndex: 999, padding: "32px 24px", display: "flex", flexDirection: "column", overflowY: "auto" },
  sidebarHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 },
  closeBtn: { background: "none", border: "none", color: "#E77291", cursor: "pointer" },
  sidebarItem: { display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#FFFFFF", fontSize: 15, marginBottom: 4, background: "rgba(231,114,145,0.08)" },
  sidebarIcon: { color: "#E77291" },
  sidebarEmoji: { fontSize: "18px" },
  divider: { height: "1px", background: "rgba(231,114,145,0.2)", margin: "16px 0" },
  sidebarSectionTitle: { color: "#E77291", fontSize: "11px", letterSpacing: "1px", marginBottom: 12, paddingLeft: "16px" },
  sidebarFooter: { marginTop: "auto", paddingTop: 20 },
  logoutBtn: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#E77291", fontSize: 15 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "500px", maxHeight: "80vh", overflow: "auto" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalClose: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  modalContent: { padding: "20px" },
  emptyCart: { textAlign: "center", padding: "40px" },
  browseBtn: { marginTop: "16px", padding: "10px 24px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer" },
  cartItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderBottom: "1px solid #F5D0DA" },
  cartItemImage: { width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: "14px", fontWeight: 600, marginBottom: "2px" },
  cartItemPrice: { fontSize: "12px", color: "#AC1634" },
  removeBtn: { background: "none", border: "none", color: "#F44336", cursor: "pointer", fontSize: "12px" },
  cartSummary: { marginTop: "16px", padding: "16px", background: "#FDF0F3", borderRadius: "16px" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" },
  summaryTotal: { display: "flex", justifyContent: "space-between", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #F5D0DA", fontWeight: 600, fontSize: "16px" },
  requestQuoteBtn: { width: "100%", marginTop: "16px", padding: "14px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", fontWeight: 600 },
  offerDetailCard: { textAlign: "center", padding: "20px" },
  offerList: { textAlign: "left", marginTop: "16px", paddingLeft: "20px", lineHeight: 1.8 },
  offerCloseBtn: { marginTop: "20px", padding: "10px 24px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer" }
};

const modalStyles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(62,0,20,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "28px", width: "90%", maxWidth: "550px", maxHeight: "85vh", overflow: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: "16px", right: "16px", background: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  coverContainer: { position: "relative", height: "220px", overflow: "hidden" },
  coverImage: { width: "100%", height: "100%", objectFit: "cover" },
  ecoTag: { position: "absolute", bottom: "16px", left: "16px", background: "#2d6a4f", color: "white", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
  content: { padding: "24px" },
  header: { marginBottom: "12px" },
  name: { fontSize: "24px", fontWeight: 700, color: "#3E0014", margin: 0 },
  rating: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" },
  reviews: { fontSize: "13px", color: "#999" },
  badges: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" },
  badge: { fontSize: "11px", padding: "4px 10px", background: "#FDF0F3", borderRadius: "999px", color: "#666" },
  premiumBadge: { fontSize: "11px", padding: "4px 10px", background: "linear-gradient(135deg, #E77291, #AC1634)", borderRadius: "999px", color: "white" },
  description: { fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "20px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", marginBottom: "20px" },
  statItem: { display: "flex", alignItems: "center", gap: "10px" },
  statValue: { fontSize: "14px", fontWeight: 700, color: "#3E0014", margin: 0 },
  statLabel: { fontSize: "10px", color: "#999", margin: 0 },
  priceSection: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #F5D0DA", flexWrap: "wrap", gap: "16px" },
  priceLabel: { fontSize: "11px", color: "#999", marginBottom: "4px" },
  price: { fontSize: "24px", fontWeight: 700, color: "#AC1634", margin: 0 },
  originalPrice: { fontSize: "14px", color: "#999", textDecoration: "line-through", margin: 0 },
  bookBtn: { padding: "12px 24px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }
};