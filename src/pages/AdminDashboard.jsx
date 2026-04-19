// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Briefcase, Star, DollarSign, Calendar, 
  CheckCircle, XCircle, Eye, LogOut, Menu, X,
  TrendingUp, Award, Bell, Settings, Shield
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function AdminDashboard({ admin, setAdmin }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock Data
  const [vendors, setVendors] = useState([
    { id: 1, name: "Lens & Love Studio", category: "Photography", email: "contact@lenslove.com", status: "approved", rating: 4.9, bookings: 156, revenue: "₹12.5L" },
    { id: 2, name: "Royal Blooms Decor", category: "Decor", email: "info@royalblooms.com", status: "approved", rating: 4.8, bookings: 89, revenue: "₹8.2L" },
    { id: 3, name: "Glam by Priya", category: "Makeup", email: "priya@glam.com", status: "pending", rating: 5.0, bookings: 45, revenue: "₹3.1L" },
    { id: 4, name: "Grand Feast Caterers", category: "Catering", email: "contact@grandfeast.com", status: "approved", rating: 4.7, bookings: 234, revenue: "₹25.6L" },
    { id: 5, name: "New Vendor Studio", category: "Photography", email: "new@vendor.com", status: "pending", rating: 0, bookings: 0, revenue: "₹0" }
  ]);

  const [couples, setCouples] = useState([
    { id: 1, name: "Priya Sharma", email: "priya@example.com", weddingDate: "2025-12-15", status: "active", bookings: 3 },
    { id: 2, name: "Anjali Verma", email: "anjali@example.com", weddingDate: "2026-01-20", status: "active", bookings: 2 },
    { id: 3, name: "Meera & Karan", email: "meera@example.com", weddingDate: "2025-02-15", status: "inactive", bookings: 1 }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, couple: "Priya Sharma", vendor: "Lens & Love Studio", amount: "₹85,000", date: "2025-12-15", status: "confirmed" },
    { id: 2, couple: "Anjali Verma", vendor: "Royal Blooms Decor", amount: "₹1,20,000", date: "2026-01-20", status: "pending" },
    { id: 3, couple: "Meera & Karan", vendor: "Glam by Priya", amount: "₹45,000", date: "2025-02-15", status: "confirmed" }
  ]);

  const stats = {
    totalVendors: vendors.length,
    pendingVendors: vendors.filter(v => v.status === "pending").length,
    totalCouples: couples.length,
    totalBookings: bookings.length,
    totalRevenue: "₹49.4L",
    activeUsers: couples.filter(c => c.status === "active").length
  };

  const approveVendor = (id) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: "approved" } : v));
  };

  const rejectVendor = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: <TrendingUp size={18} /> },
    { id: "vendors", label: "Vendors", icon: <Briefcase size={18} />, badge: vendors.filter(v => v.status === "pending").length },
    { id: "couples", label: "Couples", icon: <Users size={18} /> },
    { id: "bookings", label: "Bookings", icon: <Calendar size={18} /> },
    { id: "reports", label: "Reports", icon: <Award size={18} /> }
  ];

  if (!admin?.isAdmin) {
    navigate("/admin-login");
    return null;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.menuBtn}>
            <Menu size={22} />
          </button>
          <HindiLogo size="small" />
          <div style={styles.headerRight}>
            <button style={styles.iconBtn}><Bell size={18} /></button>
            <button style={styles.iconBtn}><Settings size={18} /></button>
            <button onClick={() => { setAdmin(null); navigate("/"); }} style={styles.logoutBtn}>
              <LogOut size={18} /> Exit
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <div style={styles.adminBadge}>
              <Shield size={20} color="#E77291" />
              <span>Admin Panel</span>
            </div>
          </div>
          
          <div style={styles.adminInfo}>
            <div style={styles.adminAvatar}>👨‍💼</div>
            <div>
              <p style={styles.adminName}>Administrator</p>
              <p style={styles.adminEmail}>admin@vivaha.com</p>
            </div>
          </div>

          <div style={styles.sidebarNav}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{...styles.navItem, ...(activeTab === item.id ? styles.navItemActive : {})}}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge > 0 && <span style={styles.navBadge}>{item.badge}</span>}
              </button>
            ))}
          </div>

          <button onClick={() => { setAdmin(null); navigate("/"); }} style={styles.sidebarLogout}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <div style={{...styles.mainContent, marginLeft: sidebarOpen ? "260px" : "0"}}>
        {/* Welcome */}
        <div style={styles.welcomeCard}>
          <div>
            <h1 style={styles.welcomeTitle}>Welcome back, Admin! 👋</h1>
            <p style={styles.welcomeText}>Here's what's happening with your wedding platform today.</p>
          </div>
          <div style={styles.dateBadge}>{new Date().toLocaleDateString()}</div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}><div style={styles.statIcon}><Briefcase size={22} /></div><div><p style={styles.statValue}>{stats.totalVendors}</p><p>Total Vendors</p></div></div>
          <div style={styles.statCard}><div style={styles.statIcon}><Users size={22} /></div><div><p style={styles.statValue}>{stats.totalCouples}</p><p>Total Couples</p></div></div>
          <div style={styles.statCard}><div style={styles.statIcon}><Calendar size={22} /></div><div><p style={styles.statValue}>{stats.totalBookings}</p><p>Total Bookings</p></div></div>
          <div style={styles.statCard}><div style={styles.statIcon}><DollarSign size={22} /></div><div><p style={styles.statValue}>{stats.totalRevenue}</p><p>Total Revenue</p></div></div>
        </div>

        {/* Pending Vendors Alert */}
        {stats.pendingVendors > 0 && (
          <div style={styles.alertCard}>
            <Bell size={20} color="#FF9800" />
            <span>{stats.pendingVendors} vendor(s) awaiting approval</span>
            <button onClick={() => setActiveTab("vendors")} style={styles.alertBtn}>Review Now →</button>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>Recent Activity</h2>
            </div>
            <div style={styles.activityList}>
              {bookings.slice(0, 3).map(b => (
                <div key={b.id} style={styles.activityItem}>
                  <div>📅</div>
                  <div><strong>{b.couple}</strong> booked <strong>{b.vendor}</strong></div>
                  <div style={styles.activityAmount}>{b.amount}</div>
                  <span style={{...styles.statusBadge, background: b.status === "confirmed" ? "#E8F5E9" : "#FFF3E0", color: b.status === "confirmed" ? "#4CAF50" : "#FF9800"}}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === "vendors" && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>All Vendors</h2>
              <span style={styles.countBadge}>{vendors.length} total</span>
            </div>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div>Vendor</div><div>Category</div><div>Rating</div><div>Bookings</div><div>Status</div><div>Action</div>
              </div>
              {vendors.map(v => (
                <div key={v.id} style={styles.tableRow}>
                  <div><strong>{v.name}</strong><p style={styles.tableEmail}>{v.email}</p></div>
                  <div>{v.category}</div>
                  <div>{v.rating > 0 ? `⭐ ${v.rating}` : "—"}</div>
                  <div>{v.bookings}</div>
                  <div><span style={{...styles.statusBadge, background: v.status === "approved" ? "#E8F5E9" : "#FFF3E0", color: v.status === "approved" ? "#4CAF50" : "#FF9800"}}>{v.status}</span></div>
                  <div>
                    {v.status === "pending" ? (
                      <div style={styles.actionBtns}>
                        <button onClick={() => approveVendor(v.id)} style={styles.approveBtn}><CheckCircle size={14} /> Approve</button>
                        <button onClick={() => rejectVendor(v.id)} style={styles.rejectBtn}><XCircle size={14} /> Reject</button>
                      </div>
                    ) : (
                      <button style={styles.viewBtn}><Eye size={14} /> View</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Couples Tab */}
        {activeTab === "couples" && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>Registered Couples</h2>
              <span style={styles.countBadge}>{couples.length} total</span>
            </div>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div>Name</div><div>Email</div><div>Wedding Date</div><div>Bookings</div><div>Status</div>
              </div>
              {couples.map(c => (
                <div key={c.id} style={styles.tableRow}>
                  <div><strong>{c.name}</strong></div>
                  <div>{c.email}</div>
                  <div>{c.weddingDate}</div>
                  <div>{c.bookings}</div>
                  <div><span style={{...styles.statusBadge, background: c.status === "active" ? "#E8F5E9" : "#FFEBEE", color: c.status === "active" ? "#4CAF50" : "#F44336"}}>{c.status}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>All Bookings</h2>
              <span style={styles.countBadge}>{bookings.length} total</span>
            </div>
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <div>Couple</div><div>Vendor</div><div>Amount</div><div>Date</div><div>Status</div>
              </div>
              {bookings.map(b => (
                <div key={b.id} style={styles.tableRow}>
                  <div><strong>{b.couple}</strong></div>
                  <div>{b.vendor}</div>
                  <div>{b.amount}</div>
                  <div>{b.date}</div>
                  <div><span style={{...styles.statusBadge, background: b.status === "confirmed" ? "#E8F5E9" : "#FFF3E0", color: b.status === "confirmed" ? "#4CAF50" : "#FF9800"}}>{b.status}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>Platform Reports</h2>
            </div>
            <div style={styles.reportsGrid}>
              <div style={styles.reportCard}><Award size={32} color="#AC1634" /><div><p>Top Vendor</p><p style={styles.reportValue}>Lens & Love Studio</p></div></div>
              <div style={styles.reportCard}><Star size={32} color="#AC1634" /><div><p>Avg Rating</p><p style={styles.reportValue}>4.8 / 5</p></div></div>
              <div style={styles.reportCard}><TrendingUp size={32} color="#AC1634" /><div><p>Growth Rate</p><p style={styles.reportValue}>+23%</p></div></div>
              <div style={styles.reportCard}><Users size={32} color="#AC1634" /><div><p>Active Users</p><p style={styles.reportValue}>{stats.activeUsers}</p></div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1400px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  menuBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px", borderRadius: "10px" },
  headerRight: { display: "flex", gap: "12px", alignItems: "center" },
  iconBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px", borderRadius: "10px" },
  logoutBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" },
  sidebar: { position: "fixed", top: "70px", left: 0, bottom: 0, width: "260px", background: "white", borderRight: "1px solid #F5D0DA", padding: "24px", display: "flex", flexDirection: "column", zIndex: 99 },
  sidebarHeader: { marginBottom: "24px" },
  adminBadge: { display: "flex", alignItems: "center", gap: "8px", background: "#FDF0F3", padding: "8px 12px", borderRadius: "12px", width: "fit-content" },
  adminInfo: { display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", marginBottom: "24px" },
  adminAvatar: { fontSize: "32px" },
  adminName: { fontWeight: 600, fontSize: "14px" },
  adminEmail: { fontSize: "11px", color: "#999" },
  sidebarNav: { flex: 1, display: "flex", flexDirection: "column", gap: "6px" },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", background: "none", border: "none", width: "100%", textAlign: "left", fontSize: "14px", color: "#666" },
  navItemActive: { background: "#3E0014", color: "white" },
  navBadge: { marginLeft: "auto", background: "#AC1634", color: "white", borderRadius: "999px", padding: "2px 8px", fontSize: "10px" },
  sidebarLogout: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", background: "none", border: "none", color: "#F44336", fontSize: "14px", marginTop: "auto" },
  mainContent: { transition: "margin-left 0.3s", padding: "24px", maxWidth: "1400px" },
  welcomeCard: { background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "20px", padding: "24px", marginBottom: "24px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" },
  welcomeTitle: { fontSize: "24px", marginBottom: "6px" },
  welcomeText: { fontSize: "13px", opacity: 0.8 },
  dateBadge: { background: "rgba(255,255,255,0.15)", padding: "8px 16px", borderRadius: "999px", fontSize: "13px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "24px" },
  statCard: { background: "white", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid #F5D0DA" },
  statIcon: { width: "48px", height: "48px", borderRadius: "50%", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: "28px", fontWeight: "bold", color: "#3E0014" },
  alertCard: { background: "#FFF8E1", borderRadius: "16px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" },
  alertBtn: { marginLeft: "auto", background: "#FF9800", border: "none", padding: "6px 16px", borderRadius: "999px", color: "white", cursor: "pointer" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  countBadge: { background: "#F5D0DA", padding: "4px 12px", borderRadius: "999px", fontSize: "12px" },
  activityList: { background: "white", borderRadius: "16px", border: "1px solid #F5D0DA", overflow: "hidden" },
  activityItem: { display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderBottom: "1px solid #F5D0DA" },
  activityAmount: { marginLeft: "auto", fontWeight: 600, color: "#AC1634" },
  table: { background: "white", borderRadius: "16px", border: "1px solid #F5D0DA", overflow: "auto" },
  tableHeader: { display: "grid", gridTemplateColumns: "2fr 1fr 0.8fr 0.8fr 0.8fr 1fr", padding: "14px 20px", background: "#FDF0F3", fontWeight: 600, fontSize: "13px", borderBottom: "1px solid #F5D0DA" },
  tableRow: { display: "grid", gridTemplateColumns: "2fr 1fr 0.8fr 0.8fr 0.8fr 1fr", padding: "14px 20px", borderBottom: "1px solid #F5D0DA", fontSize: "13px", alignItems: "center" },
  tableEmail: { fontSize: "11px", color: "#999", marginTop: "2px" },
  statusBadge: { display: "inline-block", padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 500 },
  actionBtns: { display: "flex", gap: "8px" },
  approveBtn: { background: "#4CAF50", color: "white", border: "none", padding: "4px 10px", borderRadius: "999px", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" },
  rejectBtn: { background: "#F44336", color: "white", border: "none", padding: "4px 10px", borderRadius: "999px", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" },
  viewBtn: { background: "#2196F3", color: "white", border: "none", padding: "4px 12px", borderRadius: "999px", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" },
  reportsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" },
  reportCard: { background: "white", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid #F5D0DA" },
  reportValue: { fontSize: "20px", fontWeight: "bold", color: "#3E0014", marginTop: "4px" }
};