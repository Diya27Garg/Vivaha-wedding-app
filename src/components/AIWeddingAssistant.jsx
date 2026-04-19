// src/components/AIWeddingAssistant.jsx
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader, MessageCircle, Lightbulb, Heart, Calendar, DollarSign, MapPin, Users, X, Minimize2, Maximize2 } from "lucide-react";

export default function AIWeddingAssistant({ user, weddingDetails, onClose, isOpen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const [suggestions, setSuggestions] = useState([
    "What's a realistic wedding budget?",
    "How to choose a wedding venue?",
    "Wedding checklist timeline",
    "Unique wedding ideas",
    "How to save money on catering?",
    "Best wedding month in India?"
  ]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: `Namaste! I'm your AI Wedding Assistant 🤵\n\nI can help you with:\n• Budget planning and allocation\n• Vendor selection and negotiation tips\n• Wedding timeline and checklist\n• Cultural and regional wedding customs\n• Sustainable wedding ideas\n• Stress management and wellness tips\n\nWhat would you like to know about your wedding planning?`
        }
      ]);
    }
  }, []);

  const callGeminiAPI = async (userMessage) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!API_KEY) {
      return "⚠️ Gemini API key not found. Please add your API key to the .env file.\n\nYou can get a free API key from: https://makersuite.google.com/app/apikey";
    }

    // Create context-aware prompt
    const contextPrompt = `You are Vivaha AI, a professional Indian wedding planning assistant. 
    
Couple Information:
- Names: ${user?.firstName || "Guest"} & ${user?.spouseName || "Guest"}
- Wedding Date: ${weddingDetails?.weddingDate || user?.weddingDate || "Not set"}
- Location: ${weddingDetails?.city || user?.city || "Not set"}
- Budget: ${weddingDetails?.budget || user?.budget || "Not set"}
- Guest Count: ${weddingDetails?.guestCount || "Not specified"}

User Question: ${userMessage}

Please provide a helpful, practical, and friendly response specifically for Indian weddings. 
Keep responses concise (2-3 paragraphs max). Use bullet points for lists. 
Be warm and encouraging. Include specific Indian wedding context when relevant.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: contextPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
              topP: 0.8,
              topK: 40
            }
          })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        console.error("Gemini API Error:", data.error);
        return "I'm having trouble connecting right now. Please try again in a moment. 🙏";
      }
      
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return aiResponse || "I'm not sure how to answer that. Could you rephrase your question?";
      
    } catch (error) {
      console.error("API Error:", error);
      return "Network error. Please check your connection and try again.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userMsgObj = {
      id: Date.now(),
      role: "user",
      content: userMessage
    };
    
    setMessages(prev => [...prev, userMsgObj]);
    setInput("");
    setLoading(true);

    // Show typing indicator
    const typingIndicator = { id: "typing", role: "typing", content: "" };
    setMessages(prev => [...prev, typingIndicator]);

    const aiResponse = await callGeminiAPI(userMessage);
    
    // Remove typing indicator and add actual response
    setMessages(prev => prev.filter(m => m.id !== "typing"));
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: "assistant",
      content: aiResponse
    }]);
    
    setLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Chat cleared! How can I help with your wedding planning today? 💍"
      }
    ]);
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div style={minimizedStyles.container} onClick={() => setIsMinimized(false)}>
        <Sparkles size={20} color="#E77291" />
        <span>AI Wedding Assistant</span>
        <button onClick={() => onClose()} style={minimizedStyles.closeBtn}>✕</button>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <Sparkles size={20} color="#E77291" />
            </div>
            <div>
              <h3 style={styles.headerTitle}>AI Wedding Assistant</h3>
              <p style={styles.headerSubtitle}>Powered by Google Gemini AI</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button onClick={() => setIsMinimized(true)} style={styles.minimizeBtn}>
              <Minimize2 size={18} />
            </button>
            <button onClick={onClose} style={styles.closeBtn}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Wedding Context Banner */}
        <div style={styles.contextBanner}>
          <div style={styles.contextItem}><Heart size={12} color="#E77291" /> {user?.firstName || "Couple"}</div>
          <div style={styles.contextItem}><Calendar size={12} color="#E77291" /> {weddingDetails?.weddingDate || user?.weddingDate || "Date not set"}</div>
          <div style={styles.contextItem}><MapPin size={12} color="#E77291" /> {weddingDetails?.city || user?.city || "Location not set"}</div>
          <div style={styles.contextItem}><DollarSign size={12} color="#E77291" /> {weddingDetails?.budget || user?.budget || "Budget not set"}</div>
        </div>

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              ...styles.message,
              ...(msg.role === "user" ? styles.userMessage : styles.assistantMessage)
            }}>
              <div style={styles.messageIcon}>
                {msg.role === "user" ? "👤" : msg.role === "typing" ? "🤖✨" : "🤖"}
              </div>
              <div style={styles.messageContent}>
                {msg.role === "typing" ? (
                  <div style={styles.typingIndicator}>
                    <span></span><span></span><span></span>
                  </div>
                ) : (
                  <p style={styles.messageText}>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div style={styles.suggestionsContainer}>
            <p style={styles.suggestionsTitle}>Suggested Questions:</p>
            <div style={styles.suggestionsGrid}>
              {suggestions.map((s, i) => (
                <button key={i} style={styles.suggestionBtn} onClick={() => handleSuggestionClick(s)}>
                  <Lightbulb size={12} color="#E77291" /> {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear Chat Button */}
        {messages.length > 2 && (
          <button onClick={clearChat} style={styles.clearBtn}>
            Clear Chat
          </button>
        )}

        {/* Input Area */}
        <div style={styles.inputContainer}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me anything about wedding planning..."
            style={styles.textarea}
            rows="2"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              ...styles.sendBtn,
              ...((loading || !input.trim()) ? styles.sendBtnDisabled : {})
            }}
          >
            {loading ? <Loader size={18} className="spinning" /> : <Send size={18} />}
          </button>
        </div>

        <style>{`
          .spinning {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes dotPulse {
            0%, 60%, 100% { transform: scale(1); opacity: 0.6; }
            30% { transform: scale(1.3); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  container: {
    width: "400px",
    height: "600px",
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(62,0,20,0.25)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid #F5D0DA"
  },
  header: {
    padding: "16px 20px",
    background: "#3E0014",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(231,114,145,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: "16px",
    fontWeight: 600,
    margin: 0
  },
  headerSubtitle: {
    fontSize: "10px",
    opacity: 0.7,
    margin: 0
  },
  headerActions: {
    display: "flex",
    gap: "8px"
  },
  minimizeBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "8px",
    padding: "6px",
    cursor: "pointer",
    color: "white"
  },
  closeBtn: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "8px",
    padding: "6px",
    cursor: "pointer",
    color: "white"
  },
  contextBanner: {
    display: "flex",
    gap: "12px",
    padding: "12px 16px",
    background: "#FDF0F3",
    borderBottom: "1px solid #F5D0DA",
    fontSize: "11px",
    flexWrap: "wrap"
  },
  contextItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#666"
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  message: {
    display: "flex",
    gap: "12px",
    maxWidth: "85%"
  },
  userMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse"
  },
  assistantMessage: {
    alignSelf: "flex-start"
  },
  messageIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#FDF0F3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0
  },
  messageContent: {
    background: "#FDF0F3",
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "100%"
  },
  userMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse"
  },
  assistantMessage: {
    alignSelf: "flex-start"
  },
  messageText: {
    fontSize: "13px",
    lineHeight: 1.5,
    margin: 0,
    color: "#333",
    whiteSpace: "pre-wrap"
  },
  typingIndicator: {
    display: "flex",
    gap: "6px",
    padding: "4px 0",
    "& span": {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#AC1634",
      animation: "dotPulse 1.4s ease-in-out infinite"
    }
  },
  suggestionsContainer: {
    padding: "16px",
    borderTop: "1px solid #F5D0DA",
    background: "white"
  },
  suggestionsTitle: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#AC1634",
    marginBottom: "12px"
  },
  suggestionsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  },
  suggestionBtn: {
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#FDF0F3",
    border: "1px solid #F5D0DA",
    fontSize: "11px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s"
  },
  clearBtn: {
    margin: "8px 16px",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "none",
    border: "1px solid #F5D0DA",
    fontSize: "11px",
    cursor: "pointer",
    color: "#666"
  },
  inputContainer: {
    padding: "16px",
    borderTop: "1px solid #F5D0DA",
    display: "flex",
    gap: "12px",
    background: "white"
  },
  textarea: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "20px",
    border: "1px solid #F5D0DA",
    fontSize: "13px",
    fontFamily: "'DM Sans', sans-serif",
    resize: "none",
    outline: "none"
  },
  sendBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#AC1634",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    alignSelf: "flex-end"
  },
  sendBtnDisabled: {
    background: "#F5D0DA",
    cursor: "not-allowed"
  }
};

const minimizedStyles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#3E0014",
    color: "white",
    padding: "12px 20px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000
  },
  closeBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    color: "white",
    fontSize: "12px",
    marginLeft: "8px"
  }
};