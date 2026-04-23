// src/pages/PremiumPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Crown, Sparkles, Check, ArrowRight, Shield, Infinity, 
  Clock, Star, Users, Calendar, MessageCircle, Gift,
  CreditCard, Wallet, Building2, Lock, Zap, Heart,
  TrendingUp, Award, Phone, Mail, ChevronRight, X
} from "lucide-react";
import HindiLogo from "../components/HindiLogo";
import BottomNav from "../components/BottomNav";

export default function PremiumPage({ user, setUser }) {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const premiumFeatures = [
    { icon: <Users size={18} />, title: "50+ Verified Vendors", description: "Access to all premium vendor listings" },
    { icon: <Sparkles size={18} />, title: "AI Wedding Assistant", description: "Personalized planning advice" },
    { icon: <Infinity size={18} />, title: "Unlimited Boards", description: "Create unlimited inspiration boards" },
    { icon: <Calendar size={18} />, title: "Priority Booking", description: "Get faster vendor responses" },
    { icon: <MessageCircle size={18} />, title: "Dedicated Coordinator", description: "1-on-1 wedding planning support" },
    { icon: <TrendingUp size={18} />, title: "Budget Analytics", description: "Smart budget tracking & alerts" }
  ];

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      setUser(prev => ({ ...prev, premium: true }));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div style={successStyles.container}>
        <div style={successStyles.card}>
          <div style={successStyles.icon}>🎉</div>
          <h1 style={successStyles.title}>Welcome to Premium! 🎊</h1>
          <p style={successStyles.text}>Your wedding planning just got a whole lot better.</p>
          <div style={successStyles.features}>
            <span>✨ AI Assistant Unlocked</span>
            <span>🔓 All Vendors Unlocked</span>
            <span>🎨 Unlimited Boards</span>
          </div>
          <button onClick={() => navigate("/home")} style={successStyles.btn}>
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div style={paymentStyles.container}>
        <div style={paymentStyles.card}>
          <button onClick={() => setShowPayment(false)} style={paymentStyles.backBtn}>← Back</button>
          <div style={paymentStyles.header}>
            <Crown size={32} color="#E77291" />
            <h2>Complete Payment</h2>
            <p>Secure checkout for Vivaha Premium</p>
          </div>

          <div style={paymentStyles.amountCard}>
            <span>Total Amount</span>
            <strong>₹10,000</strong>
            <small>One-time payment • Lifetime access</small>
          </div>

          <div style={paymentStyles.methods}>
            <button onClick={() => setPaymentMethod("card")} style={{...paymentStyles.methodBtn, ...(paymentMethod === "card" ? paymentStyles.methodActive : {})}}>
              <CreditCard size={18} /> Credit/Debit Card
            </button>
            <button onClick={() => setPaymentMethod("upi")} style={{...paymentStyles.methodBtn, ...(paymentMethod === "upi" ? paymentStyles.methodActive : {})}}>
              <Wallet size={18} /> UPI
            </button>
            <button onClick={() => setPaymentMethod("netbanking")} style={{...paymentStyles.methodBtn, ...(paymentMethod === "netbanking" ? paymentStyles.methodActive : {})}}>
              <Building2 size={18} /> Net Banking
            </button>
          </div>

          {paymentMethod === "card" && (
            <div style={paymentStyles.form}>
              <input type="text" placeholder="Card Number" style={paymentStyles.input} defaultValue="4242 4242 4242 4242" />
              <div style={{ display: "flex", gap: "12px" }}>
                <input type="text" placeholder="MM/YY" style={paymentStyles.input} defaultValue="12/28" />
                <input type="text" placeholder="CVV" style={paymentStyles.input} defaultValue="123" />
              </div>
              <input type="text" placeholder="Cardholder Name" style={paymentStyles.input} defaultValue="TEST USER" />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div style={paymentStyles.form}>
              <input type="text" placeholder="UPI ID (e.g., username@okhdfcbank)" style={paymentStyles.input} />
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div style={paymentStyles.form}>
              <select style={paymentStyles.input}>
                <option>Select Bank</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>SBI</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          <div style={paymentStyles.security}>
            <Lock size={14} color="#4CAF50" />
            <span>Your payment is secure and encrypted</span>
          </div>

          <button onClick={handlePayment} disabled={processing} style={paymentStyles.payBtn}>
            {processing ? "Processing..." : `Pay ₹10,000 →`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
          <HindiLogo size="small" />
          <div style={{ width: "70px" }} />
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.crownIcon}>
            <Crown size={48} color="#E77291" />
          </div>
          <h1 style={styles.title}>UPGRADE TO <span style={styles.highlight}>Vivaha Premium</span></h1>
          <p style={styles.subtitle}>Unlock the complete wedding planning experience</p>
        </div>

        {/* Pricing Card */}
        <div style={styles.pricingCard}>
          <div style={styles.pricingBadge}>BEST VALUE</div>
          <div style={styles.priceAmount}>
            <span style={styles.priceCurrency}>₹</span>
            <span style={styles.priceValue}>10,000</span>
          </div>
          <p style={styles.pricePeriod}>One-time payment • Lifetime access</p>
          <p style={styles.priceNote}>No recurring charges • For your wedding</p>
          <button onClick={() => setShowPayment(true)} style={styles.upgradeBtn}>
            Proceed to Payment <ArrowRight size={18} />
          </button>
        </div>

        {/* Features Grid */}
        <div style={styles.featuresSection}>
          <h2 style={styles.sectionTitle}>
            <Sparkles size={22} color="#E77291" /> Premium Benefits
          </h2>
          <div style={styles.featuresGrid}>
            {premiumFeatures.map((feature, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDesc}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div style={styles.comparisonSection}>
          <h2 style={styles.sectionTitle}>Compare Plans</h2>
          <div style={styles.comparisonTable}>
            <div style={styles.comparisonRow}>
              <span>Vendor Access</span>
              <span style={styles.freeText}>Limited (2 vendors)</span>
              <span style={styles.premiumText}>All 50+ vendors</span>
            </div>
            <div style={styles.comparisonRow}>
              <span>AI Assistant</span>
              <span style={styles.freeText}>❌ Locked</span>
              <span style={styles.premiumText}>✅ Full Access</span>
            </div>
            <div style={styles.comparisonRow}>
              <span>Inspiration Boards</span>
              <span style={styles.freeText}>3 boards</span>
              <span style={styles.premiumText}>Unlimited</span>
            </div>
            <div style={styles.comparisonRow}>
              <span>Wedding Coordinator</span>
              <span style={styles.freeText}>❌ Not included</span>
              <span style={styles.premiumText}>✅ Dedicated support</span>
            </div>
            <div style={styles.comparisonRow}>
              <span>Priority Booking</span>
              <span style={styles.freeText}>Standard</span>
              <span style={styles.premiumText}>Priority</span>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div style={styles.guaranteeSection}>
          <Shield size={24} color="#E77291" />
          <div>
            <h3>100% Satisfaction Guarantee</h3>
            <p>Not satisfied? Get a full refund within 7 days of purchase.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={styles.faqSection}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqGrid}>
            <div style={styles.faqItem}>
              <h4>💳 Is this a one-time payment?</h4>
              <p>Yes! ₹10,000 one-time payment gives you lifetime access for your wedding.</p>
            </div>
            <div style={styles.faqItem}>
              <h4>🔄 Can I get a refund?</h4>
              <p>Yes, we offer a 7-day money-back guarantee if you're not satisfied.</p>
            </div>
            <div style={styles.faqItem}>
              <h4>🎁 What happens after payment?</h4>
              <p>You'll get immediate access to all premium features on your dashboard.</p>
            </div>
            <div style={styles.faqItem}>
              <h4>👥 Can I share my premium account?</h4>
              <p>Premium is for one couple's wedding planning journey.</p>
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div style={styles.ctaBottom}>
          <Heart size={28} color="#E77291" />
          <h3>Ready to plan your dream wedding?</h3>
          <button onClick={() => setShowPayment(true)} style={styles.ctaBtn}>
            Upgrade to Premium Now <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", fontFamily: "'DM Sans', sans-serif" },
  header: { background: "#3E0014", position: "sticky", top: 0, zIndex: 100 },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  backBtn: { background: "rgba(231,114,145,0.15)", border: "1px solid rgba(231,114,145,0.3)", color: "#E77291", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", fontSize: "14px" },
  mainContent: { maxWidth: "1000px", margin: "0 auto", padding: "48px 32px", paddingBottom: "100px" },
  heroSection: { textAlign: "center", marginBottom: "48px" },
  crownIcon: { marginBottom: "20px" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: "42px", color: "#3E0014", marginBottom: "16px" },
  highlight: { color: "#AC1634", textDecoration: "underline", textDecorationColor: "#E77291" },
  subtitle: { fontSize: "18px", color: "#7A5560" },
  pricingCard: { background: "linear-gradient(135deg, #3E0014, #7A002B)", borderRadius: "32px", padding: "40px", textAlign: "center", marginBottom: "48px", position: "relative" },
  pricingBadge: { position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#E77291", color: "#3E0014", padding: "6px 20px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
  priceAmount: { display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px", marginBottom: "12px" },
  priceCurrency: { fontSize: "28px", color: "#E77291", fontWeight: 600 },
  priceValue: { fontSize: "64px", fontWeight: "bold", color: "white" },
  pricePeriod: { fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "8px" },
  priceNote: { fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" },
  upgradeBtn: { background: "#E77291", color: "#3E0014", border: "none", padding: "16px 32px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" },
  featuresSection: { marginBottom: "48px" },
  sectionTitle: { fontSize: "28px", fontWeight: 600, color: "#3E0014", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
  featureCard: { display: "flex", gap: "16px", padding: "20px", background: "white", borderRadius: "20px", border: "1px solid #F5D0DA" },
  featureIcon: { width: "40px", height: "40px", borderRadius: "50%", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center", color: "#AC1634" },
  featureTitle: { fontSize: "16px", fontWeight: 600, marginBottom: "4px" },
  featureDesc: { fontSize: "12px", color: "#666" },
  comparisonSection: { marginBottom: "48px" },
  comparisonTable: { background: "white", borderRadius: "24px", border: "1px solid #F5D0DA", overflow: "hidden" },
  comparisonRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 20px", borderBottom: "1px solid #F5D0DA", "&:last-child": { borderBottom: "none" } },
  freeText: { color: "#999" },
  premiumText: { color: "#AC1634", fontWeight: 600 },
  guaranteeSection: { display: "flex", alignItems: "center", gap: "16px", background: "#FDF0F3", padding: "24px", borderRadius: "20px", marginBottom: "48px", border: "1px solid #F5D0DA" },
  faqSection: { marginBottom: "48px" },
  faqGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" },
  faqItem: { padding: "20px", background: "white", borderRadius: "20px", border: "1px solid #F5D0DA" },
  ctaBottom: { textAlign: "center", padding: "40px", background: "linear-gradient(135deg, #FFF5F7, white)", borderRadius: "24px", border: "1px solid #F5D0DA" },
  ctaBtn: { marginTop: "20px", background: "#3E0014", color: "white", border: "none", padding: "14px 32px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }
};

const paymentStyles = {
  container: { minHeight: "100vh", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "white", borderRadius: "32px", width: "100%", maxWidth: "500px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" },
  backBtn: { background: "none", border: "none", color: "#E77291", cursor: "pointer", marginBottom: "20px", fontSize: "14px" },
  header: { textAlign: "center", marginBottom: "24px" },
  amountCard: { background: "#FDF0F3", padding: "20px", borderRadius: "20px", textAlign: "center", marginBottom: "24px" },
  methods: { display: "flex", gap: "12px", marginBottom: "24px" },
  methodBtn: { flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px" },
  methodActive: { borderColor: "#AC1634", background: "#FDF0F3", color: "#AC1634" },
  form: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" },
  input: { padding: "14px", borderRadius: "12px", border: "1px solid #F5D0DA", fontSize: "14px", outline: "none" },
  security: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", background: "#FDF0F3", borderRadius: "12px", marginBottom: "24px", fontSize: "12px" },
  payBtn: { width: "100%", padding: "16px", borderRadius: "999px", background: "#AC1634", color: "white", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "16px" }
};

const successStyles = {
  container: { minHeight: "100vh", background: "#FDF0F3", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { textAlign: "center", background: "white", borderRadius: "32px", padding: "48px", maxWidth: "450px" },
  icon: { fontSize: "64px", marginBottom: "20px" },
  title: { fontSize: "28px", fontWeight: 700, color: "#3E0014", marginBottom: "12px" },
  text: { fontSize: "16px", color: "#666", marginBottom: "24px" },
  features: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "32px" },
  btn: { background: "#AC1634", color: "white", border: "none", padding: "14px 32px", borderRadius: "999px", cursor: "pointer", fontSize: "16px", fontWeight: 600 }
};