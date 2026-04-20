// src/pages/RasamRiwaz.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Heart, Sparkles, ChevronRight, Clock, Flower2, Music, Gift, Camera } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function RasamRiwaz() {
  const navigate = useNavigate();
  const [selectedCommunity, setSelectedCommunity] = useState("hindu");

  const rituals = {
    hindu: [
      { name: "Mehendi", description: "Henna ceremony for the bride", significance: "Symbolizes love and prosperity", duration: "3-4 hours", icon: "🎨" },
      { name: "Sangeet", description: "Musical night with family and friends", significance: "Celebration and bonding", duration: "4-5 hours", icon: "🎵" },
      { name: "Haldi", description: "Turmeric paste ceremony", significance: "Purification and blessings", duration: "2-3 hours", icon: "🟡" },
      { name: "Ganpati Pujan", description: "Prayer to Lord Ganesha", significance: "Removes obstacles", duration: "1 hour", icon: "🐘" },
      { name: "Pithi", description: "Applying sandalwood paste", significance: "Brings glow to the couple", duration: "2 hours", icon: "🌿" },
      { name: "Baraat", description: "Groom's procession", significance: "Welcoming the groom", duration: "2-3 hours", icon: "🐎" },
      { name: "Jaimala", description: "Exchange of garlands", significance: "Acceptance of each other", duration: "30 mins", icon: "🌸" },
      { name: "Kanyadaan", description: "Giving away the bride", significance: "Sacred offering", duration: "30 mins", icon: "🙏" },
      { name: "Pheras", description: "Seven rounds around sacred fire", significance: "Seven sacred vows", duration: "1 hour", icon: "🔥" },
      { name: "Sindoor Daan", description: "Applying vermilion", significance: "Symbol of marriage", duration: "10 mins", icon: "🔴" },
      { name: "Vidai", description: "Bride's farewell", significance: "Emotional departure", duration: "1 hour", icon: "🚗" },
      { name: "Griha Pravesh", description: "Welcome to new home", significance: "New beginning", duration: "1 hour", icon: "🏠" }
    ],
    sikh: [
      { name: "Anand Karaj", description: "Blissful union ceremony", significance: "Spiritual union", duration: "2 hours", icon: "📿" },
      { name: "Milni", description: "Family introductions", significance: "Family bonding", duration: "1 hour", icon: "🤝" },
      { name: "Laavan", description: "Four wedding hymns", significance: "Four stages of life", duration: "1 hour", icon: "📖" }
    ],
    muslim: [
      { name: "Nikah", description: "Marriage contract ceremony", significance: "Sacred covenant", duration: "1-2 hours", icon: "📜" },
      { name: "Mehr", description: "Bridal gift from groom", significance: "Symbol of respect", duration: "30 mins", icon: "💎" },
      { name: "Walima", description: "Wedding reception", significance: "Celebration", duration: "3-4 hours", icon: "🍽️" }
    ],
    christian: [
      { name: "Engagement", description: "Formal commitment", significance: "Promise to marry", duration: "2 hours", icon: "💍" },
      { name: "Bachelor Party", description: "Celebration with friends", significance: "Last single celebration", duration: "4-5 hours", icon: "🎉" },
      { name: "Wedding Mass", description: "Church ceremony", significance: "Blessing by God", duration: "1.5 hours", icon: "⛪" }
    ]
  };

  const communities = [
    { id: "hindu", name: "Hindu", icon: "🕉️", color: "#FF6B6B" },
    { id: "sikh", name: "Sikh", icon: "📿", color: "#4ECDC4" },
    { id: "muslim", name: "Muslim", icon: "☪️", color: "#45B7D1" },
    { id: "christian", name: "Christian", icon: "⛪", color: "#96CEB4" }
  ];

  const currentRituals = rituals[selectedCommunity] || rituals.hindu;

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
          <h1 style={styles.title}>Rasam & Riwaz</h1>
          <p style={styles.subtitle}>Discover the rich cultural heritage of Indian weddings</p>
        </div>

        {/* Coming Soon Banner */}
        <div style={styles.comingSoonBanner}>
          <Sparkles size={24} color="#E77291" />
          <div>
            <h3 style={styles.comingSoonTitle}>Coming Soon! 🚀</h3>
            <p style={styles.comingSoonText}>
              We're working on personalized ritual guides based on your community, region, and family traditions.
              Get ready for customized ceremony planners, ritual checklists, and expert guidance!
            </p>
          </div>
          <div style={styles.comingSoonBadge}>In Development</div>
        </div>

        {/* Community Selection */}
        <div style={styles.communitySection}>
          <h2 style={styles.sectionTitle}>Select Your Community</h2>
          <div style={styles.communityGrid}>
            {communities.map(comm => (
              <button
                key={comm.id}
                onClick={() => setSelectedCommunity(comm.id)}
                style={{
                  ...styles.communityCard,
                  ...(selectedCommunity === comm.id ? styles.communityCardActive : {}),
                  borderColor: selectedCommunity === comm.id ? comm.color : "#F5D0DA"
                }}
              >
                <span style={styles.communityIcon}>{comm.icon}</span>
                <span style={styles.communityName}>{comm.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rituals List */}
        <div style={styles.ritualsSection}>
          <h2 style={styles.sectionTitle}>
            <Heart size={20} color="#AC1634" /> Traditional Rituals
          </h2>
          <div style={styles.ritualsGrid}>
            {currentRituals.map((ritual, i) => (
              <div key={i} style={styles.ritualCard}>
                <div style={styles.ritualIcon}>{ritual.icon}</div>
                <div style={styles.ritualContent}>
                  <h3 style={styles.ritualName}>{ritual.name}</h3>
                  <p style={styles.ritualDesc}>{ritual.description}</p>
                  <div style={styles.ritualMeta}>
                    <span><Sparkles size={12} /> {ritual.significance}</span>
                    <span><Clock size={12} /> {ritual.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Features */}
        <div style={styles.previewSection}>
          <h2 style={styles.sectionTitle}>Coming Features</h2>
          <div style={styles.previewGrid}>
            <div style={styles.previewCard}>
              <div style={styles.previewIcon}>📅</div>
              <h4>Custom Ritual Timeline</h4>
              <p>Get a personalized schedule based on your rituals</p>
            </div>
            <div style={styles.previewCard}>
              <div style={styles.previewIcon}>📖</div>
              <h4>Mantra & Vows Guide</h4>
              <p>Learn the meaning behind sacred chants</p>
            </div>
            <div style={styles.previewCard}>
              <div style={styles.previewIcon}>🎥</div>
              <h4>Video Tutorials</h4>
              <p>Step-by-step ritual demonstrations</p>
            </div>
            <div style={styles.previewCard}>
              <div style={styles.previewIcon}>👥</div>
              <h4>Expert Consultation</h4>
              <p>Connect with pandits and ritual specialists</p>
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
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", fontSize: "14px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "48px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  comingSoonBanner: { display: "flex", alignItems: "center", gap: "20px", background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "24px", padding: "24px", marginBottom: "40px", color: "white", flexWrap: "wrap" },
  comingSoonTitle: { fontSize: "20px", fontWeight: 600, marginBottom: "8px" },
  comingSoonText: { fontSize: "14px", opacity: 0.8 },
  comingSoonBadge: { background: "#E77291", color: "#3E0014", padding: "6px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
  communitySection: { marginBottom: "48px" },
  sectionTitle: { fontSize: "24px", fontWeight: 600, color: "#3E0014", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" },
  communityGrid: { display: "flex", gap: "16px", flexWrap: "wrap" },
  communityCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px", borderRadius: "999px", border: "2px solid #F5D0DA", background: "white", cursor: "pointer", transition: "all 0.2s" },
  communityCardActive: { background: "#3E0014", color: "white" },
  communityIcon: { fontSize: "24px" },
  communityName: { fontSize: "16px", fontWeight: 500 },
  ritualsSection: { marginBottom: "48px" },
  ritualsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" },
  ritualCard: { display: "flex", gap: "16px", background: "white", borderRadius: "20px", padding: "20px", border: "1px solid #F5D0DA" },
  ritualIcon: { fontSize: "40px" },
  ritualContent: { flex: 1 },
  ritualName: { fontSize: "18px", fontWeight: 600, color: "#3E0014", marginBottom: "4px" },
  ritualDesc: { fontSize: "13px", color: "#666", marginBottom: "8px" },
  ritualMeta: { display: "flex", gap: "16px", fontSize: "11px", color: "#999" },
  previewSection: { marginBottom: "48px" },
  previewGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" },
  previewCard: { textAlign: "center", background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #F5D0DA" },
  previewIcon: { fontSize: "48px", marginBottom: "12px" }
};