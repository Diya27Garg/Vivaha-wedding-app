// src/pages/LegalDocs.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Scale, BookOpen, CheckCircle, AlertCircle, Heart, Users, Home, Landmark, FileCheck, Sparkles } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function LegalDocs() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("marriage");

  const categories = [
    { id: "marriage", label: "Marriage Laws", icon: <Heart size={18} /> },
    { id: "registration", label: "Registration", icon: <FileCheck size={18} /> },
    { id: "rights", label: "Legal Rights", icon: <Shield size={18} /> },
    { id: "documents", label: "Required Docs", icon: <FileText size={18} /> },
    { id: "prenup", label: "Prenuptial", icon: <Scale size={18} /> }
  ];

  const content = {
    marriage: {
      title: "Marriage Laws in India",
      description: "Understanding the legal framework for marriage in India",
      sections: [
        {
          title: "Hindu Marriage Act, 1955",
          content: "Applies to Hindus, Buddhists, Jains, and Sikhs. Minimum age: 21 for groom, 18 for bride. Requires ceremonies like Saptapadi.",
          icon: "🕉️"
        },
        {
          title: "Special Marriage Act, 1954",
          content: "For inter-caste and inter-religion marriages. Requires 30-day public notice and registration.",
          icon: "📜"
        },
        {
          title: "Muslim Personal Law",
          content: "Governed by Muslim Personal Law (Shariat) Application Act, 1937. Nikah ceremony required.",
          icon: "☪️"
        },
        {
          title: "Indian Christian Marriage Act, 1872",
          content: "For Christian marriages. Requires church ceremony and registration.",
          icon: "⛪"
        }
      ]
    },
    registration: {
      title: "Marriage Registration Process",
      description: "Step-by-step guide to register your marriage legally",
      steps: [
        { step: "1", title: "Apply Online", desc: "Fill application on state marriage portal" },
        { step: "2", title: "Document Submission", desc: "Submit required documents with fees" },
        { step: "3", title: "Verification", desc: "30-day notice period for objections" },
        { step: "4", title: "Registration", desc: "Both parties appear with witnesses" },
        { step: "5", title: "Certificate", desc: "Receive marriage certificate within 15 days" }
      ],
      fees: "₹100-₹500 depending on state"
    },
    rights: {
      title: "Legal Rights After Marriage",
      description: "Know your rights as a married couple",
      sections: [
        { title: "Right to Maintenance", description: "Spouse has right to financial support", icon: "💰" },
        { title: "Right to Matrimonial Home", description: "Right to reside in shared home", icon: "🏠" },
        { title: "Right to Property", description: "Inheritance and succession rights", icon: "📦" },
        { title: "Right to Children", description: "Custody and guardianship rights", icon: "👶" },
        { title: "Protection from Domestic Violence", description: "Legal protection under DV Act", icon: "🛡️" }
      ]
    },
    documents: {
      title: "Documents Required for Marriage Registration",
      description: "Essential documents checklist",
      docs: [
        { name: "Application Form", details: "Duly signed by both parties" },
        { name: "Age Proof", details: "Birth certificate / 10th certificate / Passport" },
        { name: "Address Proof", details: "Aadhar / Voter ID / Passport / Utility bill" },
        { name: "Photographs", details: "5-10 passport size photos of couple" },
        { name: "Wedding Invitation", details: "For religious marriage proof" },
        { name: "Witness IDs", details: "Two witnesses with valid ID proofs" },
        { name: "Divorce Decree", details: "If applicable (for divorced individuals)" },
        { name: "Death Certificate", details: "If widowed" }
      ]
    },
    prenup: {
      title: "Prenuptial Agreements in India",
      description: "Understanding prenups and marital contracts",
      note: "Prenuptial agreements are not legally enforceable under Hindu Marriage Act but can be considered as moral contracts.",
      sections: [
        { title: "What is a Prenup?", description: "Agreement signed before marriage detailing asset division", icon: "📝" },
        { title: "Validity", description: "Not fully recognized in India, but can be used as evidence", icon: "⚖️" },
        { title: "What to Include", description: "Assets, debts, property rights, maintenance", icon: "📋" },
        { title: "Consult a Lawyer", description: "Always get legal advice before signing", icon: "👨‍⚖️" }
      ]
    }
  };

  const currentContent = content[activeCategory];

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
          <h1 style={styles.title}>Legal & Documents</h1>
          <p style={styles.subtitle}>Your guide to marriage laws, registrations, and legal rights</p>
        </div>

        {/* Disclaimer Banner */}
        <div style={styles.disclaimerBanner}>
          <AlertCircle size={20} color="#FF9800" />
          <div>
            <strong>Disclaimer:</strong> This information is for educational purposes only. Please consult a legal professional for specific advice.
          </div>
        </div>

        {/* Category Navigation */}
        <div style={styles.categoryNav}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                ...styles.categoryBtn,
                ...(activeCategory === cat.id ? styles.categoryBtnActive : {})
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div style={styles.contentSection}>
          <h2 style={styles.contentTitle}>{currentContent.title}</h2>
          <p style={styles.contentDesc}>{currentContent.description}</p>

          {/* Marriage Laws Content */}
          {activeCategory === "marriage" && (
            <div style={styles.sectionsGrid}>
              {currentContent.sections.map((section, i) => (
                <div key={i} style={styles.infoCard}>
                  <div style={styles.infoIcon}>{section.icon}</div>
                  <div>
                    <h3 style={styles.infoTitle}>{section.title}</h3>
                    <p style={styles.infoText}>{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Registration Steps */}
          {activeCategory === "registration" && (
            <div>
              <div style={styles.stepsContainer}>
                {currentContent.steps.map((step, i) => (
                  <div key={i} style={styles.stepCard}>
                    <div style={styles.stepNumber}>{step.step}</div>
                    <div>
                      <h3 style={styles.stepTitle}>{step.title}</h3>
                      <p style={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.feeCard}>
                <strong>Registration Fees:</strong> {currentContent.fees}
              </div>
            </div>
          )}

          {/* Legal Rights */}
          {activeCategory === "rights" && (
            <div style={styles.rightsGrid}>
              {currentContent.sections.map((right, i) => (
                <div key={i} style={styles.rightCard}>
                  <div style={styles.rightIcon}>{right.icon}</div>
                  <h3 style={styles.rightTitle}>{right.title}</h3>
                  <p style={styles.rightDesc}>{right.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Documents Checklist */}
          {activeCategory === "documents" && (
            <div style={styles.docsList}>
              {currentContent.docs.map((doc, i) => (
                <div key={i} style={styles.docCard}>
                  <CheckCircle size={20} color="#4CAF50" />
                  <div>
                    <p style={styles.docName}>{doc.name}</p>
                    <p style={styles.docDetails}>{doc.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Prenup Section */}
          {activeCategory === "prenup" && (
            <div>
              <div style={styles.noteCard}>
                <AlertCircle size={20} color="#FF9800" />
                <p>{currentContent.note}</p>
              </div>
              <div style={styles.prenupGrid}>
                {currentContent.sections.map((item, i) => (
                  <div key={i} style={styles.prenupCard}>
                    <div style={styles.prenupIcon}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Legal Consultation CTA */}
        <div style={styles.consultCard}>
          <Landmark size={32} color="#E77291" />
          <div>
            <h3 style={styles.consultTitle}>Need Legal Help?</h3>
            <p style={styles.consultText}>Connect with verified marriage lawyers for personalized guidance</p>
          </div>
          <button style={styles.consultBtn}>Find a Lawyer →</button>
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
  heroSection: { textAlign: "center", marginBottom: "32px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  disclaimerBanner: { display: "flex", alignItems: "center", gap: "12px", background: "#FFF8E1", padding: "16px", borderRadius: "16px", marginBottom: "32px", fontSize: "13px" },
  categoryNav: { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px", justifyContent: "center" },
  categoryBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "14px" },
  categoryBtnActive: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  contentSection: { marginBottom: "40px" },
  contentTitle: { fontSize: "28px", fontWeight: 600, color: "#3E0014", marginBottom: "12px" },
  contentDesc: { fontSize: "16px", color: "#666", marginBottom: "24px" },
  sectionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" },
  infoCard: { display: "flex", gap: "16px", background: "white", borderRadius: "20px", padding: "20px", border: "1px solid #F5D0DA" },
  infoIcon: { fontSize: "32px" },
  infoTitle: { fontSize: "16px", fontWeight: 600, marginBottom: "8px" },
  infoText: { fontSize: "13px", color: "#666", lineHeight: 1.5 },
  stepsContainer: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" },
  stepCard: { display: "flex", gap: "16px", background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #F5D0DA" },
  stepNumber: { width: "40px", height: "40px", borderRadius: "50%", background: "#AC1634", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold" },
  stepTitle: { fontSize: "16px", fontWeight: 600, marginBottom: "4px" },
  stepDesc: { fontSize: "13px", color: "#666" },
  feeCard: { background: "#FDF0F3", padding: "16px", borderRadius: "16px", fontSize: "14px" },
  rightsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" },
  rightCard: { textAlign: "center", background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #F5D0DA" },
  rightIcon: { fontSize: "40px", marginBottom: "12px" },
  rightTitle: { fontSize: "16px", fontWeight: 600, marginBottom: "8px" },
  rightDesc: { fontSize: "12px", color: "#666" },
  docsList: { display: "flex", flexDirection: "column", gap: "12px" },
  docCard: { display: "flex", alignItems: "center", gap: "16px", background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #F5D0DA" },
  docName: { fontSize: "14px", fontWeight: 600, marginBottom: "4px" },
  docDetails: { fontSize: "12px", color: "#666" },
  noteCard: { display: "flex", alignItems: "center", gap: "12px", background: "#FFF3E0", padding: "16px", borderRadius: "16px", marginBottom: "24px" },
  prenupGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  prenupCard: { background: "white", borderRadius: "20px", padding: "20px", textAlign: "center", border: "1px solid #F5D0DA" },
  prenupIcon: { fontSize: "40px", marginBottom: "12px" },
  consultCard: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "24px", padding: "24px", color: "white", flexWrap: "wrap", gap: "16px" },
  consultTitle: { fontSize: "18px", fontWeight: 600, marginBottom: "4px" },
  consultText: { fontSize: "13px", opacity: 0.8 },
  consultBtn: { background: "#E77291", color: "#3E0014", border: "none", padding: "12px 24px", borderRadius: "999px", cursor: "pointer", fontWeight: 600 }
};