import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function ScoreBreakdown({ setSelectedPage }) {
  const { analysisResult, profileData } = useStudent();
  const overall = analysisResult?.overall_score ?? 84;
  const breakdown = analysisResult?.breakdown ?? {};

  const categories = [
    {
      title: "Academic Eligibility",
      weight: "25%",
      score: breakdown?.academic?.score ?? 89,
      status: breakdown?.academic?.status ?? "Strong",
      detail: `Based on ${profileData.highestQualification || "Bachelor's"} degree and ${profileData.cgpa || "8.4"} CGPA.`
    },
    {
      title: "Language Proficiency",
      weight: "20%",
      score: breakdown?.language?.score ?? 90,
      status: breakdown?.language?.status ?? "Strong",
      detail: `IELTS Overall: ${profileData.ieltsOverall || "7.0"} (L:${profileData.ieltsListening || "7.5"}, R:${profileData.ieltsReading || "7.0"}, W:${profileData.ieltsWriting || "6.5"}, S:${profileData.ieltsSpeaking || "7.0"}).`
    },
    {
      title: "Financial Readiness",
      weight: "20%",
      score: breakdown?.financial?.score ?? 85,
      status: breakdown?.financial?.status ?? "Strong",
      detail: `Available Budget: $${Number(profileData.availableBudget || 35000).toLocaleString()} CAD vs required $20,635 CAD GIC.`
    },
    {
      title: "Canadian Job Market Fit",
      weight: "20%",
      score: breakdown?.career?.score ?? 82,
      status: breakdown?.career?.status ?? "High Demand",
      detail: `High demand occupation alignment in software engineering and analytics.`
    },
    {
      title: "Visa & PR Probability",
      weight: "15%",
      score: breakdown?.visa_pr?.score ?? 88,
      status: breakdown?.visa_pr?.status ?? "Favorable",
      detail: `Provincial nomination opportunities available in target provinces.`
    }
  ];

  return (
    <div className="dashboard-page" style={{ maxWidth: "720px", margin: "0 auto", padding: "20px 15px 120px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Welcome")}
            style={{ background: "#101a32", color: "#8fa3c5", border: "1px solid #263958", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" }}
          >
            ← Back to Welcome
          </button>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Home")}
            style={{ background: "#1b2b45", color: "white", border: "1px solid #263958", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" }}
          >
            Dashboard
          </button>
        </div>
        <span style={{ color: "#00d7d0", fontSize: "14px" }}>AI Evaluation Engine</span>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "6px" }}>Score Breakdown</h1>
        <p style={{ color: "#86a0c5" }}>Comprehensive analysis of your study and immigration eligibility</p>
      </div>

      {/* OVERALL GAUGE CARD */}
      <div style={{
        background: "linear-gradient(135deg, #102b50, #0b3440, #21183f)",
        border: "1px solid #16507d",
        borderRadius: "18px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px"
      }}>
        <div>
          <h2 style={{ fontSize: "22px", marginBottom: "4px" }}>Overall Readiness</h2>
          <p style={{ color: "#91a9c9", fontSize: "14px" }}>Composite readiness for Canadian study visa &amp; post-grad work</p>
        </div>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#104278",
          border: "4px solid #00d7d0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "700"
        }}>
          {overall}%
        </div>
      </div>

      {/* CATEGORIES LIST */}
      <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "#e0e6ed" }}>Evaluation Factors</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
        {categories.map((cat, idx) => (
          <div key={idx} style={{
            background: "#121d34",
            border: "1px solid #263958",
            borderRadius: "16px",
            padding: "18px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>{cat.title}</span>
                <span style={{ fontSize: "12px", color: "#6e8cb5", marginLeft: "8px" }}>({cat.weight} weight)</span>
              </div>
              <span style={{
                background: "#0d2b38",
                color: "#20e59e",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                {cat.status} • {cat.score}%
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ width: "100%", height: "8px", background: "#1a2a46", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
              <div style={{ width: `${cat.score}%`, height: "100%", background: "linear-gradient(90deg, #3188ed, #00d7d0)", borderRadius: "4px" }} />
            </div>

            <p style={{ color: "#8aa0c0", fontSize: "13px", margin: 0 }}>{cat.detail}</p>
          </div>
        ))}
      </div>

      {/* ACTIONABLE RECOMMENDATIONS */}
      <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "#e0e6ed" }}>💡 Key Score Enhancers</h3>
      <div style={{ background: "#0e1b36", border: "1px solid #173e78", borderRadius: "16px", padding: "18px" }}>
        {(analysisResult?.actionable_tips || []).map((tip, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: i < 2 ? "12px" : 0 }}>
            <span style={{ color: "#00d7d0", fontSize: "16px" }}>✓</span>
            <p style={{ color: "#b0c4de", fontSize: "14px", margin: 0 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBreakdown;
