// src/pages/CoupleProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Calendar, MapPin, DollarSign, Heart, Edit2, Save, 
  X, Mail, Phone, Home, Users, Star, Clock, CheckCircle,
  ShoppingCart, Package, MessageCircle, LogOut
} from "lucide-react";
import { bookingService } from "../services/bookingService";

export default function CoupleProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedDetails, setEditedDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    spouseName: user?.spouseName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    weddingDate: user?.weddingDate || "",
    weddingCity: user?.weddingCity || "",
    budget: user?.budget || ""
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const bookings = await bookingService.getCoupleBookings();
    setMyBookings(bookings);
    setLoading(false);
  };

  const handleSave = () => {
    setUser({ ...user, ...editedDetails });
    setIsEditing(false);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: "Request Sent", color: "#FF9800", icon: <Clock size={12} /> },
      vendor_accepted: { text: "Vendor Accepted", color: "#4CAF50", icon: <CheckCircle size={12} /> },
      meeting_scheduled: { text: "Meeting Scheduled", color: "#2196F3", icon: <Calendar size={12} /> },
      confirmed: { text: "Confirmed", color: "#9C27B0", icon: <CheckCircle size={12} /> },
      booked: { text: "Booked & Paid", color: "#AC1634", icon: <CheckCircle size={12} /> },
      rejected: { text: "Not Available", color: "#F44336", icon: <X size={12} /> }
    };
    return statusMap[status] || { text: status, color: "#999", icon: null };
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Package size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  const InfoItem = ({ icon, label, value, isEditing, onChange, field }) => (
    <div style={styles.infoItem}>
      <div style={styles.infoIcon}>{icon}</div>
      <div style={styles.infoContent}>
        <p style={styles.infoLabel}>{label}</p>
        {isEditing && onChange ? (
          <input style={styles.infoInput} value={value || ""} onChange={(e) => onChange(field, e.target.value)} />
        ) : (
          <p style={styles.infoValue}>{value || "—"}</p>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate("/home")} style={styles.backBtn}>←</button>
          <h1 style={styles.title}>My Profile</h1>
          <button onClick={() => setIsEditing(!isEditing)} style={styles.editBtn}>
            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            <Heart size={40} color="#E77291" />
          </div>
          {isEditing ? (
            <input style={styles.nameInput} value={editedDetails.firstName || ""}
              onChange={(e) => setEditedDetails({...editedDetails, firstName: e.target.value})}
              placeholder="Your Name" />
          ) : (
            <h2 style={styles.profileName}>{user?.firstName || user?.name || "Guest"}</h2>
          )}
          <p style={styles.profileRole}>💑 Bride/Groom</p>
        </div>

        {/* Personal Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}><Users size={18} /> Personal Information</h3>
          <div style={styles.infoGrid}>
            <InfoItem icon={<User size={16} />} label="First Name" value={editedDetails.firstName} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, firstName: v})} field="firstName" />
            <InfoItem icon={<User size={16} />} label="Last Name" value={editedDetails.lastName} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, lastName: v})} field="lastName" />
            <InfoItem icon={<Heart size={16} />} label="Spouse/Partner" value={editedDetails.spouseName} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, spouseName: v})} field="spouseName" />
            <InfoItem icon={<Mail size={16} />} label="Email" value={editedDetails.email} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, email: v})} field="email" />
            <InfoItem icon={<Phone size={16} />} label="Phone" value={editedDetails.phone} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, phone: v})} field="phone" />
          </div>
        </div>

        {/* Wedding Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}><Calendar size={18} /> Wedding Details</h3>
          <div style={styles.infoGrid}>
            <InfoItem icon={<Calendar size={16} />} label="Wedding Date" value={editedDetails.weddingDate} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, weddingDate: v})} field="weddingDate" />
            <InfoItem icon={<MapPin size={16} />} label="Wedding City" value={editedDetails.weddingCity} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, weddingCity: v})} field="weddingCity" />
            <InfoItem icon={<DollarSign size={16} />} label="Budget" value={editedDetails.budget} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, budget: v})} field="budget" />
          </div>
        </div>

        {/* Address */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}><Home size={18} /> Address</h3>
          <div style={styles.infoGrid}>
            <InfoItem icon={<MapPin size={16} />} label="Address" value={editedDetails.address} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, address: v})} field="address" />
            <InfoItem icon={<MapPin size={16} />} label="City" value={editedDetails.city} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, city: v})} field="city" />
            <InfoItem icon={<MapPin size={16} />} label="State" value={editedDetails.state} isEditing={isEditing}
              onChange={(f, v) => setEditedDetails({...editedDetails, state: v})} field="state" />
          </div>
        </div>

        {/* My Bookings Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}><ShoppingCart size={18} /> My Bookings</h3>
          {loading ? (
            <div style={styles.loading}>Loading bookings...</div>
          ) : myBookings.length === 0 ? (
            <div style={styles.emptyBookings}>
              <p>No bookings yet</p>
              <button style={styles.browseBtn} onClick={() => navigate("/package")}>Browse Vendors →</button>
            </div>
          ) : (
            <div style={styles.bookingsList}>
              {myBookings.map(booking => {
                const status = getStatusBadge(booking.status);
                const vendorName = booking.vendorId === 1 ? "Lens & Love Studio" : 
                                  booking.vendorId === 2 ? "Royal Blooms Decor" : 
                                  booking.vendorId === 3 ? "Glam by Priya" : "Vendor";
                return (
                  <div key={booking.id} style={styles.bookingCard}>
                    <div style={styles.bookingHeader}>
                      <div>
                        <p style={styles.bookingVendor}>{vendorName}</p>
                        <p style={styles.bookingDate}>Requested on {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div style={{...styles.bookingStatus, background: `${status.color}15`, color: status.color}}>
                        {status.icon} {status.text}
                      </div>
                    </div>
                    <div style={styles.bookingDetails}>
                      <div><Calendar size={12} /> {booking.weddingDate}</div>
                      <div><MapPin size={12} /> {booking.venue}</div>
                    </div>
                    {booking.meetingScheduled && (
                      <div style={styles.meetingLink}>
                        <MessageCircle size={12} /> Meeting: {booking.meetingScheduled.date} at {booking.meetingScheduled.time}
                      </div>
                    )}
                    <button style={styles.trackBtn} onClick={() => navigate("/package")}>Track Status →</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {isEditing && (
          <div style={styles.editActions}>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}><X size={16} /> Cancel</button>
            <button onClick={handleSave} style={styles.saveChangesBtn}><Save size={16} /> Save Changes</button>
          </div>
        )}

        {/* Logout Button */}
        <button onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav" style={styles.bottomNav}>
        {navItems.map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} style={{
            ...styles.navItem,
            ...(window.location.pathname === item.path ? styles.navItemActive : {})
          }}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif", paddingBottom: "80px" },
  header: { background: "#3E0014", padding: "20px" },
  headerContent: { display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" },
  backBtn: { background: "none", border: "none", color: "#E77291", fontSize: "24px", cursor: "pointer" },
  title: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "24px", color: "white" },
  editBtn: { background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "999px", padding: "8px", cursor: "pointer", color: "white" },
  content: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
  profileHeader: { textAlign: "center", marginBottom: "24px" },
  avatar: { width: "80px", height: "80px", borderRadius: "50%", background: "#F5D0DA", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" },
  profileName: { fontSize: "24px", fontWeight: 700, color: "#3E0014", marginBottom: "4px" },
  profileRole: { fontSize: "13px", color: "#E77291" },
  nameInput: { fontSize: "24px", fontWeight: 700, textAlign: "center", border: "1px solid #F5D0DA", borderRadius: "12px", padding: "8px", width: "100%", maxWidth: "300px", margin: "0 auto" },
  section: { background: "white", borderRadius: "20px", padding: "20px", marginBottom: "16px", border: "1px solid #F5D0DA" },
  sectionTitle: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "18px", color: "#3E0014", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
  infoGrid: { display: "flex", flexDirection: "column", gap: "14px" },
  infoItem: { display: "flex", alignItems: "center", gap: "12px" },
  infoIcon: { width: "28px", color: "#AC1634" },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: "11px", color: "#AC1634", fontWeight: 600, marginBottom: "2px" },
  infoValue: { fontSize: "14px", color: "#1A1A1A" },
  infoInput: { fontSize: "14px", border: "1px solid #F5D0DA", borderRadius: "8px", padding: "6px 8px", width: "100%" },
  bookingsList: { display: "flex", flexDirection: "column", gap: "12px" },
  bookingCard: { background: "#FDF0F3", borderRadius: "16px", padding: "16px", border: "1px solid #F5D0DA" },
  bookingHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" },
  bookingVendor: { fontSize: "15px", fontWeight: 600, color: "#3E0014", marginBottom: "4px" },
  bookingDate: { fontSize: "11px", color: "#999" },
  bookingStatus: { display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600 },
  bookingDetails: { display: "flex", gap: "16px", fontSize: "12px", color: "#666", marginBottom: "12px" },
  meetingLink: { background: "#E3F2FD", padding: "8px", borderRadius: "8px", fontSize: "11px", color: "#2196F3", marginBottom: "12px" },
  trackBtn: { background: "none", border: "1px solid #F5D0DA", padding: "8px", borderRadius: "999px", fontSize: "12px", cursor: "pointer", width: "100%" },
  emptyBookings: { textAlign: "center", padding: "40px", color: "#999" },
  browseBtn: { marginTop: "12px", padding: "8px 20px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer" },
  loading: { textAlign: "center", padding: "20px", color: "#999" },
  editActions: { display: "flex", gap: "12px", marginTop: "20px" },
  cancelBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  saveChangesBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#3E0014", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  logoutBtn: { width: "100%", padding: "14px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", color: "#F44336", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px", fontWeight: 600 },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #F5D0DA", padding: "10px 20px", display: "flex", justifyContent: "space-around", zIndex: 100 },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "10px" },
  navItemActive: { color: "#AC1634" }
};