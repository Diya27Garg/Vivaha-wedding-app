import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const weddings = [
  {
    id: 1,
    couple: "Riya & Arjun",
    date: "December 2024",
    city: "Udaipur",
    type: "Destination",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    story: "Riya and Arjun planned their dream lakeside wedding in just 3 months using Vivaha. From finding their royal palace venue to booking a Power Pair of photographer and decorator — everything was coordinated in one place. Vivaha's AI assistant even reminded them of every milestone on time.",
  },
  {
    id: 2,
    couple: "Meera & Karan",
    date: "February 2025",
    city: "Goa",
    type: "Beach Wedding",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
    story: "Meera and Karan wanted an intimate beach wedding but had no idea where to start. Vivaha's Build Package feature helped them assemble the perfect vendor team — a boho decorator, sunset photographer, and live music duo — all within their ₹15L budget.",
  },
  {
    id: 3,
    couple: "Ananya & Rohan",
    date: "November 2024",
    city: "Jaipur",
    type: "Royal Traditional",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    story: "With 500 guests and a royal Rajasthani theme, Ananya and Rohan needed serious coordination. Vivaha's checklist kept 47 tasks on track, and the inspiration board helped them nail the marigold-and-gold aesthetic. Their vendor team was booked through Power Pairs in a single afternoon.",
  },
  {
    id: 4,
    couple: "Priya & Vikram",
    date: "January 2025",
    city: "Mumbai",
    type: "Rooftop Intimate",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    story: "Priya and Vikram chose a minimalist rooftop wedding for 80 guests. They used Vivaha to shortlist vendors, track their ₹12L budget, and coordinate with their fiancé in real time through the couple collaboration feature. The whole planning process took just 6 weeks.",
  },
  {
    id: 5,
    couple: "Simran & Aditya",
    date: "March 2025",
    city: "Delhi",
    type: "Garden Wedding",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
    story: "Simran and Aditya discovered their dream florist and makeup artist through Vivaha's Top Vendors section. The inspiration board helped them visualize their garden wedding aesthetic months before the event, and the AI assistant created a perfect 6-month timeline for them.",
  },
];

export default function RealWeddings() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [hoveredCouple, setHoveredCouple] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % weddings.length);
  const prev = () => goTo((current - 1 + weddings.length) % weddings.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const pauseAutoplay = () => clearInterval(intervalRef.current);
  const resumeAutoplay = () => {
    intervalRef.current = setInterval(next, 4000);
  };

  const w = weddings[current];

  return (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: "100vh",
      background: "#3B010B", fontFamily: "'DM Sans', sans-serif"
    }}>

      {/* Header */}
      <div style={{ padding: "32px 24px 16px", textAlign: "center" }}>
        <p style={{
          color: "#E77291", fontSize: 11, letterSpacing: 4,
          fontWeight: 600, marginBottom: 8
        }}>REAL WEDDINGS BY</p>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: "italic", color: "#FFFFFF",
          fontSize: 36, letterSpacing: 1
        }}>Vivaha</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 6 }}>
          Real couples. Real stories. Real magic.
        </p>
      </div>

      {/* Main Carousel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>

        {/* Image Card */}
        <div
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          style={{
            position: "relative", borderRadius: 28, overflow: "hidden",
            flex: 1, minHeight: 380,
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "scale(0.97)" : "scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
          }}
        >
          {/* Background Image */}
          <img
            src={w.image}
            alt={w.couple}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", position: "absolute", inset: 0
            }}
          />

          {/* Gradient Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(59,1,11,0.95) 0%, rgba(59,1,11,0.4) 50%, transparent 100%)"
          }} />

          {/* Left / Right arrows */}
          <button onClick={prev} style={{
            position: "absolute", left: 16, top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white", borderRadius: "50%",
            width: 40, height: 40, cursor: "pointer",
            fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)"
          }}>‹</button>

          <button onClick={next} style={{
            position: "absolute", right: 16, top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white", borderRadius: "50%",
            width: 40, height: 40, cursor: "pointer",
            fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)"
          }}>›</button>

          {/* Bottom Content */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 24px 28px"
          }}>
            {/* Type Badge */}
            <span style={{
              background: "rgba(231,114,145,0.25)",
              border: "1px solid #E77291",
              color: "#E77291", borderRadius: 999,
              padding: "4px 14px", fontSize: 11,
              fontWeight: 600, letterSpacing: 1,
              display: "inline-block", marginBottom: 10
            }}>{w.type}</span>

            {/* Couple Name — hoverable */}
            <div
              onMouseEnter={() => setHoveredCouple(w.id)}
              onMouseLeave={() => setHoveredCouple(null)}
              style={{ cursor: "default" }}
            >
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic", color: "#FFFFFF",
                fontSize: 32, lineHeight: 1.1, marginBottom: 6,
                borderBottom: hoveredCouple === w.id
                  ? "1px solid rgba(231,114,145,0.5)" : "1px solid transparent",
                display: "inline-block", paddingBottom: 2,
                transition: "border 0.2s"
              }}>{w.couple}</h2>
            </div>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              {w.date} · {w.city}
            </p>
          </div>
        </div>

        {/* Hover Story Card */}
        <div style={{
          background: hoveredCouple ? "rgba(255,255,255,0.06)" : "transparent",
          border: hoveredCouple ? "1px solid rgba(231,114,145,0.2)" : "1px solid transparent",
          borderRadius: 20, padding: hoveredCouple ? "18px 20px" : "0px 20px",
          marginTop: 12,
          maxHeight: hoveredCouple ? 200 : 0,
          overflow: "hidden",
          opacity: hoveredCouple ? 1 : 0,
          transition: "all 0.4s ease",
          backdropFilter: "blur(10px)"
        }}>
          <p style={{
            color: "#E77291", fontSize: 11,
            letterSpacing: 2, fontWeight: 600, marginBottom: 8
          }}>THEIR STORY</p>
          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: 14,
            lineHeight: 1.8, fontWeight: 300
          }}>{w.story}</p>
        </div>

        {/* Dot indicators + thumbnails */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 16, marginTop: 20, alignItems: "center"
        }}>
          {weddings.map((wed, i) => (
            <div
              key={wed.id}
              onClick={() => goTo(i)}
              style={{
                cursor: "pointer", transition: "all 0.3s ease",
                opacity: i === current ? 1 : 0.4,
                transform: i === current ? "scale(1.1)" : "scale(1)"
              }}
            >
              <img
                src={wed.image}
                alt={wed.couple}
                style={{
                  width: i === current ? 52 : 40,
                  height: i === current ? 52 : 40,
                  borderRadius: "50%", objectFit: "cover",
                  border: i === current
                    ? "2px solid #E77291" : "2px solid rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease"
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/role")}
          style={{
            width: "100%", marginTop: 24, padding: "16px",
            background: "linear-gradient(135deg, #AC1634, #3E0014)",
            color: "white", border: "none", borderRadius: 999,
            fontSize: 15, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 8px 24px rgba(172,22,52,0.4)",
            letterSpacing: 0.5
          }}>
          Start Planning Your Wedding →
        </button>

        <p style={{
          textAlign: "center", marginTop: 14,
          color: "rgba(255,255,255,0.35)", fontSize: 12
        }}>
          Join 10,000+ couples who planned with Vivaha
        </p>
      </div>
    </div>
  );
}