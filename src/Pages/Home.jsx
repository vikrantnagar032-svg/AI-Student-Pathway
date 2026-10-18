import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

const Home = ({ setSelectedPage }) => {
  const { profileData, analysisResult } = useStudent();

  const navigate = (page) => {
    if (typeof setSelectedPage === "function") {
      setSelectedPage(page);
    }
  };

  const studentFirstName = profileData?.fullName
    ? profileData.fullName.trim().split(" ")[0]
    : "Student";

  const readinessScore = analysisResult?.overall_score ?? 84;
  const careerMatchesCount = analysisResult?.recommendations?.length ?? 12;

  return (
    <div className="dashboard-page">

      {/* HEADER TEXT */}
      <div className="dashboard-heading">
        <h1>Welcome back, {studentFirstName}</h1>
        <p>Your personalized career pathway is ready</p>
      </div>

      {/* AI ANALYSIS CARD */}
      <div className="analysis-card">

        <div className="analysis-top">
          <div className="brain-icon">🧠</div>

          <div>
            <h2>AI Analysis Complete</h2>
            <p>{readinessScore}% Career Readiness</p>
          </div>
        </div>

        <div className="analysis-buttons">
          <button
            className="view-score-btn"
            onClick={() => navigate("Score Breakdown")}
          >
            View Score <span>→</span>
          </button>

          <button
            className="reasoning-btn"
            onClick={() => navigate("AI Reasoning")}
          >
            AI Reasoning
          </button>
        </div>

      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <div className="stat-card" onClick={() => navigate("Career Pathways")} style={{ cursor: "pointer" }}>
          <div className="stat-icon cyan">◎</div>
          <h2>{careerMatchesCount}</h2>
          <p>Career Matches</p>
        </div>

        <div className="stat-card" onClick={() => navigate("Programs")} style={{ cursor: "pointer" }}>
          <div className="stat-icon green">↗</div>
          <h2>High</h2>
          <p>Job Match</p>
        </div>

      </div>

      {/* STATUS CARDS */}
      <div className="status-list">

        <div className="status-card upload-card" onClick={() => navigate("Apply")}>
          <div className="status-icon">◷</div>

          <div className="status-content">
            <h3>Upload Documents</h3>
            <p>Track checklists &amp; deadlines</p>
          </div>

          <span className="status-arrow">→</span>
        </div>

        <div className="status-card complete-card" onClick={() => navigate("Profile")}>
          <div className="status-icon">✓</div>

          <div className="status-content">
            <h3>Student Profile</h3>
            <p>Update qualifications &amp; preferences</p>
          </div>

          <span className="status-arrow">→</span>
        </div>

      </div>

      {/* EXPLORE */}
      <div className="explore-section">

        <h2>Explore Your Pathway</h2>

        <div className="explore-grid">

          <button
            className="explore-card preview"
            onClick={() => navigate("Score Breakdown")}
          >
            <span>✧</span>
            <p>AI Preview</p>
          </button>

          <button
            className="explore-card reasoning"
            onClick={() => navigate("AI Reasoning")}
          >
            <span>♧</span>
            <p>AI Reasoning</p>
          </button>

          <button
            className="explore-card programs"
            onClick={() => navigate("Programs")}
          >
            <span>◎</span>
            <p>Programs</p>
          </button>

          <button
            className="explore-card careers"
            onClick={() => navigate("Career Pathways")}
          >
            <span>↗</span>
            <p>Career Options</p>
          </button>

        </div>

      </div>

    </div>
  );
};

export default Home;