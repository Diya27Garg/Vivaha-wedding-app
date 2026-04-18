// src/pages/BudgetPlanner.jsx
import { useState } from "react";
import { DollarSign, PieChart, TrendingUp, AlertCircle, CheckCircle, Edit2, Save, Plus } from "lucide-react";

export default function BudgetPlanner() {
  const [budget, setBudget] = useState({
    total: 2500000,
    spent: 850000,
    categories: {
      venue: { allocated: 800000, spent: 750000, color: "#AC1634" },
      catering: { allocated: 500000, spent: 250000, color: "#E77291" },
      decor: { allocated: 300000, spent: 150000, color: "#7A002B" },
      photography: { allocated: 200000, spent: 180000, color: "#F5D0DA" },
      outfits: { allocated: 250000, spent: 200000, color: "#3E0014" },
      makeup: { allocated: 100000, spent: 80000, color: "#FFD700" },
      entertainment: { allocated: 150000, spent: 50000, color: "#FF6B6B" },
      invites: { allocated: 50000, spent: 25000, color: "#4ECDC4" },
      favors: { allocated: 50000, spent: 20000, color: "#45B7D1" },
      misc: { allocated: 100000, spent: 45000, color: "#96CEB4" }
    }
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [showTips, setShowTips] = useState(true);

  const totalAllocated = Object.values(budget.categories).reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = Object.values(budget.categories).reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = budget.total - totalSpent;
  const percentageUsed = (totalSpent / budget.total) * 100;

  const updateCategory = (category, field, value) => {
    setBudget({
      ...budget,
      categories: {
        ...budget.categories,
        [category]: { ...budget.categories[category], [field]: parseInt(value) || 0 }
      }
    });
    setEditingCategory(null);
  };

  const tips = [
    { category: "Venue", tip: "Book during off-season (May-September) to save 30-40%", savings: "₹2-3L" },
    { category: "Catering", tip: "Opt for buffet instead of plated meals - saves 20%", savings: "₹1L" },
    { category: "Decor", tip: "Use seasonal flowers instead of imported ones", savings: "₹50k" },
    { category: "Photography", tip: "Book for 8 hours instead of 12 - still capture key moments", savings: "₹50k" },
    { category: "Invites", tip: "Go digital for RSVPs and save on paper invites", savings: "₹30k" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Budget Planner</h1>
        <p style={styles.subtitle}>Plan your dream wedding within your budget</p>
      </div>

      {/* Budget Overview */}
      <div style={styles.overviewCard}>
        <div style={styles.totalBudget}>
          <p style={styles.totalLabel}>Total Budget</p>
          <p style={styles.totalAmount}>₹{(budget.total / 100000).toFixed(1)}L</p>
        </div>
        <div style={styles.progressSection}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${percentageUsed}%` }} />
          </div>
          <div style={styles.progressStats}>
            <span>Spent: ₹{(totalSpent / 100000).toFixed(1)}L</span>
            <span>Remaining: ₹{(remaining / 100000).toFixed(1)}L</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Category Breakdown</h2>
        {Object.entries(budget.categories).map(([name, data]) => {
          const percentage = (data.spent / data.allocated) * 100;
          const isOverBudget = data.spent > data.allocated;
          
          return (
            <div key={name} style={styles.categoryCard}>
              <div style={styles.categoryHeader}>
                <div>
                  <h3 style={styles.categoryName}>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                  <p style={styles.categoryRange}>
                    ₹{(data.spent / 1000).toFixed(0)}k / ₹{(data.allocated / 1000).toFixed(0)}k
                  </p>
                </div>
                {editingCategory === name ? (
                  <div style={styles.editActions}>
                    <input 
                      type="number" 
                      defaultValue={data.allocated}
                      style={styles.editInput}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') updateCategory(name, 'allocated', e.target.value);
                      }}
                    />
                    <button onClick={() => updateCategory(name, 'allocated', document.querySelector(`#edit-${name}`).value)}>
                      <Save size={16} />
                    </button>
                  </div>
                ) : (
                  <button style={styles.editBtn} onClick={() => setEditingCategory(name)}>
                    <Edit2 size={14} /> Edit
                  </button>
                )}
              </div>
              <div style={styles.categoryProgress}>
                <div style={{ ...styles.categoryFill, width: `${Math.min(percentage, 100)}%`, background: data.color }} />
              </div>
              {isOverBudget && (
                <div style={styles.warning}>
                  <AlertCircle size={14} /> Over budget by ₹{(data.spent - data.allocated).toLocaleString()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Smart Tips */}
      {showTips && (
        <div style={styles.tipsSection}>
          <div style={styles.tipsHeader}>
            <h2 style={styles.sectionTitle}><TrendingUp size={20} /> Smart Savings Tips</h2>
            <button onClick={() => setShowTips(false)} style={styles.closeTips}>✕</button>
          </div>
          {tips.map((tip, i) => (
            <div key={i} style={styles.tipCard}>
              <div style={styles.tipIcon}>💡</div>
              <div style={styles.tipContent}>
                <p style={styles.tipText}>{tip.tip}</p>
                <p style={styles.tipSavings}>Potential savings: {tip.savings}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Recommendations */}
      <div style={styles.aiSection}>
        <h2 style={styles.sectionTitle}>AI Recommendations</h2>
        <div style={styles.aiCard}>
          <p>Based on your spending pattern, you could save ₹2.5L by:</p>
          <ul style={styles.aiList}>
            <li>✓ Negotiating with venue for off-season discount</li>
            <li>✓ Combining decor and flowers from same vendor</li>
            <li>✓ Using digital invitations for 50% of guests</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#FDF0F3", padding: "20px", paddingBottom: "80px" },
  header: { textAlign: "center", marginBottom: "24px" },
  title: { fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "28px", color: "#3E0014", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#666" },
  overviewCard: { background: "linear-gradient(135deg, #3E0014 0%, #7A002B 100%)", borderRadius: "24px", padding: "24px", marginBottom: "24px", color: "white" },
  totalBudget: { marginBottom: "20px" },
  totalLabel: { fontSize: "12px", opacity: 0.8, marginBottom: "4px" },
  totalAmount: { fontSize: "36px", fontWeight: 700 },
  progressSection: { marginTop: "16px" },
  progressBar: { height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "4px", overflow: "hidden", marginBottom: "12px" },
  progressFill: { height: "100%", background: "#E77291", borderRadius: "4px", transition: "width 0.3s" },
  progressStats: { display: "flex", justifyContent: "space-between", fontSize: "12px", opacity: 0.8 },
  section: { marginBottom: "32px" },
  sectionTitle: { fontSize: "20px", fontWeight: 600, color: "#3E0014", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
  categoryCard: { background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", border: "1px solid #F5D0DA" },
  categoryHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  categoryName: { fontSize: "16px", fontWeight: 600, textTransform: "capitalize", marginBottom: "4px" },
  categoryRange: { fontSize: "12px", color: "#666" },
  editBtn: { padding: "6px 12px", borderRadius: "999px", border: "1px solid #F5D0DA", background: "white", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" },
  editActions: { display: "flex", gap: "8px", alignItems: "center" },
  editInput: { width: "100px", padding: "6px", borderRadius: "8px", border: "1px solid #F5D0DA" },
  categoryProgress: { height: "6px", background: "#F5D0DA", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" },
  categoryFill: { height: "100%", borderRadius: "3px", transition: "width 0.3s" },
  warning: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#AC1634", marginTop: "8px" },
  tipsSection: { background: "#E8F5E9", borderRadius: "20px", padding: "20px", marginBottom: "24px" },
  tipsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  closeTips: { background: "none", border: "none", fontSize: "18px", cursor: "pointer" },
  tipCard: { display: "flex", gap: "12px", marginBottom: "16px", padding: "12px", background: "white", borderRadius: "12px" },
  tipIcon: { fontSize: "24px" },
  tipContent: { flex: 1 },
  tipText: { fontSize: "13px", marginBottom: "4px" },
  tipSavings: { fontSize: "11px", color: "#2E7D32", fontWeight: 600 },
  aiSection: { marginBottom: "32px" },
  aiCard: { background: "linear-gradient(135deg, #AC1634 0%, #E77291 100%)", borderRadius: "20px", padding: "20px", color: "white" },
  aiList: { marginTop: "12px", paddingLeft: "20px", fontSize: "13px", lineHeight: 1.8 }
};