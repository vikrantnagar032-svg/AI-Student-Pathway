import React from 'react'
import logo from '../assets/arvian_logo_exact.png';
import brain from '../assets/ai_matching_brain.png';
import study from '../assets/study_pathway_cap.png';
import work from '../assets/work_pr_briefcase.png';
import explainable from '../assets/explainable_ai_sparkles.png';
const Home = () => {
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

      <div className="login-card">
        <div className="first">
          <img
            src={brain}
            alt="AI Matching Brain"
            className="ai-matching-brain"
          />
          <p>AI-Powered Matching</p>
        </div>
      </div>


      <div className="login-card">
        <div className="second">
          <img
            src={study}
            alt="Study Pathway"
            className="study-pathway-cap"
          />
          <p>Study Pathway Analysis</p>
        </div>
      </div>


      <div className="login-card">
        <div className="third">
          <img
            src={work}
            alt="Work & PR"
            className="work-pr-briefcase"
          />
          <p>Work & PR Prediction</p>
        </div>
      </div>


      <div className="login-card">
        <div className="fourth">
          <img
            src={explainable}
            alt="Explainable AI"
            className="explainable-ai"
          />
          <p>Explainable AI Reasoning</p>
        </div>
      </div>
    </div>   
    

  )
}

export default Home