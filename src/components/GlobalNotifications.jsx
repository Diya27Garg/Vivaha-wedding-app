// src/components/GlobalNotifications.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle, Calendar, CreditCard, Video, X, MessageCircle } from "lucide-react";
import { bookingService } from "../services/bookingService";

export default function GlobalNotifications({ user }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 10 seconds
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    if (!user?.role) return;
    
    try {
      let bookings = [];
      if (user.role === "couple") {
        bookings = await bookingService.getCoupleBookings();
      } else if (user.role === "vendor") {
        bookings = await bookingService.getVendorBookings(user.vendorId || 1);
      }
      
      const newNotifications = [];
      
      // Process booking notifications
      bookings.forEach(booking => {
        // Vendor accepted notification
        if (booking.status === "vendor_accepted" && !booking.notificationRead) {
          newNotifications.push({
            id: `${booking.id}_accept`,
            type: "accept",
            title: "Booking Request Accepted! 🎉",
            message: `${booking.vendorName || "Vendor"} has accepted your booking request. Schedule a meeting to discuss details.`,
            action: "schedule",
            bookingId: booking.id,
            timestamp: booking.vendorResponse?.respondedAt || booking.createdAt,
            read: false
          });
        }
        
        // Meeting scheduled notification
        if (booking.status === "meeting_scheduled" && booking.meetingScheduled && !booking.meetingNotified) {
          newNotifications.push({
            id: `${booking.id}_meeting`,
            type: "meeting",
            title: "Meeting Scheduled 📅",
            message: `Your meeting with ${booking.vendorName || "Vendor"} is scheduled for ${booking.meetingScheduled.date} at ${booking.meetingScheduled.time}.`,
            action: "join",
            meetingLink: booking.meetingScheduled.meetingLink,
            bookingId: booking.id,
            timestamp: booking.meetingScheduled.scheduledAt,
            read: false
          });
        }
        
        // Booking confirmed notification
        if (booking.status === "confirmed" && !booking.confirmedNotified) {
          newNotifications.push({
            id: `${booking.id}_confirm`,
            type: "confirm",
            title: "Booking Confirmed! ✅",
            message: `Your booking with ${booking.vendorName || "Vendor"} has been confirmed. Complete payment to finalize.`,
            action: "pay",
            bookingId: booking.id,
            amount: booking.amount,
            timestamp: booking.confirmedAt,
            read: false
          });
        }
        
        // Invoice sent notification
        if (booking.invoiceSent && !booking.invoiceNotified) {
          newNotifications.push({
            id: `${booking.id}_invoice`,
            type: "invoice",
            title: "Invoice Received 📄",
            message: `Vendor has sent an invoice of ₹${booking.amount?.toLocaleString()} for your booking.`,
            action: "view_invoice",
            bookingId: booking.id,
            amount: booking.amount,
            timestamp: booking.invoiceSentAt,
            read: false
          });
        }
        
        // Payment completed notification
        if (booking.paymentStatus === "completed" && !booking.paymentNotified) {
          newNotifications.push({
            id: `${booking.id}_payment`,
            type: "payment",
            title: "Payment Successful! 💰",
            message: `Your payment of ₹${booking.amount?.toLocaleString()} has been processed successfully.`,
            action: "view_booking",
            bookingId: booking.id,
            timestamp: booking.paidAt,
            read: false
          });
        }
      });
      
      // Sort by timestamp (newest first)
      newNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleAction = (notification) => {
    markAsRead(notification.id);
    
    switch (notification.action) {
      case "schedule":
        navigate(`/schedule-meeting/${notification.bookingId}`);
        break;
      case "join":
        if (notification.meetingLink) {
          window.open(notification.meetingLink, "_blank");
        }
        break;
      case "pay":
        navigate(`/payment/${notification.bookingId}`);
        break;
      case "view_invoice":
        navigate(`/invoice/${notification.bookingId}`);
        break;
      case "view_booking":
        navigate("/profile");
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    setShowDropdown(false);
  };

  if (!user?.role) return null;

  return (
    <div style={styles.container}>
      <button 
        style={styles.bellBtn} 
        onClick={() => setShowDropdown(!showDropdown)}
        onMouseEnter={() => setShowDropdown(true)}
      >
        <Bell size={20} />
        {unreadCount > 0 && <span style={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>
      
      {showDropdown && (
        <>
          <div style={styles.overlay} onClick={() => setShowDropdown(false)} />
          <div style={styles.dropdown}>
            <div style={styles.dropdownHeader}>
              <h4>Notifications</h4>
              <div style={styles.headerActions}>
                {notifications.length > 0 && (
                  <button onClick={clearAllNotifications} style={styles.clearAllBtn}>
                    Clear All
                  </button>
                )}
                <button onClick={() => setShowDropdown(false)} style={styles.closeBtn}>✕</button>
              </div>
            </div>
            
            <div style={styles.notificationList}>
              {notifications.length === 0 ? (
                <div style={styles.emptyState}>
                  <Bell size={32} color="#CCC" />
                  <p>No notifications yet</p>
                  <span>We'll notify you when something arrives</span>
                </div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    style={{...styles.notificationItem, ...(!notif.read ? styles.unread : {})}}
                    onClick={() => handleAction(notif)}
                  >
                    <div style={styles.notificationIcon}>
                      {notif.type === "accept" && <CheckCircle size={20} color="#4CAF50" />}
                      {notif.type === "meeting" && <Calendar size={20} color="#2196F3" />}
                      {notif.type === "confirm" && <CreditCard size={20} color="#FF9800" />}
                      {notif.type === "invoice" && <MessageCircle size={20} color="#9C27B0" />}
                      {notif.type === "payment" && <CheckCircle size={20} color="#4CAF50" />}
                    </div>
                    <div style={styles.notificationContent}>
                      <p style={styles.notificationTitle}>{notif.title}</p>
                      <p style={styles.notificationMessage}>{notif.message}</p>
                      <span style={styles.notificationTime}>
                        {new Date(notif.timestamp).toLocaleDateString()} at {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {!notif.read && <div style={styles.unreadDot} />}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { position: "relative" },
  bellBtn: { 
    background: "rgba(231,114,145,0.15)", 
    border: "1px solid rgba(231,114,145,0.3)", 
    color: "#E77291", 
    cursor: "pointer", 
    padding: "10px", 
    borderRadius: "12px", 
    position: "relative",
    transition: "all 0.2s ease"
  },
  badge: { 
    position: "absolute", 
    top: "-5px", 
    right: "-5px", 
    background: "#AC1634", 
    color: "white", 
    borderRadius: "50%", 
    width: "18px", 
    height: "18px", 
    fontSize: "10px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  overlay: { 
    position: "fixed", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 198 
  },
  dropdown: { 
    position: "absolute", 
    top: "50px", 
    right: "0", 
    width: "380px", 
    maxWidth: "calc(100vw - 40px)",
    background: "white", 
    borderRadius: "20px", 
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)", 
    zIndex: 199, 
    overflow: "hidden",
    border: "1px solid #F5D0DA"
  },
  dropdownHeader: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "16px 20px", 
    background: "#3E0014",
    color: "white"
  },
  headerActions: { display: "flex", gap: "12px", alignItems: "center" },
  clearAllBtn: { 
    background: "rgba(255,255,255,0.15)", 
    border: "none", 
    color: "#E77291", 
    padding: "4px 12px", 
    borderRadius: "999px", 
    cursor: "pointer", 
    fontSize: "11px" 
  },
  closeBtn: { 
    background: "none", 
    border: "none", 
    color: "#E77291", 
    fontSize: "18px", 
    cursor: "pointer" 
  },
  notificationList: { 
    maxHeight: "450px", 
    overflowY: "auto" 
  },
  emptyState: { 
    textAlign: "center", 
    padding: "48px 24px",
    color: "#999"
  },
  notificationItem: { 
    display: "flex", 
    gap: "12px", 
    padding: "16px 20px", 
    borderBottom: "1px solid #F5D0DA", 
    cursor: "pointer",
    transition: "background 0.2s",
    position: "relative"
  },
  unread: { 
    background: "#FDF0F3"
  },
  notificationIcon: { 
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#F5D0DA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  notificationContent: { 
    flex: 1 
  },
  notificationTitle: { 
    fontSize: "14px", 
    fontWeight: 600, 
    marginBottom: "4px",
    color: "#3E0014"
  },
  notificationMessage: { 
    fontSize: "12px", 
    color: "#666", 
    marginBottom: "6px",
    lineHeight: 1.4
  },
  notificationTime: { 
    fontSize: "10px", 
    color: "#999" 
  },
  unreadDot: { 
    width: "8px", 
    height: "8px", 
    borderRadius: "50%", 
    background: "#AC1634", 
    position: "absolute", 
    top: "20px", 
    right: "16px" 
  }
};