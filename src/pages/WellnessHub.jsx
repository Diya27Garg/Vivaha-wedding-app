// src/pages/WellnessHub.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, Brain, Smile, BookOpen, Music, Sparkles, MessageCircle, 
  Calendar, Leaf, Home, Package, User, ShoppingCart, 
  Users, Headphones, Moon, Sun, Flower2, Shield,
  Video, Phone, Star, Clock, Award, TrendingUp, Menu, X, LogOut,
  Bell, Settings, Camera, Mail, MapPin, Calendar as CalendarIcon
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import GlobalNotifications from "../components/GlobalNotifications";

export default function WellnessHub({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("meditate");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const yogaSessions = [
    { id: 1, name: "Morning Energy Flow", duration: "20 min", level: "Beginner", instructor: "Priya Sharma", image: "🧘", time: "7:00 AM" },
    { id: 2, name: "Stress Relief Yoga", duration: "30 min", level: "Intermediate", instructor: "Rajesh Kumar", image: "🧘‍♂️", time: "6:00 PM" },
    { id: 3, name: "Bedtime Stretch", duration: "15 min", level: "Beginner", instructor: "Anjali Mehta", image: "🕉️", time: "9:30 PM" },
    { id: 4, name: "Couples Yoga", duration: "25 min", level: "All Levels", instructor: "Rohan & Neha", image: "💑", time: "5:00 PM" }
  ];

  const therapists = [
    { id: 1, name: "Dr. Priya Sharma", specialty: "Relationship Counselor", experience: "10+ years", rating: 4.9, availability: "Available Today", price: "₹1500/session", image: "👩‍⚕️" },
    { id: 2, name: "Rahul Mehta", specialty: "Stress Management Coach", experience: "8+ years", rating: 4.8, availability: "Tomorrow", price: "₹1200/session", image: "🧑‍⚕️" },
    { id: 3, name: "Dr. Neha Gupta", specialty: "Anxiety & Mindfulness", experience: "12+ years", rating: 4.9, availability: "Available Today", price: "₹1800/session", image: "👩‍⚕️" },
    { id: 4, name: "Vikram Singh", specialty: "Premarital Counseling", experience: "15+ years", rating: 5.0, availability: "Book for next week", price: "₹2000/session", image: "👨‍⚕️" }
  ];

  const musicPlaylists = [
    { id: 1, name: "Calming Wedding Vibes", duration: "45 min", mood: "Relaxing", songs: 12, image: "🎵", color: "#E77291" },
    { id: 2, name: "Morning Meditation", duration: "30 min", mood: "Peaceful", songs: 8, image: "🌅", color: "#FFD700" },
    { id: 3, name: "Stress Buster", duration: "60 min", mood: "Energetic", songs: 15, image: "⚡", color: "#4CAF50" },
    { id: 4, name: "Romantic Evening", duration: "50 min", mood: "Romantic", songs: 14, image: "🌙", color: "#9C27B0" }
  ];

  const wellnessTips = [
    "Take 5 deep breaths before making any wedding decision",
    "Schedule 'no-planning' days to recharge",
    "Practice gratitude together as a couple daily",
    "Stay hydrated - wedding planning is stressful!",
    "Get at least 7 hours of sleep before big decisions",
    "Remember: Perfect wedding doesn't exist, perfect marriage does"
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % wellnessTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
          <h1 style={styles.title}>Emotional Wellness</h1>
          <p style={styles.subtitle}>Take care of your mental well-being during wedding planning</p>
        </div>

        {/* Daily Affirmation */}
        <div style={styles.affirmationCard}>
          <Sparkles size={24} color="#E77291" />
          <p style={styles.affirmationText}>"Your wedding is one day, your marriage is forever. Breathe and enjoy the journey."</p>
        </div>

        {/* Rotating Wellness Tip */}
        <div style={styles.tipCard}>
          <span style={{ fontSize: "20px" }}>💡</span>
          <p style={styles.tipText}>{wellnessTips[currentTip]}</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button style={{...styles.tab, ...(activeTab === "meditate" ? styles.activeTab : {})}} onClick={() => setActiveTab("meditate")}>
            <Brain size={18} /> Meditate
          </button>
          <button style={{...styles.tab, ...(activeTab === "yoga" ? styles.activeTab : {})}} onClick={() => setActiveTab("yoga")}>
            <span>🧘</span> Yoga
          </button>
          <button style={{...styles.tab, ...(activeTab === "music" ? styles.activeTab : {})}} onClick={() => setActiveTab("music")}>
            <Music size={18} /> Music
          </button>
          <button style={{...styles.tab, ...(activeTab === "therapists" ? styles.activeTab : {})}} onClick={() => setActiveTab("therapists")}>
            <Users size={18} /> Therapists
          </button>
        </div>

        {/* Meditation Content */}
        {activeTab === "meditate" && (
          <div style={styles.contentSection}>
            <div style={styles.meditationCard}>
              <div style={styles.meditationIcon}>🧘</div>
              <div>
                <h3>5-Minute Wedding Stress Relief</h3>
                <p>Guided meditation for anxious couples</p>
                <button style={styles.startBtn}>Start Meditation →</button>
              </div>
            </div>
            <div style={styles.meditationCard}>
              <div style={styles.meditationIcon}>🌅</div>
              <div>
                <h3>Mindful Breathing for Brides</h3>
                <p>10-minute breathing exercise</p>
                <button style={styles.startBtn}>Start Meditation →</button>
              </div>
            </div>
            <div style={styles.meditationCard}>
              <div style={styles.meditationIcon}>🌙</div>
              <div>
                <h3>Sleep Meditation</h3>
                <p>15-minute sleep preparation</p>
                <button style={styles.startBtn}>Start Meditation →</button>
              </div>
            </div>
          </div>
        )}

        {/* Yoga Sessions */}
        {activeTab === "yoga" && (
          <div style={styles.yogaGrid}>
            {yogaSessions.map(session => (
              <div key={session.id} style={styles.yogaCard}>
                <div style={styles.yogaIcon}>{session.image}</div>
                <h3>{session.name}</h3>
                <p>{session.duration} • {session.level}</p>
                <p style={styles.yogaInstructor}>👤 {session.instructor}</p>
                <p style={styles.yogaTime}>⏰ {session.time}</p>
                <button style={styles.joinBtn}>Join Session →</button>
              </div>
            ))}
          </div>
        )}

        {/* Music Playlists */}
        {activeTab === "music" && (
          <div>
            <div style={styles.musicPlayer}>
              {selectedPlaylist ? (
                <div style={styles.nowPlaying}>
                  <button onClick={() => setSelectedPlaylist(null)} style={styles.backBtn}>← Back</button>
                  <div style={styles.playingIcon}>🎵</div>
                  <h3>{selectedPlaylist.name}</h3>
                  <p>{selectedPlaylist.duration} • {selectedPlaylist.songs} songs</p>
                  <button style={styles.playBtn} onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? "⏸️ Pause" : "▶️ Play"}
                  </button>
                  <div style={styles.songList}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={styles.songItem}>
                        <span>🎵 Track {i}</span>
                        <span>03:45</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={styles.playlistsGrid}>
                  {musicPlaylists.map(playlist => (
                    <div key={playlist.id} style={styles.playlistCard} onClick={() => setSelectedPlaylist(playlist)}>
                      <div style={{...styles.playlistIcon, background: playlist.color}}>{playlist.image}</div>
                      <h4>{playlist.name}</h4>
                      <p>{playlist.duration} • {playlist.mood}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Therapists */}
        {activeTab === "therapists" && (
          <div>
            <div style={styles.emergencyCard}>
              <Heart size={20} color="#AC1634" />
              <p>Need immediate support? Call our helpline: <strong>1800-WED-CARE</strong> (24x7)</p>
            </div>
            <div style={styles.therapistsGrid}>
              {therapists.map(therapist => (
                <div key={therapist.id} style={styles.therapistCard}>
                  <div style={styles.therapistIcon}>{therapist.image}</div>
                  <div>
                    <h3>{therapist.name}</h3>
                    <p>{therapist.specialty}</p>
                    <p>⭐ {therapist.rating} • {therapist.experience}</p>
                    <p style={styles.therapistAvailability}>✅ {therapist.availability}</p>
                    <p style={styles.therapistPrice}>{therapist.price}</p>
                  </div>
                  <button style={styles.bookBtn}>Book Session</button>
                </div>
              ))}
            </div>
          </div>
        )}
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
  affirmationCard: { background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "24px", color: "white" },
  affirmationText: { fontSize: "16px", lineHeight: 1.5, fontStyle: "italic" },
  tipCard: { display: "flex", alignItems: "center", gap: "16px", background: "white", borderRadius: "16px", padding: "16px", marginBottom: "24px", border: "1px solid #F5D0DA" },
  tipText: { fontSize: "14px", color: "#666", margin: 0 },
  tabs: { display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" },
  tab: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "13px" },
  activeTab: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  contentSection: { display: "flex", flexDirection: "column", gap: "16px" },
  meditationCard: { display: "flex", gap: "20px", background: "white", borderRadius: "20px", padding: "20px", border: "1px solid #F5D0DA", alignItems: "center" },
  meditationIcon: { fontSize: "48px" },
  startBtn: { marginTop: "12px", padding: "8px 20px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer" },
  yogaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  yogaCard: { background: "white", borderRadius: "20px", padding: "20px", textAlign: "center", border: "1px solid #F5D0DA" },
  yogaIcon: { fontSize: "48px", marginBottom: "12px" },
  yogaInstructor: { fontSize: "12px", color: "#666", marginTop: "8px" },
  yogaTime: { fontSize: "12px", color: "#E77291", marginTop: "4px" },
  joinBtn: { marginTop: "16px", padding: "8px 16px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer", width: "100%" },
  musicPlayer: { background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #F5D0DA" },
  playlistsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },
  playlistCard: { textAlign: "center", padding: "20px", borderRadius: "16px", border: "1px solid #F5D0DA", cursor: "pointer" },
  playlistIcon: { width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "28px" },
  nowPlaying: { textAlign: "center" },
  playingIcon: { fontSize: "64px", marginBottom: "16px" },
  playBtn: { padding: "10px 24px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", marginTop: "16px" },
  songList: { marginTop: "24px", textAlign: "left" },
  songItem: { display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: "1px solid #F5D0DA" },
  backBtn: { background: "none", border: "none", color: "#E77291", cursor: "pointer", marginBottom: "16px" },
  emergencyCard: { display: "flex", alignItems: "center", gap: "12px", background: "#FFE5E5", borderRadius: "16px", padding: "16px", marginBottom: "20px" },
  therapistsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "16px" },
  therapistCard: { display: "flex", gap: "16px", background: "white", borderRadius: "20px", padding: "20px", border: "1px solid #F5D0DA", alignItems: "center", flexWrap: "wrap" },
  therapistIcon: { fontSize: "48px" },
  therapistAvailability: { fontSize: "12px", color: "#4CAF50", marginTop: "4px" },
  therapistPrice: { fontSize: "13px", fontWeight: 600, color: "#AC1634", marginTop: "4px" },
  bookBtn: { marginLeft: "auto", padding: "8px 20px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer" },
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