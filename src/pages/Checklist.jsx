// src/pages/Checklist.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, Plus, X, Calendar, Trash2, Sparkles, 
  Lock, Crown, Clock, Heart, Menu, Bell, MessageCircle,
  Home, Package, User, ShoppingCart, ChevronRight, ChevronDown,
  Search, Edit2, Save, Copy, Download, Share2, Star, Award, TrendingUp,
  FolderPlus, Layers, Grid3x3, List, Filter
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import GlobalNotifications from "../components/GlobalNotifications";

// Category data
const categories = [
  { id: "bridal", name: "Bridal Trousseau", icon: "👰", color: "#E77291", description: "Everything the bride needs", taskCount: 5 },
  { id: "outfits", name: "Outfits", icon: "👗", color: "#AC1634", description: "Wedding attire for all", taskCount: 4 },
  { id: "decor", name: "Decor", icon: "🎨", color: "#7A002B", description: "Venue decoration", taskCount: 5 },
  { id: "functions", name: "Functions", icon: "🎉", color: "#FF6B6B", description: "Mehendi, Sangeet, Wedding", taskCount: 5 },
  { id: "invites", name: "Invitations", icon: "💌", color: "#4ECDC4", description: "Cards and invites", taskCount: 4 },
  { id: "guests", name: "Guest Management", icon: "👥", color: "#45B7D1", description: "Guest list & seating", taskCount: 5 },
  { id: "purchase", name: "Purchase List", icon: "🛍️", color: "#96CEB4", description: "Items to buy", taskCount: 4 },
  { id: "gifts", name: "Gifts & Favors", icon: "🎁", color: "#FFEAA7", description: "Return gifts", taskCount: 3 },
  { id: "vendor", name: "Vendors", icon: "🤝", color: "#DFE6E9", description: "Bookings follow-up", taskCount: 4 },
  { id: "wellness", name: "Wellness", icon: "🧘", color: "#A29BFE", description: "Self-care & beauty", taskCount: 4 }
];

// Task data by category
const initialTasks = {
  bridal: [
    { id: 1, text: "Finalize bridal lehenga", completed: false, priority: "high", deadline: "3 months before", notes: "Visit Chandni Chowk" },
    { id: 2, text: "Schedule bridal makeup trial", completed: false, priority: "high", deadline: "2 months before" },
    { id: 3, text: "Buy bridal jewelry", completed: false, priority: "medium", deadline: "2 months before" },
    { id: 4, text: "Arrange bridal footwear", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 5, text: "Purchase clutch/purse", completed: false, priority: "low", deadline: "2 weeks before" }
  ],
  outfits: [
    { id: 1, text: "Groom's sherwani fitting", completed: false, priority: "high", deadline: "2 months before" },
    { id: 2, text: "Family outfits coordination", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 3, text: "Accessories for all events", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 4, text: "Jewelry for both families", completed: false, priority: "low", deadline: "3 weeks before" }
  ],
  decor: [
    { id: 1, text: "Finalize decor theme", completed: false, priority: "high", deadline: "4 months before" },
    { id: 2, text: "Book decorator", completed: false, priority: "high", deadline: "3 months before" },
    { id: 3, text: "Choose flower arrangements", completed: false, priority: "medium", deadline: "2 months before" },
    { id: 4, text: "Lighting setup", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 5, text: "Stage & mandap decor", completed: false, priority: "high", deadline: "2 weeks before" }
  ],
  functions: [
    { id: 1, text: "Plan Mehendi ceremony", completed: false, priority: "high", deadline: "3 months before" },
    { id: 2, text: "Arrange Sangeet performers", completed: false, priority: "medium", deadline: "2 months before" },
    { id: 3, text: "Wedding ceremony timeline", completed: false, priority: "high", deadline: "1 month before" },
    { id: 4, text: "Reception planning", completed: false, priority: "medium", deadline: "2 months before" },
    { id: 5, text: "Haldi ceremony setup", completed: false, priority: "low", deadline: "1 week before" }
  ],
  invites: [
    { id: 1, text: "Design wedding invites", completed: false, priority: "high", deadline: "4 months before" },
    { id: 2, text: "Order invitation cards", completed: false, priority: "high", deadline: "3 months before" },
    { id: 3, text: "Send digital invites", completed: false, priority: "medium", deadline: "2 months before" },
    { id: 4, text: "Address and mail invites", completed: false, priority: "medium", deadline: "1.5 months before" }
  ],
  guests: [
    { id: 1, text: "Create guest list", completed: false, priority: "high", deadline: "4 months before" },
    { id: 2, text: "Collect addresses", completed: false, priority: "high", deadline: "3 months before" },
    { id: 3, text: "Plan seating arrangement", completed: false, priority: "medium", deadline: "2 weeks before" },
    { id: 4, text: "Arrange accommodation", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 5, text: "Transport for outstation guests", completed: false, priority: "low", deadline: "2 weeks before" }
  ],
  purchase: [
    { id: 1, text: "Buy return gifts", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 2, text: "Purchase wedding favors", completed: false, priority: "low", deadline: "2 weeks before" },
    { id: 3, text: "Buy decorations items", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 4, text: "Purchase puja items", completed: false, priority: "high", deadline: "1 week before" }
  ],
  gifts: [
    { id: 1, text: "Select return gifts for guests", completed: false, priority: "medium", deadline: "2 months before" },
    { id: 2, text: "Gifts for bridal party", completed: false, priority: "medium", deadline: "1 month before" },
    { id: 3, text: "Parent appreciation gifts", completed: false, priority: "high", deadline: "1 week before" }
  ],
  vendor: [
    { id: 1, text: "Confirm all vendor bookings", completed: false, priority: "high", deadline: "2 months before" },
    { id: 2, text: "Share requirements with vendors", completed: false, priority: "high", deadline: "1 month before" },
    { id: 3, text: "Final payments to vendors", completed: false, priority: "medium", deadline: "1 week before" },
    { id: 4, text: "Share final timeline with vendors", completed: false, priority: "high", deadline: "1 week before" }
  ],
  wellness: [
    { id: 1, text: "Book bridal skincare appointments", completed: false, priority: "high", deadline: "3 months before" },
    { id: 2, text: "Start fitness routine", completed: false, priority: "medium", deadline: "3 months before" },
    { id: 3, text: "Schedule hair trial", completed: false, priority: "high", deadline: "2 months before" },
    { id: 4, text: "Plan pre-wedding photoshoot", completed: false, priority: "low", deadline: "1 month before" }
  ]
};

export default function Checklist({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("bridal");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "📋", color: "#E77291" });
  const [newTask, setNewTask] = useState({ text: "", deadline: "", priority: "medium" });
  
  const isPremium = user?.premium || false;
  const allCategories = [...categories, ...customCategories];
  const currentCategory = allCategories.find(c => c.id === activeCategory);
  const currentTasks = tasks[activeCategory] || [];
  
  const filteredTasks = currentTasks.filter(task => 
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = currentTasks.filter(t => t.completed).length;
  const progress = currentTasks.length > 0 ? (completedCount / currentTasks.length) * 100 : 0;

  const toggleTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [activeCategory]: (prev[activeCategory] || []).map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [activeCategory]: (prev[activeCategory] || []).filter(task => task.id !== taskId)
    }));
  };

  const addTask = () => {
    if (newTask.text.trim()) {
      setTasks(prev => ({
        ...prev,
        [activeCategory]: [
          ...(prev[activeCategory] || []),
          {
            id: Date.now(),
            text: newTask.text,
            completed: false,
            priority: newTask.priority,
            deadline: newTask.deadline || "Not set",
            notes: ""
          }
        ]
      }));
      setNewTask({ text: "", deadline: "", priority: "medium" });
      setShowAddTask(false);
    }
  };

  const createNewCategory = () => {
    if (newCategory.name.trim()) {
      const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, '_');
      setCustomCategories([...customCategories, {
        id: categoryId,
        name: newCategory.name,
        icon: newCategory.icon,
        color: newCategory.color,
        description: "Custom checklist",
        taskCount: 0
      }]);
      setTasks(prev => ({ ...prev, [categoryId]: [] }));
      setActiveCategory(categoryId);
      setNewCategory({ name: "", icon: "📋", color: "#E77291" });
      setShowCreateCategory(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "#F44336";
      case "medium": return "#FF9800";
      case "low": return "#4CAF50";
      default: return "#999";
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case "high": return "🔴 High";
      case "medium": return "🟠 Medium";
      case "low": return "🟢 Low";
      default: return priority;
    }
  };

  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/home" },
    { icon: <Package size={22} />, label: "Checklist", path: "/checklist" },
    { icon: <Heart size={22} />, label: "Inspire", path: "/inspiration" },
    { icon: <ShoppingCart size={22} />, label: "Package", path: "/package" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" }
  ];

  const menuItems = [
    { icon: "💌", label: "Invitation Designer", path: "/invitation-design" },
    { icon: "💰", label: "Budget Planner", path: "/budget-planner" },
    { icon: "🧘", label: "Emotional Wellness", path: "/wellness" },
    { icon: "🌿", label: "Sustainable Wedding", path: "/sustainability" },
    { icon: "🤖", label: "AI Wedding Assistant", isModal: true },
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
            <GlobalNotifications user={user} />
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
            {menuItems.map(item => (<div key={item.label} onClick={() => { if (item.isModal) { setShowAIAssistant(true); } else if (item.path) { navigate(item.path); } setMenuOpen(false); }} style={styles.sidebarItem}><span style={styles.sidebarEmoji}>{item.icon}</span>{item.label}</div>))}
            <div style={styles.sidebarFooter}><div onClick={() => { setUser(null); navigate("/"); }} style={styles.logoutBtn}><LogOut size={18} /> Logout</div></div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>Wedding Checklist</h1>
          <p style={styles.subtitle}>Stay organized across all your wedding tasks</p>
        </div>

        {/* Category Selector - Dropdown */}
        <div style={styles.categorySelector}>
          <div style={styles.dropdownContainer}>
            <button 
              style={styles.dropdownTrigger}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div style={styles.dropdownSelected}>
                <span style={styles.selectedIcon}>{currentCategory?.icon}</span>
                <span style={styles.selectedName}>{currentCategory?.name}</span>
                <span style={styles.selectedCount}>{currentTasks.length} tasks</span>
              </div>
              <ChevronDown size={18} style={{ transform: showDropdown ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            
            {showDropdown && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownHeader}>
                  <span>Select Checklist</span>
                  <button onClick={() => setShowCreateCategory(true)} style={styles.createCategoryBtn}>
                    <FolderPlus size={14} /> New
                  </button>
                </div>
                {allCategories.map(cat => (
                  <button
                    key={cat.id}
                    style={{...styles.dropdownItem, ...(activeCategory === cat.id ? styles.dropdownItemActive : {})}}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowDropdown(false);
                    }}
                  >
                    <span style={styles.dropdownItemIcon}>{cat.icon}</span>
                    <span style={styles.dropdownItemName}>{cat.name}</span>
                    <span style={styles.dropdownItemCount}>{tasks[cat.id]?.length || 0} tasks</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button style={styles.addCategoryBtn} onClick={() => setShowCreateCategory(true)} title="Create new checklist">
            <Plus size={18} />
          </button>
        </div>

        {/* Category Info */}
        <div style={styles.categoryInfo}>
          <div style={{...styles.categoryColorBar, background: currentCategory?.color}} />
          <div style={styles.categoryInfoContent}>
            <div style={styles.categoryIconLarge}>{currentCategory?.icon}</div>
            <div>
              <h2 style={styles.categoryName}>{currentCategory?.name}</h2>
              <p style={styles.categoryDescription}>{currentCategory?.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%`, background: currentCategory?.color }} />
          </div>
          <p style={styles.progressText}>{completedCount} of {currentTasks.length} tasks completed • {Math.round(progress)}% done</p>
        </div>

        {/* Search */}
        <div style={styles.searchContainer}>
          <Search size={16} color="#999" />
          <input type="text" placeholder="Search tasks..." style={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Tasks List */}
        <div style={styles.tasksSection}>
          <div style={styles.tasksHeader}>
            <h3 style={styles.tasksTitle}>Tasks</h3>
            <button style={styles.addTaskBtn} onClick={() => setShowAddTask(true)}><Plus size={14} /> Add Task</button>
          </div>

          <div style={styles.tasksList}>
            {filteredTasks.length === 0 ? (
              <div style={styles.emptyTasks}>
                <Check size={48} color="#CCC" />
                <p>No tasks in this checklist yet</p>
                <button onClick={() => setShowAddTask(true)} style={styles.emptyAddBtn}>Add Your First Task →</button>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div key={task.id} style={styles.taskCard}>
                  <button onClick={() => toggleTask(task.id)} style={styles.taskCheckbox}>
                    {task.completed && <Check size={12} color="white" />}
                  </button>
                  <div style={styles.taskContent}>
                    <p style={{...styles.taskText, textDecoration: task.completed ? "line-through" : "none", opacity: task.completed ? 0.6 : 1}}>
                      {task.text}
                    </p>
                    <div style={styles.taskMeta}>
                      <span style={styles.taskDeadline}><Calendar size={10} /> {task.deadline}</span>
                      <span style={{...styles.taskPriority, background: `${getPriorityColor(task.priority)}15`, color: getPriorityColor(task.priority)}}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => deleteTask(task.id)} style={styles.taskDelete}><Trash2 size={14} color="#999" /></button>
                </div>
              ))
            )}
          </div>

          {/* AI Premium Suggestion */}
          {!isPremium && (
            <div style={styles.aiSuggestion}>
              <Crown size={20} color="#E77291" />
              <div>
                <p style={styles.aiSuggestionTitle}>✨ AI-Powered Task Recommendations</p>
                <p style={styles.aiSuggestionText}>Get personalized task suggestions based on your wedding timeline</p>
              </div>
              <button onClick={() => navigate("/premium")} style={styles.aiSuggestionBtn}>Upgrade →</button>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div style={styles.modalOverlay} onClick={() => setShowAddTask(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>Add Task to {currentCategory?.name}</h3>
              <button onClick={() => setShowAddTask(false)} style={styles.modalClose}>✕</button>
            </div>
            <div style={styles.modalContent}>
              <input type="text" placeholder="Task name" style={styles.modalInput} value={newTask.text} onChange={(e) => setNewTask({...newTask, text: e.target.value})} />
              <input type="text" placeholder="Deadline (e.g., 2 months before)" style={styles.modalInput} value={newTask.deadline} onChange={(e) => setNewTask({...newTask, deadline: e.target.value})} />
              <select style={styles.modalSelect} value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})}>
                <option value="high">🔴 High Priority</option>
                <option value="medium">🟠 Medium Priority</option>
                <option value="low">🟢 Low Priority</option>
              </select>
              <div style={styles.modalActions}>
                <button onClick={() => setShowAddTask(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={addTask} style={styles.addBtn}>Add Task</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Category Modal */}
      {showCreateCategory && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateCategory(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3>Create New Checklist</h3>
              <button onClick={() => setShowCreateCategory(false)} style={styles.modalClose}>✕</button>
            </div>
            <div style={styles.modalContent}>
              <input type="text" placeholder="Checklist name (e.g., Honeymoon Planning)" style={styles.modalInput} value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} />
              <div style={styles.iconPicker}>
                <label>Choose an icon:</label>
                <div style={styles.iconOptions}>
                  {["📋", "✈️", "🏖️", "🎪", "🎭", "📷", "🍽️", "🍰", "🎈", "💐", "🎁", "📖"].map(icon => (
                    <button key={icon} onClick={() => setNewCategory({...newCategory, icon: icon})} style={{...styles.iconOption, ...(newCategory.icon === icon ? styles.iconOptionActive : {})}}>{icon}</button>
                  ))}
                </div>
              </div>
              <div style={styles.colorPicker}>
                <label>Choose a color:</label>
                <div style={styles.colorOptions}>
                  {["#E77291", "#AC1634", "#7A002B", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#A29BFE", "#FFEAA7"].map(color => (
                    <button key={color} onClick={() => setNewCategory({...newCategory, color: color})} style={{...styles.colorOption, background: color, border: newCategory.color === color ? "2px solid #3E0014" : "2px solid transparent"}} />
                  ))}
                </div>
              </div>
              <div style={styles.modalActions}>
                <button onClick={() => setShowCreateCategory(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={createNewCategory} style={styles.createBtn}>Create Checklist</button>
              </div>
            </div>
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
  menuBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  headerRight: { display: "flex", gap: "12px", alignItems: "center" },
  aiBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  messageBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "10px", borderRadius: "12px" },
  mainContent: { maxWidth: "800px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "32px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  categorySelector: { display: "flex", gap: "12px", marginBottom: "24px", alignItems: "center" },
  dropdownContainer: { flex: 1, position: "relative" },
  dropdownTrigger: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "14px 20px", background: "white", border: "1px solid #F5D0DA", borderRadius: "16px", cursor: "pointer", fontSize: "16px", fontWeight: 500 },
  dropdownSelected: { display: "flex", alignItems: "center", gap: "12px" },
  selectedIcon: { fontSize: "24px" },
  selectedName: { fontWeight: 600, color: "#3E0014" },
  selectedCount: { fontSize: "12px", color: "#999", background: "#FDF0F3", padding: "2px 8px", borderRadius: "999px" },
  dropdownMenu: { position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "white", borderRadius: "16px", border: "1px solid #F5D0DA", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100, maxHeight: "300px", overflowY: "auto" },
  dropdownHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #F5D0DA", fontSize: "12px", color: "#999" },
  createCategoryBtn: { display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#AC1634", cursor: "pointer", fontSize: "12px" },
  dropdownItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", width: "100%", background: "none", border: "none", cursor: "pointer", transition: "background 0.2s", "&:hover": { background: "#FDF0F3" } },
  dropdownItemActive: { background: "#FDF0F3" },
  dropdownItemIcon: { fontSize: "20px" },
  dropdownItemName: { flex: 1, textAlign: "left", fontSize: "14px" },
  dropdownItemCount: { fontSize: "11px", color: "#999" },
  addCategoryBtn: { width: "44px", height: "44px", borderRadius: "12px", background: "#FDF0F3", border: "1px solid #F5D0DA", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#AC1634" },
  categoryInfo: { background: "white", borderRadius: "20px", overflow: "hidden", marginBottom: "24px", border: "1px solid #F5D0DA" },
  categoryColorBar: { height: "4px" },
  categoryInfoContent: { display: "flex", alignItems: "center", gap: "20px", padding: "20px" },
  categoryIconLarge: { fontSize: "48px" },
  categoryName: { fontSize: "22px", fontWeight: 600, color: "#3E0014", marginBottom: "4px" },
  categoryDescription: { fontSize: "13px", color: "#666" },
  progressContainer: { marginBottom: "24px" },
  progressBar: { height: "6px", background: "#F5D0DA", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" },
  progressFill: { height: "100%", borderRadius: "3px", transition: "width 0.3s" },
  progressText: { fontSize: "12px", color: "#666", textAlign: "right" },
  searchContainer: { display: "flex", alignItems: "center", gap: "10px", background: "white", padding: "10px 16px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #F5D0DA" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px" },
  tasksSection: { background: "white", borderRadius: "20px", padding: "20px", border: "1px solid #F5D0DA" },
  tasksHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
  tasksTitle: { fontSize: "16px", fontWeight: 600, color: "#3E0014", margin: 0 },
  addTaskBtn: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer", fontSize: "12px" },
  tasksList: { display: "flex", flexDirection: "column", gap: "10px", maxHeight: "400px", overflowY: "auto" },
  taskCard: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#FDF0F3", borderRadius: "12px", border: "1px solid #F5D0DA" },
  taskCheckbox: { width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #AC1634", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  taskContent: { flex: 1 },
  taskText: { fontSize: "13px", fontWeight: 500, color: "#3E0014", marginBottom: "6px" },
  taskMeta: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" },
  taskDeadline: { display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#999" },
  taskPriority: { padding: "2px 8px", borderRadius: "999px", fontSize: "9px", fontWeight: 500 },
  taskDelete: { background: "none", border: "none", cursor: "pointer", padding: "4px" },
  emptyTasks: { textAlign: "center", padding: "40px 20px", color: "#999" },
  emptyAddBtn: { marginTop: "16px", padding: "8px 20px", background: "#AC1634", color: "white", border: "none", borderRadius: "999px", cursor: "pointer" },
  aiSuggestion: { display: "flex", alignItems: "center", gap: "12px", background: "#FDF0F3", padding: "12px 16px", borderRadius: "12px", marginTop: "20px", flexWrap: "wrap" },
  aiSuggestionTitle: { fontSize: "12px", fontWeight: 600, color: "#AC1634", marginBottom: "2px" },
  aiSuggestionText: { fontSize: "11px", color: "#666" },
  aiSuggestionBtn: { background: "#AC1634", color: "white", border: "none", padding: "6px 12px", borderRadius: "999px", cursor: "pointer", fontSize: "11px" },
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
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "450px" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalClose: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  modalContent: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  modalInput: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  modalSelect: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  modalActions: { display: "flex", gap: "12px", marginTop: "8px" },
  cancelBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  addBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontWeight: 600 },
  iconPicker: { display: "flex", flexDirection: "column", gap: "8px" },
  iconOptions: { display: "flex", gap: "8px", flexWrap: "wrap" },
  iconOption: { width: "44px", height: "44px", fontSize: "24px", borderRadius: "12px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  iconOptionActive: { borderColor: "#AC1634", background: "#FDF0F3" },
  colorPicker: { display: "flex", flexDirection: "column", gap: "8px" },
  colorOptions: { display: "flex", gap: "8px", flexWrap: "wrap" },
  colorOption: { width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", transition: "all 0.2s" },
  createBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontWeight: 600 }
};