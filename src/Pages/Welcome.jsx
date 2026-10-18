import React from 'react';
import "./Welcome.css";
import logo from '../assets/arvian_logo_exact.png';
import brain from '../assets/ai_matching_brain.png';
import study from '../assets/study_pathway_cap.png';
import work from '../assets/work_pr_briefcase.png';
import explainable from '../assets/explainable_ai_sparkles.png';

const Welcome = ({ setSelectedPage, setSelectedScreen }) => {
  const navigate = (page, screen) => {
    if (setSelectedPage) {
      setSelectedPage(page);
    }
    if (setSelectedScreen && screen) {
      setSelectedScreen(screen);
    }
  };

  const handleKeyDown = (e, page, screen) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(page, screen);
    }
  };

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="Logo"
        className="main-logo"
      />

      <p>
        Your AI-powered guide to Study → Work → PR in Canada
      </p>

      {/* 1️⃣ AI-POWERED MATCHING */}
      <div
        className="login-card"
        onClick={() => navigate("Programs", "Program Matches")}
        onKeyDown={(e) => handleKeyDown(e, "Programs", "Program Matches")}
        role="button"
        tabIndex={0}
        title="Explore Program Matches (#1 AI/ML to #6 Cyber Security)"
      >
        <div className="first">
          <img
            src={brain}
            alt="AI Matching Brain"
            className="ai-matching-brain"
          />
          <p>AI-Powered Matching</p>
        </div>
        <span className="card-arrow">›</span>
      </div>

      {/* 2️⃣ STUDY PATHWAY ANALYSIS */}
      <div
        className="login-card"
        onClick={() => navigate("Score Breakdown", "Score Breakdown")}
        onKeyDown={(e) => handleKeyDown(e, "Score Breakdown", "Score Breakdown")}
        role="button"
        tabIndex={0}
        title="View Comprehensive Study Pathway & Score Breakdown"
      >
        <div className="second">
          <img
            src={study}
            alt="Study Pathway"
            className="study-pathway-cap"
          />
          <p>Study Pathway Analysis</p>
        </div>
        <span className="card-arrow">›</span>
      </div>

      {/* 3️⃣ WORK & PR PREDICTION */}
      <div
        className="login-card"
        onClick={() => navigate("PR Pathway", "PR Pathway")}
        onKeyDown={(e) => handleKeyDown(e, "PR Pathway", "PR Pathway")}
        role="button"
        tabIndex={0}
        title="View Work Permit & Permanent Residency Prediction"
      >
        <div className="third">
          <img
            src={work}
            alt="Work & PR"
            className="work-pr-briefcase"
          />
          <p>Work & PR Prediction</p>
        </div>
        <span className="card-arrow">›</span>
      </div>

      {/* 4️⃣ EXPLAINABLE AI REASONING */}
      <div
        className="login-card"
        onClick={() => navigate("AI Reasoning", "AI Reasoning")}
        onKeyDown={(e) => handleKeyDown(e, "AI Reasoning", "AI Reasoning")}
        role="button"
        tabIndex={0}
        title="View Algorithmic Decision Pipeline & Reasoning"
      >
        <div className="fourth">
          <img
            src={explainable}
            alt="Explainable AI"
            className="explainable-ai"
          />
          <p>Explainable AI Reasoning</p>
        </div>
        <span className="card-arrow">›</span>
      </div>
    </div>   
  );
};

export default Welcome;