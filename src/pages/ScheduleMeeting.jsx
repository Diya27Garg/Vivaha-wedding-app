// src/pages/ScheduleMeeting.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, Video, CheckCircle, ArrowRight } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import { bookingService } from "../services/bookingService";

export default function ScheduleMeeting() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    loadBooking();
    loadSlots();
  }, []);

  const loadBooking = async () => {
    const data = await bookingService.getBooking(parseInt(bookingId));
    setBooking(data);
  };

  const loadSlots = async () => {
    const availableSlots = await bookingService.getAvailableSlots();
    setSlots(availableSlots);
  };

  const handleSchedule = async () => {
    if (selectedSlot) {
      await bookingService.scheduleMeeting(parseInt(bookingId), selectedSlot);
      navigate("/profile");
    }
  };

  if (!booking) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <div style={{ width: "70px" }} />
        </div>
      </div>
      
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Schedule Meeting</h1>
        <p style={styles.subtitle}>Choose a time to discuss your wedding plans with {booking.vendorName}</p>
        
        <div style={styles.bookingInfo}>
          <p><strong>Vendor:</strong> {booking.vendorName}</p>
          <p><strong>Wedding Date:</strong> {booking.weddingDate}</p>
        </div>
        
        <div style={styles.slotsGrid}>
          {slots.map(slot => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot)}
              style={{...styles.slotCard, ...(selectedSlot?.id === slot.id ? styles.slotSelected : {})}}
            >
              <Calendar size={20} />
              <div>
                <p style={styles.slotDate}>{slot.date}</p>
                <p style={styles.slotTime}>{slot.time}</p>
              </div>
              {selectedSlot?.id === slot.id && <CheckCircle size={16} color="#4CAF50" />}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleSchedule} 
          disabled={!selectedSlot} 
          style={{...styles.scheduleBtn, ...(!selectedSlot ? styles.disabledBtn : {})}}
        >
          Confirm Meeting <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px" },
  mainContent: { maxWidth: "600px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "36px", color: "#3E0014", marginBottom: "12px", textAlign: "center" },
  subtitle: { fontSize: "16px", color: "#7A5560", textAlign: "center", marginBottom: "32px" },
  bookingInfo: { background: "#FDF0F3", padding: "20px", borderRadius: "16px", marginBottom: "32px" },
  slotsGrid: { display: "grid", gap: "16px", marginBottom: "32px" },
  slotCard: { display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "16px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  slotSelected: { borderColor: "#AC1634", background: "#FDF0F3" },
  slotDate: { fontWeight: 600 },
  slotTime: { fontSize: "13px", color: "#666" },
  scheduleBtn: { width: "100%", padding: "16px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  disabledBtn: { background: "#CCC", cursor: "not-allowed" }
};