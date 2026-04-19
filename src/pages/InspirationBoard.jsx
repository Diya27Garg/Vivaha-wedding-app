// src/pages/InspirationBoard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, Plus, Image, Grid3x3, List, Bookmark, Share2, Lock, X } from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function InspirationBoard({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [activeBoard, setActiveBoard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("All");
  
  const [boards, setBoards] = useState([
    { id: 1, name: "Dream Wedding", cover: "https://images.unsplash.com/photo-1519741497674-611481863552", itemCount: 12, sharedWithVendors: false },
    { id: 2, name: "Decor Ideas", cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", itemCount: 8, sharedWithVendors: true },
    { id: 3, name: "Outfit Inspiration", cover: "https://images.unsplash.com/photo-1595777457583-95e059d581b8", itemCount: 15, sharedWithVendors: false }
  ]);
  
  const [pins, setPins] = useState([
    { id: 1, boardId: 1, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", title: "Floral Mandap", category: "Decor", addedBy: "You" },
    { id: 2, boardId: 1, image: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Palace Venue", category: "Venue", addedBy: "You" },
    { id: 3, boardId: 2, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8", title: "Bridal Lehenga", category: "Outfits", addedBy: "Rohan" },
    { id: 4, boardId: 3, image: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b", title: "Gold Jewelry", category: "Jewelry", addedBy: "You" }
  ]);

  const categories = ["All", "Decor", "Outfits", "Jewelry", "Makeup", "Venue"];
  const filteredPins = pins.filter(pin => (activeBoard ? pin.boardId === activeBoard.id : true) && (searchTerm === "" || pin.title.toLowerCase().includes(searchTerm.toLowerCase())) && (filterCategory === "All" || pin.category === filterCategory));

  const toggleShareWithVendors = (boardId) => {
    setBoards(boards.map(board => board.id === boardId ? { ...board, sharedWithVendors: !board.sharedWithVendors } : board));
  };

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
        <div style={styles.heroSection}><h1 style={styles.title}>Inspiration Board</h1><p style={styles.subtitle}>Collect and organize your wedding ideas</p></div>

        <div style={styles.searchBar}><Search size={20} color="#999" /><input type="text" placeholder="Search inspiration..." style={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        
        <div style={styles.filterChips}>{categories.map(cat => <button key={cat} onClick={() => setFilterCategory(cat)} style={{...styles.chip, ...(filterCategory === cat ? styles.chipActive : {})}}>{cat}</button>)}</div>
        
        <div style={styles.viewToggle}><button onClick={() => setViewMode("grid")} style={{...styles.viewBtn, ...(viewMode === "grid" ? styles.viewBtnActive : {})}}><Grid3x3 size={18} /> Grid</button><button onClick={() => setViewMode("list")} style={{...styles.viewBtn, ...(viewMode === "list" ? styles.viewBtnActive : {})}}><List size={18} /> List</button></div>

        <div style={styles.boardsSection}>
          <div style={styles.sectionHeader}><h2 style={styles.sectionTitle}>My Boards</h2><button onClick={() => setShowAddModal(true)} style={styles.addBoardBtn}><Plus size={16} /> New Board</button></div>
          <div style={styles.boardsGrid}>
            {boards.map(board => (
              <div key={board.id} onClick={() => setActiveBoard(activeBoard?.id === board.id ? null : board)} style={{...styles.boardCard, ...(activeBoard?.id === board.id ? styles.boardCardActive : {})}}>
                <img src={board.cover} alt={board.name} style={styles.boardCover} />
                <div style={styles.boardInfo}><div><h3>{board.name}</h3><p>{board.itemCount} items</p></div><button onClick={(e) => { e.stopPropagation(); toggleShareWithVendors(board.id); }}>{board.sharedWithVendors ? <Share2 size={16} color="#AC1634" /> : <Lock size={16} color="#999" />}</button></div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.pinsSection}>
          <div style={styles.sectionHeader}><h2 style={styles.sectionTitle}>{activeBoard ? activeBoard.name : "All Ideas"}</h2>{activeBoard && <button onClick={() => setActiveBoard(null)} style={styles.closeBoardBtn}>✕ Close Board</button>}</div>
          {filteredPins.length === 0 ? <div style={styles.emptyState}><Image size={48} /><p>No ideas yet. Create a board to get started!</p></div> : (
            <div style={viewMode === "grid" ? styles.pinsGrid : styles.pinsList}>
              {filteredPins.map(pin => (
                <div key={pin.id} style={styles.pinCard}>
                  <img src={pin.image} alt={pin.title} style={styles.pinImage} />
                  <div style={styles.pinInfo}><h4>{pin.title}</h4><div><span>{pin.category}</span><span>by {pin.addedBy}</span></div><div><button><Heart size={14} /> Save</button><button><Bookmark size={14} /> Collect</button></div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3>Create New Board</h3><button onClick={() => setShowAddModal(false)}>✕</button></div>
            <div style={styles.modalContent}><input type="text" placeholder="Board name" /><input type="text" placeholder="Cover image URL" /><div><button onClick={() => setShowAddModal(false)}>Cancel</button><button>Create Board</button></div></div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px" },
  mainContent: { maxWidth: "1280px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "48px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  searchBar: { background: "white", borderRadius: "999px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #F5D0DA", marginBottom: "20px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "15px" },
  filterChips: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" },
  chip: { padding: "8px 20px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  chipActive: { background: "#AC1634", color: "white", borderColor: "#AC1634" },
  viewToggle: { display: "flex", gap: "12px", justifyContent: "flex-end", marginBottom: "32px" },
  viewBtn: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  viewBtnActive: { background: "#3E0014", color: "white" },
  boardsSection: { marginBottom: "48px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" },
  sectionTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#3E0014" },
  addBoardBtn: { padding: "10px 20px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  boardsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" },
  boardCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "2px solid transparent", cursor: "pointer" },
  boardCardActive: { borderColor: "#AC1634" },
  boardCover: { width: "100%", height: "160px", objectFit: "cover" },
  boardInfo: { padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  pinsSection: { marginTop: "24px" },
  closeBoardBtn: { background: "#F5D0DA", border: "none", padding: "6px 12px", borderRadius: "999px", cursor: "pointer" },
  emptyState: { textAlign: "center", padding: "80px 20px", color: "#999" },
  pinsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" },
  pinsList: { display: "flex", flexDirection: "column", gap: "16px" },
  pinCard: { background: "white", borderRadius: "20px", overflow: "hidden", border: "1px solid #F5D0DA" },
  pinImage: { width: "100%", height: "220px", objectFit: "cover" },
  pinInfo: { padding: "16px" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "450px" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalContent: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }
};