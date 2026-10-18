import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function AIPreview({ setSelectedPage }) {
  const { profileData, multiSelect, analysisResult } = useStudent();
  const primaryProvince = (multiSelect.provinces && multiSelect.provinces[0]) || "Ontario";

  const timelineSteps = [
    {
      phase: "Phase 1: Academic Study",
      duration: "1 - 2 Years",
      highlight: "Designated Learning Institution (DLI)",
      description: `Enroll in a high-demand tech credential in ${primaryProvince}. Eligible for off-campus work up to 24 hrs/week during study terms.`
    },
    {
      phase: "Phase 2: Post-Graduation Work (PGWP)",
      duration: "Up to 3 Years",
      highlight: "Open Work Permit",
      description: `Transition directly from student status to a Canadian work permit without needing an employer LMIA sponsorship.`
    },
    {
      phase: "Phase 3: Canadian Experience Class (CEC)",
      duration: "Year 2 - 3 of Work",
      highlight: "TEER 1/2 Skilled Employment",
      description: `Accumulate 1 full year of Canadian skilled work experience to unlock massive CRS Express Entry score points.`
    },
    {
      phase: "Phase 4: Permanent Residency (PR)",
      duration: "Final Milestone",
      highlight: `${primaryProvince} PNP or Express Entry`,
      description: `Receive Invitation to Apply (ITA) for Canadian Permanent Residency, paving the way for citizenship.`
    }
  ];

  return (
    <div className="dashboard-page" style={{ maxWidth: "720px", margin: "0 auto", padding: "20px 15px 120px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <button
          onClick={() => setSelectedPage && setSelectedPage("Home")}
          style={{ background: "#1b2b45", color: "white", border: "1px solid #263958", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }}
        >
          ← Back to Dashboard
        </button>
        <span style={{ color: "#3188ed", fontSize: "14px" }}>Study → Work → PR</span>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "6px" }}>AI Pathway Preview</h1>
        <p style={{ color: "#86a0c5" }}>Your customized roadmap from international student to Canadian Permanent Resident</p>
      </div>

      {/* SUMMARY BADGE */}
      <div style={{
        background: "linear-gradient(135deg, #12284c, #1f143d)",
        border: "1px solid #2f5699",
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ color: "#8cb4e6", fontSize: "12px", textTransform: "uppercase" }}>TARGET PROFILE</span>
            <h2 style={{ fontSize: "18px", margin: "4px 0" }}>{profileData.fullName || "International Student"}</h2>
            <p style={{ color: "#9db8db", fontSize: "13px", margin: 0 }}>Target Destination: {primaryProvince}, Canada</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ background: "#0e3b32", color: "#20e59e", padding: "4px 10px", borderRadius: "10px", fontSize: "13px", fontWeight: "700" }}>
              {analysisResult?.overall_score || 84}% Feasibility
            </span>
          </div>
        </div>
      </div>

      {/* TIMELINE LIST */}
      <h3 style={{ fontSize: "18px", marginBottom: "14px", color: "#e0e6ed" }}>Pathway Milestones</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {timelineSteps.map((step, idx) => (
          <div key={idx} style={{
            background: "#121d34",
            border: "1px solid #263958",
            borderRadius: "16px",
            padding: "20px",
            position: "relative"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ color: "#00d7d0", fontWeight: "700", fontSize: "14px" }}>{step.phase}</span>
              <span style={{ background: "#1b2d4f", color: "#8cb4e6", padding: "3px 8px", borderRadius: "8px", fontSize: "12px" }}>
                {step.duration}
              </span>
            </div>
            <strong style={{ display: "block", color: "#ffffff", fontSize: "16px", marginBottom: "6px" }}>
              {step.highlight}
            </strong>
            <p style={{ color: "#8ea4c4", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIPreview;
