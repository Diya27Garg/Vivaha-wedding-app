import { useState } from "react";
import { X, Calendar, Users, DollarSign, MessageCircle, Send } from "lucide-react";

export default function BookingRequestModal({ vendor, onClose, onSubmit }) {
  const [requirements, setRequirements] = useState({
    eventDate: "",
    guestCount: "",
    budget: "",
    specialRequests: "",
    contactNumber: ""
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(62,0,20,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "28px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflow: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #F5D0DA",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px",
              color: "#3E0014",
              margin: 0
            }}
          >
            Book {vendor?.name}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "16px",
              padding: "16px",
              background: "#FDF0F3",
              borderRadius: "16px",
              marginBottom: "20px"
            }}
          >
            <img
              src={vendor?.image}
              alt={vendor?.name}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "12px",
                objectFit: "cover"
              }}
            />
            <div>
              <p style={{ fontWeight: 600, marginBottom: "4px" }}>{vendor?.name}</p>
              <p style={{ fontSize: "12px", color: "#E77291" }}>{vendor?.category}</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#AC1634" }}>
                {vendor?.price}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#3E0014",
                  marginBottom: "6px",
                  display: "block"
                }}
              >
                <Calendar size={14} /> Event Date *
              </label>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #F5D0DA",
                  fontSize: "14px"
                }}
                value={requirements.eventDate}
                onChange={(e) =>
                  setRequirements({ ...requirements, eventDate: e.target.value })
                }
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#3E0014",
                  marginBottom: "6px",
                  display: "block"
                }}
              >
                <Users size={14} /> Expected Guests *
              </label>
              <input
                type="number"
                placeholder="e.g., 200"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #F5D0DA",
                  fontSize: "14px"
                }}
                value={requirements.guestCount}
                onChange={(e) =>
                  setRequirements({ ...requirements, guestCount: e.target.value })
                }
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#3E0014",
                  marginBottom: "6px",
                  display: "block"
                }}
              >
                <DollarSign size={14} /> Budget Range
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #F5D0DA",
                  fontSize: "14px"
                }}
                value={requirements.budget}
                onChange={(e) =>
                  setRequirements({ ...requirements, budget: e.target.value })
                }
              >
                <option value="">Select budget range</option>
                <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                <option value="1L-2L">₹1,00,000 - ₹2,00,000</option>
                <option value="2L-3L">₹2,00,000 - ₹3,00,000</option>
                <option value="3L+">₹3,00,000+</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#3E0014",
                  marginBottom: "6px",
                  display: "block"
                }}
              >
                <MessageCircle size={14} /> Special Requests
              </label>
              <textarea
                rows="3"
                placeholder="Any specific requirements..."
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #F5D0DA",
                  fontSize: "14px"
                }}
                value={requirements.specialRequests}
                onChange={(e) =>
                  setRequirements({ ...requirements, specialRequests: e.target.value })
                }
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#3E0014",
                  marginBottom: "6px",
                  display: "block"
                }}
              >
                Contact Number *
              </label>
              <input
                type="tel"
                placeholder="Your phone number"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #F5D0DA",
                  fontSize: "14px"
                }}
                value={requirements.contactNumber}
                onChange={(e) =>
                  setRequirements({ ...requirements, contactNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "999px",
                border: "1px solid #F5D0DA",
                background: "white",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                flex: 2,
                padding: "14px",
                borderRadius: "999px",
                border: "none",
                background: "#AC1634",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              {submitting ? "Sending..." : <><Send size={16} /> Send Request</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}