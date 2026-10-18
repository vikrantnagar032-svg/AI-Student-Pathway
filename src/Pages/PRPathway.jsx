import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function PRPathway({ setSelectedPage }) {
  const { profileData, multiSelect, analysisResult } = useStudent();
  const overall = analysisResult?.overall_score ?? 84;
  const targetProvinces = (multiSelect?.provinces && multiSelect.provinces.length > 0)
    ? multiSelect.provinces.join(", ")
    : "Ontario, British Columbia";

  const stages = [
    {
      num: "1",
      title: "Enroll in a DLI Program",
      duration: "1 – 2 Years",
      status: "In Progress",
      statusColor: "#38bdf8",
      desc: `Pursue an eligible degree/diploma at a Designated Learning Institution (DLI) in ${targetProvinces}. Maintain full-time status to secure post-graduation work rights.`
    },
    {
      num: "2",
      title: "Post-Graduation Work Permit (PGWP)",
      duration: "Up to 3 Years",
      status: "Guaranteed Option",
      statusColor: "#20e59e",
      desc: "Graduates of 2+ year programs qualify for an open 3-year PGWP without needing an employer LMIA sponsorship. Allows working anywhere across Canada."
    },
    {
      num: "3",
      title: "Gain Canadian Tech Work Experience",
      duration: "1 Year Minimum",
      status: "Crucial Milestone",
      statusColor: "#f59e0b",
      desc: `Accumulate 1,560 hours of continuous paid work in TEER 0/1/2/3 occupations (Software Developer, AI/ML Specialist, Data Analyst) to qualify for Canadian Experience Class (CEC).`
    },
    {
      num: "4",
      title: "Permanent Residency (PR) ITA",
      duration: "6 Months Processing",
      status: "88% Probability",
      statusColor: "#00d7d0",
      desc: "Receive an Invitation to Apply (ITA) via Express Entry STEM category-based draws or Provincial Nominee Program (PNP) streams."
    }
  ];

  const pnpStreams = [
    {
      province: "Ontario (OINP)",
      stream: "Human Capital Priorities (Tech Draws)",
      scoreReq: "CRS 465–485",
      advantage: "Targets software engineers, data specialists, and AI researchers without job offer requirement."
    },
    {
      province: "British Columbia (BC PNP)",
      stream: "BC PNP Tech Stream",
      scoreReq: "80+ Registration Points",
      advantage: "Weekly targeted tech draws for 35 priority tech occupations with expedited provincial processing."
    },
    {
      province: "Alberta (AAIP)",
      stream: "Accelerated Tech Pathway",
      scoreReq: "CRS 300+ with Tech Job Offer",
      advantage: "Direct fast-track processing within 4–6 weeks for IT and software professionals."
    }
  ];

  const techSalaries = [
    { role: "AI / Machine Learning Engineer", avg: "$105,000 CAD", range: "$88k – $135k CAD" },
    { role: "Software Engineer / Full Stack", avg: "$95,000 CAD", range: "$80k – $125k CAD" },
    { role: "Data Scientist & Analytics", avg: "$90,000 CAD", range: "$75k – $118k CAD" },
    { role: "Cyber Security Analyst", avg: "$92,000 CAD", range: "$78k – $120k CAD" },
    { role: "Web Application Developer", avg: "$82,000 CAD", range: "$68k – $105k CAD" }
  ];

  return (
    <div className="dashboard-page" style={{ maxWidth: "780px", margin: "0 auto", padding: "20px 16px 120px" }}>
      {/* TOP NAVIGATION BAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Welcome")}
            style={{
              background: "#101a32",
              color: "#8fa3c5",
              border: "1px solid #263958",
              padding: "8px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            ← Back to Welcome
          </button>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Home")}
            style={{
              background: "#1b2b45",
              color: "white",
              border: "1px solid #263958",
              padding: "8px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            Dashboard
          </button>
        </div>
        <span style={{
          background: "rgba(0, 215, 208, 0.12)",
          color: "#00d7d0",
          border: "1px solid rgba(0, 215, 208, 0.3)",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600"
        }}>
          ✦ Work &amp; PR Prediction
        </span>
      </div>

      {/* HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "6px", color: "#f8fafc" }}>
          Work &amp; Permanent Residency (PR) Prediction
        </h1>
        <p style={{ color: "#8fa3c5", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
          Algorithmic forecast of your journey from graduation to 3-year PGWP and Express Entry Permanent Residency in Canada.
        </p>
      </div>

      {/* SUMMARY STATS BANNER */}
      <div style={{
        background: "linear-gradient(135deg, #09253e 0%, #0d1b33 100%)",
        border: "1px solid #2563eb",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", textAlign: "center" }}>
          <div style={{ background: "rgba(16, 26, 50, 0.7)", padding: "14px", borderRadius: "12px", border: "1px solid #1e3a5f" }}>
            <span style={{ fontSize: "12px", color: "#8fa3c5", textTransform: "uppercase", letterSpacing: "0.5px" }}>Estimated CRS Score</span>
            <div style={{ fontSize: "26px", fontWeight: "700", color: "#38bdf8", marginTop: "4px" }}>488 <span style={{ fontSize: "14px", color: "#64748b" }}>/ 1200</span></div>
            <span style={{ fontSize: "11px", color: "#20e59e" }}>+50 pts with 1-yr PGWP</span>
          </div>

          <div style={{ background: "rgba(16, 26, 50, 0.7)", padding: "14px", borderRadius: "12px", border: "1px solid #1e3a5f" }}>
            <span style={{ fontSize: "12px", color: "#8fa3c5", textTransform: "uppercase", letterSpacing: "0.5px" }}>STEM Draw Cutoff</span>
            <div style={{ fontSize: "26px", fontWeight: "700", color: "#20e59e", marginTop: "4px" }}>481</div>
            <span style={{ fontSize: "11px", color: "#20e59e" }}>✓ Above Target Cutoff</span>
          </div>

          <div style={{ background: "rgba(16, 26, 50, 0.7)", padding: "14px", borderRadius: "12px", border: "1px solid #1e3a5f" }}>
            <span style={{ fontSize: "12px", color: "#8fa3c5", textTransform: "uppercase", letterSpacing: "0.5px" }}>PGWP Duration</span>
            <div style={{ fontSize: "26px", fontWeight: "700", color: "#00d7d0", marginTop: "4px" }}>3 Years</div>
            <span style={{ fontSize: "11px", color: "#8fa3c5" }}>Open Work Permit</span>
          </div>

          <div style={{ background: "rgba(16, 26, 50, 0.7)", padding: "14px", borderRadius: "12px", border: "1px solid #1e3a5f" }}>
            <span style={{ fontSize: "12px", color: "#8fa3c5", textTransform: "uppercase", letterSpacing: "0.5px" }}>PR Probability</span>
            <div style={{ fontSize: "26px", fontWeight: "700", color: "#a855f7", marginTop: "4px" }}>{overall}%</div>
            <span style={{ fontSize: "11px", color: "#38bdf8" }}>High Confidence</span>
          </div>
        </div>

        <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#cbd5e1" }}>
            Profile: <strong style={{ color: "#38bdf8" }}>{profileData.fullName || "Alex Rivera"}</strong> ({profileData.fieldOfStudy || "Computer Science"})
          </span>
          <span style={{ fontSize: "13px", color: "#cbd5e1" }}>
            IELTS: <strong style={{ color: "#20e59e" }}>{profileData.ieltsOverall || "7.0"} Overall</strong> (CLB 9 eligible)
          </span>
        </div>
      </div>

      {/* 4-STAGE TIMELINE */}
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "14px", color: "#e2e8f0" }}>
        Study → Work → Permanent Residency Timeline
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
        {stages.map((stage) => (
          <div
            key={stage.num}
            style={{
              background: "#121d34",
              border: "1px solid #263958",
              borderRadius: "16px",
              padding: "18px 20px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start"
            }}
          >
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "16px",
              flexShrink: 0
            }}>
              {stage.num}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", flexWrap: "wrap", gap: "6px" }}>
                <strong style={{ fontSize: "16px", color: "#f1f5f9" }}>{stage.title}</strong>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#8fa3c5", background: "#18243c", padding: "2px 8px", borderRadius: "6px" }}>
                    ⏱ {stage.duration}
                  </span>
                  <span style={{ fontSize: "12px", color: stage.statusColor, fontWeight: "600" }}>
                    ● {stage.status}
                  </span>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
                {stage.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PROVINCIAL NOMINEE PROGRAM (PNP) BREAKDOWN */}
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "14px", color: "#e2e8f0" }}>
        Provincial Nominee Program (PNP) Pathways
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "28px" }}>
        {pnpStreams.map((pnp, idx) => (
          <div
            key={idx}
            style={{
              background: "#101a32",
              border: "1px solid #233454",
              borderRadius: "14px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <strong style={{ color: "#38bdf8", fontSize: "14px" }}>{pnp.province}</strong>
                <span style={{ fontSize: "11px", color: "#20e59e", background: "rgba(32, 229, 158, 0.12)", padding: "2px 6px", borderRadius: "4px" }}>
                  {pnp.scoreReq}
                </span>
              </div>
              <h4 style={{ fontSize: "13px", color: "#e2e8f0", margin: "0 0 8px 0" }}>{pnp.stream}</h4>
              <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.4", margin: 0 }}>{pnp.advantage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SALARY & WORK OPPORTUNITY OUTLOOK */}
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "14px", color: "#e2e8f0" }}>
        Canadian Tech Industry Salary Projections
      </h2>
      <div style={{ background: "#101a32", border: "1px solid #263958", borderRadius: "16px", padding: "16px 20px", marginBottom: "28px" }}>
        {techSalaries.map((sal, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: idx !== techSalaries.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              flexWrap: "wrap",
              gap: "8px"
            }}
          >
            <div>
              <div style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: "500" }}>{sal.role}</div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>Range: {sal.range}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#00d7d0", fontSize: "15px", fontWeight: "700" }}>{sal.avg}</div>
              <div style={{ color: "#20e59e", fontSize: "11px" }}>High Canadian Hiring Demand</div>
            </div>
          </div>
        ))}
      </div>

      {/* CALL TO ACTION BUTTONS */}
      <div style={{
        background: "linear-gradient(135deg, #101c38, #18284c)",
        border: "1px solid #38bdf8",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "14px"
      }}>
        <div>
          <h3 style={{ fontSize: "16px", color: "#f8fafc", margin: "0 0 4px 0" }}>Ready to Take the Next Step?</h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Explore curated programs or speak directly with the AI advisor.</p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Programs")}
            style={{
              background: "linear-gradient(90deg, #2588f5, #08b8b0)",
              border: "none",
              color: "white",
              padding: "10px 18px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Explore Programs →
          </button>
          <button
            onClick={() => setSelectedPage && setSelectedPage("AI Chat")}
            style={{
              background: "#1c2b4a",
              border: "1px solid #3b82f6",
              color: "#38bdf8",
              padding: "10px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Ask AI Advisor 💬
          </button>
        </div>
      </div>
    </div>
  );
}

export default PRPathway;
