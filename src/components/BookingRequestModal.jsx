// src/components/BookingRequestModal.jsx
import { useState } from "react";
import { X, Calendar, Users, DollarSign, MessageCircle, Send, Clock } from "lucide-react";

export default function BookingRequestModal({ vendor, onClose, onSubmit }) {
  const [requirements, setRequirements] = useState({
    eventDate: "",
    guestCount: "",
    budget: "",
    specialRequests: "",
    contactNumber: "",
    preferredTime: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!requirements.eventDate || !requirements.guestCount || !requirements.contactNumber) {
      alert("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    await onSubmit(requirements);
    setSubmitting(false);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Book {vendor?.name}</h2>
          <button onClick={onClose} style={styles.closeBtn}><X size={24} /></button>
        </div>
        <div style={styles.content}>
          <div style={styles.vendorInfo}>
            <img src={vendor?.image} alt={vendor?.name} style={styles.vendorImage} />
            <div>
              <p style={styles.vendorName}>{vendor?.name}</p>
              <p style={styles.vendorService}>{vendor?.category}</p>
              <p style={styles.vendorPrice}>Starting from {vendor?.price}</p>
            </div>
          </div>

          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}><Calendar size={14} /> Event Date *</label>
              <input type="date" style={styles.input} value={requirements.eventDate} onChange={(e) => setRequirements({...requirements, eventDate: e.target.value})} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><Users size={14} /> Expected Guests *</label>
              <input type="number" placeholder="e.g., 200" style={styles.input} value={requirements.guestCount} onChange={(e) => setRequirements({...requirements, guestCount: e.target.value})} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><DollarSign size={14} /> Budget Range</label>
              <select style={styles.input} value={requirements.budget} onChange={(e) => setRequirements({...requirements, budget: e.target.value})}>
                <option value="">Select budget range</option>
                <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                <option value="1L-2L">₹1,00,000 - ₹2,00,000</option>
                <option value="2L-3L">₹2,00,000 - ₹3,00,000</option>
                <option value="3L+">₹3,00,000+</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><Clock size={14} /> Preferred Time</label>
              <select style={styles.input} value={requirements.preferredTime} onChange={(e) => setRequirements({...requirements, preferredTime: e.target.value})}>
                <option value="">Select preferred time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 8 PM)</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><MessageCircle size={14} /> Special Requests</label>
              <textarea rows="3" placeholder="Any specific requirements..." style={styles.textarea} value={requirements.specialRequests} onChange={(e) => setRequirements({...requirements, specialRequests: e.target.value})} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Number *</label>
              <input type="tel" placeholder="Your phone number" style={styles.input} value={requirements.contactNumber} onChange={(e) => setRequirements({...requirements, contactNumber: e.target.value})} required />
            </div>
          </div>

          <div style={styles.actions}>
            <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSubmit} disabled={submitting} style={styles.submitBtn}>
              {submitting ? "Sending Request..." : <><Send size={16} /> Send Booking Request</>}
            </button>
          </div>
          <p style={styles.note}>* Required fields. The vendor will respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "28px", width: "90%", maxWidth: "550px", maxHeight: "90vh", overflow: "auto" },
  header: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "white", zIndex: 10 },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "24px", color: "#3E0014", margin: 0 },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#AC1634" },
  content: { padding: "20px" },
  vendorInfo: { display: "flex", gap: "16px", padding: "16px", background: "#FDF0F3", borderRadius: "16px", marginBottom: "20px" },
  vendorImage: { width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover" },
  vendorName: { fontSize: "16px", fontWeight: 600, marginBottom: "4px" },
  vendorService: { fontSize: "12px", color: "#E77291", marginBottom: "4px" },
  vendorPrice: { fontSize: "14px", fontWeight: 600, color: "#AC1634" },
  form: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "13px", fontWeight: 600, color: "#3E0014", display: "flex", alignItems: "center", gap: "6px" },
  input: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  textarea: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none", resize: "vertical" },
  actions: { display: "flex", gap: "12px" },
  cancelBtn: { flex: 1, padding: "14px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "14px", fontWeight: 600 },
  submitBtn: { flex: 2, padding: "14px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  note: { fontSize: "11px", color: "#999", textAlign: "center", marginTop: "16px" }
};