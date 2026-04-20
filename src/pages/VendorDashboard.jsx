// src/pages/VendorDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, Clock, CheckCircle, XCircle, MessageCircle, Star, 
  Users, TrendingUp, DollarSign, Package, Heart, User,
  Bell, Settings, Camera, FileText, Award, Target, Zap,
  BarChart3, Phone, Mail, MapPin, Menu, X,
  Plus, Edit2, Save, ChevronRight, Sparkles, Shield,
  Video, LogOut, LayoutDashboard, ClipboardList, Calendar as CalendarIcon,
  Briefcase, FolderOpen, Users as UsersIcon, BarChart, Leaf
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

// Green Score Card Component
const GreenScoreCard = ({ vendorProfile, setVendorProfile }) => {
  const [showTips, setShowTips] = useState(false);
  
  // Calculate green score based on vendor practices
  const calculateGreenScore = () => {
    let score = vendorProfile.greenScore || 0;
    if (vendorProfile.ecoFriendly) score += 30;
    if (vendorProfile.zeroWaste) score += 25;
    if (vendorProfile.localSourcing) score += 20;
    if (vendorProfile.recyclableMaterials) score += 15;
    if (vendorProfile.energyEfficient) score += 10;
    return Math.min(score, 100);
  };

  const greenScore = calculateGreenScore();
  
  // Tips from client reviews to improve green score
  const greenTips = [
    { id: 1, tip: "Use LED lighting instead of traditional lights", impact: "+15 points", from: "Client Review" },
    { id: 2, tip: "Source flowers locally to reduce carbon footprint", impact: "+20 points", from: "Multiple Reviews" },
    { id: 3, tip: "Offer digital invoices and contracts", impact: "+10 points", from: "Eco-conscious couples" },
    { id: 4, tip: "Use reusable decor items instead of single-use", impact: "+25 points", from: "Client Suggestion" },
    { id: 5, tip: "Compost event waste after setup", impact: "+15 points", from: "Sustainability Expert" },
    { id: 6, tip: "Partner with other green vendors", impact: "+10 points", from: "Industry Best Practice" },
    { id: 7, tip: "Switch to renewable energy for your studio", impact: "+20 points", from: "Green Initiative" },
    { id: 8, tip: "Offer paperless billing and receipts", impact: "+10 points", from: "Client Request" }
  ];

  const getScoreColor = () => {
    if (greenScore >= 80) return "#4CAF50";
    if (greenScore >= 60) return "#8BC34A";
    if (greenScore >= 40) return "#FFC107";
    return "#FF9800";
  };

  const getScoreLabel = () => {
    if (greenScore >= 80) return "Eco-Champion 🌟";
    if (greenScore >= 60) return "Green Leader 🌿";
    if (greenScore >= 40) return "Eco-Aware 💚";
    return "Getting Started 🌱";
  };

  return (
    <div style={greenScoreStyles.container}>
      <div style={greenScoreStyles.header}>
        <Leaf size={24} color="#2d6a4f" />
        <h3 style={greenScoreStyles.title}>Green Wedding Score</h3>
        <button 
          style={greenScoreStyles.infoBtn}
          onClick={() => setShowTips(!showTips)}
        >
          {showTips ? "Hide Tips ↑" : "View Tips ↓"}
        </button>
      </div>
      
      <div style={greenScoreStyles.scoreContainer}>
        <div style={greenScoreStyles.scoreCircle}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E8F5E9" strokeWidth="8"/>
            <circle 
              cx="60" cy="60" r="54" fill="none" 
              stroke={getScoreColor()} strokeWidth="8"
              strokeDasharray={`${(greenScore / 100) * 339.3} 339.3`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dasharray 1s ease" }}
            />
            <text x="60" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#3E0014">{greenScore}</text>
            <text x="60" y="75" textAnchor="middle" fontSize="10" fill="#666">points</text>
          </svg>
        </div>
        <div style={greenScoreStyles.scoreInfo}>
          <p style={greenScoreStyles.scoreLabel}>{getScoreLabel()}</p>
          <p style={greenScoreStyles.scoreText}>
            {greenScore >= 80 ? "Excellent! You're a sustainability leader! 🎉" :
             greenScore >= 60 ? "Great! You're on the right track! Keep going!" :
             greenScore >= 40 ? "Good start! Small changes make big impact!" :
             "Start your green journey today! Every step counts."}
          </p>
          <div style={greenScoreStyles.badges}>
            {greenScore >= 80 && <span style={greenScoreStyles.badge}>🌿 Eco-Champion</span>}
            {greenScore >= 60 && <span style={greenScoreStyles.badge}>♻️ Zero Waste</span>}
            {greenScore >= 40 && <span style={greenScoreStyles.badge}>🌱 Eco-Aware</span>}
            {vendorProfile.localSourcing && <span style={greenScoreStyles.badge}>📍 Local Sourcing</span>}
            {vendorProfile.ecoFriendly && <span style={greenScoreStyles.badge}>💚 Eco-Friendly</span>}
          </div>
        </div>
      </div>

      {showTips && (
        <div style={greenScoreStyles.tipsContainer}>
          <h4 style={greenScoreStyles.tipsTitle}>📈 Ways to Improve Your Green Score</h4>
          <p style={greenScoreStyles.tipsSubtitle}>Based on client feedback and industry standards</p>
          {greenTips.map(tip => (
            <div key={tip.id} style={greenScoreStyles.tipCard}>
              <div style={greenScoreStyles.tipIcon}>💡</div>
              <div style={greenScoreStyles.tipContent}>
                <p style={greenScoreStyles.tipText}>{tip.tip}</p>
                <div style={greenScoreStyles.tipMeta}>
                  <span style={greenScoreStyles.tipImpact}>{tip.impact}</span>
                  <span style={greenScoreStyles.tipFrom}>📝 {tip.from}</span>
                </div>
              </div>
            </div>
          ))}
          <button style={greenScoreStyles.improveBtn}>
            Get Personalized Green Audit →
          </button>
        </div>
      )}
    </div>
  );
};

const greenScoreStyles = {
  container: {
    background: "white",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid #F5D0DA"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#3E0014",
    margin: 0,
    flex: 1
  },
  infoBtn: {
    background: "#FDF0F3",
    border: "1px solid #F5D0DA",
    padding: "6px 16px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#AC1634"
  },
  scoreContainer: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "16px"
  },
  scoreCircle: {
    position: "relative"
  },
  scoreInfo: {
    flex: 1
  },
  scoreLabel: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: "8px"
  },
  scoreText: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "12px"
  },
  badges: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  badge: {
    background: "#E8F5E9",
    color: "#2d6a4f",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 600
  },
  tipsContainer: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #F5D0DA"
  },
  tipsTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "4px"
  },
  tipsSubtitle: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "16px"
  },
  tipCard: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    background: "#FDF0F3",
    borderRadius: "12px",
    marginBottom: "10px"
  },
  tipIcon: {
    fontSize: "20px"
  },
  tipContent: {
    flex: 1
  },
  tipText: {
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "6px"
  },
  tipMeta: {
    display: "flex",
    gap: "16px",
    fontSize: "11px",
    flexWrap: "wrap"
  },
  tipImpact: {
    color: "#4CAF50",
    fontWeight: 600
  },
  tipFrom: {
    color: "#999"
  },
  improveBtn: {
    width: "100%",
    marginTop: "16px",
    padding: "12px",
    borderRadius: "999px",
    background: "#2d6a4f",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  }
};

export default function VendorDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showPowerPairModal, setShowPowerPairModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Vendor Data with Green Metrics
  const [vendorProfile, setVendorProfile] = useState({
    businessName: "Lens & Love Studio",
    ownerName: "Rajesh Mehta",
    email: "contact@lenslove.com",
    phone: "+91 98765 43210",
    category: "Photography",
    experience: "10+ years",
    location: "Mumbai, Delhi, Jaipur",
    bio: "Award-winning wedding photographers capturing candid moments with artistic vision. Specializing in cinematic storytelling and natural light photography.",
    rating: 4.9,
    totalReviews: 234,
    totalBookings: 156,
    responseRate: "98%",
    responseTime: "< 1 hour",
    priceRange: "₹85,000 - ₹2,50,000",
    verified: true,
    premium: true,
    // Green Metrics
    greenScore: 65,
    ecoFriendly: true,
    zeroWaste: true,
    localSourcing: true,
    recyclableMaterials: false,
    energyEfficient: false
  });

  // Booking Requests
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      clientName: "Priya Sharma",
      clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      weddingDate: "2025-12-15",
      venue: "Jaipur, Rajasthan",
      guestCount: 250,
      budget: "₹1,50,000 - ₹2,00,000",
      requirements: "Looking for candid photography style with traditional touch.",
      status: "pending",
      requestedAt: "2024-01-18T10:30:00",
      contact: "+91 98765 12345",
      email: "priya@example.com"
    },
    {
      id: 2,
      clientName: "Anjali Verma",
      clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      weddingDate: "2026-01-20",
      venue: "Goa",
      guestCount: 120,
      budget: "₹1,00,000 - ₹1,50,000",
      requirements: "Beach wedding photography, candid and natural shots preferred.",
      status: "pending",
      requestedAt: "2024-01-17T14:15:00",
      contact: "+91 87654 32109",
      email: "anjali@example.com"
    }
  ]);

  // Upcoming Bookings
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 101,
      clientName: "Meera & Karan",
      weddingDate: "2025-02-15",
      venue: "Goa",
      package: "Premium Photography Package",
      amount: "₹1,85,000",
      status: "confirmed",
      meetingScheduled: { date: "2024-01-25", time: "11:00 AM", link: "https://meet.vivaha.com/meera-karan" }
    },
    {
      id: 102,
      clientName: "Neha & Amit",
      weddingDate: "2025-03-10",
      venue: "Jaipur",
      package: "Standard Photography Package",
      amount: "₹1,20,000",
      status: "confirmed",
      meetingScheduled: { date: "2024-01-28", time: "2:00 PM", link: "https://meet.vivaha.com/neha-amit" }
    }
  ]);

  // Portfolio
  const [portfolio, setPortfolio] = useState([
    "https://images.unsplash.com/photo-1519741497674-611481863552",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b"
  ]);

  // Power Pairs
  const [powerPairs, setPowerPairs] = useState([
    { id: 1, name: "Royal Blooms Decor", category: "Decor", discount: "15%", status: "active" }
  ]);

  const [suggestedPowerPairs, setSuggestedPowerPairs] = useState([
    { id: 2, name: "Grand Feast Caterers", category: "Catering", discount: "10%", match: "92%" },
    { id: 3, name: "Beat Masters DJ", category: "Music", discount: "12%", match: "85%" }
  ]);

  // Analytics
  const [analytics, setAnalytics] = useState({
    profileViews: 1247,
    inquiryRate: 23,
    conversionRate: 68,
    averageRating: 4.9,
    totalRevenue: 458000,
    growthRate: 15,
    monthlyStats: [12, 19, 15, 28, 32, 45]
  });

  // AI Insights
  const [aiInsights, setAiInsights] = useState([
    "Your response rate of 98% is excellent! Top 5% of vendors.",
    "Photos with natural lighting get 40% more inquiries.",
    "Consider adding a video portfolio to increase conversions by 25%.",
    "Your green score of 65 is good! Implementing sustainable practices can attract eco-conscious couples."
  ]);

  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setShowMeetingModal(true);
  };

  const handleScheduleMeeting = (date, time) => {
    const updated = bookingRequests.filter(r => r.id !== selectedRequest.id);
    setBookingRequests(updated);
    setUpcomingBookings([...upcomingBookings, {
      id: Date.now(),
      clientName: selectedRequest.clientName,
      weddingDate: selectedRequest.weddingDate,
      venue: selectedRequest.venue,
      package: "Custom Package",
      amount: selectedRequest.budget.split('-')[0],
      status: "confirmed",
      meetingScheduled: { date, time, link: `https://meet.vivaha.com/${selectedRequest.clientName.toLowerCase().replace(' ', '-')}` }
    }]);
    setShowMeetingModal(false);
    setSelectedRequest(null);
  };

  const handleRejectRequest = (requestId) => {
    setBookingRequests(bookingRequests.filter(r => r.id !== requestId));
  };

  const addPowerPair = (pair) => {
    setPowerPairs([...powerPairs, { ...pair, status: "active" }]);
    setSuggestedPowerPairs(suggestedPowerPairs.filter(p => p.id !== pair.id));
  };

  const addPortfolioImage = (imageUrl) => {
    if (imageUrl) {
      setPortfolio([...portfolio, imageUrl]);
    }
  };

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: <LayoutDashboard size={20} /> },
    { id: "requests", label: "Booking Requests", icon: <MessageCircle size={20} />, badge: bookingRequests.length },
    { id: "bookings", label: "Upcoming Bookings", icon: <CalendarIcon size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart size={20} /> },
    { id: "portfolio", label: "Portfolio", icon: <Camera size={20} /> },
    { id: "powerpairs", label: "Power Pairs", icon: <UsersIcon size={20} /> },
    { id: "profile", label: "Business Profile", icon: <Briefcase size={20} /> }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => setSidebarOpen(true)} style={styles.menuBtn}>
            <Menu size={22} />
          </button>
          <HindiLogo size="small" />
          <div style={styles.headerRight}>
            <button style={styles.notificationBtn} onClick={() => setShowNotification(!showNotification)}>
              <Bell size={20} />
              {bookingRequests.length > 0 && <span style={styles.notificationBadge}>{bookingRequests.length}</span>}
            </button>
            <button onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Dropdown */}
      {showNotification && bookingRequests.length > 0 && (
        <div style={styles.notificationDropdown}>
          <p style={styles.notificationTitle}>New Booking Requests</p>
          {bookingRequests.map(req => (
            <div key={req.id} style={styles.notificationItem}>
              <img src={req.clientImage} alt={req.clientName} style={styles.notificationAvatar} />
              <div>
                <p style={styles.notificationName}>{req.clientName}</p>
                <p style={styles.notificationText}>Requested photography services</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <>
          <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <div style={styles.sidebarLogo}>
                <HindiLogo size="small" />
              </div>
              <button onClick={() => setSidebarOpen(false)} style={styles.closeSidebarBtn}>
                <X size={22} />
              </button>
            </div>
            
            <div style={styles.vendorInfoSidebar}>
              <div style={styles.vendorAvatarSidebar}>📸</div>
              <div>
                <p style={styles.vendorNameSidebar}>{vendorProfile.businessName}</p>
                <p style={styles.vendorCategorySidebar}>{vendorProfile.category}</p>
              </div>
            </div>

            <div style={styles.sidebarNav}>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  style={{...styles.sidebarNavItem, ...(activeTab === item.id ? styles.sidebarNavItemActive : {})}}
                >
                  <span style={styles.sidebarNavIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge > 0 && <span style={styles.sidebarBadge}>{item.badge}</span>}
                  <ChevronRight size={16} style={styles.sidebarArrow} />
                </button>
              ))}
            </div>

            <div style={styles.sidebarFooter}>
              <button style={styles.sidebarLogout} onClick={() => { setUser(null); navigate("/"); }}>
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Welcome Banner */}
        <div style={styles.welcomeBanner}>
          <div>
            <h1 style={styles.welcomeTitle}>Welcome back, {vendorProfile.ownerName}! 👋</h1>
            <p style={styles.welcomeText}>Vivaha Vendor Dashboard - Manage your wedding business</p>
            <p style={styles.welcomeSubtext}>You have {bookingRequests.length} new booking requests waiting</p>
          </div>
          <div style={styles.verifiedBadge}>
            <Shield size={16} color="#4CAF50" />
            <span>Verified Vendor</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><Users size={24} color="#AC1634" /></div>
            <div><p style={styles.statValue}>{analytics.profileViews}</p><p style={styles.statLabel}>Profile Views</p></div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><TrendingUp size={24} color="#AC1634" /></div>
            <div><p style={styles.statValue}>{analytics.inquiryRate}%</p><p style={styles.statLabel}>Inquiry Rate</p></div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><Star size={24} color="#AC1634" /></div>
            <div><p style={styles.statValue}>{analytics.averageRating}</p><p style={styles.statLabel}>Rating</p></div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><DollarSign size={24} color="#AC1634" /></div>
            <div><p style={styles.statValue}>₹{(analytics.totalRevenue / 100000).toFixed(1)}L</p><p style={styles.statLabel}>Revenue</p></div>
          </div>
        </div>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Green Score Card */}
              <GreenScoreCard vendorProfile={vendorProfile} setVendorProfile={setVendorProfile} />

              {/* AI Performance Insights */}
              <div style={styles.aiSection}>
                <div style={styles.aiHeader}><Sparkles size={20} color="#E77291" /> AI Performance Insights</div>
                <div style={styles.aiGrid}>
                  {aiInsights.map((insight, i) => (
                    <div key={i} style={styles.aiCard}><Zap size={16} color="#E77291" /><p>{insight}</p></div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={styles.quickActions}>
                <h3 style={styles.sectionTitle}>Quick Actions</h3>
                <div style={styles.actionGrid}>
                  <button style={styles.actionCard} onClick={() => setActiveTab("requests")}><MessageCircle size={20} /> View Requests ({bookingRequests.length})</button>
                  <button style={styles.actionCard} onClick={() => setShowPortfolioModal(true)}><Camera size={20} /> Update Portfolio</button>
                  <button style={styles.actionCard} onClick={() => setShowPowerPairModal(true)}><Users size={20} /> Find Power Pairs</button>
                  <button style={styles.actionCard} onClick={() => setActiveTab("analytics")}><BarChart3 size={20} /> View Analytics</button>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={styles.recentSection}>
                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                {bookingRequests.slice(0, 2).map(req => (
                  <div key={req.id} style={styles.activityItem}>
                    <div style={styles.activityIcon}>📩</div>
                    <div><p><strong>{req.clientName}</strong> sent a booking request</p><p style={styles.activityTime}>{new Date(req.requestedAt).toLocaleDateString()}</p></div>
                    <button style={styles.activityBtn} onClick={() => handleAcceptRequest(req)}>Review →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Requests Tab */}
          {activeTab === "requests" && (
            <div>
              {bookingRequests.length === 0 ? (
                <div style={styles.emptyState}>No pending requests</div>
              ) : (
                bookingRequests.map(request => (
                  <div key={request.id} style={styles.requestCard}>
                    <div style={styles.requestHeader}>
                      <div style={styles.clientInfo}>
                        <img src={request.clientImage} alt={request.clientName} style={styles.clientAvatar} />
                        <div><h3>{request.clientName}</h3><p>Requested on {new Date(request.requestedAt).toLocaleDateString()}</p></div>
                      </div>
                      <div style={{...styles.requestStatus, background: "#FF980015", color: "#FF9800"}}><Clock size={12} /> Pending</div>
                    </div>
                    <div style={styles.requestDetails}>
                      <div><Calendar size={14} /> Wedding: {request.weddingDate}</div>
                      <div><MapPin size={14} /> {request.venue}</div>
                      <div><Users size={14} /> {request.guestCount} guests</div>
                      <div><DollarSign size={14} /> {request.budget}</div>
                    </div>
                    <div style={styles.requestRequirements}><strong>Requirements:</strong> {request.requirements}</div>
                    <div style={styles.contactInfo}><Phone size={12} /> {request.contact} <Mail size={12} /> {request.email}</div>
                    <div style={styles.requestActions}>
                      <button style={styles.rejectBtn} onClick={() => handleRejectRequest(request.id)}><XCircle size={16} /> Decline</button>
                      <button style={styles.acceptBtn} onClick={() => handleAcceptRequest(request)}><CheckCircle size={16} /> Accept & Schedule</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div>
              {upcomingBookings.map(booking => (
                <div key={booking.id} style={styles.bookingCard}>
                  <div style={styles.bookingHeader}>
                    <div><h3>{booking.clientName}</h3><p>{booking.weddingDate} • {booking.venue}</p></div>
                    <div style={styles.bookingStatus}>✅ Confirmed</div>
                  </div>
                  <div style={styles.bookingDetails}>
                    <div><Package size={14} /> {booking.package}</div>
                    <div><DollarSign size={14} /> {booking.amount}</div>
                    {booking.meetingScheduled && <div><Video size={14} /> Meeting: {booking.meetingScheduled.date} at {booking.meetingScheduled.time}</div>}
                  </div>
                  <div style={styles.bookingActions}>
                    <button style={styles.messageBtn}><MessageCircle size={14} /> Message</button>
                    <button style={styles.joinBtn} onClick={() => window.open(booking.meetingScheduled?.link, "_blank")}><Video size={14} /> Join Meeting</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <div style={styles.analyticsCard}>
                <h3>Growth Overview</h3>
                <div style={styles.growthBadge}><TrendingUp size={14} /> +{analytics.growthRate}% from last month</div>
                <div style={styles.monthlyChart}>
                  {analytics.monthlyStats.map((stat, i) => <div key={i} style={{...styles.chartBar, height: `${stat * 2}px`}}><span>{stat}</span></div>)}
                </div>
              </div>
              <div style={styles.analyticsGrid}>
                <div style={styles.analyticsItem}><Target size={20} color="#AC1634" /><div><p>Conversion Rate</p><p style={styles.analyticsValue}>{analytics.conversionRate}%</p></div></div>
                <div style={styles.analyticsItem}><Award size={20} color="#AC1634" /><div><p>Response Rate</p><p style={styles.analyticsValue}>{vendorProfile.responseRate}</p></div></div>
                <div style={styles.analyticsItem}><Clock size={20} color="#AC1634" /><div><p>Avg Response</p><p style={styles.analyticsValue}>{vendorProfile.responseTime}</p></div></div>
                <div style={styles.analyticsItem}><Star size={20} color="#AC1634" /><div><p>Rating</p><p style={styles.analyticsValue}>{vendorProfile.rating}/5</p></div></div>
              </div>
              <div style={styles.aiRecommendation}>
                <Sparkles size={20} color="#E77291" />
                <div><strong>AI Recommendation:</strong> Adding more candid shot samples to your portfolio could increase inquiries by 35%.</div>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === "portfolio" && (
            <div>
              <div style={styles.portfolioHeader}>
                <h3>Your Work Gallery</h3>
                <button style={styles.addPhotoBtn} onClick={() => setShowPortfolioModal(true)}><Plus size={16} /> Add Photo</button>
              </div>
              <div style={styles.portfolioGrid}>
                {portfolio.map((img, i) => (
                  <div key={i} style={styles.portfolioItem}>
                    <img src={img} alt={`Portfolio ${i+1}`} style={styles.portfolioImage} />
                  </div>
                ))}
                <div style={styles.portfolioAdd} onClick={() => setShowPortfolioModal(true)}><Camera size={32} /><p>Add New</p></div>
              </div>
              <div style={styles.portfolioTip}>
                <Sparkles size={16} color="#E77291" /> <strong>Pro Tip:</strong> Portfolios with 15+ images get 2x more inquiries!
              </div>
            </div>
          )}

          {/* Power Pairs Tab */}
          {activeTab === "powerpairs" && (
            <div>
              <div style={styles.powerPairHeader}>
                <h3>Your Power Pairs</h3>
                <button style={styles.findPairBtn} onClick={() => setShowPowerPairModal(true)}><Plus size={16} /> Find Partners</button>
              </div>
              {powerPairs.map(pair => (
                <div key={pair.id} style={styles.powerPairItem}>
                  <div><strong>{pair.name}</strong><p>{pair.category}</p></div>
                  <div style={styles.pairDiscount}>{pair.discount} off for couples</div>
                  <span style={styles.activeBadge}>Active</span>
                </div>
              ))}
              <div style={styles.suggestedSection}>
                <h4>Suggested Partners 🤝</h4>
                {suggestedPowerPairs.map(pair => (
                  <div key={pair.id} style={styles.suggestedItem}>
                    <div><strong>{pair.name}</strong><p>{pair.category} • {pair.match} match</p></div>
                    <button style={styles.connectBtn} onClick={() => addPowerPair(pair)}>Connect →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <div style={styles.profileCard}>
                <div style={styles.profileHeaderSection}>
                  <div style={styles.profileAvatar}>📸</div>
                  <div>
                    {editingProfile ? <input style={styles.editInput} value={vendorProfile.businessName} onChange={(e) => setVendorProfile({...vendorProfile, businessName: e.target.value})} /> : <h2>{vendorProfile.businessName}</h2>}
                    <p style={styles.profileCategory}>{vendorProfile.category} • {vendorProfile.experience} experience</p>
                  </div>
                  <button style={styles.editProfileBtn} onClick={() => setEditingProfile(!editingProfile)}>{editingProfile ? <Save size={16} /> : <Edit2 size={16} />} {editingProfile ? "Save" : "Edit"}</button>
                </div>
                <div style={styles.profileDetails}>
                  <div><MapPin size={16} /> {vendorProfile.location}</div>
                  <div><Phone size={16} /> {vendorProfile.phone}</div>
                  <div><Mail size={16} /> {vendorProfile.email}</div>
                </div>
                {editingProfile ? <textarea style={styles.editTextarea} value={vendorProfile.bio} onChange={(e) => setVendorProfile({...vendorProfile, bio: e.target.value})} rows={3} /> : <p style={styles.profileBio}>{vendorProfile.bio}</p>}
                <div style={styles.greenMetrics}>
                  <h4>🌿 Sustainability Practices</h4>
                  <div style={styles.metricsGrid}>
                    <label><input type="checkbox" checked={vendorProfile.ecoFriendly} onChange={(e) => setVendorProfile({...vendorProfile, ecoFriendly: e.target.checked})} /> Eco-Friendly Products</label>
                    <label><input type="checkbox" checked={vendorProfile.zeroWaste} onChange={(e) => setVendorProfile({...vendorProfile, zeroWaste: e.target.checked})} /> Zero Waste Policy</label>
                    <label><input type="checkbox" checked={vendorProfile.localSourcing} onChange={(e) => setVendorProfile({...vendorProfile, localSourcing: e.target.checked})} /> Local Sourcing</label>
                    <label><input type="checkbox" checked={vendorProfile.recyclableMaterials} onChange={(e) => setVendorProfile({...vendorProfile, recyclableMaterials: e.target.checked})} /> Recyclable Materials</label>
                    <label><input type="checkbox" checked={vendorProfile.energyEfficient} onChange={(e) => setVendorProfile({...vendorProfile, energyEfficient: e.target.checked})} /> Energy Efficient</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meeting Modal */}
      {showMeetingModal && selectedRequest && (
        <div style={styles.modalOverlay} onClick={() => setShowMeetingModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Schedule Meeting</h3><button onClick={() => setShowMeetingModal(false)}>✕</button></div>
            <div style={styles.modalContent}>
              <p>Select a time with {selectedRequest.clientName}</p>
              <div style={styles.slotGrid}>
                {["Jan 25, 10:00 AM", "Jan 25, 2:00 PM", "Jan 26, 11:00 AM", "Jan 26, 3:00 PM"].map(slot => (
                  <button key={slot} style={styles.slotBtn} onClick={() => handleScheduleMeeting(slot.split(',')[0], slot.split(',')[1])}>{slot}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      {showPortfolioModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPortfolioModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Add to Portfolio</h3><button onClick={() => setShowPortfolioModal(false)}>✕</button></div>
            <div style={styles.modalContent}>
              <input 
                type="text" 
                placeholder="Image URL" 
                style={styles.modalInput} 
                id="portfolioImageUrl"
              />
              <div style={styles.modalActions}>
                <button onClick={() => setShowPortfolioModal(false)}>Cancel</button>
                <button onClick={() => {
                  const url = document.getElementById("portfolioImageUrl").value;
                  if (url) addPortfolioImage(url);
                  setShowPortfolioModal(false);
                }}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Power Pair Modal */}
      {showPowerPairModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPowerPairModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Find Power Pairs</h3><button onClick={() => setShowPowerPairModal(false)}>✕</button></div>
            <div style={styles.modalContent}>
              <p>Discover vendors to collaborate with</p>
              {suggestedPowerPairs.map(pair => (
                <div key={pair.id} style={styles.suggestedModalItem}>
                  <div><strong>{pair.name}</strong><p>{pair.category}</p></div>
                  <button onClick={() => { addPowerPair(pair); setShowPowerPairModal(false); }}>Connect</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  menuBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  headerRight: { display: "flex", gap: "12px" },
  notificationBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px", position: "relative" },
  notificationBadge: { position: "absolute", top: "-5px", right: "-5px", background: "#AC1634", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  logoutBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  notificationDropdown: { position: "absolute", top: "70px", right: "32px", background: "white", borderRadius: "16px", width: "300px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 200, padding: "16px" },
  notificationTitle: { fontWeight: 600, marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #F5D0DA" },
  notificationItem: { display: "flex", gap: "12px", padding: "10px 0", borderBottom: "1px solid #F5D0DA" },
  notificationAvatar: { width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" },
  notificationName: { fontWeight: 500, fontSize: "13px" },
  notificationText: { fontSize: "11px", color: "#666" },
  sidebarOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", zIndex: 998 },
  sidebar: { position: "fixed", top: 0, left: 0, bottom: 0, width: 320, background: "white", zIndex: 999, padding: "24px", display: "flex", flexDirection: "column", boxShadow: "2px 0 12px rgba(0,0,0,0.1)" },
  sidebarHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #F5D0DA" },
  sidebarLogo: { display: "flex", alignItems: "center" },
  closeSidebarBtn: { background: "none", border: "none", cursor: "pointer", color: "#AC1634" },
  vendorInfoSidebar: { display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", marginBottom: "24px" },
  vendorAvatarSidebar: { fontSize: "40px" },
  vendorNameSidebar: { fontWeight: 600, fontSize: "14px", marginBottom: "4px" },
  vendorCategorySidebar: { fontSize: "11px", color: "#E77291" },
  sidebarNav: { flex: 1, display: "flex", flexDirection: "column", gap: "6px" },
  sidebarNavItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", background: "white", border: "none", width: "100%", textAlign: "left", fontSize: "14px", color: "#666", position: "relative" },
  sidebarNavItemActive: { background: "#3E0014", color: "white" },
  sidebarNavIcon: { width: "24px" },
  sidebarBadge: { background: "#AC1634", color: "white", borderRadius: "999px", padding: "2px 8px", fontSize: "10px", marginLeft: "auto" },
  sidebarArrow: { marginLeft: "auto", opacity: 0.5 },
  sidebarFooter: { marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #F5D0DA" },
  sidebarLogout: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", background: "none", border: "none", width: "100%", color: "#F44336", fontSize: "14px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "32px", paddingBottom: "60px" },
  welcomeBanner: { background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "24px", padding: "32px", marginBottom: "32px", color: "white" },
  welcomeTitle: { fontSize: "28px", marginBottom: "8px" },
  welcomeText: { fontSize: "14px", opacity: 0.8, marginBottom: "4px" },
  welcomeSubtext: { fontSize: "13px", opacity: 0.7 },
  verifiedBadge: { display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "999px", marginTop: "16px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" },
  statCard: { background: "white", borderRadius: "20px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid #F5D0DA" },
  statIcon: { width: "48px", height: "48px", borderRadius: "50%", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: "28px", fontWeight: "bold", color: "#3E0014" },
  statLabel: { fontSize: "12px", color: "#666" },
  tabContent: { marginTop: "16px" },
  aiSection: { background: "linear-gradient(135deg, #FFF5F7, white)", borderRadius: "20px", padding: "24px", marginBottom: "32px", border: "1px solid #F5D0DA" },
  aiHeader: { display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", fontWeight: 600, marginBottom: "16px" },
  aiGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" },
  aiCard: { display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "white", borderRadius: "12px", border: "1px solid #F5D0DA" },
  quickActions: { marginBottom: "32px" },
  sectionTitle: { fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#3E0014" },
  actionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },
  actionCard: { background: "white", border: "1px solid #F5D0DA", borderRadius: "16px", padding: "20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", fontWeight: 500 },
  recentSection: { marginBottom: "32px" },
  activityItem: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", padding: "16px", borderRadius: "16px", marginBottom: "12px", border: "1px solid #F5D0DA" },
  activityIcon: { fontSize: "24px" },
  activityTime: { fontSize: "11px", color: "#999", marginTop: "4px" },
  activityBtn: { background: "#AC1634", color: "white", border: "none", padding: "8px 20px", borderRadius: "999px", cursor: "pointer" },
  requestCard: { background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", border: "1px solid #F5D0DA" },
  requestHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
  clientInfo: { display: "flex", gap: "16px", alignItems: "center" },
  clientAvatar: { width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" },
  requestStatus: { display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
  requestDetails: { display: "flex", flexWrap: "wrap", gap: "20px", padding: "16px 0", borderTop: "1px solid #F5D0DA", borderBottom: "1px solid #F5D0DA", marginBottom: "16px", fontSize: "13px", color: "#666" },
  requestRequirements: { background: "#FDF0F3", padding: "12px", borderRadius: "12px", marginBottom: "12px", fontSize: "13px" },
  contactInfo: { display: "flex", gap: "16px", fontSize: "12px", color: "#666", marginBottom: "16px" },
  requestActions: { display: "flex", gap: "12px" },
  acceptBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "none", background: "#4CAF50", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  rejectBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", color: "#F44336", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  bookingCard: { background: "white", borderRadius: "20px", padding: "24px", marginBottom: "20px", border: "1px solid #F5D0DA" },
  bookingHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
  bookingStatus: { color: "#4CAF50", fontWeight: 600 },
  bookingDetails: { display: "flex", flexWrap: "wrap", gap: "20px", padding: "16px 0", borderTop: "1px solid #F5D0DA", borderBottom: "1px solid #F5D0DA", marginBottom: "16px", fontSize: "13px" },
  bookingActions: { display: "flex", gap: "12px" },
  messageBtn: { flex: 1, padding: "10px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  joinBtn: { flex: 1, padding: "10px", borderRadius: "999px", border: "none", background: "#2196F3", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  analyticsCard: { background: "white", borderRadius: "20px", padding: "24px", marginBottom: "24px", border: "1px solid #F5D0DA" },
  growthBadge: { display: "inline-flex", alignItems: "center", gap: "6px", background: "#E8F5E9", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", color: "#4CAF50", marginBottom: "20px" },
  monthlyChart: { display: "flex", alignItems: "flex-end", gap: "12px", height: "150px", marginTop: "20px" },
  chartBar: { flex: 1, background: "#AC1634", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: "8px", color: "white", fontSize: "11px" },
  analyticsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" },
  analyticsItem: { background: "white", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid #F5D0DA" },
  analyticsValue: { fontSize: "24px", fontWeight: "bold", color: "#3E0014" },
  aiRecommendation: { display: "flex", alignItems: "center", gap: "16px", background: "#FDF0F3", padding: "20px", borderRadius: "16px", border: "1px solid #F5D0DA" },
  portfolioHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" },
  addPhotoBtn: { background: "#AC1634", color: "white", border: "none", padding: "10px 20px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  portfolioGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" },
  portfolioItem: { position: "relative", aspectRatio: "1", borderRadius: "16px", overflow: "hidden" },
  portfolioImage: { width: "100%", height: "100%", objectFit: "cover" },
  portfolioAdd: { background: "#FDF0F3", border: "2px dashed #F5D0DA", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", aspectRatio: "1" },
  portfolioTip: { display: "flex", alignItems: "center", gap: "12px", background: "#FDF0F3", padding: "16px", borderRadius: "12px", fontSize: "13px" },
  powerPairHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  findPairBtn: { background: "#AC1634", color: "white", border: "none", padding: "10px 20px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  powerPairItem: { background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", border: "1px solid #F5D0DA" },
  pairDiscount: { background: "#E8F5E9", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", color: "#4CAF50" },
  activeBadge: { background: "#4CAF50", color: "white", padding: "4px 12px", borderRadius: "999px", fontSize: "11px" },
  suggestedSection: { marginTop: "32px" },
  suggestedItem: { background: "#FDF0F3", borderRadius: "16px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" },
  connectBtn: { background: "#3E0014", color: "white", border: "none", padding: "8px 20px", borderRadius: "999px", cursor: "pointer" },
  profileCard: { background: "white", borderRadius: "20px", padding: "24px", border: "1px solid #F5D0DA" },
  profileHeaderSection: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", flexWrap: "wrap" },
  profileAvatar: { width: "80px", height: "80px", borderRadius: "50%", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" },
  profileCategory: { fontSize: "13px", color: "#E77291" },
  editProfileBtn: { marginLeft: "auto", background: "#FDF0F3", border: "1px solid #F5D0DA", padding: "8px 16px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  profileDetails: { display: "flex", flexWrap: "wrap", gap: "20px", padding: "16px 0", borderTop: "1px solid #F5D0DA", borderBottom: "1px solid #F5D0DA", marginBottom: "16px", fontSize: "13px", color: "#666" },
  profileBio: { fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "16px" },
  editInput: { padding: "8px", borderRadius: "8px", border: "1px solid #F5D0DA", fontSize: "14px", width: "100%", maxWidth: "300px" },
  editTextarea: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", width: "100%", fontSize: "14px", marginBottom: "16px" },
  greenMetrics: { marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #F5D0DA" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", marginTop: "12px" },
  emptyState: { textAlign: "center", padding: "60px", color: "#999" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "500px", maxHeight: "80vh", overflow: "auto" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalContent: { padding: "24px" },
  modalInput: { width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", marginBottom: "16px" },
  modalActions: { display: "flex", gap: "12px", marginTop: "16px" },
  slotGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "16px" },
  slotBtn: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  suggestedModalItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #F5D0DA" }
};