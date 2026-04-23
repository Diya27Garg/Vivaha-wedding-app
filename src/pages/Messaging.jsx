// src/pages/Messaging.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Send, Phone, Video, MoreVertical, Search, ArrowLeft, 
  Paperclip, Smile, Image, File, Mic, Check, CheckCheck,
  Star, Crown, Shield, Clock, Calendar, MapPin, PhoneCall,
  VideoIcon, Users, Heart, Menu, X, MessageCircle, Sparkles,
  Home, Package, User, ShoppingCart, LogOut, Bell, Settings
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";
import GlobalNotifications from "../components/GlobalNotifications";

export default function Messaging({ user = { premium: false } }) {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Lens & Love Studio",
      role: "Photographer",
      avatar: "https://images.unsplash.com/photo-1604014237800-1c9102c219da",
      lastSeen: "Online",
      isOnline: true,
      isTyping: false,
      unread: 2,
      messages: [
        { id: 1, text: "Hi! We saw your wedding date is March 15th. We're available!", sender: "vendor", time: "10:30 AM", read: true, delivered: true },
        { id: 2, text: "That's great! Can you share your portfolio?", sender: "user", time: "10:32 AM", read: true, delivered: true },
        { id: 3, text: "Sure! Here's our recent work. We specialize in candid photography.", sender: "vendor", time: "10:35 AM", read: false, delivered: true },
        { id: 4, text: "Beautiful shots! What's your pricing for a full-day coverage?", sender: "user", time: "10:38 AM", read: false, delivered: true }
      ]
    },
    {
      id: 2,
      name: "Royal Blooms Decor",
      role: "Decorator",
      avatar: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      lastSeen: "Last seen 5 mins ago",
      isOnline: false,
      isTyping: false,
      unread: 0,
      messages: [
        { id: 1, text: "Your venue decor package is ready for review!", sender: "vendor", time: "Yesterday", read: true, delivered: true },
        { id: 2, text: "Thank you so much! Can you share the design mockups?", sender: "user", time: "Yesterday", read: true, delivered: true },
        { id: 3, text: "I've sent them to your email. Let me know your thoughts!", sender: "vendor", time: "Yesterday", read: true, delivered: true }
      ]
    },
    {
      id: 3,
      name: "Glam by Priya",
      role: "Makeup Artist",
      avatar: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
      lastSeen: "Online",
      isOnline: true,
      isTyping: true,
      unread: 3,
      messages: [
        { id: 1, text: "Your makeup trial is confirmed for Jan 20th at 2 PM", sender: "vendor", time: "2:00 PM", read: false, delivered: true },
        { id: 2, text: "Perfect! Looking forward to it.", sender: "user", time: "2:05 PM", read: true, delivered: true }
      ]
    },
    {
      id: 4,
      name: "Grand Feast Caterers",
      role: "Caterer",
      avatar: "https://images.unsplash.com/photo-1555244162-803834f70033",
      lastSeen: "Last seen 2 hours ago",
      isOnline: false,
      isTyping: false,
      unread: 0,
      messages: [
        { id: 1, text: "Menu options have been shared. Please review by Friday.", sender: "vendor", time: "Yesterday", read: true, delivered: true }
      ]
    },
    {
      id: 5,
      name: "Dream Venues",
      role: "Venue",
      avatar: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      lastSeen: "Online",
      isOnline: true,
      isTyping: false,
      unread: 0,
      messages: [
        { id: 1, text: "Your booking is confirmed! Welcome to your dream venue.", sender: "vendor", time: "2 days ago", read: true, delivered: true }
      ]
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedChat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: chats[selectedChat].messages.length + 1,
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      delivered: true
    };
    
    const updatedChats = [...chats];
    updatedChats[selectedChat].messages.push(newMessage);
    setChats(updatedChats);
    setMessage("");
    
    // Simulate vendor typing
    setTimeout(() => {
      const typingChats = [...updatedChats];
      typingChats[selectedChat].isTyping = true;
      setChats(typingChats);
      
      setTimeout(() => {
        const responseChats = [...typingChats];
        responseChats[selectedChat].isTyping = false;
        responseChats[selectedChat].messages.push({
          id: responseChats[selectedChat].messages.length + 1,
          text: "Thanks for your message! We'll get back to you shortly.",
          sender: "vendor",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          delivered: true
        });
        setChats(responseChats);
      }, 2000);
    }, 1000);
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const currentChat = chats[selectedChat];

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
      <div style={styles.messagingContainer}>
        {/* Chat List Sidebar */}
        <div style={styles.chatList}>
          <div style={styles.chatListHeader}>
            <h2 style={styles.chatListTitle}>Messages</h2>
            <div style={styles.searchBar}>
              <Search size={16} color="#999" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div style={styles.chatListItems}>
            {filteredChats.map((chat, idx) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(idx)}
                style={{
                  ...styles.chatItem,
                  ...(selectedChat === idx ? styles.chatItemActive : {})
                }}
              >
                <div style={styles.chatAvatar}>
                  <img src={chat.avatar} alt={chat.name} style={styles.avatarImage} />
                  {chat.isOnline && <div style={styles.onlineDot} />}
                </div>
                <div style={styles.chatInfo}>
                  <div style={styles.chatHeader}>
                    <span style={styles.chatName}>{chat.name}</span>
                    <span style={styles.chatTime}>
                      {chat.messages[chat.messages.length - 1]?.time}
                    </span>
                  </div>
                  <div style={styles.chatPreview}>
                    <span style={styles.chatRole}>{chat.role}</span>
                    <p style={styles.chatMessage}>
                      {chat.messages[chat.messages.length - 1]?.text.substring(0, 35)}
                      {chat.messages[chat.messages.length - 1]?.text.length > 35 ? "..." : ""}
                    </p>
                  </div>
                  {chat.isTyping && <span style={styles.typingIndicator}>typing...</span>}
                </div>
                {chat.unread > 0 && <div style={styles.unreadBadge}>{chat.unread}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {currentChat && (
          <div style={styles.chatArea}>
            {/* Chat Header */}
            <div style={styles.chatAreaHeader}>
              <div style={styles.chatAreaHeaderInfo}>
                <img src={currentChat.avatar} alt={currentChat.name} style={styles.chatAreaAvatar} />
                <div>
                  <h3 style={styles.chatAreaName}>{currentChat.name}</h3>
                  <div style={styles.chatAreaStatus}>
                    {currentChat.isOnline ? (
                      <span style={styles.onlineStatus}>● Online</span>
                    ) : (
                      <span style={styles.offlineStatus}>{currentChat.lastSeen}</span>
                    )}
                    {currentChat.isTyping && <span style={styles.typingStatus}> typing...</span>}
                  </div>
                </div>
              </div>
              <div style={styles.chatAreaActions}>
                <button style={styles.iconBtn}><Phone size={18} /></button>
                <button style={styles.iconBtn}><Video size={18} /></button>
                <button style={styles.iconBtn}><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div style={styles.messagesContainer}>
              {currentChat.messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.message,
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
                  }}
                >
                  {msg.sender !== "user" && (
                    <img src={currentChat.avatar} alt="" style={styles.messageAvatar} />
                  )}
                  <div
                    style={{
                      ...styles.messageBubble,
                      background: msg.sender === "user" ? "#AC1634" : "white",
                      color: msg.sender === "user" ? "white" : "#3E0014",
                      border: msg.sender === "user" ? "none" : "1px solid #F5D0DA"
                    }}
                  >
                    <p style={styles.messageText}>{msg.text}</p>
                    <div style={styles.messageFooter}>
                      <span style={styles.messageTime}>{msg.time}</span>
                      {msg.sender === "user" && (
                        msg.read ? <CheckCheck size={12} /> : <Check size={12} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {currentChat.isTyping && (
                <div style={styles.typingBubble}>
                  <div style={styles.typingDot} />
                  <div style={styles.typingDot} />
                  <div style={styles.typingDot} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={styles.messageInputArea}>
              <button style={styles.attachBtn}><Paperclip size={18} /></button>
              <div style={styles.messageInputContainer}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  style={styles.messageInput}
                />
                <div style={styles.inputActions}>
                  <button style={styles.emojiBtn}><Smile size={18} /></button>
                  <button style={styles.imageBtn}><Image size={18} /></button>
                </div>
              </div>
              <button 
                onClick={sendMessage} 
                disabled={!message.trim()}
                style={{
                  ...styles.sendBtn,
                  ...(!message.trim() ? styles.sendBtnDisabled : {})
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

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
  messagingContainer: { display: "flex", height: "calc(100vh - 140px)", maxWidth: "1400px", margin: "0 auto", background: "white", borderRadius: "24px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
  chatList: { width: "320px", borderRight: "1px solid #F5D0DA", display: "flex", flexDirection: "column", background: "white" },
  chatListHeader: { padding: "20px", borderBottom: "1px solid #F5D0DA" },
  chatListTitle: { fontSize: "20px", fontWeight: 600, color: "#3E0014", marginBottom: "16px" },
  searchBar: { display: "flex", alignItems: "center", gap: "10px", background: "#FDF0F3", padding: "10px 14px", borderRadius: "12px" },
  searchInput: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "13px" },
  chatListItems: { flex: 1, overflowY: "auto" },
  chatItem: { display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", cursor: "pointer", transition: "all 0.2s", width: "100%", border: "none", background: "white", textAlign: "left", position: "relative" },
  chatItemActive: { background: "#FDF0F3" },
  chatAvatar: { position: "relative", flexShrink: 0 },
  avatarImage: { width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" },
  onlineDot: { position: "absolute", bottom: "2px", right: "2px", width: "10px", height: "10px", borderRadius: "50%", background: "#4CAF50", border: "2px solid white" },
  chatInfo: { flex: 1, minWidth: 0 },
  chatHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" },
  chatName: { fontSize: "14px", fontWeight: 600, color: "#3E0014" },
  chatTime: { fontSize: "10px", color: "#999" },
  chatPreview: { display: "flex", flexDirection: "column", gap: "2px" },
  chatRole: { fontSize: "10px", color: "#E77291" },
  chatMessage: { fontSize: "12px", color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  typingIndicator: { fontSize: "10px", color: "#AC1634", fontStyle: "italic", marginTop: "2px" },
  unreadBadge: { background: "#AC1634", color: "white", borderRadius: "999px", width: "18px", height: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  chatArea: { flex: 1, display: "flex", flexDirection: "column", background: "#FDF0F3" },
  chatAreaHeader: { padding: "16px 24px", borderBottom: "1px solid #F5D0DA", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" },
  chatAreaHeaderInfo: { display: "flex", alignItems: "center", gap: "12px" },
  chatAreaAvatar: { width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" },
  chatAreaName: { fontSize: "16px", fontWeight: 600, color: "#3E0014", marginBottom: "2px" },
  chatAreaStatus: { fontSize: "11px" },
  onlineStatus: { color: "#4CAF50" },
  offlineStatus: { color: "#999" },
  typingStatus: { color: "#AC1634", fontStyle: "italic" },
  chatAreaActions: { display: "flex", gap: "12px" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", color: "#666", padding: "6px", borderRadius: "8px" },
  messagesContainer: { flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" },
  message: { display: "flex", gap: "10px", alignItems: "flex-end" },
  messageAvatar: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" },
  messageBubble: { maxWidth: "70%", padding: "12px 16px", borderRadius: "20px", position: "relative" },
  messageText: { fontSize: "14px", lineHeight: 1.4, margin: 0 },
  messageFooter: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px", marginTop: "6px" },
  messageTime: { fontSize: "10px", opacity: 0.6 },
  typingBubble: { display: "flex", gap: "4px", padding: "12px 16px", background: "white", borderRadius: "20px", width: "60px", border: "1px solid #F5D0DA" },
  typingDot: { width: "6px", height: "6px", borderRadius: "50%", background: "#999", animation: "pulse 1.4s infinite" },
  messageInputArea: { padding: "16px 24px", background: "white", borderTop: "1px solid #F5D0DA", display: "flex", alignItems: "center", gap: "12px" },
  attachBtn: { background: "none", border: "none", cursor: "pointer", color: "#999", padding: "8px" },
  messageInputContainer: { flex: 1, display: "flex", alignItems: "center", background: "#FDF0F3", borderRadius: "24px", padding: "8px 16px", gap: "8px" },
  messageInput: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px", padding: "6px 0" },
  inputActions: { display: "flex", gap: "8px" },
  emojiBtn: { background: "none", border: "none", cursor: "pointer", color: "#999", padding: "4px" },
  imageBtn: { background: "none", border: "none", cursor: "pointer", color: "#999", padding: "4px" },
  sendBtn: { background: "#AC1634", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" },
  sendBtnDisabled: { background: "#F5D0DA", cursor: "not-allowed" },
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
  logoutBtn: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, cursor: "pointer", color: "#E77291", fontSize: 15 }
};