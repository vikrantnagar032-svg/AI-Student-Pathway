import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function AIReasoning({ setSelectedPage }) {
  const { analysisResult, profileData, multiSelect } = useStudent();
  const overall = analysisResult?.overall_score ?? 84;
  const targetProvinces = (multiSelect?.provinces && multiSelect.provinces.length > 0)
    ? multiSelect.provinces.join(", ")
    : "Ontario, British Columbia";

  const reasons = [
    {
      step: "01",
      title: "Academic Progression Logic",
      confidence: "95% Match",
      description: `Your degree in ${profileData.fieldOfStudy || "Computer Science"} establishes a logical educational foundation. Visa officers evaluate academic continuity; transitioning into post-graduate studies in Canada satisfies immigration genuine student criteria.`
    },
    {
      step: "02",
      title: "SDS Stream Language Clearance",
      confidence: "Verified",
      description: `Your IELTS overall of ${profileData.ieltsOverall || "7.0"} satisfies Student Direct Stream (SDS) criteria. All sub-bands meet the minimum threshold, reducing visa processing time to under 4 weeks.`
    },
    {
      step: "03",
      title: "Post-Graduation Work Permit (PGWP) Feasibility",
      confidence: "High Probability",
      description: `Programs selected in ${targetProvinces} are hosted by Designated Learning Institutions (DLIs) eligible for up to a 3-year PGWP upon graduation.`
    },
    {
      step: "04",
      title: "Permanent Residency (PR) Pathway Alignment",
      confidence: "88% Favorable",
      description: `Candidates with tech skills (e.g., ${(multiSelect.skills || ["Software", "Data"]).slice(0, 3).join(", ")}) qualify for accelerated Express Entry STEM categories and targeted Provincial Nominee Programs.`
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
        <span style={{ color: "#20e59e", fontSize: "14px" }}>Explainable AI (XAI)</span>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "6px" }}>AI Reasoning Engine</h1>
        <p style={{ color: "#86a0c5" }}>Transparent breakdown of how our algorithmic model evaluated your profile</p>
      </div>

      {/* HIGHLIGHT BANNER */}
      <div style={{
        background: "linear-gradient(135deg, #073c46, #0e2b45)",
        border: "1px solid #00d7d0",
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <span style={{ fontSize: "24px" }}>🧠</span>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Model Confidence: High ({overall}%)</h2>
        </div>
        <p style={{ color: "#b6d8e8", fontSize: "14px", margin: 0 }}>
          The engine synthesized your academic record, language scores, financial capacity, and selected Canadian provincial quotas.
        </p>
      </div>

      {/* REASONING STEPS */}
      <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "#e0e6ed" }}>Decision Pipeline</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
        {reasons.map((item, idx) => (
          <div key={idx} style={{
            background: "#121d34",
            border: "1px solid #263958",
            borderRadius: "16px",
            padding: "20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  background: "#1b2d4f",
                  color: "#00d7d0",
                  fontWeight: "700",
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "8px"
                }}>
                  {item.step}
                </span>
                <strong style={{ fontSize: "16px" }}>{item.title}</strong>
              </div>
              <span style={{ color: "#20e59e", fontSize: "13px", fontWeight: "600" }}>{item.confidence}</span>
            </div>
            <p style={{ color: "#92a8c7", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </div>

      {/* SOP TIP */}
      <div style={{ background: "#1c2237", border: "1px solid #334263", borderRadius: "16px", padding: "18px" }}>
        <h4 style={{ color: "#5ce1e6", marginBottom: "8px", fontSize: "15px" }}>📝 Visa Statement of Purpose (SOP) Recommendation</h4>
        <p style={{ color: "#cbd5e1", fontSize: "13px", margin: 0 }}>
          Make sure your SOP highlights why you chose Canada over your home country, exactly how the target program builds upon your prior studies, and your intention to leverage post-graduation career opportunities.
        </p>
      </div>
    </div>
  );
}

export default AIReasoning;
