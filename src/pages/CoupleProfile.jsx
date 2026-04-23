// src/pages/CoupleProfile.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Calendar, MapPin, DollarSign, Heart, Edit2, Save, 
  X, Mail, Phone, Home, Users, Star, Clock, CheckCircle,
  ShoppingCart, Package, MessageCircle, LogOut, Camera,
  Upload, Calendar as CalendarIcon, Video, FileText,
  Award, TrendingUp, Settings, Bell, Shield, Crown, Briefcase
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import { bookingService } from "../services/bookingService";
import GlobalNotifications from "../components/GlobalNotifications";

export default function CoupleProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  const [myBookings, setMyBookings] = useState([]);
  const [reviews, setReviews] = useState([
    { id: 1, vendor: "Lens & Love Studio", rating: 5, comment: "Amazing photography! Captured every moment perfectly.", date: "2024-01-15" },
    { id: 2, vendor: "Royal Blooms Decor", rating: 4, comment: "Beautiful decor, very professional.", date: "2024-01-10" }
  ]);
  
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    { id: 1, vendor: "Lens & Love Studio", date: "2025-01-25", time: "11:00 AM", link: "https://meet.vivaha.com/meeting-1", type: "Video Call" },
    { id: 2, vendor: "Royal Blooms Decor", date: "2025-01-28", time: "2:00 PM", link: "https://meet.vivaha.com/meeting-2", type: "Video Call" }
  ]);

  const availableSlots = [
    { id: 1, date: "2025-01-25", time: "10:00 AM", vendor: "Lens & Love Studio" },
    { id: 2, date: "2025-01-25", time: "2:00 PM", vendor: "Lens & Love Studio" },
    { id: 3, date: "2025-01-26", time: "11:00 AM", vendor: "Royal Blooms Decor" },
    { id: 4, date: "2025-01-26", time: "3:00 PM", vendor: "Royal Blooms Decor" }
  ];

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const bookings = await bookingService.getCoupleBookings();
    setMyBookings(bookings);
  };

  const [editedDetails, setEditedDetails] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    spouseName: user?.spouseName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    weddingDate: user?.weddingDate || user?.weddingDetails?.weddingDate || "",
    weddingCity: user?.weddingCity || user?.weddingDetails?.city || "",
    budget: user?.budget || user?.weddingDetails?.budget || ""
  });

  const handleSave = () => {
    setUser(prev => ({ 
      ...prev, 
      ...editedDetails,
      weddingDetails: {
        ...prev.weddingDetails,
        weddingDate: editedDetails.weddingDate,
        city: editedDetails.weddingCity,
        budget: editedDetails.budget
      }
    }));
    setIsEditing(false);
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 3000);
  };

  const handleUpdateWeddingDetails = () => {
    setUser(prev => ({ 
      ...prev, 
      ...editedDetails,
      weddingDetails: {
        ...prev.weddingDetails,
        weddingDate: editedDetails.weddingDate,
        city: editedDetails.weddingCity,
        budget: editedDetails.budget
      }
    }));
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 3000);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const scheduleMeeting = (booking) => {
    setSelectedBooking(booking);
    setShowMeetingModal(true);
  };

  const confirmMeeting = () => {
    if (selectedSlot) {
      setUpcomingMeetings([...upcomingMeetings, {
        id: Date.now(),
        vendor: selectedSlot.vendor,
        date: selectedSlot.date,
        time: selectedSlot.time,
        link: `https://meet.vivaha.com/meeting-${Date.now()}`,
        type: "Video Call"
      }]);
      setShowMeetingModal(false);
      setSelectedSlot(null);
      alert("Meeting scheduled successfully!");
    }
  };

  const InfoItem = ({ icon, label, value, isEditing, onChange, field }) => (
    <div style={styles.infoItem}>
      <div style={styles.infoIcon}>{icon}</div>
      <div style={styles.infoContent}>
        <p style={styles.infoLabel}>{label}</p>
        {isEditing && onChange ? (
          <input 
            style={styles.infoInput} 
            value={value || ""} 
            onChange={(e) => onChange(field, e.target.value)} 
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <p style={styles.infoValue}>{value || "Not set"}</p>
        )}
      </div>
    </div>
  );

  const navItems = [
    { icon: "👤", label: "Personal", id: "personal" },
    { icon: "💒", label: "Wedding", id: "wedding" },
    { icon: "📋", label: "Bookings", id: "bookings" },
    { icon: "🎥", label: "Meetings", id: "meetings" },
    { icon: "⭐", label: "Reviews", id: "reviews" },
    { icon: "📊", label: "Analytics", id: "analytics" }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate("/home")} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <div style={styles.headerRight}>
            <GlobalNotifications user={user} />
            <button onClick={() => setIsEditing(!isEditing)} style={styles.editBtn}>
              {isEditing ? <Save size={20} color="#E77291" /> : <Edit2 size={20} color="#E77291" />}
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showUpdateSuccess && (
        <div style={styles.successToast}>
          <CheckCircle size={18} color="#4CAF50" />
          <span>Wedding details updated successfully!</span>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Profile Header with Image Upload */}
        <div style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={styles.avatarImage} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                <Heart size={40} color="#E77291" />
              </div>
            )}
            <button style={styles.uploadBtn} onClick={() => fileInputRef.current.click()}>
              <Camera size={16} color="white" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: "none" }} 
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
          </div>
          <div style={styles.profileInfo}>
            <h2 style={styles.profileName}>{user?.firstName || user?.name || "Guest"}</h2>
            <p style={styles.profileRole}>
              {user?.premium ? <Crown size={14} color="#E77291" /> : <Heart size={14} color="#E77291" />}
              Bride/Groom • {user?.premium ? "Premium Member" : "Free Member"}
            </p>
            {user?.premium && <span style={styles.premiumBadge}>PREMIUM</span>}
          </div>
          <div style={styles.statsBadges}>
            <div style={styles.statBadge}><Star size={14} color="#FFD700" /> 4.8 Rating</div>
            <div style={styles.statBadge}><CheckCircle size={14} color="#4CAF50" /> {myBookings.length} Bookings</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabNav}>
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              style={{...styles.tab, ...(activeTab === item.id ? styles.activeTab : {})}}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>

        {/* Personal Information Tab */}
        {activeTab === "personal" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}><Users size={18} color="#AC1634" /> Personal Information</h3>
            <div style={styles.infoGrid}>
              <InfoItem icon={<User size={16} />} label="First Name" value={editedDetails.firstName} isEditing={isEditing}
                onChange={(f, v) => setEditedDetails({...editedDetails, firstName: v})} />
              <InfoItem icon={<User size={16} />} label="Last Name" value={editedDetails.lastName} isEditing={isEditing}
                onChange={(f, v) => setEditedDetails({...editedDetails, lastName: v})} />
              <InfoItem icon={<Heart size={16} color="#E77291" />} label="Spouse/Partner" value={editedDetails.spouseName} isEditing={isEditing}
                onChange={(f, v) => setEditedDetails({...editedDetails, spouseName: v})} />
              <InfoItem icon={<Mail size={16} color="#AC1634" />} label="Email" value={editedDetails.email} isEditing={isEditing}
                onChange={(f, v) => setEditedDetails({...editedDetails, email: v})} />
              <InfoItem icon={<Phone size={16} color="#AC1634" />} label="Phone" value={editedDetails.phone} isEditing={isEditing}
                onChange={(f, v) => setEditedDetails({...editedDetails, phone: v})} />
              <InfoItem icon={<Home size={16} color="#AC1634" />} label="Address" value={editedDetails.address} isEditing={isEditing}
                onChange={(f, v) => setEditedDetails({...editedDetails, address: v})} />
            </div>
          </div>
        )}

        {/* Wedding Details Tab - With Update Button */}
        {activeTab === "wedding" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}><Calendar size={18} color="#AC1634" /> Wedding Details</h3>
            <div style={styles.weddingDetailsContainer}>
              <div style={styles.weddingDetailCard}>
                <div style={styles.weddingDetailIcon}>📅</div>
                <div style={styles.weddingDetailContent}>
                  <p style={styles.weddingDetailLabel}>Wedding Date</p>
                  {isEditing ? (
                    <input
                      type="date"
                      style={styles.weddingDetailInput}
                      value={editedDetails.weddingDate || ""}
                      onChange={(e) => setEditedDetails({...editedDetails, weddingDate: e.target.value})}
                    />
                  ) : (
                    <p style={styles.weddingDetailValue}>{editedDetails.weddingDate || "Not set"}</p>
                  )}
                </div>
              </div>

              <div style={styles.weddingDetailCard}>
                <div style={styles.weddingDetailIcon}>📍</div>
                <div style={styles.weddingDetailContent}>
                  <p style={styles.weddingDetailLabel}>Wedding City</p>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="Enter wedding city"
                      style={styles.weddingDetailInput}
                      value={editedDetails.weddingCity || ""}
                      onChange={(e) => setEditedDetails({...editedDetails, weddingCity: e.target.value})}
                    />
                  ) : (
                    <p style={styles.weddingDetailValue}>{editedDetails.weddingCity || "Not set"}</p>
                  )}
                </div>
              </div>

              <div style={styles.weddingDetailCard}>
                <div style={styles.weddingDetailIcon}>💰</div>
                <div style={styles.weddingDetailContent}>
                  <p style={styles.weddingDetailLabel}>Wedding Budget</p>
                  {isEditing ? (
                    <select
                      style={styles.weddingDetailSelect}
                      value={editedDetails.budget || ""}
                      onChange={(e) => setEditedDetails({...editedDetails, budget: e.target.value})}
                    >
                      <option value="">Select budget range</option>
                      <option value="₹10L – ₹15L">₹10L – ₹15L</option>
                      <option value="₹15L – ₹20L">₹15L – ₹20L</option>
                      <option value="₹20L – ₹25L">₹20L – ₹25L</option>
                      <option value="₹25L – ₹30L">₹25L – ₹30L</option>
                      <option value="₹30L – ₹40L">₹30L – ₹40L</option>
                      <option value="₹40L+">₹40L+</option>
                    </select>
                  ) : (
                    <p style={styles.weddingDetailValue}>{editedDetails.budget || "Not set"}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <button style={styles.updateWeddingBtn} onClick={handleUpdateWeddingDetails}>
                <Save size={16} /> Update Wedding Details
              </button>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}><ShoppingCart size={18} color="#AC1634" /> My Bookings</h3>
            {myBookings.length === 0 ? (
              <div style={styles.emptyState}>
                <ShoppingCart size={48} color="#CCC" />
                <p>No bookings yet</p>
                <button onClick={() => navigate("/package")} style={styles.browseBtn}>Browse Vendors →</button>
              </div>
            ) : (
              myBookings.map(booking => {
                const status = { color: "#FF9800", text: "Pending", icon: <Clock size={12} /> };
                return (
                  <div key={booking.id} style={styles.bookingCard}>
                    <div style={styles.bookingHeader}>
                      <div>
                        <h4>{booking.vendorId === 1 ? "Lens & Love Studio" : 
                               booking.vendorId === 2 ? "Royal Blooms Decor" : "Vendor"}</h4>
                        <p>Requested on {new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div style={{...styles.bookingStatus, background: `${status.color}15`, color: status.color}}>
                        {status.icon} {status.text}
                      </div>
                    </div>
                    <div style={styles.bookingDetails}>
                      <div><Calendar size={12} /> {booking.weddingDate}</div>
                      <div><MapPin size={12} /> {booking.venue}</div>
                      <div><DollarSign size={12} /> {booking.amount?.toLocaleString()}</div>
                    </div>
                    {booking.status === "accepted" && (
                      <button style={styles.scheduleBtn} onClick={() => scheduleMeeting(booking)}>
                        <Video size={14} /> Schedule Meeting
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Meetings Tab */}
        {activeTab === "meetings" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}><Video size={18} color="#AC1634" /> Upcoming Meetings</h3>
            {upcomingMeetings.length === 0 ? (
              <div style={styles.emptyState}>
                <Video size={48} color="#CCC" />
                <p>No upcoming meetings</p>
              </div>
            ) : (
              upcomingMeetings.map(meeting => (
                <div key={meeting.id} style={styles.meetingCard}>
                  <div style={styles.meetingIcon}>🎥</div>
                  <div style={styles.meetingInfo}>
                    <h4>{meeting.vendor}</h4>
                    <p><Calendar size={12} /> {meeting.date} at {meeting.time}</p>
                    <p><Video size={12} /> {meeting.type}</p>
                  </div>
                  <button style={styles.joinMeetingBtn} onClick={() => window.open(meeting.link, "_blank")}>
                    Join Meeting →
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}><Star size={18} color="#FFD700" /> My Reviews</h3>
            {reviews.map(review => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <strong>{review.vendor}</strong>
                  <div style={styles.reviewStars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "#FFD700" : "none"} color="#FFD700" />
                    ))}
                  </div>
                </div>
                <p style={styles.reviewComment}>"{review.comment}"</p>
                <p style={styles.reviewDate}>{review.date}</p>
              </div>
            ))}
            <button style={styles.writeReviewBtn}>Write a Review →</button>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}><TrendingUp size={18} color="#AC1634" /> Wedding Analytics</h3>
            <div style={styles.analyticsGrid}>
              <div style={styles.analyticsCard}>
                <span>📅</span>
                <div>
                  <p>Days to Wedding</p>
                  <strong>237 days</strong>
                </div>
              </div>
              <div style={styles.analyticsCard}>
                <span>💰</span>
                <div>
                  <p>Budget Progress</p>
                  <strong>35% spent</strong>
                </div>
              </div>
              <div style={styles.analyticsCard}>
                <span>✅</span>
                <div>
                  <p>Checklist Progress</p>
                  <strong>4/12 tasks</strong>
                </div>
              </div>
              <div style={styles.analyticsCard}>
                <span>🎯</span>
                <div>
                  <p>Vendors Booked</p>
                  <strong>2/8</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div style={styles.editActions}>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}><X size={16} /> Cancel</button>
            <button onClick={handleSave} style={styles.saveChangesBtn}><Save size={16} /> Save All Changes</button>
          </div>
        )}

        <button onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Meeting Scheduler Modal */}
      {showMeetingModal && (
        <div style={styles.modalOverlay} onClick={() => setShowMeetingModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>Schedule Meeting</h3>
              <button onClick={() => setShowMeetingModal(false)} style={styles.modalClose}>✕</button>
            </div>
            <div style={styles.modalContent}>
              <p>Select a time slot for your consultation call</p>
              <div style={styles.slotGrid}>
                {availableSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    style={{...styles.slotBtn, ...(selectedSlot?.id === slot.id ? styles.slotSelected : {})}}
                  >
                    <Calendar size={14} /> {slot.date}<br />{slot.time}
                  </button>
                ))}
              </div>
              <div style={styles.modalActions}>
                <button onClick={() => setShowMeetingModal(false)} style={styles.cancelModalBtn}>Cancel</button>
                <button onClick={confirmMeeting} disabled={!selectedSlot} style={styles.confirmModalBtn}>
                  Confirm Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px" },
  headerRight: { display: "flex", gap: "12px", alignItems: "center" },
  editBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 12px", borderRadius: "10px" },
  successToast: { position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", background: "#4CAF50", color: "white", padding: "12px 24px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", zIndex: 1000, fontSize: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  mainContent: { maxWidth: "1000px", margin: "0 auto", padding: "40px 32px", paddingBottom: "100px" },
  profileHeader: { display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px", flexWrap: "wrap", background: "white", padding: "24px", borderRadius: "24px", border: "1px solid #F5D0DA", boxShadow: "0 4px 16px rgba(62,0,20,0.05)" },
  avatarContainer: { position: "relative" },
  avatarPlaceholder: { width: "100px", height: "100px", borderRadius: "50%", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #E77291" },
  avatarImage: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" },
  uploadBtn: { position: "absolute", bottom: "0", right: "0", background: "#AC1634", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: "28px", fontWeight: 700, color: "#3E0014", marginBottom: "4px" },
  profileRole: { fontSize: "14px", color: "#E77291", display: "flex", alignItems: "center", gap: "4px" },
  premiumBadge: { background: "linear-gradient(135deg, #E77291, #AC1634)", color: "white", padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 600, display: "inline-block", marginTop: "8px" },
  statsBadges: { display: "flex", gap: "12px" },
  statBadge: { background: "#FDF0F3", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" },
  tabNav: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", borderBottom: "1px solid #F5D0DA", paddingBottom: "12px" },
  tab: { padding: "10px 20px", borderRadius: "999px", border: "none", background: "white", cursor: "pointer", fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", color: "#666" },
  activeTab: { background: "#3E0014", color: "white" },
  section: { background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", border: "1px solid #F5D0DA", boxShadow: "0 4px 16px rgba(62,0,20,0.05)" },
  sectionTitle: { fontSize: "18px", fontWeight: 600, color: "#3E0014", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" },
  infoItem: { display: "flex", alignItems: "center", gap: "12px" },
  infoIcon: { width: "32px", color: "#AC1634" },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: "11px", color: "#AC1634", fontWeight: 600, marginBottom: "2px" },
  infoValue: { fontSize: "14px", color: "#1A1A1A" },
  infoInput: { fontSize: "14px", border: "1px solid #F5D0DA", borderRadius: "8px", padding: "6px 8px", width: "100%" },
  weddingDetailsContainer: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" },
  weddingDetailCard: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", border: "1px solid #F5D0DA" },
  weddingDetailIcon: { fontSize: "32px" },
  weddingDetailContent: { flex: 1 },
  weddingDetailLabel: { fontSize: "11px", color: "#AC1634", fontWeight: 600, marginBottom: "4px" },
  weddingDetailValue: { fontSize: "16px", fontWeight: 500, color: "#3E0014" },
  weddingDetailInput: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #F5D0DA", fontSize: "14px" },
  weddingDetailSelect: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #F5D0DA", fontSize: "14px", backgroundColor: "white", cursor: "pointer" },
  updateWeddingBtn: { width: "100%", padding: "14px", borderRadius: "999px", background: "linear-gradient(135deg, #AC1634, #3E0014)", color: "white", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" },
  emptyState: { textAlign: "center", padding: "40px", color: "#999" },
  browseBtn: { marginTop: "16px", padding: "10px 24px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer" },
  bookingCard: { background: "#FDF0F3", borderRadius: "16px", padding: "16px", marginBottom: "12px" },
  bookingHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" },
  bookingStatus: { display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 600 },
  bookingDetails: { display: "flex", gap: "20px", fontSize: "12px", color: "#666", marginBottom: "12px", flexWrap: "wrap" },
  scheduleBtn: { background: "#2196F3", color: "white", border: "none", padding: "8px 16px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" },
  meetingCard: { display: "flex", alignItems: "center", gap: "16px", background: "#FDF0F3", borderRadius: "16px", padding: "16px", marginBottom: "12px" },
  meetingIcon: { fontSize: "32px" },
  meetingInfo: { flex: 1 },
  joinMeetingBtn: { background: "#4CAF50", color: "white", border: "none", padding: "8px 16px", borderRadius: "999px", cursor: "pointer" },
  reviewCard: { background: "#FDF0F3", borderRadius: "16px", padding: "16px", marginBottom: "12px" },
  reviewHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  reviewStars: { display: "flex", gap: "2px" },
  reviewComment: { fontSize: "13px", color: "#666", marginBottom: "8px", fontStyle: "italic" },
  reviewDate: { fontSize: "11px", color: "#999" },
  writeReviewBtn: { width: "100%", padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", marginTop: "12px" },
  analyticsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },
  analyticsCard: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "#FDF0F3", borderRadius: "16px" },
  editActions: { display: "flex", gap: "12px", marginTop: "20px" },
  cancelBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  saveChangesBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#3E0014", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  logoutBtn: { width: "100%", padding: "14px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", color: "#F44336", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "500px" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalClose: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  modalContent: { padding: "24px" },
  slotGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "16px", marginBottom: "24px" },
  slotBtn: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", textAlign: "center" },
  slotSelected: { borderColor: "#AC1634", background: "#FDF0F3" },
  modalActions: { display: "flex", gap: "12px" },
  cancelModalBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  confirmModalBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer" }
};