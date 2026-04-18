import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, MessageCircle, Home, ClipboardList,
  Sparkles, Package, User, LogOut, Star,
  Copy, Check, Crown, Lock, Calendar, MapPin, Wallet,
  Heart, Clock, Leaf, Brain, Palette, DollarSign
} from "lucide-react";

const vendors = [
  {
    id: 1, name: "Glam by Priya", service: "Makeup Artist",
    price: "₹45,000", rating: "5.0",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    tag: "Top Rated"
  },
  {
    id: 2, name: "Lens & Love Studio", service: "Photography",
    price: "₹85,000", rating: "4.9",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80",
    tag: "Most Booked"
  },
  {
    id: 3, name: "Royal Blooms Decor", service: "Decoration",
    price: "₹1,20,000", rating: "4.8",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
    tag: "Premium"
  },
  {
    id: 4, name: "Grand Feast Caterers", service: "Catering",
    price: "₹1,80,000", rating: "4.7",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80",
    tag: "New"
  },
  {
    id: 5, name: "Beat Masters DJ", service: "Music & DJ",
    price: "₹60,000", rating: "4.6",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80",
    tag: "Popular"
  },
  {
    id: 6, name: "Dream Venues", service: "Venue",
    price: "₹5,00,000", rating: "4.9",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
    tag: "Luxury"
  },
];

const premiumBenefits = [
  { icon: "✦", text: "Unlock all live vendor offers" },
  { icon: "✦", text: "AI-powered wedding timeline" },
  { icon: "✦", text: "Priority vendor booking" },
  { icon: "✦", text: "Dedicated wedding coordinator" },
  { icon: "✦", text: "Exclusive Power Pair deals" },
  { icon: "✦", text: "Budget tracking & alerts" },
];

// Animated Countdown Component with Celebration Popup
const WeddingCountdown = ({ targetDate = "2025-12-15" }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [tipOfDay, setTipOfDay] = useState(null);

  const tips = [
    { tip: "Book your venue at least 8-10 months in advance for best dates!", category: "Venue" },
    { tip: "Start your wedding website early to share updates with guests!", category: "Planning" },
    { tip: "Negotiate with vendors - everything is negotiable!", category: "Budget" },
    { tip: "Take a 10-minute break daily to avoid wedding planning stress!", category: "Wellness" },
    { tip: "Use digital invitations to save paper and money!", category: "Sustainability" },
    { tip: "Hire a day-of coordinator to enjoy your special day!", category: "Planning" },
  ];

  useEffect(() => {
    const target = new Date(targetDate);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (86400000)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (3600000)) / (1000 * 60)),
        seconds: Math.floor((difference % (60000)) / 1000)
      });
    }, 1000);
    
    setTipOfDay(tips[Math.floor(Math.random() * tips.length)]);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      {showCelebration && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(62,0,20,0.95)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 2000
        }}>
          <div style={{
            background: "linear-gradient(135deg, #AC1634, #3E0014)",
            borderRadius: "48px", padding: "48px 32px", textAlign: "center",
            maxWidth: "90%", width: "400px"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎉✨🎊💫🎉</div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", color: "white", marginBottom: "16px" }}>Congratulations! 🎉</h1>
            <p style={{ fontSize: "18px", color: "#E77291", marginBottom: "16px" }}>Your wedding day has arrived!</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }}>May your journey together be filled with love, laughter, and happiness forever 💑</p>
            <button onClick={() => setShowCelebration(false)} style={{
              padding: "12px 24px", background: "#E77291", border: "none",
              borderRadius: "999px", color: "#3E0014", fontWeight: 600, cursor: "pointer"
            }}>Continue Planning →</button>
          </div>
        </div>
      )}

      <div style={{
        background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)",
        borderRadius: "24px", padding: "24px", marginBottom: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
          <Clock size={16} color="#E77291" />
          <span style={{ color: "#E77291", fontSize: "10px", letterSpacing: "3px", fontWeight: 600 }}>COUNTDOWN TO YOUR BIG DAY</span>
        </div>
        
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "72px", fontWeight: 700, color: "white" }}>{timeLeft.days}</div>
          <div style={{ fontSize: "12px", color: "#E77291", letterSpacing: "4px", marginTop: "8px" }}>DAYS LEFT</div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "24px" }}>
          {[
            { value: String(timeLeft.hours).padStart(2, '0'), label: "Hours" },
            { value: String(timeLeft.minutes).padStart(2, '0'), label: "Minutes" },
            { value: String(timeLeft.seconds).padStart(2, '0'), label: "Seconds" }
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "28px", fontWeight: 700, color: "white" }}>{item.value}</span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
            </div>
          ))}
        </div>

        <div 
          onClick={() => setScratched(true)}
          style={{
            background: "rgba(255,255,255,0.1)", borderRadius: "16px",
            padding: "16px", cursor: "pointer", transition: "all 0.3s ease"
          }}
        >
          {!scratched ? (
            <div style={{ textAlign: "center", padding: "12px" }}>
              <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🎁</span>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#E77291", marginBottom: "4px" }}>Scratch for Wedding Tip!</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Tap to reveal</p>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "28px" }}>💡</span>
              <div>
                <p style={{ fontSize: "10px", color: "#E77291", fontWeight: 600, marginBottom: "4px" }}>{tipOfDay?.category}</p>
                <p style={{ fontSize: "13px", color: "white", lineHeight: 1.4, margin: 0 }}>{tipOfDay?.tip}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function CoupleDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [loveCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const isPremium = user?.premium || false;
  const weddingDate = user?.weddingDetails?.weddingDate || user?.weddingDate || "2025-12-15";

  const inviteUrl = `https://vivaha.app/join?code=${loveCode}`;
  const inviteMessage = `💍 Hey! I'm planning our wedding on Vivaha. Join me using our Love Code: ${loveCode} or click here: ${inviteUrl}`;

  const copyCode = () => {
    navigator.clipboard.writeText(loveCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(inviteMessage);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} />, label: "Package", path: "/package" },
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
  ];

  const menuItems = [
    { icon: "💌", label: "Invitation Designer", path: "/invitation-design" },
    { icon: "💰", label: "Budget Planner", path: "/budget-planner" },
    { icon: "🧘", label: "Emotional Wellness", path: "/wellness" },
    { icon: "🌿", label: "Sustainable Wedding", path: "/sustainability" },
    { icon: "🤖", label: "AI Wedding Assistant", path: "/ai-assistant" },
  ];

  return (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: "100vh",
      background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: "#3E0014", padding: "18px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <button onClick={() => setMenuOpen(true)} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "10px", borderRadius: 12
        }}>
          <Menu size={20} />
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#FFFFFF", fontSize: 28 }}>
          Vivaha
        </h1>
        <button onClick={() => navigate("/messages")} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "10px", borderRadius: 12
        }}>
          <MessageCircle size={20} />
        </button>
      </div>

      {/* Hamburger Menu */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", zIndex: 998 }} />
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 300,
            background: "#3E0014", zIndex: 999, padding: "36px 24px",
            display: "flex", flexDirection: "column", overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#FFFFFF", fontSize: 28 }}>Vivaha</h2>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "#E77291", cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>

            {navItems.map(n => (
              <div key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                color: "#FFFFFF", fontSize: 15, marginBottom: 4,
                background: "rgba(231,114,145,0.08)"
              }}>
                <span style={{ color: "#E77291" }}>{n.icon}</span>
                {n.label}
              </div>
            ))}

            <div style={{ height: "1px", background: "rgba(231,114,145,0.2)", margin: "16px 0" }} />
            
            <p style={{ color: "#E77291", fontSize: "11px", letterSpacing: "1px", marginBottom: 12, paddingLeft: "16px" }}>
              WEDDING TOOLS
            </p>
            
            {menuItems.map(item => (
              <div key={item.path} onClick={() => { navigate(item.path); setMenuOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                color: "#FFFFFF", fontSize: 15, marginBottom: 4,
                background: "rgba(231,114,145,0.05)"
              }}>
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                {item.label}
              </div>
            ))}

            <div style={{ marginTop: "auto", paddingTop: "20px" }}>
              <div onClick={() => { setUser(null); navigate("/"); }} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                color: "#E77291", fontSize: 15
              }}>
                <LogOut size={20} /> Logout
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 20px" }}>
        {/* Hero Section */}
        <div style={{
          background: "linear-gradient(160deg, #3E0014 0%, #7A002B 60%, #AC1634 100%)",
          padding: "32px 24px", borderRadius: "24px", marginTop: "20px", marginBottom: "20px",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(231,114,145,0.06)" }} />
          
          <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>YOUR WEDDING</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 32, marginBottom: 24, lineHeight: 1.2 }}>
            Welcome, {user?.name || "Guest"} 💍
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
            {[
              [<Calendar size={14} />, "Wedding Date", weddingDate !== "2025-12-15" ? weddingDate : "Set in Profile"],
              [<MapPin size={14} />, "City", user?.weddingDetails?.city || user?.city || "Set in Profile"],
              [<Wallet size={14} />, "Budget", user?.weddingDetails?.budget || user?.budget || "Set in Profile"],
            ].map(([icon, label, val]) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.08)", borderRadius: 12,
                padding: "12px 16px", border: "1px solid rgba(255,255,255,0.08)"
              }}>
                <span style={{ color: "#E77291" }}>{icon}</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, flex: 1 }}>{label}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setInviteOpen(true)} style={{
            width: "100%", padding: "14px", background: "rgba(231,114,145,0.15)",
            border: "1.5px dashed #E77291", color: "#E77291", borderRadius: 14,
            fontSize: 14, cursor: "pointer", fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            💌 Invite your Fiancé to plan together
          </button>
        </div>

        {/* Countdown */}
        <WeddingCountdown targetDate={weddingDate} />

        {/* Vendor Offers */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 24 }}>Live Vendor Offers</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {!isPremium && (
                <span style={{ background: "#FDF0F3", border: "1px solid #F5D0DA", color: "#AC1634", fontSize: 10, padding: "4px 10px", borderRadius: 99, fontWeight: 600 }}>
                  UNLOCK WITH PREMIUM
                </span>
              )}
              <span style={{ background: "#AC1634", color: "white", fontSize: 10, padding: "4px 12px", borderRadius: 99, fontWeight: 600 }}>LIVE</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {vendors.map((v, i) => (
              <div key={v.id} style={{
                background: "white", borderRadius: 20, overflow: "hidden",
                boxShadow: "0 4px 16px rgba(62,0,20,0.08)", border: "1px solid #F5D0DA",
                position: "relative", filter: !isPremium && i > 1 ? "blur(4px)" : "none",
                cursor: !isPremium && i > 1 ? "not-allowed" : "pointer",
                transition: "transform 0.2s"
              }} onClick={() => !isPremium && i > 1 ? navigate("/premium") : navigate("/package")}>
                <div style={{ position: "relative", height: 140 }}>
                  <img src={v.image} alt={v.service} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,0,20,0.6), transparent)" }} />
                  <span style={{
                    position: "absolute", top: 10, left: 10,
                    background: "rgba(62,0,20,0.8)", color: "#E77291",
                    fontSize: 10, padding: "4px 10px", borderRadius: 99, fontWeight: 600
                  }}>{v.tag}</span>
                </div>
                <div style={{ padding: "14px" }}>
                  <p style={{ fontWeight: 600, color: "#3E0014", fontSize: 15, marginBottom: 4 }}>{v.name}</p>
                  <p style={{ color: "#7A5560", fontSize: 12, marginBottom: 8 }}>{v.service}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#AC1634", fontWeight: 700, fontSize: 15 }}>{v.price}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={12} fill="#E77291" color="#E77291" />
                      <p style={{ color: "#3E0014", fontWeight: 600, fontSize: 12 }}>{v.rating}</p>
                    </div>
                  </div>
                </div>
                {!isPremium && i > 1 && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)" }}>
                    <Lock size={24} color="#AC1634" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isPremium && (
            <button onClick={() => navigate("/premium")} style={{
              width: "100%", marginTop: 16, padding: "14px",
              background: "linear-gradient(135deg, #AC1634, #3E0014)",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}>
              <Crown size={16} /> Unlock All Vendors with Premium
            </button>
          )}
        </div>

        {/* Premium Card */}
        {!isPremium && (
          <div style={{
            background: "linear-gradient(160deg, #3E0014, #7A002B)",
            borderRadius: 24, padding: "28px", boxShadow: "0 8px 32px rgba(62,0,20,0.3)",
            marginBottom: 20, position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(231,114,145,0.06)" }} />
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Crown size={18} color="#E77291" />
              <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>VIVAHA PREMIUM</p>
            </div>

            <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 24, marginBottom: 20, lineHeight: 1.3 }}>
              Your complete wedding concierge experience
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
              {premiumBenefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#E77291", fontSize: 12 }}>{b.icon}</span>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{b.text}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 4 }}>One-time plan</p>
                <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 32 }}>₹10,000</p>
              </div>
              <button onClick={() => navigate("/premium")} style={{
                padding: "14px 32px", background: "#E77291", color: "white",
                border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(231,114,145,0.4)"
              }}>
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {inviteOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 999 }}>
          <div style={{
            background: "white", width: "100%", maxWidth: 500,
            borderRadius: "28px 28px 0 0", padding: "32px 24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 24 }}>Invite your Fiancé 💍</h3>
              <button onClick={() => setInviteOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#AC1634" }}>
                <X size={24} />
              </button>
            </div>

            <p style={{ color: "#7A5560", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Share your unique Love Code or invite link so your fiancé can join and plan together with you!
            </p>

            <div style={{ background: "#FDF0F3", border: "1.5px solid #F5D0DA", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
              <p style={{ color: "#AC1634", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>YOUR LOVE CODE</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 32, letterSpacing: 6 }}>{loveCode}</p>
                <button onClick={copyCode} style={{
                  background: codeCopied ? "#3E0014" : "white", border: "1.5px solid #F5D0DA",
                  borderRadius: 12, padding: "10px 18px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  color: codeCopied ? "white" : "#AC1634", fontSize: 13, fontWeight: 600
                }}>
                  {codeCopied ? <Check size={14} /> : <Copy size={14} />}
                  {codeCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <button onClick={copyUrl} style={{
              width: "100%", padding: "14px", background: urlCopied ? "#3E0014" : "linear-gradient(135deg, #AC1634, #3E0014)",
              color: "white", border: "none", borderRadius: 999, fontSize: 14,
              fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, marginBottom: 12
            }}>
              {urlCopied ? <Check size={16} /> : <Copy size={16} />}
              {urlCopied ? "Message Copied! Send it to your Fiancé" : "Copy Invite Message"}
            </button>

            <p style={{ color: "#7A5560", fontSize: 12, textAlign: "center", lineHeight: 1.5 }}>
              Your fiancé can enter this code at vivaha.app/join to connect with your wedding plan
            </p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid #F5D0DA",
        padding: "10px 20px", display: "flex", justifyContent: "space-around",
        zIndex: 100, maxWidth: "1200px", margin: "0 auto"
      }}>
        {navItems.map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 4, background: "none", border: "none", cursor: "pointer",
            color: window.location.pathname === n.path ? "#AC1634" : "#CCBBBB",
            fontSize: 10, fontWeight: 500
          }}>
            {n.icon}
            <span>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}