// src/pages/WellnessHub.jsx
import { useState } from "react";
import { Heart, Brain, Smile, BookOpen, Music, Sparkles, MessageCircle, Calendar, Leaf } from "lucide-react";

export default function WellnessHub() {
  const [activeTab, setActiveTab] = useState("meditate");

  const resources = {
    meditate: [
      { title: "5-Minute Wedding Stress Relief", duration: "5 min", type: "Audio" },
      { title: "Mindful Breathing for Brides", duration: "10 min", type: "Video" },
      { title: "Sleep Meditation", duration: "15 min", type: "Audio" }
    ],
    articles: [
      { title: "Managing Wedding Planning Anxiety", readTime: "5 min read" },
      { title: "Communication Tips for Couples", readTime: "7 min read" },
      { title: "Self-Care During Wedding Prep", readTime: "4 min read" }
    ],
    experts: [
      { name: "Dr. Priya Sharma", specialty: "Relationship Counselor", availability: "Available Today", image: "👩‍⚕️" },
      { name: "Rahul Mehta", specialty: "Stress Management Coach", availability: "Tomorrow", image: "🧘" }
    ]
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Emotional Wellness</h1>
        <p style={styles.subtitle}>Take care of your mental well-being during wedding planning</p>
      </div>

      {/* Daily Affirmation */}
      <div style={styles.affirmationCard}>
        <Sparkles size={24} color="#E77291" />
        <p style={styles.affirmationText}>"Your wedding is one day, your marriage is forever. Breathe and enjoy the journey."</p>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{...styles.tab, ...(activeTab === "meditate" ? styles.activeTab : {})}} onClick={() => setActiveTab("meditate")}>
          <Brain size={18} /> Meditate
        </button>
        <button style={{...styles.tab, ...(activeTab === "articles" ? styles.activeTab : {})}} onClick={() => setActiveTab("articles")}>
          <BookOpen size={18} /> Articles
        </button>
        <button style={{...styles.tab, ...(activeTab === "experts" ? styles.activeTab : {})}} onClick={() => setActiveTab("experts")}>
          <MessageCircle size={18} /> Expert Help
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeTab === "meditate" && (
          <div>
            {resources.meditate.map((item, i) => (
              <div key={i} style={styles.resourceCard}>
                <div style={styles.resourceIcon}>🎧</div>
                <div>
                  <h3 style={styles.resourceTitle}>{item.title}</h3>
                  <p style={styles.resourceMeta}>{item.duration} • {item.type}</p>
                </div>
                <button style={styles.playBtn}>Start</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "articles" && (
          <div>
            {resources.articles.map((item, i) => (
              <div key={i} style={styles.resourceCard}>
                <div style={styles.resourceIcon}>📖</div>
                <div>
                  <h3 style={styles.resourceTitle}>{item.title}</h3>
                  <p style={styles.resourceMeta}>{item.readTime}</p>
                </div>
                <button style={styles.readBtn}>Read</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "experts" && (
          <div>
            <div style={styles.emergencyCard}>
              <Heart size={20} color="#AC1634" />
              <p>Need immediate support? Call our helpline: <strong>1800-WED-CARE</strong></p>
            </div>
            {resources.experts.map((expert, i) => (
              <div key={i} style={styles.expertCard}>
                <div style={styles.expertImage}>{expert.image}</div>
                <div>
                  <h3 style={styles.expertName}>{expert.name}</h3>
                  <p style={styles.expertSpecialty}>{expert.specialty}</p>
                  <p style={styles.expertAvailability}>✅ {expert.availability}</p>
                </div>
                <button style={styles.bookBtn}>Book Session</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Section */}
      <div style={styles.communityCard}>
        <h3 style={styles.communityTitle}>Join Our Community 💬</h3>
        <p>Connect with other couples going through the same journey</p>
        <button style={styles.joinBtn}>Join Support Group</button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", padding: "20px", paddingBottom: "80px" },
  header: { textAlign: "center", marginBottom: "24px" },
  title: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "28px", color: "#3E0014", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#666" },
  affirmationCard: { background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)", borderRadius: "20px", padding: "20px", textAlign: "center", marginBottom: "24px", color: "white" },
  affirmationText: { fontSize: "16px", lineHeight: 1.5, marginTop: "12px", fontStyle: "italic" },
  tabs: { display: "flex", gap: "8px", marginBottom: "20px" },
  tab: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "13px" },
  activeTab: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  content: { marginBottom: "24px" },
  resourceCard: { background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #F5D0DA" },
  resourceIcon: { fontSize: "32px" },
  resourceTitle: { fontSize: "14px", fontWeight: 600, marginBottom: "4px" },
  resourceMeta: { fontSize: "11px", color: "#999" },
  playBtn: { marginLeft: "auto", padding: "6px 16px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer" },
  readBtn: { marginLeft: "auto", padding: "6px 16px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer" },
  emergencyCard: { background: "#FFE5E5", borderRadius: "16px", padding: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" },
  expertCard: { background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #F5D0DA" },
  expertImage: { fontSize: "40px" },
  expertName: { fontSize: "14px", fontWeight: 600 },
  expertSpecialty: { fontSize: "11px", color: "#E77291" },
  expertAvailability: { fontSize: "10px", color: "#4CAF50" },
  bookBtn: { marginLeft: "auto", padding: "6px 16px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer" },
  communityCard: { background: "linear-gradient(135deg, #E77291 0%, #F5D0DA 100%)", borderRadius: "20px", padding: "20px", textAlign: "center" },
  communityTitle: { fontSize: "18px", fontWeight: 600, marginBottom: "8px" },
  joinBtn: { marginTop: "12px", padding: "10px 20px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer" }
};