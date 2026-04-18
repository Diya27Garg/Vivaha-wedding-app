// src/pages/InvitationDesign.jsx
import { useState } from "react";
import { Download, Sparkles, ExternalLink, Palette, Calendar, MapPin, Users, Heart } from "lucide-react";

export default function InvitationDesign() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const templates = [
    {
      id: 1,
      name: "Royal Gold",
      style: "Traditional",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      price: "Free",
      provider: "Canva",
      canvaLink: "https://canva.com/template/royal-gold"
    },
    {
      id: 2,
      name: "Minimal Elegance",
      style: "Modern",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      price: "Free",
      provider: "Canva",
      canvaLink: "https://canva.com/template/minimal-elegance"
    },
    {
      id: 3,
      name: "Floral Dream",
      style: "Bohemian",
      image: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b",
      price: "₹499",
      provider: "Local Designer",
      canvaLink: "https://example.com/floral-dream"
    }
  ];

  const vendors = [
    { name: "PaperNest", rating: 4.9, price: "₹50/invite", specialty: "Luxury Invites" },
    { name: "Digital Invites Co", rating: 4.8, price: "₹20/invite", specialty: "E-invites" },
    { name: "Creative Cards", rating: 4.7, price: "₹35/invite", specialty: "Custom Designs" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Wedding Invitations</h1>
        <p style={styles.subtitle}>Design your dream invitation with Canva or hire expert designers</p>
      </div>

      {/* Canva Templates Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}><Palette size={20} /> Canva Templates</h2>
        <div style={styles.templatesGrid}>
          {templates.map(template => (
            <div key={template.id} style={styles.templateCard}>
              <img src={template.image} alt={template.name} style={styles.templateImage} />
              <div style={styles.templateInfo}>
                <h3 style={styles.templateName}>{template.name}</h3>
                <p style={styles.templateStyle}>{template.style}</p>
                <div style={styles.templateActions}>
                  <button 
                    style={styles.canvaBtn}
                    onClick={() => window.open(template.canvaLink, "_blank")}
                  >
                    <ExternalLink size={14} /> Open in Canva
                  </button>
                  <button style={styles.previewBtn}>Preview</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}><Users size={20} /> Expert Invitation Designers</h2>
        <div style={styles.vendorsGrid}>
          {vendors.map((vendor, i) => (
            <div key={i} style={styles.vendorCard}>
              <div style={styles.vendorIcon}>✨</div>
              <div>
                <h3 style={styles.vendorName}>{vendor.name}</h3>
                <p style={styles.vendorSpecialty}>{vendor.specialty}</p>
                <p style={styles.vendorPrice}>{vendor.price}</p>
              </div>
              <button style={styles.contactBtn}>Contact</button>
            </div>
          ))}
        </div>
      </div>

      <button style={styles.customBtn}>
        <Sparkles size={18} /> Get Custom Design Quote
      </button>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", padding: "20px", paddingBottom: "80px" },
  header: { textAlign: "center", marginBottom: "32px" },
  title: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "28px", color: "#3E0014", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#666" },
  section: { marginBottom: "32px" },
  sectionTitle: { fontSize: "20px", fontWeight: 600, color: "#3E0014", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
  templatesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" },
  templateCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA" },
  templateImage: { width: "100%", height: "180px", objectFit: "cover" },
  templateInfo: { padding: "16px" },
  templateName: { fontSize: "16px", fontWeight: 600, marginBottom: "4px" },
  templateStyle: { fontSize: "12px", color: "#E77291", marginBottom: "12px" },
  templateActions: { display: "flex", gap: "10px" },
  canvaBtn: { flex: 1, padding: "8px", borderRadius: "999px", background: "#00B4D8", color: "white", border: "none", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" },
  previewBtn: { flex: 1, padding: "8px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  vendorsGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  vendorCard: { background: "white", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid #F5D0DA" },
  vendorIcon: { fontSize: "32px" },
  vendorName: { fontSize: "14px", fontWeight: 600 },
  vendorSpecialty: { fontSize: "11px", color: "#E77291" },
  vendorPrice: { fontSize: "12px", color: "#AC1634", fontWeight: 600 },
  contactBtn: { marginLeft: "auto", padding: "8px 16px", borderRadius: "999px", background: "#3E0014", color: "white", border: "none", cursor: "pointer" },
  customBtn: { width: "100%", padding: "14px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }
};