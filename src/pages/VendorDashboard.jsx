// src/pages/VendorDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, Clock, CheckCircle, XCircle, MessageCircle, 
  Star, Users, TrendingUp, DollarSign, Home, Package, 
  Heart, User, ShoppingCart, Phone, Mail, MapPin
} from "lucide-react";
import { bookingService } from "../services/bookingService";

export default function VendorDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    rating: 4.9
  });

  // Assuming vendor ID is 1 for demo
  const vendorId = 1;
  const vendorName = "Lens & Love Studio";

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const bookings = await bookingService.getVendorBookings(vendorId);
    setRequests(bookings);
    
    // Calculate stats
    const completed = bookings.filter(b => b.status === "booked").length;
    const revenue = bookings.filter(b => b.status === "booked").reduce((sum, b) => sum + (b.amount || 0), 0);
    
    setStats({
      totalBookings: bookings.length,
      completedBookings: completed,
      totalRevenue: revenue,
      rating: 4.9
    });
    setLoading(false);
  };

  const handleAccept = async (bookingId) => {
    await bookingService.vendorAccept(bookingId, "Thank you for your interest! We'd love to work with you. Please schedule a call to discuss details.");
    loadRequests();
  };

  const handleReject = async (bookingId) => {
    await bookingService.vendorReject(bookingId, "Unfortunately, we're already booked on your wedding date. We wish you the best!");
    loadRequests();
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <Package size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: "New Request", color: "#FF9800", icon: <Clock size={14} /> },
      vendor_accepted: { text: "Accepted", color: "#4CAF50", icon: <CheckCircle size={14} /> },
      meeting_scheduled: { text: "Meeting Scheduled", color: "#2196F3", icon: <Calendar size={14} /> },
      confirmed: { text: "Confirmed", color: "#9C27B0", icon: <CheckCircle size={14} /> },
      booked: { text: "Booked & Paid", color: "#AC1634", icon: <CheckCircle size={14} /> },
      rejected: { text: "Declined", color: "#F44336", icon: <XCircle size={14} /> }
    };
    return statusMap[status] || { text: status, color: "#999", icon: null };
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Vendor Dashboard</h1>
        <div style={styles.vendorInfo}>
          <span style={styles.vendorName}>{vendorName}</span>
          <div style={styles.rating}><Star size={14} fill="#FFD700" /> {stats.rating}</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <Users size={24} color="#AC1634" />
          <div>
            <p style={styles.statValue}>{stats.totalBookings}</p>
            <p style={styles.statLabel}>Total Requests</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <CheckCircle size={24} color="#4CAF50" />
          <div>
            <p style={styles.statValue}>{stats.completedBookings}</p>
            <p style={styles.statLabel}>Completed</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <DollarSign size={24} color="#FF9800" />
          <div>
            <p style={styles.statValue}>₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
            <p style={styles.statLabel}>Revenue</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <TrendingUp size={24} color="#2196F3" />
          <div>
            <p style={styles.statValue}>+25%</p>
            <p style={styles.statLabel}>Growth</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button style={{...styles.tab, ...(activeTab === "requests" ? styles.activeTab : {})}} onClick={() => setActiveTab("requests")}>
          New Requests ({requests.filter(r => r.status === "pending").length})
        </button>
        <button style={{...styles.tab, ...(activeTab === "active" ? styles.activeTab : {})}} onClick={() => setActiveTab("active")}>
          Active Bookings
        </button>
        <button style={{...styles.tab, ...(activeTab === "completed" ? styles.activeTab : {})}} onClick={() => setActiveTab("completed")}>
          Completed
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.loading}>Loading bookings...</div>
        ) : (
          <>
            {activeTab === "requests" && (
              <>
                {requests.filter(r => r.status === "pending").length === 0 ? (
                  <div style={styles.emptyState}>
                    <p>No new requests</p>
                    <p style={styles.emptySubtext}>When couples request your services, they'll appear here</p>
                  </div>
                ) : (
                  requests.filter(r => r.status === "pending").map(request => (
                    <div key={request.id} style={styles.requestCard}>
                      <div style={styles.requestHeader}>
                        <div>
                          <h3 style={styles.coupleName}>{request.coupleName}</h3>
                          <p style={styles.requestDate}>Requested on {new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div style={{...styles.statusBadge, background: "#FF980015", color: "#FF9800"}}>
                          <Clock size={14} /> Pending Response
                        </div>
                      </div>

                      <div style={styles.requestDetails}>
                        <div style={styles.detailItem}><Calendar size={14} /> Wedding: {request.weddingDate}</div>
                        <div style={styles.detailItem}><MapPin size={14} /> Venue: {request.venue}</div>
                        <div style={styles.detailItem}><Users size={14} /> Guests: {request.requirements?.guestCount || "Not specified"}</div>
                        <div style={styles.detailItem}><DollarSign size={14} /> Budget: {request.requirements?.budget || "Not specified"}</div>
                      </div>

                      {request.requirements?.specialRequests && (
                        <div style={styles.specialRequests}>
                          <strong>Special Requests:</strong> {request.requirements.specialRequests}
                        </div>
                      )}

                      <div style={styles.contactInfo}>
                        <p><Phone size={12} /> {request.couplePhone}</p>
                        <p><Mail size={12} /> {request.coupleEmail}</p>
                      </div>

                      <div style={styles.requestActions}>
                        <button style={styles.rejectBtn} onClick={() => handleReject(request.id)}>
                          <XCircle size={16} /> Decline
                        </button>
                        <button style={styles.acceptBtn} onClick={() => handleAccept(request.id)}>
                          <CheckCircle size={16} /> Accept Request
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "active" && (
              <>
                {requests.filter(r => r.status === "vendor_accepted" || r.status === "meeting_scheduled" || r.status === "confirmed").length === 0 ? (
                  <div style={styles.emptyState}>No active bookings</div>
                ) : (
                  requests.filter(r => r.status === "vendor_accepted" || r.status === "meeting_scheduled" || r.status === "confirmed").map(booking => {
                    const status = getStatusBadge(booking.status);
                    return (
                      <div key={booking.id} style={styles.bookingCard}>
                        <div style={styles.requestHeader}>
                          <h3 style={styles.coupleName}>{booking.coupleName}</h3>
                          <div style={{...styles.statusBadge, background: `${status.color}15`, color: status.color}}>
                            {status.icon} {status.text}
                          </div>
                        </div>
                        <div style={styles.requestDetails}>
                          <div style={styles.detailItem}><Calendar size={14} /> Wedding: {booking.weddingDate}</div>
                          <div style={styles.detailItem}><MapPin size={14} /> Venue: {booking.venue}</div>
                        </div>
                        {booking.meetingScheduled && (
                          <div style={styles.meetingInfo}>
                            <Calendar size={14} /> Meeting scheduled for {booking.meetingScheduled.date} at {booking.meetingScheduled.time}
                            <button style={styles.joinMeetingBtn}>Join Meeting →</button>
                          </div>
                        )}
                        <button style={styles.messageBtn}><MessageCircle size={14} /> Message Couple</button>
                      </div>
                    );
                  })
                )}
              </>
            )}

            {activeTab === "completed" && (
              <>
                {requests.filter(r => r.status === "booked").length === 0 ? (
                  <div style={styles.emptyState}>No completed bookings yet</div>
                ) : (
                  requests.filter(r => r.status === "booked").map(booking => (
                    <div key={booking.id} style={styles.completedCard}>
                      <div style={styles.requestHeader}>
                        <h3 style={styles.coupleName}>{booking.coupleName}</h3>
                        <div style={{...styles.statusBadge, background: "#4CAF5015", color: "#4CAF50"}}>
                          <CheckCircle size={14} /> Completed
                        </div>
                      </div>
                      <div style={styles.requestDetails}>
                        <div style={styles.detailItem}><Calendar size={14} /> Wedding: {booking.weddingDate}</div>
                        <div style={styles.detailItem}><DollarSign size={14} /> Amount: ₹{booking.amount?.toLocaleString()}</div>
                      </div>
                      <button style={styles.reviewBtn}>View Review</button>
                    </div>
                  ))
                )}
              </>
            )}
          </>
        )}
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
  header: { background: "#3E0014", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" },
  title: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "24px", color: "white", margin: 0 },
  vendorInfo: { display: "flex", alignItems: "center", gap: "12px" },
  vendorName: { color: "#E77291", fontSize: "14px", fontWeight: 500 },
  rating: { display: "flex", alignItems: "center", gap: "4px", color: "#FFD700", fontSize: "13px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", padding: "16px" },
  statCard: { background: "white", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #F5D0DA" },
  statValue: { fontSize: "20px", fontWeight: "bold", color: "#3E0014", margin: 0 },
  statLabel: { fontSize: "11px", color: "#999", margin: 0 },
  tabs: { display: "flex", gap: "8px", padding: "0 16px 16px", borderBottom: "1px solid #F5D0DA" },
  tab: { flex: 1, padding: "10px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "12px", fontWeight: 600 },
  activeTab: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  content: { padding: "16px" },
  loading: { textAlign: "center", padding: "40px", color: "#999" },
  emptyState: { textAlign: "center", padding: "60px 20px", color: "#999" },
  emptySubtext: { fontSize: "12px", marginTop: "8px" },
  requestCard: { background: "white", borderRadius: "20px", padding: "20px", marginBottom: "16px", border: "1px solid #F5D0DA" },
  bookingCard: { background: "white", borderRadius: "20px", padding: "20px", marginBottom: "16px", border: "1px solid #F5D0DA" },
  completedCard: { background: "#FDF0F3", borderRadius: "20px", padding: "20px", marginBottom: "16px", border: "1px solid #4CAF50" },
  requestHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
  coupleName: { fontSize: "18px", fontWeight: 600, color: "#3E0014", marginBottom: "4px" },
  requestDate: { fontSize: "11px", color: "#999" },
  statusBadge: { display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
  requestDetails: { display: "flex", flexWrap: "wrap", gap: "16px", padding: "16px 0", borderTop: "1px solid #F5D0DA", borderBottom: "1px solid #F5D0DA", marginBottom: "16px" },
  detailItem: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#666" },
  specialRequests: { background: "#FDF0F3", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontSize: "13px", color: "#666" },
  contactInfo: { display: "flex", gap: "16px", fontSize: "12px", color: "#666", marginBottom: "16px" },
  meetingInfo: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#E3F2FD", padding: "12px", borderRadius: "12px", marginBottom: "16px", fontSize: "13px" },
  joinMeetingBtn: { background: "#2196F3", color: "white", border: "none", padding: "6px 12px", borderRadius: "999px", cursor: "pointer", fontSize: "11px" },
  requestActions: { display: "flex", gap: "12px" },
  acceptBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "none", background: "#4CAF50", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 600 },
  rejectBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", color: "#F44336", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 600 },
  messageBtn: { width: "100%", padding: "10px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px" },
  reviewBtn: { padding: "8px 16px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", marginTop: "12px" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #F5D0DA", padding: "10px 20px", display: "flex", justifyContent: "space-around", zIndex: 100 },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "10px" },
  navItemActive: { color: "#AC1634" }
};