import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function ProgramDetails({ setSelectedPage }) {
  const { applications } = useStudent();
  const currentApp = applications[0] || {
    title: "Cloud Computing - Humber College",
    deadline: "2026-10-01"
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "30px 20px 120px", color: "white" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}>Program Details &amp; Admissions</h1>
        <p style={{ color: "#8fa3c5", fontSize: "15px" }}>
          Key criteria, curriculum modules, work permit eligibility, and admission cutoffs.
        </p>
      </div>

      <div style={{ background: "#121d34", border: "1px solid #273957", borderRadius: "16px", padding: "22px", marginBottom: "20px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            color: "#00d7d0",
            background: "#083344",
            padding: "3px 8px",
            borderRadius: "6px"
          }}
        >
          Featured Target Pathway
        </span>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f8fafc", margin: "10px 0 6px" }}>
          {currentApp.title}
        </h2>
        <p style={{ color: "#38bdf8", fontSize: "14px", margin: 0 }}>
          📅 Application Deadline: {currentApp.deadline}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "18px 0" }}>
          <div style={{ background: "#162540", padding: "12px", borderRadius: "10px" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5" }}>CREDENTIAL</span>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0", marginTop: "4px" }}>
              Ontario College Graduate Certificate (1 Year)
            </div>
          </div>
          <div style={{ background: "#162540", padding: "12px", borderRadius: "10px" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5" }}>WORK PERMIT (PGWP)</span>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#34d399", marginTop: "4px" }}>
              Eligible for up to 3-year PGWP
            </div>
          </div>
          <div style={{ background: "#162540", padding: "12px", borderRadius: "10px" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5" }}>MINIMUM ACADEMIC CUTOFF</span>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0", marginTop: "4px" }}>
              65%+ or 6.5 CGPA in Bachelor's
            </div>
          </div>
          <div style={{ background: "#162540", padding: "12px", borderRadius: "10px" }}>
            <span style={{ fontSize: "11px", color: "#8fa3c5" }}>IELTS / LANGUAGE CUTOFF</span>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0", marginTop: "4px" }}>
              Overall 6.5 (No band &lt; 6.0)
            </div>
          </div>
        </div>

        <div style={{ background: "#0d2238", border: "1px solid #143e69", borderRadius: "10px", padding: "14px", marginBottom: "18px" }}>
          <h4 style={{ fontSize: "14px", color: "#38bdf8", margin: "0 0 6px" }}>✦ AI Match Analysis</h4>
          <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.5", margin: 0 }}>
            Your background in software engineering strongly matches the distributed computing prerequisites.
            Graduates in this track qualify for TEER 1 STEM Express Entry category draws with higher invitations in Ontario.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Apply")}
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
            Start Application Tracker →
          </button>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Programs")}
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
            Browse Other Programs
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetails;
