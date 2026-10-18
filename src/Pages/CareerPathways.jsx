import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function CareerPathways({ setSelectedPage }) {
  const { analysisResult, multiSelect } = useStudent();
  const recommendations = analysisResult?.recommendations || [
    { career: "AI / ML Engineer", score: 94 },
    { career: "Data Scientist", score: 90 },
    { career: "Full Stack Developer", score: 87 },
    { career: "Cloud Solutions Architect", score: 84 }
  ];

  const careerDetails = {
    "AI / ML Engineer": {
      salary: "$95,000 - $135,000 CAD",
      noc: "NOC 21211 (Data scientists & AI)",
      growth: "+24% over 5 years",
      skills: ["Python", "TensorFlow/PyTorch", "Data Pipelines"]
    },
    "Data Scientist / Analyst": {
      salary: "$82,000 - $115,000 CAD",
      noc: "NOC 21211 (Data scientists)",
      growth: "+21% over 5 years",
      skills: ["SQL", "Data Modeling", "Python/R", "PowerBI"]
    },
    "Data Scientist": {
      salary: "$88,000 - $125,000 CAD",
      noc: "NOC 21211 (Data scientists)",
      growth: "+22% over 5 years",
      skills: ["Machine Learning", "Python", "SQL", "Big Data"]
    },
    "Full Stack Developer": {
      salary: "$85,000 - $120,000 CAD",
      noc: "NOC 21234 (Web developers and programmers)",
      growth: "+19% over 5 years",
      skills: ["React/Node.js", "REST APIs", "TypeScript", "Databases"]
    },
    "Cloud Solutions Architect": {
      salary: "$105,000 - $145,000 CAD",
      noc: "NOC 21222 (Information systems specialists)",
      growth: "+28% over 5 years",
      skills: ["AWS / Azure", "Kubernetes", "DevOps", "Security"]
    },
    "Software Engineer": {
      salary: "$88,000 - $125,000 CAD",
      noc: "NOC 21231 (Software engineers and designers)",
      growth: "+18% over 5 years",
      skills: ["Data Structures", "Algorithms", "System Architecture"]
    },
    "IT Systems Analyst": {
      salary: "$78,000 - $105,000 CAD",
      noc: "NOC 21221 (Business systems specialists)",
      growth: "+15% over 5 years",
      skills: ["Requirements Analysis", "Agile/Scrum", "IT Infrastructure"]
    }
  };

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
        <span style={{ color: "#00d7d0", fontSize: "14px" }}>Canadian Labor Market</span>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "6px" }}>Career Pathways</h1>
        <p style={{ color: "#86a0c5" }}>Occupations matched to your skills with Canadian salary &amp; immigration demand</p>
      </div>

      {/* CAREER CARDS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {recommendations.map((item, idx) => {
          const info = careerDetails[item.career] || {
            salary: "$80,000 - $115,000 CAD",
            noc: "TEER 1 / TEER 2 Occupation",
            growth: "+18% high demand",
            skills: multiSelect.skills || ["Tech Competencies"]
          };

          return (
            <div key={idx} style={{
              background: "#121d34",
              border: "1px solid #263958",
              borderRadius: "16px",
              padding: "20px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{
                      background: "#163a5f",
                      color: "#48aaff",
                      fontSize: "12px",
                      fontWeight: "700",
                      padding: "2px 8px",
                      borderRadius: "6px"
                    }}>
                      #{idx + 1}
                    </span>
                    <h2 style={{ fontSize: "18px", margin: 0 }}>{item.career}</h2>
                  </div>
                  <span style={{ color: "#7a95b8", fontSize: "12px" }}>{info.noc}</span>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{
                    background: "#083c34",
                    color: "#20e59e",
                    fontSize: "14px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "10px",
                    display: "inline-block"
                  }}>
                    {item.score}% Match
                  </span>
                </div>
              </div>

              {/* STATS ROW */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                background: "#0a1528",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "14px"
              }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#6e89ab", display: "block" }}>AVERAGE CAD SALARY</span>
                  <strong style={{ fontSize: "14px", color: "#e2e8f0" }}>{info.salary}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#6e89ab", display: "block" }}>JOB MARKET GROWTH</span>
                  <strong style={{ fontSize: "14px", color: "#20e59e" }}>{info.growth}</strong>
                </div>
              </div>

              {/* SKILLS */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#8ca4c4" }}>Core Skills:</span>
                {info.skills.map((skill, sIdx) => (
                  <span key={sIdx} style={{
                    background: "#1c2c48",
                    color: "#00d7d0",
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px"
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CareerPathways;
