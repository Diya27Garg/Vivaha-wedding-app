// src/pages/Checklist.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, Plus, X, Calendar, Flag, Trash2, Sparkles, GripVertical, 
  Lock, Crown, AlertCircle, Clock, Heart
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";

export default function Checklist({ user = { premium: false } }) {
  const navigate = useNavigate();
  const isPremium = user?.premium || false;
  
  const [tasks, setTasks] = useState([
    { id: 1, text: "Book wedding venue", completed: false, category: "Venue", deadline: "6 months before", priority: "high" },
    { id: 2, text: "Hire photographer", completed: false, category: "Photography", deadline: "8 months before", priority: "high" },
    { id: 3, text: "Finalize guest list", completed: true, category: "Planning", deadline: "4 months before", priority: "medium" },
    { id: 4, text: "Book caterer", completed: false, category: "Catering", deadline: "7 months before", priority: "high" },
    { id: 5, text: "Order wedding invitations", completed: false, category: "Stationery", deadline: "5 months before", priority: "medium" },
    { id: 6, text: "Book makeup artist", completed: false, category: "Beauty", deadline: "6 months before", priority: "medium" },
    { id: 7, text: "Arrange wedding transportation", completed: false, category: "Logistics", deadline: "3 months before", priority: "low" },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showAITutorial, setShowAITutorial] = useState(true);
  const [newTask, setNewTask] = useState({ text: "", category: "Planning", deadline: "", priority: "medium" });
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    // Auto-hide tutorial after 5 seconds
    const timer = setTimeout(() => {
      setShowAITutorial(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask.text.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask.text, 
        completed: false, 
        category: newTask.category,
        deadline: newTask.deadline || "Not set",
        priority: newTask.priority
      }]);
      setNewTask({ text: "", category: "Planning", deadline: "", priority: "medium" });
      setShowAddTask(false);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, targetTask) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === targetTask.id) return;
    
    const newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex(t => t.id === draggedTask.id);
    const targetIndex = newTasks.findIndex(t => t.id === targetTask.id);
    
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);
    setTasks(newTasks);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  const categories = ["Planning", "Venue", "Photography", "Catering", "Beauty", "Stationery", "Logistics"];
  const priorities = { high: "#F44336", medium: "#FF9800", low: "#4CAF50" };

  const navItems = [
    { icon: "🏠", label: "Home", path: "/home" },
    { icon: "✓", label: "Checklist", path: "/checklist" },
    { icon: "✨", label: "Inspire", path: "/inspiration" },
    { icon: "📦", label: "Package", path: "/package" },
    { icon: "👤", label: "Profile", path: "/profile" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate("/home")} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <div style={styles.headerPlaceholder} />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.heroSection}>
          <h1 style={styles.title}>Wedding Checklist</h1>
          <p style={styles.subtitle}>Stay organized and never miss a thing</p>
          
          {/* Progress Bar */}
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
            <p style={styles.progressText}>{completedCount} of {tasks.length} tasks completed</p>
          </div>
        </div>

        {/* AI Tutorial - Premium Gate */}
        {showAITutorial && (
          <div style={styles.tutorialCard}>
            <div style={styles.tutorialHeader}>
              <Sparkles size={20} color="#E77291" />
              <h3 style={styles.tutorialTitle}>AI-Powered Wedding Planning</h3>
            </div>
            <div style={styles.tutorialSteps}>
              <div style={styles.tutorialStep}>1️⃣ Drag tasks to reorder</div>
              <div style={styles.tutorialStep}>2️⃣ Check off completed items</div>
              <div style={styles.tutorialStep}>3️⃣ Add custom tasks</div>
            </div>
            {!isPremium && (
              <div style={styles.premiumGate}>
                <Lock size={16} color="#AC1634" />
                <span>AI recommendations available with Premium</span>
                <button onClick={() => navigate("/premium")} style={styles.unlockBtn}>Unlock →</button>
              </div>
            )}
            <button onClick={() => setShowAITutorial(false)} style={styles.closeTutorial}>Got it ✕</button>
          </div>
        )}

        {/* Add Task Button */}
        <button onClick={() => setShowAddTask(true)} style={styles.addTaskBtn}>
          <Plus size={18} /> Add New Task
        </button>

        {/* Tasks List - Draggable */}
        <div style={styles.tasksContainer}>
          {tasks.map(task => (
            <div 
              key={task.id} 
              draggable={isPremium}
              onDragStart={(e) => isPremium && handleDragStart(e, task)}
              onDragOver={(e) => isPremium && handleDragOver(e, task)}
              style={styles.taskCard}
            >
              <div style={styles.dragHandle}>
                <GripVertical size={16} color="#CCC" />
              </div>
              <button onClick={() => toggleTask(task.id)} style={styles.checkbox}>
                {task.completed && <Check size={14} color="white" />}
              </button>
              <div style={styles.taskContent}>
                <p style={{...styles.taskText, textDecoration: task.completed ? "line-through" : "none", opacity: task.completed ? 0.6 : 1}}>
                  {task.text}
                </p>
                <div style={styles.taskMeta}>
                  <span style={styles.taskCategory}><Calendar size={10} /> {task.deadline}</span>
                  <span style={styles.taskType}>{task.category}</span>
                  <span style={{...styles.priorityDot, background: priorities[task.priority]}} />
                </div>
              </div>
              <button onClick={() => deleteTask(task.id)} style={styles.deleteBtn}>
                <Trash2 size={16} color="#999" />
              </button>
            </div>
          ))}
        </div>

        {/* AI Premium Suggestion */}
        {!isPremium && tasks.length > 0 && (
          <div style={styles.aiSuggestionCard}>
            <Crown size={20} color="#E77291" />
            <div>
              <p style={styles.aiSuggestionTitle}>✨ Premium AI Insight</p>
              <p style={styles.aiSuggestionText}>Based on your timeline, we recommend booking your venue within the next 2 weeks for best availability.</p>
            </div>
            <button onClick={() => navigate("/premium")} style={styles.upgradeSmallBtn}>Upgrade</button>
          </div>
        )}

        {/* Premium-only feature preview */}
        {!isPremium && (
          <div style={styles.previewCard}>
            <Heart size={20} color="#AC1634" />
            <div>
              <p style={styles.previewTitle}>Premium Features</p>
              <p style={styles.previewText}>AI timeline optimization, priority support, and exclusive vendor deals</p>
            </div>
            <button onClick={() => navigate("/premium")} style={styles.previewBtn}>Learn More →</button>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div style={styles.modalOverlay} onClick={() => setShowAddTask(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Add New Task</h3>
              <button onClick={() => setShowAddTask(false)} style={styles.modalClose}>✕</button>
            </div>
            <div style={styles.modalContent}>
              <input 
                type="text" 
                placeholder="Task name" 
                style={styles.modalInput}
                value={newTask.text}
                onChange={(e) => setNewTask({...newTask, text: e.target.value})}
              />
              <select 
                style={styles.modalSelect}
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input 
                type="text" 
                placeholder="Deadline (e.g., 6 months before)" 
                style={styles.modalInput}
                value={newTask.deadline}
                onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
              />
              <select 
                style={styles.modalSelect}
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="high">High Priority 🔴</option>
                <option value="medium">Medium Priority 🟠</option>
                <option value="low">Low Priority 🟢</option>
              </select>
              <div style={styles.modalActions}>
                <button onClick={() => setShowAddTask(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={addTask} style={styles.addBtn}>Add Task</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Consistent across pages */}
      <div className="bottom-nav" style={styles.bottomNav}>
        {navItems.map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} style={{
            ...styles.navItem,
            color: window.location.pathname === item.path ? "#AC1634" : "#999"
          }}>
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", fontSize: "14px" },
  headerPlaceholder: { width: "70px" },
  mainContent: { maxWidth: "900px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "48px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#3E0014", marginBottom: "12px" },
  subtitle: { fontSize: "18px", color: "#7A5560", marginBottom: "32px" },
  progressContainer: { maxWidth: "400px", margin: "0 auto" },
  progressBar: { height: "8px", background: "#F5D0DA", borderRadius: "4px", overflow: "hidden" },
  progressFill: { height: "100%", background: "#AC1634", borderRadius: "4px", transition: "width 0.3s" },
  progressText: { fontSize: "13px", color: "#666", textAlign: "center", marginTop: "12px" },
  tutorialCard: { background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "20px", padding: "20px", marginBottom: "24px", color: "white" },
  tutorialHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  tutorialTitle: { fontSize: "16px", fontWeight: 600, margin: 0 },
  tutorialSteps: { display: "flex", gap: "24px", marginBottom: "16px", flexWrap: "wrap" },
  tutorialStep: { fontSize: "13px", opacity: 0.9 },
  premiumGate: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", marginBottom: "12px" },
  unlockBtn: { marginLeft: "auto", background: "#E77291", border: "none", padding: "6px 16px", borderRadius: "999px", color: "#3E0014", fontWeight: 600, cursor: "pointer" },
  closeTutorial: { background: "none", border: "1px solid rgba(255,255,255,0.3)", padding: "6px 12px", borderRadius: "999px", cursor: "pointer", color: "white", fontSize: "12px" },
  addTaskBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "14px", background: "white", border: "1px dashed #AC1634", borderRadius: "16px", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: "#AC1634", marginBottom: "24px" },
  tasksContainer: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" },
  taskCard: { display: "flex", alignItems: "center", gap: "12px", background: "white", padding: "14px 20px", borderRadius: "16px", border: "1px solid #F5D0DA" },
  dragHandle: { cursor: "grab", color: "#CCC" },
  checkbox: { width: "22px", height: "22px", borderRadius: "50%", border: "2px solid #AC1634", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  taskContent: { flex: 1 },
  taskText: { fontSize: "15px", fontWeight: 500, color: "#3E0014", marginBottom: "6px" },
  taskMeta: { display: "flex", gap: "12px", fontSize: "11px", color: "#999", alignItems: "center" },
  taskCategory: { display: "flex", alignItems: "center", gap: "4px" },
  taskType: { background: "#FDF0F3", padding: "2px 8px", borderRadius: "999px" },
  priorityDot: { width: "8px", height: "8px", borderRadius: "50%" },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px" },
  aiSuggestionCard: { display: "flex", alignItems: "center", gap: "16px", background: "#FDF0F3", padding: "16px", borderRadius: "16px", border: "1px solid #F5D0DA", marginBottom: "16px" },
  aiSuggestionTitle: { fontSize: "13px", fontWeight: 600, color: "#AC1634", marginBottom: "4px" },
  aiSuggestionText: { fontSize: "13px", color: "#666" },
  upgradeSmallBtn: { background: "#AC1634", border: "none", padding: "6px 16px", borderRadius: "999px", color: "white", cursor: "pointer", fontSize: "12px" },
  previewCard: { display: "flex", alignItems: "center", gap: "16px", background: "linear-gradient(135deg, #FFF5F7, white)", padding: "20px", borderRadius: "20px", border: "1px solid #F5D0DA" },
  previewTitle: { fontSize: "14px", fontWeight: 600, color: "#3E0014", marginBottom: "4px" },
  previewText: { fontSize: "13px", color: "#666" },
  previewBtn: { marginLeft: "auto", background: "none", border: "1px solid #AC1634", padding: "8px 16px", borderRadius: "999px", color: "#AC1634", cursor: "pointer", fontSize: "12px" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "white", borderRadius: "24px", width: "90%", maxWidth: "450px" },
  modalHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: "18px", fontWeight: 600, margin: 0 },
  modalClose: { background: "none", border: "none", fontSize: "20px", cursor: "pointer" },
  modalContent: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px" },
  modalInput: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  modalSelect: { padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  modalActions: { display: "flex", gap: "12px", marginTop: "8px" },
  cancelBtn: { flex: 1, padding: "12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer" },
  addBtn: { flex: 2, padding: "12px", borderRadius: "999px", border: "none", background: "#AC1634", color: "white", cursor: "pointer", fontWeight: 600 },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #F5D0DA", padding: "12px 32px", display: "flex", justifyContent: "center", gap: "48px", zIndex: 100 },
  navItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 500 }
};