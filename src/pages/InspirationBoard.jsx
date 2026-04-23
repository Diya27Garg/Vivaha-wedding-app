// src/pages/InspirationBoard.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, Home, Calendar, Package, User, Plus, Search, 
  Image, Link2, X, Check, Grid3x3, List, Bookmark, Share2,
  Camera, Upload, Link, Edit2, Trash2, MoreVertical, Download, Eye, MapPin,
  Clock, Sparkles, Tag, Filter, Menu, LogOut, MessageCircle,
  Globe, Lock, Users, Star, Award, TrendingUp, ChevronRight,
  Calendar as CalendarIcon, Bell, Settings, Copy, ExternalLink, Video
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function InspirationBoard({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [activeBoard, setActiveBoard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [addType, setAddType] = useState("image");
  
  // Boards data
  const [boards, setBoards] = useState([
    { 
      id: 1, 
      name: "Dream Wedding", 
      cover: "https://images.unsplash.com/photo-1519741497674-611481863552",
      itemCount: 24,
      sharedWithVendors: false,
      createdAt: "2024-01-15",
      color: "#E77291",
      description: "My ultimate dream wedding vision"
    },
    { 
      id: 2, 
      name: "Decor Ideas", 
      cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      itemCount: 18,
      sharedWithVendors: true,
      createdAt: "2024-01-20",
      color: "#AC1634",
      description: "Floral arrangements, lighting, and setups"
    },
    { 
      id: 3, 
      name: "Outfit Inspiration", 
      cover: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
      itemCount: 15,
      sharedWithVendors: false,
      createdAt: "2024-01-25",
      color: "#7A002B",
      description: "Bridal lehengas, groom wear, accessories"
    }
  ]);
  
  // Pins/Items data
  const [pins, setPins] = useState([
    {
      id: 1,
      boardId: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      title: "Floral Mandap",
      category: "Decor",
      addedBy: "You",
      addedAt: "2024-01-15",
      source: "Pinterest",
      sourceLink: "",
      notes: "Love the flower arrangement!",
      likes: 45,
      saves: 23
    },
    {
      id: 2,
      boardId: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552",
      title: "Palace Venue",
      category: "Venue",
      addedBy: "You",
      addedAt: "2024-01-16",
      source: "Manual",
      sourceLink: "",
      notes: "Beautiful heritage venue",
      likes: 67,
      saves: 34
    },
    {
      id: 3,
      boardId: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
      title: "Bridal Lehenga",
      category: "Outfits",
      addedBy: "Rohan",
      addedAt: "2024-01-17",
      source: "Pinterest",
      sourceLink: "",
      notes: "Rohan thinks this would look great!",
      likes: 89,
      saves: 45
    },
    {
      id: 4,
      boardId: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b",
      title: "Gold Jewelry",
      category: "Jewelry",
      addedBy: "You",
      addedAt: "2024-01-18",
      source: "Instagram",
      sourceLink: "",
      notes: "Traditional gold set",
      likes: 56,
      saves: 28
    }
  ]);

  const categories = ["All", "Decor", "Outfits", "Jewelry", "Makeup", "Venue", "Mehendi", "Food", "Invitations"];
  const [newBoard, setNewBoard] = useState({ name: "", description: "", color: "#E77291" });
  const [newPin, setNewPin] = useState({
    type: "image",
    url: "",
    title: "",
    category: "Decor",
    notes: "",
    sourceLink: ""
  });

  const filteredPins = pins.filter(pin => 
    (activeBoard ? pin.boardId === activeBoard.id : true) &&
    (searchTerm === "" || pin.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCategory === "all" || pin.category.toLowerCase() === filterCategory.toLowerCase())
  );

  // Functions
  const createBoard = () => {
    if (!newBoard.name) return;
    const board = {
      id: Date.now(),
      name: newBoard.name,
      description: newBoard.description,
      cover: "https://images.unsplash.com/photo-1519741497674-611481863552",
      itemCount: 0,
      sharedWithVendors: false,
      createdAt: new Date().toISOString().split('T')[0],
      color: newBoard.color
    };
    setBoards([...boards, board]);
    setNewBoard({ name: "", description: "", color: "#E77291" });
    setShowAddModal(false);
  };

  const addPin = () => {
    if (!newPin.url || !newPin.title) return;
    
    const pin = {
      id: Date.now(),
      boardId: activeBoard?.id || boards[0].id,
      type: newPin.type,
      url: newPin.url,
      title: newPin.title,
      category: newPin.category,
      addedBy: "You",
      addedAt: new Date().toISOString().split('T')[0],
      source: newPin.type === "pinterest" ? "Pinterest" : newPin.type === "instagram" ? "Instagram" : "Manual",
      sourceLink: newPin.sourceLink,
      notes: newPin.notes,
      likes: 0,
      saves: 0,
      comments: []
    };
    setPins([pin, ...pins]);
    setBoards(boards.map(board => 
      board.id === pin.boardId ? { ...board, itemCount: board.itemCount + 1 } : board
    ));
    setNewPin({ type: "image", url: "", title: "", category: "Decor", notes: "", sourceLink: "" });
    setShowAddModal(false);
  };

  const deletePin = (pinId) => {
    const pinToDelete = pins.find(p => p.id === pinId);
    setPins(pins.filter(p => p.id !== pinId));
    if (pinToDelete) {
      setBoards(boards.map(board => 
        board.id === pinToDelete.boardId ? { ...board, itemCount: board.itemCount - 1 } : board
      ));
    }
  };

  const toggleShareWithVendors = (boardId) => {
    setBoards(boards.map(board => 
      board.id === boardId ? { ...board, sharedWithVendors: !board.sharedWithVendors } : board
    ));
  };

  const deleteBoard = (boardId) => {
    const boardPins = pins.filter(p => p.boardId === boardId);
    setPins(pins.filter(p => p.boardId !== boardId));
    setBoards(boards.filter(b => b.id !== boardId));
    if (activeBoard?.id === boardId) setActiveBoard(null);
  };

  const getSourceIcon = (source) => {
    switch(source?.toLowerCase()) {
      case "pinterest": return <span>📌</span>;
      case "instagram": return <span>📸</span>;
      default: return <Image size={12} />;
    }
  };

  const saveToPinterest = (imageUrl, title) => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`;
    window.open(pinterestUrl, "_blank", "width=750,height=700");
  };

  const PinModal = ({ pin, onClose }) => (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={modalStyles.closeBtn} onClick={onClose}><X size={24} /></button>
        <div style={modalStyles.imageContainer}>
          <img src={pin.url} alt={pin.title} style={modalStyles.image} />
          {pin.source === "Pinterest" && (
            <div style={modalStyles.platformBadge}>
              <span>📌</span> Pinterest
            </div>
          )}
          {pin.source === "Instagram" && (
            <div style={modalStyles.platformBadge}>
              <span>📸</span> Instagram
            </div>
          )}
        </div>
        <div style={modalStyles.content}>
          <h2 style={modalStyles.title}>{pin.title}</h2>
          <div style={modalStyles.meta}>
            <span style={modalStyles.category}>{pin.category}</span>
            <span style={modalStyles.source}>{getSourceIcon(pin.source)} {pin.source}</span>
          </div>
          {pin.notes && <div style={modalStyles.notes}><strong>📝 Notes:</strong> <p>{pin.notes}</p></div>}
          <div style={modalStyles.stats}>
            <span>❤️ {pin.likes} likes</span>
            <span>🔖 {pin.saves} saves</span>
          </div>
          
          <button style={modalStyles.saveToPinterestBtn} onClick={() => saveToPinterest(pin.url, pin.title)}>
            <span>📌</span> Save to Pinterest
          </button>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/home" },
    { icon: <Calendar size={22} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={22} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={22} />, label: "Package", path: "/package" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" }
  ];

  const menuItems = [
    { icon: "💌", label: "Invitation Designer", path: "/invitation-design" },
    { icon: "💰", label: "Budget Planner", path: "/budget-planner" },
    { icon: "🧘", label: "Emotional Wellness", path: "/wellness" },
    { icon: "🌿", label: "Sustainable Wedding", path: "/sustainability" },
    { icon: "🤖", label: "AI Wedding Assistant", path: "/ai-assistant" },
    { icon: "🕉️", label: "Rasam & Riwaz", path: "/rasam-riwaz" },
    { icon: "📜", label: "Legal & Documents", path: "/legal-docs" }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => setMenuOpen(true)} style={styles.menuBtn}><Menu size={22} /></button>
          <HindiLogo size="small" />
          <div style={styles.headerRight}>
            <button onClick={() => setShowAIAssistant(true)} style={styles.aiBtn}><Sparkles size={20} /></button>
            <button onClick={() => navigate("/messages")} style={styles.messageBtn}><MessageCircle size={20} /></button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={styles.overlay} />
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}><HindiLogo size="small" /><button onClick={() => setMenuOpen(false)} style={styles.closeBtn}><X size={22} /></button></div>
            {navItems.map(n => (<div key={n.path} onClick={() => { navigate(n.path); setMenuOpen(false); }} style={styles.sidebarItem}><span style={styles.sidebarIcon}>{n.icon}</span>{n.label}</div>))}
            <div style={styles.divider} /><p style={styles.sidebarSectionTitle}>WEDDING TOOLS</p>
            {menuItems.map(item => (<div key={item.label} onClick={() => { navigate(item.path); setMenuOpen(false); }} style={styles.sidebarItem}><span style={styles.sidebarEmoji}>{item.icon}</span>{item.label}</div>))}
            <div style={styles.sidebarFooter}><div onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}><LogOut size={18} /> Logout</div></div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>Inspiration Board</h1>
          <p style={styles.subtitle}>Collect and organize your wedding ideas</p>
        </div>

        {/* Pinterest Banner */}
        <div style={styles.pinterestBanner}>
          <span style={{ fontSize: "28px" }}>📌</span>
          <div>
            <h4>Find inspiration on Pinterest</h4>
            <p>Discover wedding ideas and save them directly to your boards</p>
          </div>
          <button style={styles.pinterestBtn} onClick={() => window.open("https://pinterest.com/search/pins/?q=indian+wedding", "_blank")}>
            Explore Pinterest →
          </button>
        </div>

        {/* Action Bar */}
        <div style={styles.actionBar}>
          <button style={styles.createBoardBtn} onClick={() => { setEditingBoard(null); setNewBoard({ name: "", description: "", color: "#E77291" }); setShowAddModal(true); }}>
            <Plus size={18} /> Create Board
          </button>
          <div style={styles.searchBar}>
            <Search size={18} color="#999" />
            <input type="text" placeholder="Search ideas..." style={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {/* Category Filters */}
        <div style={styles.filterChips}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat.toLowerCase())} style={{...styles.chip, ...(filterCategory === cat.toLowerCase() ? styles.chipActive : {})}}>
              {cat}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div style={styles.viewToggle}>
          <button onClick={() => setViewMode("grid")} style={{...styles.viewBtn, ...(viewMode === "grid" ? styles.viewBtnActive : {})}}><Grid3x3 size={18} /> Grid</button>
          <button onClick={() => setViewMode("list")} style={{...styles.viewBtn, ...(viewMode === "list" ? styles.viewBtnActive : {})}}><List size={18} /> List</button>
        </div>

        {/* Boards Section */}
        <div style={styles.boardsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>My Boards</h2>
            <span style={styles.boardCount}>{boards.length} boards</span>
          </div>
          <div style={styles.boardsGrid}>
            {boards.map(board => (
              <div key={board.id} style={{...styles.boardCard, ...(activeBoard?.id === board.id ? styles.boardCardActive : {})}} onClick={() => setActiveBoard(activeBoard?.id === board.id ? null : board)}>
                <div style={styles.boardCover}>
                  <img src={board.cover} alt={board.name} style={styles.boardCoverImage} />
                  <div style={styles.boardOverlay}>
                    <p style={styles.boardItemCount}>{board.itemCount} ideas</p>
                  </div>
                </div>
                <div style={styles.boardInfo}>
                  <div>
                    <h3 style={styles.boardName}>{board.name}</h3>
                    <p style={styles.boardDesc}>{board.description}</p>
                  </div>
                  <div style={styles.boardActions}>
                    <button style={styles.boardShareBtn} onClick={(e) => { e.stopPropagation(); toggleShareWithVendors(board.id); }} title={board.sharedWithVendors ? "Shared with vendors" : "Private board"}>
                      {board.sharedWithVendors ? <Globe size={16} color="#AC1634" /> : <Lock size={16} color="#999" />}
                    </button>
                    <button style={styles.boardDeleteBtn} onClick={(e) => { e.stopPropagation(); if (confirm("Delete this board?")) deleteBoard(board.id); }}><Trash2 size={14} color="#F44336" /></button>
                  </div>
                </div>
              </div>
            ))}
            <div style={styles.boardAddCard} onClick={() => { setEditingBoard(null); setNewBoard({ name: "", description: "", color: "#E77291" }); setShowAddModal(true); }}>
              <Plus size={32} color="#AC1634" />
              <p>Create New Board</p>
            </div>
          </div>
        </div>

        {/* Pins Section */}
        <div style={styles.pinsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>{activeBoard ? activeBoard.name : "All Ideas"}</h2>
            <button style={styles.addPinBtn} onClick={() => setShowAddModal(true)}><Plus size={16} /> Add Idea</button>
          </div>
          
          {filteredPins.length === 0 ? (
            <div style={styles.emptyState}>
              <Image size={48} color="#CCC" />
              <p>No ideas yet. Click "Add Idea" to get started!</p>
              <p style={styles.pinterestHint}>✨ Tip: Find inspiration on Pinterest and save it here!</p>
            </div>
          ) : (
            <div style={viewMode === "grid" ? styles.pinsGrid : styles.pinsList}>
              {filteredPins.map(pin => (
                <div key={pin.id} style={styles.pinCard}>
                  <div style={styles.pinImageContainer}>
                    <img src={pin.url} alt={pin.title} style={styles.pinImage} />
                    <div style={styles.pinOverlay}>
                      <button style={styles.pinViewBtn} onClick={() => setSelectedPin(pin)}><Eye size={16} /></button>
                      <button style={styles.pinPinterestBtn} onClick={() => saveToPinterest(pin.url, pin.title)} title="Save to Pinterest"><span>📌</span></button>
                      <button style={styles.pinDeleteBtn} onClick={() => deletePin(pin.id)}><Trash2 size={16} /></button>
                    </div>
                    <div style={styles.pinSourceBadge}>
                      {pin.source === "Pinterest" && <span>📌</span>}
                      {pin.source === "Instagram" && <span>📸</span>}
                      {pin.source !== "Pinterest" && pin.source !== "Instagram" && <Image size={10} />}
                      {pin.source}
                    </div>
                  </div>
                  <div style={styles.pinInfo}>
                    <h4 style={styles.pinTitle}>{pin.title}</h4>
                    <div style={styles.pinMeta}>
                      <span style={styles.pinCategory}>{pin.category}</span>
                      <span style={styles.pinAddedBy}>by {pin.addedBy}</span>
                    </div>
                    {pin.notes && <p style={styles.pinNotes}>{pin.notes.substring(0, 60)}...</p>}
                    <div style={styles.pinStats}>
                      <span>❤️ {pin.likes}</span>
                      <span>🔖 {pin.saves}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Board / Add Pin Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingBoard ? "Edit Board" : "Add New Idea"}</h3>
              <button onClick={() => setShowAddModal(false)} style={styles.modalClose}>✕</button>
            </div>
            <div style={styles.modalContent}>
              {/* Source Selection */}
              <div style={styles.sourceSelector}>
                <button onClick={() => setAddType("image")} style={{...styles.sourceBtn, ...(addType === "image" ? styles.sourceBtnActive : {})}}>
                  <Image size={16} /> Image URL
                </button>
                <button onClick={() => setAddType("pinterest")} style={{...styles.sourceBtn, ...(addType === "pinterest" ? styles.sourceBtnActive : {})}}>
                  <span>📌</span> Pinterest
                </button>
                <button onClick={() => setAddType("instagram")} style={{...styles.sourceBtn, ...(addType === "instagram" ? styles.sourceBtnActive : {})}}>
                  <span>📸</span> Instagram
                </button>
              </div>
              
              {addType === "image" && (
                <input type="text" placeholder="Image URL" style={styles.modalInput} value={newPin.url} onChange={(e) => setNewPin({...newPin, url: e.target.value})} />
              )}
              
              {addType === "pinterest" && (
                <>
                  <input type="text" placeholder="Pinterest Pin URL (e.g., https://pinterest.com/pin/123456789)" style={styles.modalInput} value={newPin.sourceLink} onChange={(e) => setNewPin({...newPin, sourceLink: e.target.value, type: "pinterest"})} />
                  <div style={styles.pinterestHelper}>
                    <span>📌</span> Tip: Paste any Pinterest pin URL to save it here
                  </div>
                </>
              )}
              
              {addType === "instagram" && (
                <>
                  <input type="text" placeholder="Instagram Post URL" style={styles.modalInput} value={newPin.sourceLink} onChange={(e) => setNewPin({...newPin, sourceLink: e.target.value, type: "instagram"})} />
                  <div style={styles.instagramHelper}>
                    <span>📸</span> Tip: Paste Instagram post URL to save inspiration
                  </div>
                </>
              )}
              
              <input type="text" placeholder="Title" style={styles.modalInput} value={newPin.title} onChange={(e) => setNewPin({...newPin, title: e.target.value})} />
              
              <select style={styles.modalSelect} value={newPin.category} onChange={(e) => setNewPin({...newPin, category: e.target.value})}>
                <option value="">Select Category</option>
                {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              
              <textarea placeholder="Notes (optional)" style={styles.modalTextarea} rows="2" value={newPin.notes} onChange={(e) => setNewPin({...newPin, notes: e.target.value})} />
              
              <div style={styles.modalActions}>
                <button onClick={() => setShowAddModal(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={addPin} style={styles.createBtn}>Add to Board</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pin Modal */}
      {selectedPin && <PinModal pin={selectedPin} onClose={() => setSelectedPin(null)} />}

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  menuBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  headerRight: { display: "flex", gap: "12px", alignItems: "center" },
  aiBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  messageBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "24px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  pinterestBanner: { display: "flex", alignItems: "center", gap: "16px", background: "linear-gradient(135deg, #FFF5F7, white)", borderRadius: "20px", padding: "16px 20px", marginBottom: "24px", border: "1px solid #F5D0DA", flexWrap: "wrap" },
  pinterestBtn: { background: "#E77291", color: "#3E0014", border: "none", padding: "8px 20px", borderRadius: "999px", cursor: "pointer", fontWeight: 500, marginLeft: "auto" },
  actionBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" },
  createBoardBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer", fontWeight: 500 },
  searchBar: { display: "flex", alignItems: "center", gap: "12px", background: "white", padding: "10px 20px", borderRadius: "999px", border: "1px solid #F5D0DA", width: "300px" },
  searchInput: { border: "none", outline: "none", fontSize: "14px", flex: 1 },
  filterChips: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" },
  chip: { padding: "6px 16px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "12px" },
  chipActive: { background: "#3E0014", color: "white", borderColor: "#3E0014" },
  viewToggle: { display: "flex", gap: "12px", justifyContent: "flex-end", marginBottom: "32px" },
  viewBtn: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  viewBtnActive: { background: "#3E0014", color: "white" },
  boardsSection: { marginBottom: "48px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  sectionTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "24px", color: "#3E0014" },
  boardCount: { fontSize: "13px", color: "#999" },
  boardsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  boardCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "2px solid transparent", cursor: "pointer", transition: "all 0.2s" },
  boardCardActive: { borderColor: "#AC1634", boxShadow: "0 8px 24px rgba(172,22,52,0.15)" },
  boardCover: { position: "relative", height: "160px", overflow: "hidden" },
  boardCoverImage: { width: "100%", height: "100%", objectFit: "cover" },
  boardOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "12px" },
  boardItemCount: { color: "white", fontSize: "12px", margin: 0 },
  boardInfo: { padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  boardName: { fontSize: "16px", fontWeight: 600, marginBottom: "4px" },
  boardDesc: { fontSize: "12px", color: "#666" },
  boardActions: { display: "flex", gap: "8px" },
  boardShareBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px" },
  boardDeleteBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px" },
  boardAddCard: { background: "#FDF0F3", border: "2px dashed #F5D0DA", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "240px", cursor: "pointer" },
  pinsSection: { marginTop: "24px" },
  addPinBtn: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer", fontSize: "13px" },
  pinsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" },
  pinsList: { display: "flex", flexDirection: "column", gap: "16px" },
  pinCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA", transition: "transform 0.2s" },
  pinImageContainer: { position: "relative", height: "220px", overflow: "hidden" },
  pinImage: { width: "100%", height: "100%", objectFit: "cover" },
  pinOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", opacity: 0, transition: "opacity 0.2s" },
  pinViewBtn: { background: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  pinPinterestBtn: { background: "#E60023", color: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  pinDeleteBtn: { background: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#F44336" },
  pinSourceBadge: { position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 10px", borderRadius: "999px", fontSize: "10px", display: "flex", alignItems: "center", gap: "4px" },
  pinInfo: { padding: "16px" },
  pinTitle: { fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#3E0014" },
  pinMeta: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "11px" },
  pinCategory: { background: "#FDF0F3", padding: "2px 10px", borderRadius: "999px", color: "#AC1634" },
  pinAddedBy: { color: "#999" },
  pinNotes: { fontSize: "12px", color: "#666", marginBottom: "8px", lineHeight: 1.4 },
  pinStats: { display: "flex", gap: "16px", fontSize: "11px", color: "#999" },
  emptyState: { textAlign: "center", padding: "60px 20px", color: "#999" },
  pinterestHint: { fontSize: "12px", marginTop: "12px", color: "#E77291" },
  overlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", zIndex: 998 },
  sidebar: { position: "fixed", top: 0, left: 0, bottom: 0, width: 300, background: "#3E0014", zIndex: 999, padding: "32px 24px", display: "flex", flexDirection: "column", overflowY: "auto" },
  sidebarHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 },
  closeBtn: { background: "none", border: "none", color: "#E77291", cursor: "pointer" },
  sidebarItem: { display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#FFFFFF", fontSize: 15, marginBottom: 4, background: "rgba(231,114,145,0.08)" },
  sidebarIcon: { color: "#E77291" },
  sidebarEmoji: { fontSize: "18px" },
  divider: { height: "1px", background: "rgba(231,114,145,0.2)", margin: "16px 0" },
  sidebarSectionTitle: { color: "#E77291", fontSize: "11px", letterSpacing: "1px", marginBottom: 12, paddingLeft: "16px" },
  sidebarFooter: { marginTop: "auto", paddingTop: 20 },
  logoutBtn: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#E77291", fontSize: 15 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "500px", maxHeight: "80vh", overflow: "auto" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: "20px", fontWeight: 600, margin: 0 },
  modalClose: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  modalContent: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  sourceSelector: { display: "flex", gap: "10px", marginBottom: "8px" },
  sourceBtn: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "12px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "13px" },
  sourceBtnActive: { background: "#AC1634", color: "white", borderColor: "#AC1634" },
  modalInput: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  modalSelect: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  modalTextarea: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none", resize: "vertical" },
  pinterestHelper: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#E60023", background: "#FEF0F0", padding: "8px", borderRadius: "8px" },
  instagramHelper: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#E4405F", background: "#FEF0F3", padding: "8px", borderRadius: "8px" },
  modalActions: { display: "flex", gap: "12px", marginTop: "8px" },
  cancelBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  createBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontWeight: 600 }
};

const modalStyles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "28px", width: "90%", maxWidth: "550px", maxHeight: "80vh", overflow: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: "16px", right: "16px", background: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: "300px", objectFit: "cover" },
  platformBadge: { position: "absolute", bottom: "16px", left: "16px", background: "rgba(0,0,0,0.7)", color: "white", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" },
  content: { padding: "24px" },
  title: { fontSize: "22px", fontWeight: 700, marginBottom: "12px", color: "#3E0014" },
  meta: { display: "flex", gap: "12px", marginBottom: "16px" },
  category: { background: "#FDF0F3", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", color: "#AC1634" },
  source: { display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#999" },
  notes: { background: "#FDF0F3", padding: "16px", borderRadius: "16px", marginBottom: "16px" },
  stats: { display: "flex", gap: "20px", marginBottom: "16px", fontSize: "13px", color: "#666" },
  saveToPinterestBtn: { width: "100%", padding: "12px", borderRadius: "999px", background: "#E60023", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }
};