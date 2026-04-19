// src/pages/CoupleProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, MapPin, DollarSign, Heart, Edit2, Save, X, Mail, Phone, Home as HomeIcon, Users, LogOut } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function CoupleProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    firstName: user?.firstName || "", lastName: user?.lastName || "", spouseName: user?.spouseName || "",
    email: user?.email || "", phone: user?.phone || "", address: user?.address || "",
    city: user?.city || "", state: user?.state || "", weddingDate: user?.weddingDate || "", budget: user?.budget || ""
  });

  const handleSave = () => { setUser({ ...user, ...editedDetails }); setIsEditing(false); };

  const InfoItem = ({ icon, label, value, isEditing, onChange, field }) => (
    <div style={styles.infoItem}>
      <div style={styles.infoIcon}>{icon}</div>
      <div style={styles.infoContent}>
        <p style={styles.infoLabel}>{label}</p>
        {isEditing && onChange ? <input style={styles.infoInput} value={value || ""} onChange={(e) => onChange(field, e.target.value)} /> : <p style={styles.infoValue}>{value || "—"}</p>}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate("/home")} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <button onClick={() => setIsEditing(!isEditing)} style={styles.editBtn}>{isEditing ? <Save size={20} /> : <Edit2 size={20} />}</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}><Heart size={40} color="#E77291" /></div>
          {isEditing ? <input style={styles.nameInput} value={editedDetails.firstName} onChange={(e) => setEditedDetails({...editedDetails, firstName: e.target.value})} /> : <h2 style={styles.profileName}>{user?.firstName || user?.name || "Guest"}</h2>}
          <p style={styles.profileRole}>💑 Bride/Groom</p>
        </div>

        <div style={styles.section}><h3><Users size={18} /> Personal Information</h3>
          <InfoItem icon={<User size={16} />} label="First Name" value={editedDetails.firstName} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, firstName: v})} />
          <InfoItem icon={<User size={16} />} label="Last Name" value={editedDetails.lastName} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, lastName: v})} />
          <InfoItem icon={<Heart size={16} />} label="Spouse" value={editedDetails.spouseName} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, spouseName: v})} />
          <InfoItem icon={<Mail size={16} />} label="Email" value={editedDetails.email} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, email: v})} />
          <InfoItem icon={<Phone size={16} />} label="Phone" value={editedDetails.phone} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, phone: v})} />
        </div>

        <div style={styles.section}><h3><Calendar size={18} /> Wedding Details</h3>
          <InfoItem icon={<Calendar size={16} />} label="Wedding Date" value={editedDetails.weddingDate} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, weddingDate: v})} />
          <InfoItem icon={<MapPin size={16} />} label="City" value={editedDetails.city} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, city: v})} />
          <InfoItem icon={<DollarSign size={16} />} label="Budget" value={editedDetails.budget} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, budget: v})} />
        </div>

        <div style={styles.section}><h3><HomeIcon size={18} /> Address</h3>
          <InfoItem icon={<MapPin size={16} />} label="Address" value={editedDetails.address} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, address: v})} />
          <InfoItem icon={<MapPin size={16} />} label="State" value={editedDetails.state} isEditing={isEditing} onChange={(f, v) => setEditedDetails({...editedDetails, state: v})} />
        </div>

        {isEditing && <div style={styles.editActions}><button onClick={() => setIsEditing(false)}>Cancel</button><button onClick={handleSave}>Save Changes</button></div>}

        <button onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}><LogOut size={16} /> Logout</button>
      </div>

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px" },
  editBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 12px", borderRadius: "10px" },
  mainContent: { maxWidth: "900px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  profileHeader: { textAlign: "center", marginBottom: "32px" },
  avatar: { width: "80px", height: "80px", borderRadius: "50%", background: "#F5D0DA", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  profileName: { fontSize: "28px", fontWeight: 700, color: "#3E0014" },
  profileRole: { fontSize: "14px", color: "#E77291" },
  nameInput: { fontSize: "24px", textAlign: "center", border: "1px solid #F5D0DA", borderRadius: "12px", padding: "8px", width: "100%", maxWidth: "300px", margin: "0 auto" },
  section: { background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", border: "1px solid #F5D0DA" },
  infoItem: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  infoIcon: { width: "32px", color: "#AC1634" },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: "11px", color: "#AC1634", fontWeight: 600, marginBottom: "2px" },
  infoValue: { fontSize: "15px", color: "#1A1A1A" },
  infoInput: { fontSize: "14px", border: "1px solid #F5D0DA", borderRadius: "8px", padding: "6px 8px", width: "100%" },
  editActions: { display: "flex", gap: "12px", marginTop: "20px" },
  logoutBtn: { width: "100%", padding: "14px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", color: "#F44336", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px" }
};