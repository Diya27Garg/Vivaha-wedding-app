// src/components/AIWeddingAssistant.jsx
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader, MessageCircle, Lightbulb, Heart, Calendar, DollarSign, MapPin, Users, X, Minimize2, Maximize2 } from "lucide-react";

export default function AIWeddingAssistant({ user, weddingDetails, onClose, isOpen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: "✨ AI Wedding Assistant (Demo Mode)\n\nThis feature will be available in the full version. For now, here are some wedding planning tips:\n\n• Book your venue 8-10 months in advance\n• Set a budget and stick to it\n• Create a wedding checklist\n• Research vendors thoroughly\n• Take breaks to avoid stress\n\nUpgrade to Premium to unlock the complete AI assistant!"
        }
      ]);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userMsgObj = { id: Date.now(), role: "user", content: userMessage };
    setMessages(prev => [...prev, userMsgObj]);
    setInput("");
    setLoading(true);

    const typingIndicator = { id: "typing", role: "typing", content: "" };
    setMessages(prev => [...prev, typingIndicator]);

    // Demo response (no API call)
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== "typing"));
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "🚀 This feature is coming soon! In the full version, I'll provide personalized wedding planning advice based on your date, budget, and preferences. For now, here's a tip: Start your wedding planning at least 8-10 months in advance for the best vendor availability!\n\n💡 Pro tip: Create a wedding email address to manage all vendor communications in one place."
      }]);
      setLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    setMessages([{ 
      id: 1, 
      role: "assistant", 
      content: "✨ AI Wedding Assistant (Demo Mode)\n\nAsk me anything about wedding planning, and I'll provide helpful tips! (Full AI features coming soon)"
    }]);
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div style={minimizedStyles.container} onClick={() => setIsMinimized(false)}>
        <Sparkles size={20} color="#E77291" />
        <span>AI Wedding Assistant (Demo)</span>
        <button onClick={onClose} style={minimizedStyles.closeBtn}>✕</button>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}><Sparkles size={20} color="#E77291" /></div>
            <div><h3 style={styles.headerTitle}>AI Wedding Assistant</h3><p style={styles.headerSubtitle}>Demo Mode • Coming Soon</p></div>
          </div>
          <div style={styles.headerActions}>
            <button onClick={() => setIsMinimized(true)} style={styles.minimizeBtn}><Minimize2 size={18} /></button>
            <button onClick={onClose} style={styles.closeBtn}><X size={18} /></button>
          </div>
        </div>

        <div style={styles.contextBanner}>
          <div style={styles.contextItem}><Heart size={12} color="#E77291" /> Demo Version</div>
          <div style={styles.contextItem}><Calendar size={12} color="#E77291" /> Full features on Premium</div>
        </div>

        <div style={styles.messagesContainer}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ ...styles.message, ...(msg.role === "user" ? styles.userMessage : styles.assistantMessage) }}>
              <div style={styles.messageIcon}>{msg.role === "user" ? "👤" : msg.role === "typing" ? "🤖✨" : "🤖"}</div>
              <div style={styles.messageContent}>
                {msg.role === "typing" ? (
                  <div style={styles.typingIndicator}><span></span><span></span><span></span></div>
                ) : (
                  <p style={styles.messageText}>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask a wedding planning question... (Demo Mode)"
            style={styles.textarea}
            rows="2"
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} style={{ ...styles.sendBtn, ...((loading || !input.trim()) ? styles.sendBtnDisabled : {}) }}>
            {loading ? <Loader size={18} className="spinning" /> : <Send size={18} />}
          </button>
        </div>

        <button onClick={clearChat} style={styles.clearBtn}>Clear Chat</button>

        <style>{`
          .spinning { animation: spin 1s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes dotPulse { 0%, 60%, 100% { transform: scale(1); opacity: 0.6; } 30% { transform: scale(1.3); opacity: 1; } }
        `}</style>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 },
  container: { width: "400px", height: "550px", background: "white", borderRadius: "24px", boxShadow: "0 20px 40px rgba(62,0,20,0.25)", display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid #F5D0DA" },
  header: { padding: "16px 20px", background: "#3E0014", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerIcon: { width: "36px", height: "36px", borderRadius: "50%", background: "rgba(231,114,145,0.2)", display: "flex", alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: "16px", fontWeight: 600, margin: 0 },
  headerSubtitle: { fontSize: "10px", opacity: 0.7, margin: 0 },
  headerActions: { display: "flex", gap: "8px" },
  minimizeBtn: { background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "white" },
  closeBtn: { background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "white" },
  contextBanner: { display: "flex", gap: "12px", padding: "12px 16px", background: "#FDF0F3", borderBottom: "1px solid #F5D0DA", fontSize: "11px", justifyContent: "center" },
  contextItem: { display: "flex", alignItems: "center", gap: "4px", color: "#AC1634", fontWeight: 500 },
  messagesContainer: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" },
  message: { display: "flex", gap: "12px", maxWidth: "85%" },
  userMessage: { alignSelf: "flex-end", flexDirection: "row-reverse" },
  assistantMessage: { alignSelf: "flex-start" },
  messageIcon: { width: "32px", height: "32px", borderRadius: "50%", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 },
  messageContent: { background: "#FDF0F3", padding: "12px 16px", borderRadius: "16px", maxWidth: "100%" },
  messageText: { fontSize: "13px", lineHeight: 1.5, margin: 0, color: "#333", whiteSpace: "pre-wrap" },
  typingIndicator: { display: "flex", gap: "6px", padding: "4px 0", "& span": { width: "8px", height: "8px", borderRadius: "50%", background: "#AC1634", animation: "dotPulse 1.4s ease-in-out infinite" } },
  inputContainer: { padding: "16px", borderTop: "1px solid #F5D0DA", display: "flex", gap: "12px", background: "white" },
  textarea: { flex: 1, padding: "10px 14px", borderRadius: "20px", border: "1px solid #F5D0DA", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", resize: "none", outline: "none" },
  sendBtn: { width: "40px", height: "40px", borderRadius: "50%", background: "#AC1634", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", alignSelf: "flex-end" },
  sendBtnDisabled: { background: "#F5D0DA", cursor: "not-allowed" },
  clearBtn: { margin: "8px 16px 16px", padding: "8px", borderRadius: "999px", background: "none", border: "1px solid #F5D0DA", fontSize: "12px", cursor: "pointer", color: "#666" }
};

const minimizedStyles = {
  container: { position: "fixed", bottom: "20px", right: "20px", background: "#3E0014", color: "white", padding: "12px 20px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 1000 },
  closeBtn: { background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", color: "white", fontSize: "12px", marginLeft: "8px" }
};