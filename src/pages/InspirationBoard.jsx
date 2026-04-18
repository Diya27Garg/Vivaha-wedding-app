// src/pages/InspirationBoard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, Home, Calendar, Package, User, Plus, Search, 
  Image, Link2, X, Check, Grid3x3, List, Bookmark, Share2
} from "lucide-react";

export default function InspirationBoard({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [activeBoard, setActiveBoard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  
  const [boards, setBoards] = useState([
    { 
      id: 1, 
      name: "Dream Wedding", 
      cover: "https://images.unsplash.com/photo-1519741497674-611481863552",
      itemCount: 12,
      sharedWithVendors: false
    },
    { 
      id: 2, 
      name: "Decor Ideas", 
      cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      itemCount: 8,
      sharedWithVendors: true
    },
    { 
      id: 3, 
      name: "Outfit Inspiration", 
      cover: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
      itemCount: 15,
      sharedWithVendors: false
    }
  ]);
  
  const [pins, setPins] = useState([
    {
      id: 1,
      boardId: 1,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      title: "Floral Mandap",
      category: "Decor",
      addedBy: "You"
    },
    {
      id: 2,
      boardId: 1,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      title: "Palace Venue",
      category: "Venue",
      addedBy: "You"
    },
    {
      id: 3,
      boardId: 2,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
      title: "Bridal Lehenga",
      category: "Outfits",
      addedBy: "Rohan"
    },
    {
      id: 4,
      boardId: 3,
      image: "https://images.unsplash.com/photo-1532712938311-25548b2e0a1b",
      title: "Gold Jewelry",
      category: "Jewelry",
      addedBy: "You"
    }
  ]);
  
  const [newPin, setNewPin] = useState({
    image: "",
    title: "",
    category: "Decor"
  });
  
  const categories = ["Decor", "Outfits", "Jewelry", "Makeup", "Venue", "Food"];
  
  const filteredPins = pins.filter(pin => 
    (activeBoard ? pin.boardId === activeBoard.id : true) &&
    (searchTerm === "" || pin.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddPin = () => {
    if (!newPin.image || !newPin.title) return;
    
    const pin = {
      id: Date.now(),
      boardId: activeBoard?.id || boards[0].id,
      image: newPin.image,
      title: newPin.title,
      category: newPin.category,
      addedBy: "You"
    };
    
    setPins([pin, ...pins]);
    setBoards(boards.map(board => 
      board.id === pin.boardId 
        ? { ...board, itemCount: board.itemCount + 1 }
        : board
    ));
    setShowAddModal(false);
    setNewPin({ image: "", title: "", category: "Decor" });
  };
  
  const toggleShareWithVendors = (boardId) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { ...board, sharedWithVendors: !board.sharedWithVendors }
        : board
    ));
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Inspiration Board</h1>
        <button style={styles.addButton} onClick={() => setShowAddModal(true)}>
          <Plus size={20} /> Add Idea
        </button>
      </div>
      
      <div style={styles.searchContainer}>
        <Search size={18} color="#999" />
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search inspiration..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div style={styles.viewToggle}>
        <button 
          style={{...styles.viewBtn, ...(viewMode === "grid" ? styles.viewBtnActive : {})}}
          onClick={() => setViewMode("grid")}
        >
          <Grid3x3 size={18} /> Grid
        </button>
        <button 
          style={{...styles.viewBtn, ...(viewMode === "list" ? styles.viewBtnActive : {})}}
          onClick={() => setViewMode("list")}
        >
          <List size={18} /> List
        </button>
      </div>
      
      <div style={styles.boardsSection}>
        <h2 style={styles.sectionTitle}>My Boards</h2>
        <div style={styles.boardsGrid}>
          {boards.map(board => (
            <div
              key={board.id}
              style={{...styles.boardCard, ...(activeBoard?.id === board.id ? styles.boardCardActive : {})}}
              onClick={() => setActiveBoard(activeBoard?.id === board.id ? null : board)}
            >
              <img src={board.cover} alt={board.name} style={styles.boardCover} />
              <div style={styles.boardInfo}>
                <div>
                  <h3 style={styles.boardName}>{board.name}</h3>
                  <p style={styles.boardCount}>{board.itemCount} items</p>
                </div>
                <button 
                  style={styles.shareButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleShareWithVendors(board.id);
                  }}
                  title={board.sharedWithVendors ? "Shared with vendors" : "Private board"}
                >
                  {board.sharedWithVendors ? <Share2 size={16} color="#AC1634" /> : "🔒"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.pinsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {activeBoard ? activeBoard.name : "All Ideas"}
          </h2>
          {activeBoard && (
            <button style={styles.closeBoardBtn} onClick={() => setActiveBoard(null)}>
              <X size={16} /> Close Board
            </button>
          )}
        </div>
        
        <div style={viewMode === "grid" ? styles.pinsGrid : styles.pinsList}>
          {filteredPins.length === 0 ? (
            <div style={styles.emptyState}>
              <Image size={48} color="#CCC" />
              <p>No ideas yet. Click "Add Idea" to get started!</p>
            </div>
          ) : (
            filteredPins.map(pin => (
              <div key={pin.id} style={styles.pinCard}>
                <img src={pin.image} alt={pin.title} style={styles.pinImage} />
                <div style={styles.pinInfo}>
                  <h4 style={styles.pinTitle}>{pin.title}</h4>
                  <div style={styles.pinMeta}>
                    <span style={styles.pinCategory}>{pin.category}</span>
                    <span style={styles.pinAddedBy}>Added by {pin.addedBy}</span>
                  </div>
                  <div style={styles.pinActions}>
                    <button style={styles.pinActionBtn}>
                      <Heart size={16} /> Save
                    </button>
                    <button style={styles.pinActionBtn}>
                      <Bookmark size={16} /> Collect
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Add New Idea</h3>
              <button style={styles.closeBtn} onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <input
                type="text"
                style={styles.modalInput}
                placeholder="Image URL"
                value={newPin.image}
                onChange={(e) => setNewPin({...newPin, image: e.target.value})}
              />
              <input
                type="text"
                style={styles.modalInput}
                placeholder="Title"
                value={newPin.title}
                onChange={(e) => setNewPin({...newPin, title: e.target.value})}
              />
              <select
                style={styles.modalSelect}
                value={newPin.category}
                onChange={(e) => setNewPin({...newPin, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <div style={styles.modalActions}>
                <button style={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button style={styles.addBtn} onClick={handleAddPin}>
                  Add to {activeBoard ? activeBoard.name : boards[0].name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <div className="bottom-nav" style={styles.bottomNav}>
        <button onClick={() => navigate("/home")} style={styles.navItem}>
          <Home size={22} />
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/checklist")} style={styles.navItem}>
          <Calendar size={22} />
          <span>Checklist</span>
        </button>
        <button onClick={() => navigate("/inspiration")} style={{...styles.navItem, ...styles.navItemActive}}>
          <Heart size={22} />
          <span>Inspire</span>
        </button>
        <button onClick={() => navigate("/package")} style={styles.navItem}>
          <Package size={22} />
          <span>Package</span>
        </button>
        <button onClick={() => navigate("/profile")} style={styles.navItem}>
          <User size={22} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#FDF0F3",
    fontFamily: "'DM Sans', sans-serif",
    paddingBottom: "80px"
  },
  header: {
    background: "#3E0014",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontStyle: "italic",
    fontSize: "24px",
    color: "white",
    margin: 0
  },
  addButton: {
    background: "#E77291",
    border: "none",
    borderRadius: "999px",
    padding: "8px 16px",
    color: "#3E0014",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  searchContainer: {
    background: "white",
    margin: "16px",
    padding: "12px 16px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #F5D0DA"
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif"
  },
  viewToggle: {
    display: "flex",
    gap: "10px",
    margin: "0 16px 16px"
  },
  viewBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "999px",
    border: "1px solid #F5D0DA",
    background: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "13px"
  },
  viewBtnActive: {
    background: "#3E0014",
    color: "white",
    borderColor: "#3E0014"
  },
  boardsSection: {
    padding: "0 16px 16px"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#3E0014",
    marginBottom: "12px"
  },
  boardsGrid: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    paddingBottom: "8px"
  },
  boardCard: {
    minWidth: "200px",
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    border: "2px solid transparent",
    cursor: "pointer"
  },
  boardCardActive: {
    borderColor: "#AC1634"
  },
  boardCover: {
    width: "100%",
    height: "120px",
    objectFit: "cover"
  },
  boardInfo: {
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boardName: {
    fontSize: "14px",
    fontWeight: 600,
    margin: 0
  },
  boardCount: {
    fontSize: "11px",
    color: "#999",
    margin: "4px 0 0"
  },
  shareButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    fontSize: "16px"
  },
  pinsSection: {
    padding: "16px"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  closeBoardBtn: {
    background: "#F5D0DA",
    border: "none",
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  pinsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "16px"
  },
  pinsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  pinCard: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #F5D0DA"
  },
  pinImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover"
  },
  pinInfo: {
    padding: "12px"
  },
  pinTitle: {
    fontSize: "14px",
    fontWeight: 600,
    margin: "0 0 6px",
    color: "#3E0014"
  },
  pinMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    marginBottom: "10px"
  },
  pinCategory: {
    background: "#FDF0F3",
    padding: "2px 8px",
    borderRadius: "999px",
    color: "#AC1634"
  },
  pinAddedBy: {
    color: "#999"
  },
  pinActions: {
    display: "flex",
    gap: "12px"
  },
  pinActionBtn: {
    background: "none",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#666"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#999"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    borderRadius: "24px",
    width: "90%",
    maxWidth: "400px"
  },
  modalHeader: {
    padding: "20px",
    borderBottom: "1px solid #F5D0DA",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: 600,
    margin: 0
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer"
  },
  modalContent: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  modalInput: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #F5D0DA",
    fontSize: "14px",
    outline: "none"
  },
  modalSelect: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #F5D0DA",
    fontSize: "14px",
    outline: "none"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px"
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "999px",
    border: "1px solid #F5D0DA",
    background: "white",
    cursor: "pointer"
  },
  addBtn: {
    flex: 2,
    padding: "12px",
    borderRadius: "999px",
    border: "none",
    background: "#3E0014",
    color: "white",
    cursor: "pointer",
    fontWeight: 600
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: "430px",
    margin: "0 auto",
    background: "white",
    borderTop: "1px solid #F5D0DA",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-around",
    zIndex: 100
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "11px"
  },
  navItemActive: {
    color: "#AC1634"
  }
};