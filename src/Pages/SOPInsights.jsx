import React, { useState } from "react";
import { useStudent } from "../context/StudentContext.jsx";

function SOPInsights({ setSelectedPage }) {
  const { profileData } = useStudent();
  const [targetProgram, setTargetProgram] = useState("Cloud Computing - Humber College");
  const [sopDraft, setSopDraft] = useState(
    `Ever since my undergraduate studies in ${profileData.fieldOfStudy || "Computer Science"}, I have been fascinated by large-scale distributed cloud infrastructure. With hands-on internship experience in full stack technologies, my long-term career ambition is to architect high-availability cloud solutions for enterprise-grade environments.`
  );

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "30px 20px 120px", color: "white" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}>Statement of Purpose (SOP) Copilot</h1>
        <p style={{ color: "#8fa3c5", fontSize: "15px" }}>
          AI-driven structural evaluation, academic alignment score, and drafting assistant.
        </p>
      </div>

      <div style={{ background: "#121d34", border: "1px solid #273957", borderRadius: "16px", padding: "20px", marginBottom: "18px" }}>
        <label style={{ fontSize: "13px", color: "#8fa3c5", display: "block", marginBottom: "6px" }}>
          Target University &amp; Program:
        </label>
        <select
          value={targetProgram}
          onChange={(e) => setTargetProgram(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#16243d",
            color: "white",
            border: "1px solid #2a3f63",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "16px"
          }}
        >
          <option value="Cloud Computing - Humber College">Cloud Computing - Humber College</option>
          <option value="Data Science - Global Tech Institute">Data Science - Global Tech Institute</option>
          <option value="M.Sc. in Applied Computing - University of Toronto">M.Sc. in Applied Computing - University of Toronto</option>
          <option value="B.Tech in Artificial Intelligence - IIT Hyderabad">B.Tech in Artificial Intelligence - IIT Hyderabad</option>
        </select>

        {/* AI EVALUATION SCORES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
          <div style={{ background: "#162540", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5", textTransform: "uppercase" }}>Readability</span>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8", marginTop: "4px" }}>88%</div>
          </div>
          <div style={{ background: "#162540", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5", textTransform: "uppercase" }}>Program Match</span>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#34d399", marginTop: "4px" }}>92%</div>
          </div>
          <div style={{ background: "#162540", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5", textTransform: "uppercase" }}>Visa Intent</span>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#f59e0b", marginTop: "4px" }}>78%</div>
          </div>
        </div>

        <label style={{ fontSize: "13px", color: "#8fa3c5", display: "block", marginBottom: "6px" }}>
          Your SOP Introduction &amp; Motivation Draft:
        </label>
        <textarea
          rows={5}
          value={sopDraft}
          onChange={(e) => setSopDraft(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            background: "#16243d",
            color: "white",
            border: "1px solid #2a3f63",
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "1.5",
            outline: "none"
          }}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedPage && setSelectedPage("AI Chat")}
            style={{
              background: "#3188ed",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ✦ Refine with AI Copilot
          </button>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Apply")}
            style={{
              background: "#162540",
              color: "#94a3b8",
              border: "1px solid #2a3f63",
              borderRadius: "8px",
              padding: "10px 18px",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Back to Applications
          </button>
        </div>
      </div>
    </div>
  );
}

export default SOPInsights;
