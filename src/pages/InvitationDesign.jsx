// src/pages/InvitationDesign.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Heart, Home, Package, User, ShoppingCart, 
  Menu, X, MessageCircle, ChevronRight, Star, Clock,
  MapPin, Phone, Mail, ExternalLink, Download, Eye,
  Filter, Search, Award, TrendingUp, Calendar, Users
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import GlobalNotifications from "../components/GlobalNotifications";

export default function InvitationDesign({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Canva Templates
  const canvaTemplates = [
    {
      id: 1,
      name: "Royal Gold",
      style: "Traditional",
      occasion: "Wedding",
      color: "#FFD700",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      canvaUrl: "https://canva.com/templates/royal-gold-wedding",
      price: "Free",
      description: "Elegant gold foil design with traditional motifs"
    },
    {
      id: 2,
      name: "Minimal Elegance",
      style: "Modern",
      occasion: "Wedding",
      color: "#E77291",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      canvaUrl: "https://canva.com/templates/minimal-elegance",
      price: "Free",
      description: "Clean lines with sophisticated typography"
    },
    {
      id: 3,
      name: "Floral Dream",
      style: "Bohemian",
      occasion: "Wedding",
      color: "#FF6B6B",
      image: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b",
      canvaUrl: "https://canva.com/templates/floral-dream",
      price: "Free",
      description: "Watercolor flowers with whimsical design"
    },
    {
      id: 4,
      name: "Royal Palace",
      style: "Luxury",
      occasion: "Wedding",
      color: "#AC1634",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      canvaUrl: "https://canva.com/templates/royal-palace",
      price: "Premium",
      description: "Regal design with intricate details"
    },
    {
      id: 5,
      name: "Beach Breeze",
      style: "Destination",
      occasion: "Wedding",
      color: "#48cae4",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      canvaUrl: "https://canva.com/templates/beach-breeze",
      price: "Free",
      description: "Coastal vibes with seashell accents"
    },
    {
      id: 6,
      name: "Sangeet Night",
      style: "Fusion",
      occasion: "Sangeet",
      color: "#9d4edd",
      image: "https://images.unsplash.com/photo-1536240474400-3d6d5b6a6b3c",
      canvaUrl: "https://canva.com/templates/sangeet-night",
      price: "Free",
      description: "Vibrant design for pre-wedding celebrations"
    }
  ];

  // Invitation Design Vendors
  const invitationVendors = [
    {
      id: 1,
      name: "PaperNest Studio",
      category: "Print",
      rating: 4.9,
      reviews: 234,
      price: "₹50/invite",
      location: "Mumbai, Delhi",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      specialty: "Luxury Invitations",
      experience: "10+ years",
      minOrder: 100,
      turnaround: "5-7 days",
      contact: "+91 98765 43210",
      email: "hello@papernext.com",
      description: "Premium quality paper invitations with custom designs. Specializing in laser-cut and foil stamping."
    },
    {
      id: 2,
      name: "Digital Invites Co",
      category: "Digital",
      rating: 4.8,
      reviews: 189,
      price: "₹20/invite",
      location: "Pan India",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      specialty: "E-invites",
      experience: "8+ years",
      minOrder: 50,
      turnaround: "2-3 days",
      contact: "+91 87654 32109",
      email: "info@digitalinvites.com",
      description: "Beautiful digital invitations with RSVP tracking. Send via WhatsApp, Email, or SMS."
    },
    {
      id: 3,
      name: "Creative Cards",
      category: "Both",
      rating: 4.7,
      reviews: 345,
      price: "₹35/invite",
      location: "Bangalore, Chennai",
      image: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b",
      specialty: "Custom Designs",
      experience: "12+ years",
      minOrder: 200,
      turnaround: "10-12 days",
      contact: "+91 99887 66554",
      email: "design@creativecards.com",
      description: "Handcrafted invitations with personalized artwork."
    },
    {
      id: 4,
      name: "Eco Invites",
      category: "Sustainable",
      rating: 4.9,
      reviews: 167,
      price: "₹40/invite",
      location: "Pan India",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      specialty: "Sustainable Materials",
      experience: "6+ years",
      minOrder: 100,
      turnaround: "7-10 days",
      contact: "+91 77665 44332",
      email: "green@ecoinvites.com",
      description: "Seed paper invitations that grow into plants. 100% recycled materials."
    }
  ];

  const categories = ["all", "Print", "Digital", "Both", "Sustainable"];
  
  const filteredVendors = invitationVendors.filter(vendor => 
    (activeCategory === "all" || vendor.category === activeCategory) &&
    (searchTerm === "" || vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openCanvaTemplate = (url) => {
    window.open(url, "_blank");
  };

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
            <button onClick={() => navigate("/messages")} style={styles.messageBtn}><MessageCircle size={20} /></button>
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
        <div style={styles.heroSection}>
          <h1 style={styles.title}>Wedding Invitations</h1>
          <p style={styles.subtitle}>Design your dream invitation with Canva or hire expert designers</p>
        </div>

        {/* Canva Banner */}
        <div style={styles.canvaBanner}>
          <div style={styles.canvaIcon}>🎨</div>
          <div>
            <h3 style={styles.canvaTitle}>Design with Canva</h3>
            <p style={styles.canvaText}>Create beautiful wedding invitations in minutes with free templates</p>
          </div>
          <button style={styles.canvaButton} onClick={() => window.open("https://canva.com", "_blank")}>
            Start Designing <ExternalLink size={16} />
          </button>
        </div>

        {/* Canva Templates Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Sparkles size={20} color="#E77291" /> Canva Templates
          </h2>
          <div style={styles.templatesGrid}>
            {canvaTemplates.map(template => (
              <div key={template.id} style={styles.templateCard}>
                <div style={styles.templateImageContainer}>
                  <img src={template.image} alt={template.name} style={styles.templateImage} />
                  <div style={styles.templateBadge} style={{...styles.templateBadge, background: template.color}}>
                    {template.price === "Free" ? "FREE" : "PREMIUM"}
                  </div>
                </div>
                <div style={styles.templateInfo}>
                  <h3 style={styles.templateName}>{template.name}</h3>
                  <p style={styles.templateStyle}>{template.style} • {template.occasion}</p>
                  <p style={styles.templateDesc}>{template.description}</p>
                  <button 
                    style={styles.templateBtn}
                    onClick={() => openCanvaTemplate(template.canvaUrl)}
                  >
                    Use Template <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Vendors Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <Award size={20} color="#E77291" /> Expert Invitation Designers
            </h2>
            <div style={styles.searchBar}>
              <Search size={16} color="#999" />
              <input type="text" placeholder="Search vendors..." style={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          
          {/* Category Filters */}
          <div style={styles.filterChips}>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                style={{...styles.chip, ...(activeCategory === cat ? styles.chipActive : {})}}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>

          {/* Vendors Grid */}
          <div style={styles.vendorsGrid}>
            {filteredVendors.map(vendor => (
              <div key={vendor.id} style={styles.vendorCard}>
                <div style={styles.vendorImageContainer}>
                  <img src={vendor.image} alt={vendor.name} style={styles.vendorImage} />
                  <div style={styles.vendorRating}>⭐ {vendor.rating}</div>
                </div>
                <div style={styles.vendorInfo}>
                  <h3 style={styles.vendorName}>{vendor.name}</h3>
                  <p style={styles.vendorSpecialty}>{vendor.specialty}</p>
                  <div style={styles.vendorDetails}>
                    <span><MapPin size={12} /> {vendor.location}</span>
                    <span><Clock size={12} /> {vendor.turnaround}</span>
                  </div>
                  <div style={styles.vendorPrice}>
                    <strong>{vendor.price}</strong>
                    <span>min {vendor.minOrder} invites</span>
                  </div>
                  <p style={styles.vendorDesc}>{vendor.description}</p>
                  <div style={styles.vendorActions}>
                    <button style={styles.contactBtn}><Phone size={14} /> Contact</button>
                    <button style={styles.quoteBtn}>Get Quote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Tips Section */}
        <div style={styles.tipsSection}>
          <h2 style={styles.sectionTitle}>💡 Invitation Design Tips</h2>
          <div style={styles.tipsGrid}>
            <div style={styles.tipCard}>
              <span>📅</span>
              <h4>Send Early</h4>
              <p>Send invitations 6-8 weeks before the wedding</p>
            </div>
            <div style={styles.tipCard}>
              <span>🎨</span>
              <h4>Match Theme</h4>
              <p>Coordinate with your wedding color palette</p>
            </div>
            <div style={styles.tipCard}>
              <span>📝</span>
              <h4>Clear Details</h4>
              <p>Include venue, dress code, and RSVP info</p>
            </div>
            <div style={styles.tipCard}>
              <span>🌿</span>
              <h4>Eco-Friendly</h4>
              <p>Consider seed paper or digital invites</p>
            </div>
          </div>
        </div>
      </div>

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
  messageBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "32px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  canvaBanner: { display: "flex", alignItems: "center", gap: "20px", background: "linear-gradient(135deg, #00B4D8, #0096C7)", borderRadius: "20px", padding: "20px", marginBottom: "32px", color: "white", flexWrap: "wrap" },
  canvaIcon: { fontSize: "48px" },
  canvaTitle: { fontSize: "18px", fontWeight: 600, marginBottom: "4px" },
  canvaText: { fontSize: "13px", opacity: 0.9 },
  canvaButton: { marginLeft: "auto", background: "white", color: "#0096C7", border: "none", padding: "10px 20px", borderRadius: "999px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" },
  section: { marginBottom: "48px" },
  sectionTitle: { fontSize: "24px", fontWeight: 600, color: "#3E0014", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" },
  templatesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" },
  templateCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA", transition: "transform 0.2s" },
  templateImageContainer: { position: "relative", height: "200px" },
  templateImage: { width: "100%", height: "100%", objectFit: "cover" },
  templateBadge: { position: "absolute", top: "12px", right: "12px", padding: "4px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, color: "white" },
  templateInfo: { padding: "16px" },
  templateName: { fontSize: "18px", fontWeight: 600, marginBottom: "4px" },
  templateStyle: { fontSize: "12px", color: "#E77291", marginBottom: "8px" },
  templateDesc: { fontSize: "12px", color: "#666", marginBottom: "12px", lineHeight: 1.4 },
  templateBtn: { width: "100%", padding: "10px", borderRadius: "999px", background: "#00B4D8", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" },
  searchBar: { display: "flex", alignItems: "center", gap: "10px", background: "white", padding: "10px 16px", borderRadius: "999px", border: "1px solid #F5D0DA", width: "280px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px" },
  filterChips: { display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" },
  chip: { padding: "8px 20px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "13px" },
  chipActive: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  vendorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" },
  vendorCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA", display: "flex", flexDirection: "column" },
  vendorImageContainer: { position: "relative", height: "160px" },
  vendorImage: { width: "100%", height: "100%", objectFit: "cover" },
  vendorRating: { position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,0,0,0.7)", color: "#FFD700", padding: "4px 10px", borderRadius: "999px", fontSize: "11px" },
  vendorInfo: { padding: "20px" },
  vendorName: { fontSize: "18px", fontWeight: 600, marginBottom: "4px" },
  vendorSpecialty: { fontSize: "13px", color: "#E77291", marginBottom: "8px" },
  vendorDetails: { display: "flex", gap: "16px", fontSize: "11px", color: "#999", marginBottom: "12px" },
  vendorPrice: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "1px solid #F5D0DA", borderBottom: "1px solid #F5D0DA", marginBottom: "12px" },
  vendorDesc: { fontSize: "12px", color: "#666", lineHeight: 1.5, marginBottom: "16px" },
  vendorActions: { display: "flex", gap: "12px" },
  contactBtn: { flex: 1, padding: "10px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  quoteBtn: { flex: 1, padding: "10px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontWeight: 600 },
  tipsSection: { marginBottom: "48px" },
  tipsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" },
  tipCard: { background: "white", borderRadius: "16px", padding: "20px", textAlign: "center", border: "1px solid #F5D0DA" },
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
  logoutBtn: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#E77291", fontSize: 15 }
};