// src/pages/RealWeddings.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Calendar, Users, Sparkles, ArrowRight, Play, Pause } from "lucide-react";
import HindiLogo from "../components/HindiLogo";

const weddings = [
  {
    id: 1,
    couple: "Meera & Karan",
    date: "February 2025",
    location: "Goa",
    type: "Beach Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    story: "A beautiful sunset ceremony by the Arabian Sea with 120 close friends and family. The couple wanted an intimate beach wedding with boho vibes.",
    budget: "₹25L",
    guests: 120,
    vendors: ["Dream Venues", "Royal Blooms Decor", "Lens & Love Studio"]
  },
  {
    id: 2,
    couple: "Priya & Raj",
    date: "December 2024",
    location: "Jaipur",
    type: "Royal Palace",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    story: "A grand royal wedding at City Palace with traditional Rajasthani decor and 500 guests.",
    budget: "₹75L",
    guests: 500,
    vendors: ["Grand Feast Caterers", "Royal Blooms Decor", "Beat Masters DJ"]
  },
  {
    id: 3,
    couple: "Anjali & Vikram",
    date: "November 2024",
    location: "Udaipur",
    type: "Lake Wedding",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
    story: "A magical wedding by Lake Pichola with floating decor and fireworks.",
    budget: "₹50L",
    guests: 250,
    vendors: ["Lens & Love Studio", "Royal Blooms Decor", "Glam by Priya"]
  }
];

export default function RealWeddings() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedWedding, setSelectedWedding] = useState(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % weddings.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentWedding = weddings[currentIndex];

  return (
    <div style={styles.container}>
      {/* Header - Simple with only Hindi logo */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerPlaceholder} />
          <HindiLogo size="medium" />
          <div style={styles.headerPlaceholder} />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>Real Weddings</h1>
          <p style={styles.subtitle}>Real couples. Real stories. Real magic.</p>
          <div style={styles.titleUnderline} />
        </div>

        {/* Featured Wedding Carousel */}
        <div style={styles.carouselContainer}>
          <div style={styles.carousel}>
            <img src={currentWedding.image} alt={currentWedding.couple} style={styles.carouselImage} />
            <div style={styles.carouselOverlay}>
              <span style={styles.weddingType}>{currentWedding.type}</span>
              <h2 style={styles.coupleName}>{currentWedding.couple}</h2>
              <div style={styles.weddingMeta}>
                <span><Calendar size={14} /> {currentWedding.date}</span>
                <span><MapPin size={14} /> {currentWedding.location}</span>
              </div>
              <button 
                style={styles.readStoryBtn}
                onClick={() => setSelectedWedding(currentWedding)}
              >
                Read Their Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
          
          <div style={styles.carouselControls}>
            <button onClick={() => setIsPlaying(!isPlaying)} style={styles.playBtn}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div style={styles.dots}>
              {weddings.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentIndex(idx); setIsPlaying(false); }}
                  style={{
                    ...styles.dot,
                    background: currentIndex === idx ? "#AC1634" : "#F5D0DA"
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Wedding Grid */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>More Wedding Stories</h2>
          <div style={styles.weddingsGrid}>
            {weddings.map((wedding) => (
              <div key={wedding.id} style={styles.weddingCard}>
                <img src={wedding.image} alt={wedding.couple} style={styles.weddingImage} />
                <div style={styles.weddingCardContent}>
                  <span style={styles.cardType}>{wedding.type}</span>
                  <h3 style={styles.cardCouple}>{wedding.couple}</h3>
                  <div style={styles.cardMeta}>
                    <span><Calendar size={12} /> {wedding.date}</span>
                    <span><MapPin size={12} /> {wedding.location}</span>
                  </div>
                  <button 
                    style={styles.viewStoryBtn}
                    onClick={() => setSelectedWedding(wedding)}
                  >
                    View Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Leads to Role Selection */}
        <div style={styles.ctaSection}>
          <Sparkles size={32} color="#E77291" />
          <h3 style={styles.ctaTitle}>Start Planning Your Dream Wedding</h3>
          <p style={styles.ctaText}>Join 10,000+ couples who planned their perfect day with Vivaha</p>
          <button onClick={() => navigate("/role")} style={styles.ctaBtn}>
            Start Planning Your Wedding → <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Story Modal */}
      {selectedWedding && (
        <div style={styles.modalOverlay} onClick={() => setSelectedWedding(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedWedding(null)} style={styles.modalClose}>✕</button>
            <img src={selectedWedding.image} alt={selectedWedding.couple} style={styles.modalImage} />
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>{selectedWedding.couple}</h2>
              <div style={styles.modalMeta}>
                <span><Calendar size={14} /> {selectedWedding.date}</span>
                <span><MapPin size={14} /> {selectedWedding.location}</span>
                <span><Users size={14} /> {selectedWedding.guests} guests</span>
                <span><Heart size={14} /> {selectedWedding.budget}</span>
              </div>
              <p style={styles.modalStory}>{selectedWedding.story}</p>
              <div style={styles.modalVendors}>
                <p style={styles.vendorsTitle}>Vendors they chose:</p>
                <div style={styles.vendorTags}>
                  {selectedWedding.vendors.map(v => (
                    <span key={v} style={styles.vendorTag}>{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
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
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerPlaceholder: {
    width: "70px"
  },
  mainContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "48px 32px",
    paddingBottom: "80px"
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "48px"
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "48px",
    color: "#3E0014",
    marginBottom: "12px"
  },
  subtitle: {
    fontSize: "18px",
    color: "#7A5560"
  },
  titleUnderline: {
    width: "80px",
    height: "3px",
    background: "#AC1634",
    margin: "20px auto 0"
  },
  carouselContainer: {
    marginBottom: "64px"
  },
  carousel: {
    position: "relative",
    borderRadius: "32px",
    overflow: "hidden",
    height: "500px"
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(62,0,20,0.9), transparent)",
    padding: "48px 40px",
    color: "white"
  },
  weddingType: {
    display: "inline-block",
    background: "rgba(231,114,145,0.2)",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    marginBottom: "16px"
  },
  coupleName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "36px",
    marginBottom: "12px"
  },
  weddingMeta: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    fontSize: "14px",
    opacity: 0.8
  },
  readStoryBtn: {
    background: "#E77291",
    border: "none",
    padding: "10px 24px",
    borderRadius: "999px",
    color: "#3E0014",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px"
  },
  carouselControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px"
  },
  playBtn: {
    background: "white",
    border: "1px solid #F5D0DA",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dots: {
    display: "flex",
    gap: "8px"
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s"
  },
  section: {
    marginBottom: "64px"
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "28px",
    color: "#3E0014",
    marginBottom: "24px"
  },
  weddingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "32px"
  },
  weddingCard: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid #F5D0DA",
    transition: "transform 0.3s"
  },
  weddingImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover"
  },
  weddingCardContent: {
    padding: "20px"
  },
  cardType: {
    display: "inline-block",
    background: "#FDF0F3",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "11px",
    color: "#AC1634",
    marginBottom: "12px"
  },
  cardCouple: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#3E0014",
    marginBottom: "8px"
  },
  cardMeta: {
    display: "flex",
    gap: "16px",
    fontSize: "12px",
    color: "#999",
    marginBottom: "16px"
  },
  viewStoryBtn: {
    background: "none",
    border: "1px solid #F5D0DA",
    padding: "8px 16px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "13px",
    width: "100%"
  },
  ctaSection: {
    textAlign: "center",
    background: "linear-gradient(135deg, #3E0014, #7A002B)",
    borderRadius: "32px",
    padding: "48px",
    color: "white"
  },
  ctaTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "28px",
    marginTop: "16px",
    marginBottom: "12px"
  },
  ctaText: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "24px"
  },
  ctaBtn: {
    background: "#E77291",
    border: "none",
    padding: "14px 32px",
    borderRadius: "999px",
    color: "#3E0014",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px"
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(62,0,20,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    borderRadius: "32px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "auto",
    position: "relative"
  },
  modalClose: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: 10
  },
  modalImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover"
  },
  modalContent: {
    padding: "24px"
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#3E0014",
    marginBottom: "16px"
  },
  modalMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    fontSize: "13px",
    color: "#666",
    marginBottom: "20px"
  },
  modalStory: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#444",
    marginBottom: "20px"
  },
  modalVendors: {
    paddingTop: "16px",
    borderTop: "1px solid #F5D0DA"
  },
  vendorsTitle: {
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "12px"
  },
  vendorTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  },
  vendorTag: {
    background: "#FDF0F3",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px"
  }
};