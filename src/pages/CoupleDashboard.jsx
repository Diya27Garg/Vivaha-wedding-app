// src/pages/CoupleDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, MessageCircle, Home, ClipboardList,
  Sparkles, Package, User, LogOut, Star,
  Copy, Check, Crown, Lock, Calendar, MapPin, Wallet,
  Heart, Clock
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import AIWeddingAssistant from "../components/AIWeddingAssistant";

const vendors = [
  {
    id: 1, name: "Glam by Priya", service: "Makeup Artist",
    price: "₹45,000", rating: "5.0",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    tag: "Top Rated"
  },
  {
    id: 2, name: "Lens & Love Studio", service: "Photography",
    price: "₹85,000", rating: "4.9",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80",
    tag: "Most Booked"
  },
  {
    id: 3, name: "Royal Blooms Decor", service: "Decoration",
    price: "₹1,20,000", rating: "4.8",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
    tag: "Premium"
  },
  {
    id: 4, name: "Grand Feast Caterers", service: "Catering",
    price: "₹1,80,000", rating: "4.7",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80",
    tag: "New"
  },
  {
    id: 5, name: "Beat Masters DJ", service: "Music & DJ",
    price: "₹60,000", rating: "4.6",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80",
    tag: "Popular"
  },
  {
    id: 6, name: "Dream Venues", service: "Venue",
    price: "₹5,00,000", rating: "4.9",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
    tag: "Luxury"
  },
];

const premiumBenefits = [
  { icon: "✦", text: "Unlock all live vendor offers" },
  { icon: "✦", text: "AI-powered wedding timeline" },
  { icon: "✦", text: "Priority vendor booking" },
  { icon: "✦", text: "Dedicated wedding coordinator" },
  { icon: "✦", text: "Exclusive Power Pair deals" },
  { icon: "✦", text: "Budget tracking & alerts" },
];

// Animated Countdown Component
const WeddingCountdown = ({ targetDate = "2025-12-15" }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scratched, setScratched] = useState(false);
  const [tipOfDay, setTipOfDay] = useState(null);

  const tips = [
    { tip: "Book your venue at least 8-10 months in advance for best dates!", category: "Venue" },
    { tip: "Start your wedding website early to share updates with guests!", category: "Planning" },
    { tip: "Negotiate with vendors - everything is negotiable!", category: "Budget" },
    { tip: "Take a 10-minute break daily to avoid wedding planning stress!", category: "Wellness" },
    { tip: "Use digital invitations to save paper and money!", category: "Sustainability" },
    { tip: "Hire a day-of coordinator to enjoy your special day!", category: "Planning" },
  ];

  useEffect(() => {
    const target = new Date(targetDate);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (86400000)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (3600000)) / (1000 * 60)),
        seconds: Math.floor((difference % (60000)) / 1000)
      });
    }, 1000);
    
    setTipOfDay(tips[Math.floor(Math.random() * tips.length)]);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={countdownStyles.container}>
      <div style={countdownStyles.header}>
        <Clock size={16} color="#E77291" />
        <span style={countdownStyles.countdownLabel}>COUNTDOWN TO YOUR BIG DAY</span>
      </div>
      
      <div style={countdownStyles.daysContainer}>
        <div style={countdownStyles.daysNumber}>{timeLeft.days}</div>
        <div style={countdownStyles.daysLabel}>DAYS LEFT</div>
      </div>
      
      <div style={countdownStyles.timer}>
        {[
          { value: String(timeLeft.hours).padStart(2, '0'), label: "Hours" },
          { value: String(timeLeft.minutes).padStart(2, '0'), label: "Minutes" },
          { value: String(timeLeft.seconds).padStart(2, '0'), label: "Seconds" }
        ].map(item => (
          <div key={item.label} style={countdownStyles.timeBlock}>
            <span style={countdownStyles.timeValue}>{item.value}</span>
            <span style={countdownStyles.timeLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      <div 
        onClick={() => setScratched(true)}
        style={countdownStyles.scratchCard}
      >
        {!scratched ? (
          <div style={countdownStyles.scratchContent}>
            <span style={countdownStyles.scratchIcon}>🎁</span>
            <p style={countdownStyles.scratchText}>Scratch for Wedding Tip!</p>
            <p style={countdownStyles.scratchHint}>Click to reveal</p>
          </div>
        ) : (
          <div style={countdownStyles.tipContent}>
            <span style={countdownStyles.tipIcon}>💡</span>
            <div>
              <p style={countdownStyles.tipCategory}>{tipOfDay?.category}</p>
              <p style={countdownStyles.tipMessage}>{tipOfDay?.tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const countdownStyles = {
  container: { background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "24px", padding: "24px", marginBottom: "20px" },
  header: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px" },
  countdownLabel: { color: "#E77291", fontSize: "10px", letterSpacing: "3px", fontWeight: 600 },
  daysContainer: { textAlign: "center", marginBottom: "24px" },
  daysNumber: { fontFamily: "'DM Serif Display', serif", fontSize: "72px", fontWeight: 700, color: "white" },
  daysLabel: { fontSize: "12px", color: "#E77291", letterSpacing: "4px", marginTop: "8px" },
  timer: { display: "flex", justifyContent: "center", gap: "24px", marginBottom: "24px" },
  timeBlock: { textAlign: "center" },
  timeValue: { display: "block", fontSize: "28px", fontWeight: 700, color: "white" },
  timeLabel: { fontSize: "10px", color: "rgba(255,255,255,0.6)" },
  scratchCard: { background: "rgba(255,255,255,0.1)", borderRadius: "16px", padding: "16px", cursor: "pointer" },
  scratchContent: { textAlign: "center", padding: "12px" },
  scratchIcon: { fontSize: "32px", display: "block", marginBottom: "8px" },
  scratchText: { fontSize: "14px", fontWeight: 600, color: "#E77291", marginBottom: "4px" },
  scratchHint: { fontSize: "11px", color: "rgba(255,255,255,0.5)" },
  tipContent: { display: "flex", gap: "12px", alignItems: "center" },
  tipIcon: { fontSize: "28px" },
  tipCategory: { fontSize: "10px", color: "#E77291", fontWeight: 600, marginBottom: "4px" },
  tipMessage: { fontSize: "13px", color: "white", lineHeight: 1.4, margin: 0 }
};

export default function CoupleDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [loveCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const isPremium = user?.premium || false;
  const weddingDate = user?.weddingDetails?.weddingDate || user?.weddingDate || "2025-12-15";

  const inviteMessage = `💍 Join me on Vivaha! Use Love Code: ${loveCode} to plan our wedding together.`;

  const copyCode = () => {
    navigator.clipboard.writeText(loveCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(inviteMessage);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={22} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={22} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={22} />, label: "Package", path: "/package" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
  ];

  const menuItems = [
    { icon: "💌", label: "Invitation Designer", path: "/invitation-design" },
    { icon: "💰", label: "Budget Planner", path: "/budget-planner" },
    { icon: "🧘", label: "Emotional Wellness", path: "/wellness" },
    { icon: "🌿", label: "Sustainable Wedding", path: "/sustainability" },
    { icon: "🤖", label: "AI Wedding Assistant", path: "/ai-assistant" },
  ];

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => setMenuOpen(true)} style={styles.menuBtn}>
            <Menu size={22} />
          </button>
          
          <HindiLogo size="small" />
          
          <div style={styles.headerRight}>
            <button 
              onClick={() => setShowAIAssistant(true)} 
              style={styles.aiBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(231,114,145,0.25)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(231,114,145,0.15)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              title="AI Wedding Assistant"
            >
              <Sparkles size={20} />
            </button>
            <button onClick={() => navigate("/messages")} style={styles.messageBtn}>
              <MessageCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={styles.overlay} />
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <HindiLogo size="small" />
              <button onClick={() => setMenuOpen(false)} style={styles.closeBtn}>
                <X size={22} />
              </button>
            </div>

            {navItems.map(n => (
              <div key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }} style={styles.sidebarItem}>
                <span style={styles.sidebarIcon}>{n.icon}</span>
                {n.label}
              </div>
            ))}

            <div style={styles.divider} />
            
            <p style={styles.sidebarSectionTitle}>WEDDING TOOLS</p>
            
            {menuItems.map(item => (
              <div key={item.path} onClick={() => { navigate(item.path); setMenuOpen(false); }} style={styles.sidebarItem}>
                <span style={styles.sidebarEmoji}>{item.icon}</span>
                {item.label}
              </div>
            ))}

            <div style={styles.sidebarFooter}>
              <div onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}>
                <LogOut size={18} /> Logout
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Hero Section - Two Column Grid */}
        <div style={styles.heroGrid}>
          {/* Welcome Card */}
          <div style={styles.welcomeCard}>
            <p style={styles.welcomeBadge}>WELCOME BACK</p>
            <h1 style={styles.welcomeTitle}>Welcome, {user?.name || "Guest"}! 💍</h1>
            <p style={styles.welcomeText}>Your dream wedding is coming together beautifully.</p>
            
            <div style={styles.infoGrid}>
              <div style={styles.infoPill}>
                <Calendar size={14} /> {weddingDate !== "2025-12-15" ? weddingDate : "Set date"}
              </div>
              <div style={styles.infoPill}>
                <MapPin size={14} /> {user?.weddingDetails?.city || user?.city || "Set location"}
              </div>
              <div style={styles.infoPill}>
                <Wallet size={14} /> {user?.weddingDetails?.budget || user?.budget || "Set budget"}
              </div>
            </div>
            
            <button onClick={() => setInviteOpen(true)} style={styles.inviteBtn}>
              💌 Invite your Fiancé
            </button>
          </div>

          {/* Countdown Card */}
          <WeddingCountdown targetDate={weddingDate} />
        </div>

        {/* Vendor Offers Section */}
        <div style={styles.vendorSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Live Vendor Offers</h2>
            <div style={styles.badgeContainer}>
              {!isPremium && <span style={styles.premiumBadge}>UNLOCK WITH PREMIUM</span>}
              <span style={styles.liveBadge}>LIVE</span>
            </div>
          </div>

          <div style={styles.vendorGrid}>
            {vendors.map((v, i) => (
              <div 
                key={v.id} 
                style={{
                  ...styles.vendorCard,
                  filter: !isPremium && i > 1 ? "blur(4px)" : "none",
                  cursor: !isPremium && i > 1 ? "not-allowed" : "pointer"
                }} 
                onClick={() => !isPremium && i > 1 ? navigate("/premium") : navigate("/package")}
              >
                <div style={styles.vendorImageContainer}>
                  <img src={v.image} alt={v.service} style={styles.vendorImage} />
                  <span style={styles.vendorTag}>{v.tag}</span>
                </div>
                <div style={styles.vendorInfo}>
                  <p style={styles.vendorName}>{v.name}</p>
                  <p style={styles.vendorService}>{v.service}</p>
                  <div style={styles.vendorFooter}>
                    <p style={styles.vendorPrice}>{v.price}</p>
                    <div style={styles.vendorRating}>
                      <Star size={12} fill="#E77291" color="#E77291" />
                      <span>{v.rating}</span>
                    </div>
                  </div>
                </div>
                {!isPremium && i > 1 && (
                  <div style={styles.lockOverlay}>
                    <Lock size={24} color="#AC1634" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isPremium && (
            <button onClick={() => navigate("/premium")} style={styles.upgradeButton}>
              <Crown size={16} /> Unlock All Vendors with Premium
            </button>
          )}
        </div>

        {/* Premium Card */}
        {!isPremium && (
          <div style={styles.premiumCard}>
            <div style={styles.premiumContent}>
              <Crown size={28} color="#E77291" />
              <div>
                <h3 style={styles.premiumTitle}>Unlock the Complete Wedding Experience</h3>
                <p style={styles.premiumText}>Get access to all premium features and exclusive vendor deals</p>
              </div>
              <button onClick={() => navigate("/premium")} style={styles.premiumButton}>
                Upgrade Now →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {inviteOpen && (
        <div style={styles.modalOverlay} onClick={() => setInviteOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Invite your Fiancé 💍</h3>
              <button onClick={() => setInviteOpen(false)} style={styles.modalClose}>✕</button>
            </div>
            <div style={styles.modalContent}>
              <p style={styles.modalText}>Share your unique Love Code so your fiancé can join and plan together!</p>
              <div style={styles.loveCodeContainer}>
                <p style={styles.loveCodeLabel}>YOUR LOVE CODE</p>
                <div style={styles.loveCodeRow}>
                  <p style={styles.loveCode}>{loveCode}</p>
                  <button onClick={copyCode} style={styles.copyCodeBtn}>
                    {codeCopied ? <Check size={16} /> : <Copy size={16} />}
                    {codeCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <button onClick={copyUrl} style={styles.copyUrlBtn}>
                {urlCopied ? <Check size={16} /> : <Copy size={16} />}
                {urlCopied ? "Message Copied!" : "Copy Invite Message"}
              </button>
              <p style={styles.modalNote}>Your fiancé can enter this code on the login page to connect with you</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      {showAIAssistant && (
        <AIWeddingAssistant 
          user={user}
          weddingDetails={user?.weddingDetails || user}
          onClose={() => setShowAIAssistant(false)}
          isOpen={showAIAssistant}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    background: "#FDF0F3",
    fontFamily: "'DM Sans', sans-serif"
  },
  header: {
    background: "#3E0014",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  headerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  menuBtn: {
    background: "rgba(231,114,145,0.15)",
    border: "1px solid rgba(231,114,145,0.3)",
    color: "#E77291",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  messageBtn: {
    background: "rgba(231,114,145,0.15)",
    border: "1px solid rgba(231,114,145,0.3)",
    color: "#E77291",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  aiBtn: {
    background: "rgba(231,114,145,0.15)",
    border: "1px solid rgba(231,114,145,0.3)",
    color: "#E77291",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease"
  },
  headerRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(62,0,20,0.6)",
    zIndex: 998
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    background: "#3E0014",
    zIndex: 999,
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto"
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#E77291",
    cursor: "pointer"
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "14px 16px",
    borderRadius: 12,
    cursor: "pointer",
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 4,
    background: "rgba(231,114,145,0.08)"
  },
  sidebarIcon: {
    color: "#E77291"
  },
  sidebarEmoji: {
    fontSize: "18px"
  },
  divider: {
    height: "1px",
    background: "rgba(231,114,145,0.2)",
    margin: "16px 0"
  },
  sidebarSectionTitle: {
    color: "#E77291",
    fontSize: "11px",
    letterSpacing: "1px",
    marginBottom: 12,
    paddingLeft: "16px"
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingTop: 20
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 12,
    cursor: "pointer",
    color: "#E77291",
    fontSize: 15
  },
  mainContent: {
    flex: 1,
    maxWidth: "1280px",
    width: "100%",
    margin: "0 auto",
    padding: "40px 32px",
    paddingBottom: "100px"
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    marginBottom: "48px"
  },
  welcomeCard: {
    background: "linear-gradient(135deg, #3E0014, #7A002B)",
    borderRadius: "24px",
    padding: "32px",
    color: "white"
  },
  welcomeBadge: {
    color: "#E77291",
    fontSize: "12px",
    letterSpacing: "3px",
    marginBottom: "16px"
  },
  welcomeTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "32px",
    marginBottom: "12px"
  },
  welcomeText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "24px"
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px"
  },
  infoPill: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "10px 16px",
    fontSize: "13px"
  },
  inviteBtn: {
    width: "100%",
    padding: "12px",
    background: "rgba(231,114,145,0.15)",
    border: "1.5px dashed #E77291",
    color: "#E77291",
    borderRadius: "16px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 500
  },
  vendorSection: {
    marginBottom: "48px"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px"
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "28px",
    color: "#3E0014"
  },
  badgeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  premiumBadge: {
    background: "#FDF0F3",
    border: "1px solid #F5D0DA",
    color: "#AC1634",
    fontSize: "10px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontWeight: 600
  },
  liveBadge: {
    background: "#AC1634",
    color: "white",
    fontSize: "10px",
    padding: "4px 12px",
    borderRadius: "999px",
    fontWeight: 600
  },
  vendorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px"
  },
  vendorCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid #F5D0DA",
    position: "relative",
    transition: "transform 0.2s"
  },
  vendorImageContainer: {
    position: "relative",
    height: "180px"
  },
  vendorImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  vendorTag: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "rgba(62,0,20,0.8)",
    color: "#E77291",
    fontSize: "10px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontWeight: 600
  },
  vendorInfo: {
    padding: "16px"
  },
  vendorName: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#3E0014",
    marginBottom: "4px"
  },
  vendorService: {
    fontSize: "13px",
    color: "#7A5560",
    marginBottom: "12px"
  },
  vendorFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  vendorPrice: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#AC1634"
  },
  vendorRating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
    fontWeight: 600
  },
  lockOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.1)"
  },
  upgradeButton: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    background: "linear-gradient(135deg, #AC1634, #3E0014)",
    color: "white",
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  premiumCard: {
    background: "linear-gradient(135deg, #3E0014, #7A002B)",
    borderRadius: "24px",
    padding: "28px",
    marginTop: "24px"
  },
  premiumContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px"
  },
  premiumTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "white",
    marginBottom: "4px"
  },
  premiumText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)"
  },
  premiumButton: {
    padding: "10px 24px",
    background: "#E77291",
    color: "#3E0014",
    border: "none",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(62,0,20,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    borderRadius: "24px",
    width: "90%",
    maxWidth: "450px"
  },
  modalHeader: {
    padding: "20px",
    borderBottom: "1px solid #F5D0DA",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#3E0014",
    margin: 0
  },
  modalClose: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#AC1634"
  },
  modalContent: {
    padding: "24px"
  },
  modalText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px"
  },
  loveCodeContainer: {
    background: "#FDF0F3",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px"
  },
  loveCodeLabel: {
    fontSize: "11px",
    color: "#AC1634",
    fontWeight: 600,
    letterSpacing: "2px",
    marginBottom: "12px"
  },
  loveCodeRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  loveCode: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "28px",
    letterSpacing: "6px",
    color: "#3E0014"
  },
  copyCodeBtn: {
    background: "white",
    border: "1px solid #F5D0DA",
    borderRadius: "12px",
    padding: "8px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#AC1634"
  },
  copyUrlBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #AC1634, #3E0014)",
    color: "white",
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px"
  },
  modalNote: {
    fontSize: "11px",
    color: "#999",
    textAlign: "center"
  }
};