import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Home, ClipboardList, Sparkles, Package, User, X, Heart } from "lucide-react";

const categories = ["All", "Decor", "Outfits", "Jewelry", "Makeup", "Venue"];
const sampleImages = [
  { id: 1, category: "Decor", title: "Floral Mandap", emoji: "🌸", bg: "#FDEEF3" },
  { id: 2, category: "Outfits", title: "Bridal Lehenga", emoji: "👗", bg: "#F3EEFF" },
  { id: 3, category: "Venue", title: "Palace Venue", emoji: "🏰", bg: "#EEF3FF" },
  { id: 4, category: "Jewelry", title: "Gold Necklace", emoji: "📿", bg: "#FFF8EE" },
  { id: 5, category: "Makeup", title: "Bridal Glow", emoji: "✨", bg: "#FFF0EE" },
  { id: 6, category: "Decor", title: "Fairy Lights", emoji: "🌟", bg: "#FFFBEE" },
  { id: 7, category: "Outfits", title: "Groom Sherwani", emoji: "🤵", bg: "#EEFFF5" },
  { id: 8, category: "Venue", title: "Beach Wedding", emoji: "🌊", bg: "#EEF8FF" },
  { id: 9, category: "Jewelry", title: "Diamond Ring", emoji: "💍", bg: "#FDEEF3" },
  { id: 10, category: "Makeup", title: "Smokey Eyes", emoji: "💄", bg: "#F5EEFD" },
];

const realWeddings = [
  { couple: "Riya & Arjun", city: "Udaipur", type: "Destination", emoji: "🏰" },
  { couple: "Meera & Karan", city: "Goa", type: "Beach", emoji: "🌊" },
  { couple: "Ananya & Rohan", city: "Jaipur", type: "Traditional", emoji: "🐘" },
];

export default function InspirationBoard() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState([]);
  const [newBoard, setNewBoard] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState(["My Dream Wedding", "Decor Ideas"]);

  const navItems = [
    { icon: <Home size={20} strokeWidth={1.5} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} strokeWidth={1.5} />, label: "Package", path: "/package" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Profile", path: "/profile" },
  ];

  const filtered = activeCategory === "All" ? sampleImages : sampleImages.filter(i => i.category === activeCategory);
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const addBoard = () => {
    if (boardName.trim()) { setBoards(b => [...b, boardName.trim()]); setBoardName(""); setNewBoard(false); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" }}>

      <div style={{
        background: "#3E0014", padding: "20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0
      }}>
        <button onClick={() => navigate("/home")} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "8px", borderRadius: 10
        }}>
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#FFFFFF", fontSize: 24 }}>
          Inspiration
        </h1>
        <button onClick={() => setNewBoard(true)} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex",
          padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500,
          alignItems: "center", gap: 4
        }}>
          <Plus size={14} strokeWidth={2} /> Board
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>

        {/* My Boards */}
        <p style={{ fontSize: 11, color: "#AC1634", fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>MY BOARDS</p>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16 }}>
          {boards.map(b => (
            <div key={b} style={{
              background: "#3E0014", borderRadius: 14, padding: "10px 18px",
              color: "#E77291", fontSize: 13, fontWeight: 500,
              whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0
            }}>{b}</div>
          ))}
          <div onClick={() => setNewBoard(true)} style={{
            background: "white", border: "1.5px dashed #F5D0DA",
            borderRadius: 14, padding: "10px 18px",
            color: "#AC1634", fontSize: 13, fontWeight: 500,
            whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0,
            display: "flex", alignItems: "center", gap: 6
          }}>
            <Plus size={14} strokeWidth={2} /> New
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{
              padding: "8px 18px", borderRadius: 999,
              border: `1.5px solid ${activeCategory === c ? "#3E0014" : "#F5D0DA"}`,
              background: activeCategory === c ? "#3E0014" : "white",
              color: activeCategory === c ? "white" : "#7A5560",
              fontWeight: 500, fontSize: 13, cursor: "pointer", flexShrink: 0
            }}>{c}</button>
          ))}
        </div>

        {/* Image Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {filtered.map(img => (
            <div key={img.id} style={{
              background: img.bg, borderRadius: 20, overflow: "hidden",
              boxShadow: "0 2px 12px rgba(62,0,20,0.08)",
              border: "1px solid #F5D0DA", position: "relative"
            }}>
              <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>
                {img.emoji}
              </div>
              <div style={{ padding: "10px 14px 14px" }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: "#1A1A1A" }}>{img.title}</p>
                <p style={{ fontSize: 10, color: "#AC1634", marginTop: 3, letterSpacing: 1, fontWeight: 600 }}>
                  {img.category.toUpperCase()}
                </p>
              </div>
              <button onClick={() => toggleSave(img.id)} style={{
                position: "absolute", top: 10, right: 10,
                background: "rgba(255,255,255,0.9)", border: "none",
                borderRadius: "50%", width: 32, height: 32, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <Heart size={14} fill={saved.includes(img.id) ? "#AC1634" : "none"} color="#AC1634" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Real Weddings */}
        <p style={{ fontSize: 11, color: "#AC1634", fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>
          REAL WEDDINGS
        </p>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {realWeddings.map(w => (
            <div key={w.couple} style={{
              background: "white", borderRadius: 18, padding: "18px",
              minWidth: 155, flexShrink: 0,
              boxShadow: "0 2px 12px rgba(62,0,20,0.07)",
              border: "1px solid #F5D0DA"
            }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{w.emoji}</div>
              <p style={{ fontWeight: 600, color: "#3E0014", fontSize: 13, fontFamily: "'DM Serif Display', serif" }}>
                {w.couple}
              </p>
              <p style={{ color: "#7A5560", fontSize: 11, marginTop: 4 }}>{w.city} · {w.type}</p>
            </div>
          ))}
        </div>
      </div>

      {newBoard && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)",
          display: "flex", alignItems: "flex-end", zIndex: 999
        }}>
          <div style={{
            background: "white", width: "100%", maxWidth: 430, margin: "0 auto",
            borderRadius: "24px 24px 0 0", padding: "28px 20px"
          }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 22, marginBottom: 20 }}>
              Create New Board
            </h3>
            <input value={boardName} onChange={e => setBoardName(e.target.value)}
              placeholder="e.g. Decor Ideas, Outfit Inspo..."
              style={{
                width: "100%", padding: "14px 16px",
                border: "1.5px solid #F5D0DA", borderRadius: 14,
                fontSize: 15, outline: "none", marginBottom: 16,
                fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A"
              }} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setNewBoard(false)} style={{
                flex: 1, padding: "13px", background: "#FDF0F3",
                color: "#AC1634", border: "1px solid #F5D0DA",
                borderRadius: 999, fontWeight: 600, cursor: "pointer"
              }}>Cancel</button>
              <button onClick={addBoard} style={{
                flex: 2, padding: "13px", background: "#3E0014",
                color: "white", border: "none", borderRadius: 999,
                fontWeight: 600, cursor: "pointer"
              }}>Create Board</button>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-nav">
        {navItems.map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 5, background: "none", border: "none", cursor: "pointer",
            color: window.location.pathname === n.path ? "#AC1634" : "#CCBBBB"
          }}>
            {n.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}