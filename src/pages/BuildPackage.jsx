import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Home, ClipboardList, Sparkles, Package, User, Star, X, Zap, Target, Trophy } from "lucide-react";

const powerPairs = [
  { id: 1, title: "Photography + Cinematography", vendors: ["Lens & Love Studio", "Golden Hour Films"], price: "₹1,50,000", saving: "Save ₹20,000" },
  { id: 2, title: "Decor + Lighting", vendors: ["Royal Blooms Decor", "Luminary Events"], price: "₹2,00,000", saving: "Save ₹30,000" },
  { id: 3, title: "Makeup + Mehendi", vendors: ["Glam by Priya", "Henna Art Studio"], price: "₹80,000", saving: "Save ₹10,000" },
  { id: 4, title: "Catering + Music/DJ", vendors: ["Royal Feast Caterers", "Beat Masters DJ"], price: "₹2,50,000", saving: "Save ₹25,000" },
];

const soloVendors = [
  { id: 1, name: "Lens & Love Studio", category: "Photography", price: "₹85,000", rating: "4.9" },
  { id: 2, name: "Royal Blooms Decor", category: "Decoration", price: "₹1,20,000", rating: "4.8" },
  { id: 3, name: "Glam by Priya", category: "Makeup", price: "₹45,000", rating: "5.0" },
  { id: 4, name: "Taj Mahal Palace", category: "Venue", price: "₹5,00,000", rating: "4.7" },
  { id: 5, name: "Beat Masters DJ", category: "Music/DJ", price: "₹60,000", rating: "4.6" },
  { id: 6, name: "Royal Feast", category: "Catering", price: "₹1,80,000", rating: "4.8" },
];

const cats = ["All", "Photography", "Decoration", "Makeup", "Venue", "Catering"];

export default function BuildPackage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("pairs");
  const [myPackage, setMyPackage] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [panelOpen, setPanelOpen] = useState(false);

  const navItems = [
    { icon: <Home size={20} strokeWidth={1.5} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} strokeWidth={1.5} />, label: "Package", path: "/package" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Profile", path: "/profile" },
  ];

  const addToPackage = (item) => {
    if (!myPackage.find(p => p.id === item.id && p.type === item.type))
      setMyPackage(p => [...p, item]);
  };
  const removeFromPackage = (id, type) => setMyPackage(p => p.filter(x => !(x.id === id && x.type === type)));
  const totalCost = myPackage.reduce((sum, item) => sum + parseInt(item.price.replace(/[₹,]/g, "")), 0);
  const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");
  const filteredSolo = soloVendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || v.category === filterCat;
    return matchSearch && matchCat;
  });

  const tabs = [
    { key: "pairs", label: "Power Pairs", icon: <Zap size={13} strokeWidth={1.5} /> },
    { key: "solo", label: "Solo Experts", icon: <Target size={13} strokeWidth={1.5} /> },
    { key: "top", label: "Top Vendors", icon: <Trophy size={13} strokeWidth={1.5} /> },
  ];

  const isAdded = (id, type) => myPackage.find(p => p.id === id && p.type === type);

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
          Build Package
        </h1>
        <button onClick={() => setPanelOpen(true)} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex",
          padding: "8px 14px", borderRadius: 10, fontSize: 13,
          alignItems: "center", gap: 6
        }}>
          <ShoppingBag size={16} strokeWidth={1.5} />
          {myPackage.length > 0 && <span style={{ fontWeight: 700 }}>{myPackage.length}</span>}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#FFFFFF", borderBottom: "2px solid #F5D0DA", flexShrink: 0 }}>
        {tabs.map(({ key, label, icon }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, padding: "14px 4px", border: "none", background: "none",
            color: tab === key ? "#3E0014" : "#BBAAAA",
            fontWeight: tab === key ? 600 : 400, fontSize: 12, cursor: "pointer",
            borderBottom: tab === key ? "2px solid #3E0014" : "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {icon} {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

        {tab === "pairs" && powerPairs.map(pair => (
          <div key={pair.id} style={{
            background: "#FFFFFF", borderRadius: 20, padding: "20px",
            marginBottom: 14, boxShadow: "0 4px 16px rgba(62,0,20,0.07)",
            border: "1px solid #F5D0DA"
          }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 17, marginBottom: 10 }}>
              {pair.title}
            </p>
            {pair.vendors.map(v => (
              <p key={v} style={{ color: "#7A5560", fontSize: 13, marginBottom: 4 }}>· {v}</p>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, marginBottom: 16 }}>
              <p style={{ color: "#3E0014", fontWeight: 700, fontSize: 18, fontFamily: "'DM Serif Display', serif" }}>
                {pair.price}
              </p>
              <span style={{
                background: "#F0FFF4", color: "#2E7D32",
                fontSize: 11, padding: "4px 12px", borderRadius: 99, fontWeight: 600
              }}>{pair.saving}</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                flex: 1, padding: "11px", background: "#FDF0F3",
                color: "#AC1634", border: "1px solid #F5D0DA",
                borderRadius: 999, fontWeight: 500, fontSize: 13, cursor: "pointer"
              }}>View Details</button>
              <button onClick={() => addToPackage({ ...pair, type: "pair" })} style={{
                flex: 1, padding: "11px",
                background: isAdded(pair.id, "pair") ? "#7A002B" : "#3E0014",
                color: "white", border: "none", borderRadius: 999,
                fontWeight: 600, fontSize: 13, cursor: "pointer"
              }}>{isAdded(pair.id, "pair") ? "✓ Added" : "+ Add"}</button>
            </div>
          </div>
        ))}

        {tab === "solo" && (
          <div>
            <div style={{
              background: "white", borderRadius: 14, padding: "12px 16px",
              border: "1.5px solid #F5D0DA", marginBottom: 14,
              display: "flex", alignItems: "center"
            }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search vendors..."
                style={{
                  flex: 1, border: "none", outline: "none", fontSize: 14,
                  color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif", background: "transparent"
                }} />
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
              {cats.map(c => (
                <button key={c} onClick={() => setFilterCat(c)} style={{
                  padding: "7px 16px", borderRadius: 999,
                  border: `1.5px solid ${filterCat === c ? "#3E0014" : "#F5D0DA"}`,
                  background: filterCat === c ? "#3E0014" : "white",
                  color: filterCat === c ? "white" : "#7A5560",
                  fontWeight: 500, fontSize: 12, cursor: "pointer", flexShrink: 0
                }}>{c}</button>
              ))}
            </div>
            {filteredSolo.map(v => (
              <div key={v.id} style={{
                background: "white", borderRadius: 18, padding: "18px",
                marginBottom: 12, boxShadow: "0 2px 12px rgba(62,0,20,0.06)",
                border: "1px solid #F5D0DA",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <p style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 15 }}>{v.name}</p>
                  <p style={{ color: "#7A5560", fontSize: 12, marginTop: 3 }}>{v.category}</p>
                  <p style={{ color: "#3E0014", fontWeight: 700, fontSize: 15, marginTop: 8, fontFamily: "'DM Serif Display', serif" }}>{v.price}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", marginBottom: 10 }}>
                    <Star size={12} fill="#E77291" color="#E77291" />
                    <p style={{ color: "#3E0014", fontWeight: 600, fontSize: 13 }}>{v.rating}</p>
                  </div>
                  <button onClick={() => addToPackage({ ...v, type: "solo" })} style={{
                    padding: "8px 18px",
                    background: isAdded(v.id, "solo") ? "#7A002B" : "#3E0014",
                    color: "white", border: "none", borderRadius: 999,
                    fontSize: 12, cursor: "pointer", fontWeight: 500
                  }}>{isAdded(v.id, "solo") ? "✓" : "+ Add"}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "top" && soloVendors.map((v, i) => (
          <div key={v.id} style={{
            background: "white", borderRadius: 18, padding: "18px",
            marginBottom: 12, boxShadow: "0 2px 12px rgba(62,0,20,0.06)",
            border: "1px solid #F5D0DA",
            display: "flex", alignItems: "center", gap: 14
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
              background: i === 0 ? "#3E0014" : i === 1 ? "#7A002B" : i === 2 ? "#AC1634" : "#FDF0F3",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, color: i < 3 ? "white" : "#AC1634", fontSize: 13
            }}>#{i + 1}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 15 }}>{v.name}</p>
              <p style={{ color: "#7A5560", fontSize: 12, marginTop: 3 }}>{v.category}</p>
              <p style={{ color: "#3E0014", fontWeight: 700, fontSize: 14, marginTop: 6, fontFamily: "'DM Serif Display', serif" }}>{v.price}</p>
            </div>
            <button onClick={() => addToPackage({ ...v, type: "top" })} style={{
              padding: "9px 16px",
              background: isAdded(v.id, "top") ? "#7A002B" : "#3E0014",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 12, cursor: "pointer", fontWeight: 500
            }}>{isAdded(v.id, "top") ? "✓" : "+ Add"}</button>
          </div>
        ))}
      </div>

      {myPackage.length > 0 && (
        <div style={{
          background: "linear-gradient(135deg, #3E0014, #7A002B)",
          padding: "16px 20px", display: "flex", justifyContent: "space-between",
          alignItems: "center", flexShrink: 0
        }}>
          <div>
            <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 1 }}>
              {myPackage.length} VENDOR{myPackage.length > 1 ? "S" : ""}
            </p>
            <p style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 20, fontFamily: "'DM Serif Display', serif" }}>
              {formatPrice(totalCost)}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setPanelOpen(true)} style={{
              padding: "10px 18px", background: "rgba(255,255,255,0.15)",
              color: "white", border: "1px solid rgba(231,114,145,0.4)",
              borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer"
            }}>View</button>
            <button style={{
              padding: "10px 22px", background: "#E77291",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 13, fontWeight: 700, cursor: "pointer"
            }}>Save</button>
          </div>
        </div>
      )}

      {panelOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)",
          display: "flex", alignItems: "flex-end", zIndex: 999
        }}>
          <div style={{
            background: "white", width: "100%", maxWidth: 430, margin: "0 auto",
            borderRadius: "24px 24px 0 0", padding: "28px 20px",
            maxHeight: "70vh", overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 22 }}>My Package</h3>
              <button onClick={() => setPanelOpen(false)} style={{
                background: "none", border: "none", cursor: "pointer", color: "#AC1634", display: "flex"
              }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            {myPackage.length === 0
              ? <p style={{ color: "#999", textAlign: "center", padding: "20px 0" }}>No vendors added yet</p>
              : myPackage.map(item => (
                <div key={`${item.type}-${item.id}`} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 0", borderBottom: "1px solid #F5D0DA"
                }}>
                  <div>
                    <p style={{ fontWeight: 600, color: "#1A1A1A", fontSize: 14 }}>{item.name || item.title}</p>
                    <p style={{ color: "#7A5560", fontSize: 12, marginTop: 2 }}>{item.category || "Power Pair"}</p>
                    <p style={{ color: "#3E0014", fontWeight: 700, fontSize: 14, marginTop: 4, fontFamily: "'DM Serif Display', serif" }}>{item.price}</p>
                  </div>
                  <button onClick={() => removeFromPackage(item.id, item.type)} style={{
                    background: "#FDF0F3", border: "1px solid #F5D0DA",
                    color: "#AC1634", borderRadius: 999, padding: "7px 14px",
                    fontSize: 12, fontWeight: 500, cursor: "pointer"
                  }}>Remove</button>
                </div>
              ))
            }
            {myPackage.length > 0 && (
              <>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "18px 0", borderTop: "2px solid #F5D0DA", marginTop: 8
                }}>
                  <p style={{ fontWeight: 600, color: "#3E0014", fontSize: 15 }}>Total Estimate</p>
                  <p style={{ fontWeight: 700, color: "#3E0014", fontSize: 22, fontFamily: "'DM Serif Display', serif" }}>
                    {formatPrice(totalCost)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{
                    flex: 1, padding: "14px", background: "#FDF0F3",
                    color: "#AC1634", border: "1px solid #F5D0DA",
                    borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: "pointer"
                  }}>Save Package</button>
                  <button style={{
                    flex: 1, padding: "14px", background: "#3E0014",
                    color: "white", border: "none", borderRadius: 999,
                    fontWeight: 600, fontSize: 14, cursor: "pointer"
                  }}>Request Coordination</button>
                </div>
              </>
            )}
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