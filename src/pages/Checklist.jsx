import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, ClipboardList, Sparkles, Package, User,
  Plus, X, Crown, ChevronDown, GripVertical,
  Calendar, ArrowLeft, Info, Bot
} from "lucide-react";

const defaultTasks = [
  { id: 1, text: "Book wedding venue", category: "Venue", done: false, deadline: "2025-09-01", priority: "high" },
  { id: 2, text: "Finalise guest list", category: "Planning", done: false, deadline: "2025-08-15", priority: "high" },
  { id: 3, text: "Book photographer", category: "Vendors", done: false, deadline: "2025-09-15", priority: "medium" },
  { id: 4, text: "Choose bridal outfit", category: "Outfits", done: true, deadline: "2025-10-01", priority: "medium" },
  { id: 5, text: "Book caterer", category: "Vendors", done: false, deadline: "2025-09-20", priority: "high" },
  { id: 6, text: "Send invitations", category: "Planning", done: false, deadline: "2025-10-15", priority: "medium" },
  { id: 7, text: "Book makeup artist", category: "Vendors", done: true, deadline: "2025-09-30", priority: "low" },
  { id: 8, text: "Plan honeymoon", category: "Planning", done: false, deadline: "2025-11-01", priority: "low" },
];

const categoryColors = {
  Venue: { bg: "#FFF0F3", text: "#AC1634", border: "#F5D0DA" },
  Planning: { bg: "#F0F3FF", text: "#3451AC", border: "#D0DAF5" },
  Vendors: { bg: "#F0FFF3", text: "#1AAC4F", border: "#D0F5DA" },
  Outfits: { bg: "#FFF8F0", text: "#AC6C1A", border: "#F5E5D0" },
  Custom: { bg: "#F8F0FF", text: "#7A1AAC", border: "#E5D0F5" },
};

const priorityColors = {
  high: "#AC1634",
  medium: "#E77291",
  low: "#7A5560",
};

const tutorialSteps = [
  { icon: "💗", title: "Heart to complete", desc: "Tap the heart checkbox on any task to mark it as done. Watch it fill up!" },
  { icon: "➕", title: "Add your own tasks", desc: "Hit the + button to create custom task tiles with your own deadlines and priority levels." },
  { icon: "☰", title: "Drag to reorder", desc: "Hold and drag the grip handle on the left of any task to reorder your checklist." },
  { icon: "📅", title: "Set deadlines", desc: "Each task has a deadline so you never miss an important wedding milestone." },
  { icon: "🤖", title: "AI Assistant", desc: "The AI assistant (Premium) can generate your entire checklist, suggest timelines, and prioritize tasks for you." },
];

export default function Checklist() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(defaultTasks);
  const [addOpen, setAddOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [dragId, setDragId] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [newTask, setNewTask] = useState({
    text: "", category: "Custom", deadline: "", priority: "medium"
  });

  const navItems = [
    { icon: <Home size={20} strokeWidth={1.5} />, label: "Home", path: "/home" },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: "Checklist", path: "/checklist" },
    { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Inspire", path: "/inspiration" },
    { icon: <Package size={20} strokeWidth={1.5} />, label: "Package", path: "/package" },
    { icon: <User size={20} strokeWidth={1.5} />, label: "Profile", path: "/profile" },
  ];

  const toggleDone = (id) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id) => setTasks(t => t.filter(task => task.id !== id));

  const addTask = () => {
    if (!newTask.text.trim()) return;
    setTasks(t => [...t, { ...newTask, id: Date.now(), done: false }]);
    setNewTask({ text: "", category: "Custom", deadline: "", priority: "medium" });
    setAddOpen(false);
  };

  const handleDragStart = (id) => setDragId(id);
  const handleDragOver = (e, overId) => {
    e.preventDefault();
    if (dragId === overId) return;
    setTasks(prev => {
      const from = prev.findIndex(t => t.id === dragId);
      const to = prev.findIndex(t => t.id === overId);
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);
  const categories = ["All", ...new Set(tasks.map(t => t.category))];
  const filtered = filterCat === "All" ? tasks : tasks.filter(t => t.category === filterCat);

  const getDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return { text: "Overdue", color: "#AC1634" };
    if (diff === 0) return { text: "Due today!", color: "#AC1634" };
    if (diff <= 7) return { text: `${diff}d left`, color: "#E77291" };
    return { text: `${diff}d left`, color: "#7A5560" };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#3E0014", padding: "18px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0
      }}>
        <button onClick={() => navigate("/home")} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "8px", borderRadius: 10
        }}>
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#FFFFFF", fontSize: 22 }}>
          Wedding Checklist
        </h1>
        <button onClick={() => setAiOpen(true)} style={{
          background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)",
          color: "#E77291", cursor: "pointer", display: "flex", padding: "8px", borderRadius: 10
        }}>
          <Bot size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Progress Banner */}
      <div style={{
        background: "linear-gradient(160deg, #3E0014, #7A002B)",
        padding: "20px 20px 28px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            {done} of {tasks.length} tasks completed
          </p>
          <p style={{ color: "#E77291", fontSize: 13, fontWeight: 700 }}>{pct}%</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 99, height: 8, overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`, height: "100%",
            background: "linear-gradient(90deg, #E77291, #AC1634)",
            borderRadius: 99, transition: "width 0.6s ease"
          }} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 8 }}>
          {pct < 30 ? "Just getting started 💪" : pct < 70 ? "Great progress! Keep going 🌸" : "Almost there! You're doing amazing 💍"}
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16, marginBottom: 4 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)} style={{
              padding: "7px 16px", borderRadius: 999, flexShrink: 0,
              border: `1.5px solid ${filterCat === c ? "#3E0014" : "#F5D0DA"}`,
              background: filterCat === c ? "#3E0014" : "white",
              color: filterCat === c ? "white" : "#7A5560",
              fontWeight: 500, fontSize: 12, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif"
            }}>{c}</button>
          ))}
        </div>

        {/* Task List */}
        {filtered.map(task => {
          const catColor = categoryColors[task.category] || categoryColors.Custom;
          const daysLeft = getDaysLeft(task.deadline);
          return (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task.id)}
              onDragOver={(e) => handleDragOver(e, task.id)}
              style={{
                background: task.done ? "#FFF5F7" : "white",
                borderRadius: 18, padding: "14px 16px",
                marginBottom: 10,
                boxShadow: "0 2px 12px rgba(62,0,20,0.07)",
                border: `1px solid ${task.done ? "#F5D0DA" : "#F5E8EA"}`,
                display: "flex", alignItems: "center", gap: 12,
                opacity: task.done ? 0.75 : 1,
                transition: "all 0.2s",
                cursor: "grab"
              }}
            >
              {/* Drag Handle */}
              <div style={{ color: "#E0C0C8", flexShrink: 0 }}>
                <GripVertical size={16} strokeWidth={1.5} />
              </div>

              {/* Heart Checkbox */}
              <button
                onClick={() => toggleDone(task.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, flexShrink: 0, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 22, lineHeight: 1,
                  transition: "transform 0.2s",
                  transform: task.done ? "scale(1.2)" : "scale(1)"
                }}
              >
                {task.done ? "💗" : "🤍"}
              </button>

              {/* Task Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontWeight: 500, fontSize: 14, color: "#1A1A1A",
                  textDecoration: task.done ? "line-through" : "none",
                  marginBottom: 4, whiteSpace: "nowrap",
                  overflow: "hidden", textOverflow: "ellipsis"
                }}>{task.text}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {/* Category Tag */}
                  <span style={{
                    background: catColor.bg, color: catColor.text,
                    border: `1px solid ${catColor.border}`,
                    fontSize: 10, padding: "2px 8px", borderRadius: 99, fontWeight: 600
                  }}>{task.category}</span>

                  {/* Priority dot */}
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: priorityColors[task.priority],
                    display: "inline-block"
                  }} />

                  {/* Deadline */}
                  {daysLeft && (
                    <span style={{ color: daysLeft.color, fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                      <Calendar size={10} strokeWidth={1.5} />
                      {daysLeft.text}
                    </span>
                  )}
                </div>
              </div>

              {/* Delete */}
              <button onClick={() => deleteTask(task.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#E0C0C8", flexShrink: 0, display: "flex", padding: 4,
                borderRadius: 8
              }}>
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          );
        })}

        {/* Add Task Button */}
        <button onClick={() => setAddOpen(true)} style={{
          width: "100%", padding: "14px",
          background: "white", border: "1.5px dashed #F5D0DA",
          borderRadius: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          color: "#AC1634", fontSize: 14, fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif", marginBottom: 80
        }}>
          <Plus size={18} strokeWidth={2} /> Add a new task
        </button>

      </div>

      {/* Tutorial Button */}
      <button onClick={() => { setTutorialOpen(true); setTutorialStep(0); }} style={{
        position: "fixed", bottom: 80, right: 16,
        background: "#3E0014", border: "none", borderRadius: "50%",
        width: 44, height: 44, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(62,0,20,0.3)", zIndex: 90
      }}>
        <Info size={20} color="#E77291" strokeWidth={1.5} />
      </button>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {navItems.map(n => (
          <button key={n.path} onClick={() => navigate(n.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 4, background: "none", border: "none", cursor: "pointer",
            color: window.location.pathname === n.path ? "#AC1634" : "#CCBBBB"
          }}>
            {n.icon}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{n.label}</span>
          </button>
        ))}
      </div>

      {/* Add Task Modal */}
      {addOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.6)", display: "flex", alignItems: "flex-end", zIndex: 999 }}>
          <div style={{
            background: "white", width: "100%", maxWidth: 430, margin: "0 auto",
            borderRadius: "28px 28px 0 0", padding: "28px 20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 22 }}>New Task</h3>
              <button onClick={() => setAddOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#AC1634", display: "flex" }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                value={newTask.text}
                onChange={e => setNewTask(t => ({ ...t, text: e.target.value }))}
                placeholder="What needs to be done?"
                style={{
                  padding: "14px 16px", border: "1.5px solid #F5D0DA",
                  borderRadius: 14, fontSize: 15, outline: "none",
                  fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A", background: "#FDF8F9"
                }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 11, color: "#AC1634", fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>CATEGORY</p>
                  <select
                    value={newTask.category}
                    onChange={e => setNewTask(t => ({ ...t, category: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px",
                      border: "1.5px solid #F5D0DA", borderRadius: 12,
                      fontSize: 13, outline: "none", background: "#FDF8F9",
                      color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    {Object.keys(categoryColors).map(c => <option key={c}>{c}</option>)}
                    <option>Venue</option>
                    <option>Vendors</option>
                    <option>Planning</option>
                    <option>Outfits</option>
                  </select>
                </div>

                <div>
                  <p style={{ fontSize: 11, color: "#AC1634", fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>PRIORITY</p>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask(t => ({ ...t, priority: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px",
                      border: "1.5px solid #F5D0DA", borderRadius: 12,
                      fontSize: 13, outline: "none", background: "#FDF8F9",
                      color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 11, color: "#AC1634", fontWeight: 600, letterSpacing: 1, marginBottom: 6 }}>DEADLINE</p>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={e => setNewTask(t => ({ ...t, deadline: e.target.value }))}
                  style={{
                    width: "100%", padding: "12px 14px",
                    border: "1.5px solid #F5D0DA", borderRadius: 12,
                    fontSize: 13, outline: "none", background: "#FDF8F9",
                    color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif"
                  }}
                />
              </div>

              <button onClick={addTask} style={{
                padding: "15px", background: "linear-gradient(135deg, #AC1634, #3E0014)",
                color: "white", border: "none", borderRadius: 999,
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif"
              }}>
                Add Task 💗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Modal */}
      {tutorialOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div style={{
            background: "white", borderRadius: 28, padding: "32px 24px",
            width: "100%", maxWidth: 380, textAlign: "center"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{tutorialSteps[tutorialStep].icon}</div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 22, marginBottom: 10 }}>
              {tutorialSteps[tutorialStep].title}
            </h3>
            <p style={{ color: "#7A5560", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              {tutorialSteps[tutorialStep].desc}
            </p>

            {/* Step dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {tutorialSteps.map((_, i) => (
                <div key={i} style={{
                  width: i === tutorialStep ? 24 : 8, height: 8,
                  borderRadius: 99, background: i === tutorialStep ? "#3E0014" : "#F5D0DA",
                  transition: "all 0.3s"
                }} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {tutorialStep > 0 && (
                <button onClick={() => setTutorialStep(s => s - 1)} style={{
                  flex: 1, padding: "13px", background: "#FDF0F3",
                  color: "#AC1634", border: "1px solid #F5D0DA",
                  borderRadius: 999, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif"
                }}>← Back</button>
              )}
              <button onClick={() => {
                if (tutorialStep < tutorialSteps.length - 1) setTutorialStep(s => s + 1);
                else setTutorialOpen(false);
              }} style={{
                flex: 2, padding: "13px",
                background: "linear-gradient(135deg, #AC1634, #3E0014)",
                color: "white", border: "none", borderRadius: 999,
                fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
              }}>
                {tutorialStep < tutorialSteps.length - 1 ? "Next →" : "Got it! 💗"}
              </button>
            </div>

            <p onClick={() => setTutorialOpen(false)} style={{
              marginTop: 14, color: "#CCBBBB", fontSize: 12, cursor: "pointer"
            }}>Skip tutorial</p>
          </div>
        </div>
      )}

      {/* AI Assistant Modal — Premium Gate */}
      {aiOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(62,0,20,0.7)", display: "flex", alignItems: "flex-end", zIndex: 999 }}>
          <div style={{
            background: "white", width: "100%", maxWidth: 430, margin: "0 auto",
            borderRadius: "28px 28px 0 0", padding: "28px 20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "#3E0014", fontSize: 22 }}>
                AI Wedding Assistant
              </h3>
              <button onClick={() => setAiOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#AC1634", display: "flex" }}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Premium Gate */}
            <div style={{
              background: "linear-gradient(160deg, #3E0014, #7A002B)",
              borderRadius: 20, padding: "24px", marginBottom: 16, textAlign: "center"
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
              <p style={{ color: "#E77291", fontSize: 11, letterSpacing: 2, fontWeight: 600, marginBottom: 8 }}>PREMIUM FEATURE</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", color: "#FFFFFF", fontSize: 20, marginBottom: 10 }}>
                AI Checklist Assistant
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                Let AI generate your complete wedding checklist, create a personalized timeline, and remind you of every milestone — all based on your wedding date and budget.
              </p>

              {["Generate complete checklist", "Create 6-month timeline", "Prioritize your tasks", "Set smart reminders"].map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  textAlign: "left"
                }}>
                  <span style={{ color: "#E77291", fontSize: 12 }}>✦</span>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{f}</p>
                </div>
              ))}
            </div>

            <button onClick={() => { setAiOpen(false); navigate("/premium"); }} style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #AC1634, #3E0014)",
              color: "white", border: "none", borderRadius: 999,
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 8px 24px rgba(172,22,52,0.4)"
            }}>
              <Crown size={16} strokeWidth={1.5} /> Unlock AI Assistant with Premium
            </button>

            <p style={{ textAlign: "center", color: "#CCBBBB", fontSize: 11, marginTop: 12 }}>
              One-time payment of ₹10,000 · Lifetime access
            </p>
          </div>
        </div>
      )}
    </div>
  );
}