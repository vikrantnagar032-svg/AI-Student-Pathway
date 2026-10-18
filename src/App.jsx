import { useState } from 'react';

import Navbar from './component/navbar.jsx';
import Home from './Pages/Home.jsx';
import './App.css';
import Footer from './component/footer.jsx';
import Profile from './Pages/Profile.jsx';
import AIChat from './Pages/AIChat.jsx';
import Programs from './Pages/Programs.jsx';
import Apply from './Pages/Apply.jsx';
import Welcome from './Pages/Welcome.jsx';
import AIPreview from "./Pages/AIPreview.jsx";
import AIReasoning from "./Pages/AIReasoning.jsx";
import ScoreBreakdown from "./Pages/ScoreBreakdown.jsx";
import PRPathway from "./Pages/PRPathway.jsx";
import MatchJustification from "./Pages/MatchJustification.jsx";
import RisksGaps from "./Pages/RisksGaps.jsx";
import WorkPathway from "./Pages/WorkPathway.jsx";
import ProvincialPR from "./Pages/ProvincialPR.jsx";
import Documents from "./Pages/Documents.jsx";
import SOPInsights from "./Pages/SOPInsights.jsx";
import Checklist from "./Pages/Checklist.jsx";
import VisaRisks from "./Pages/VisaRisks.jsx";
import AIAssistant from "./Pages/AIAssistant.jsx";
import Counsellor from "./Pages/Counsellor.jsx";
import ProgramDetails from "./Pages/ProgramDetails.jsx";
import CareerPathways from "./Pages/CareerPathways.jsx";
import Timeline from "./Pages/Timeline.jsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('Welcome');
  const [selectedPage, setSelectedPage] = useState('Welcome');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState('alex.rivera@example.com');
  const [signInPassword, setSignInPassword] = useState('demo12345');
  const [loginToast, setLoginToast] = useState(null);

  const showToast = (msg) => {
    setLoginToast(msg);
    setTimeout(() => setLoginToast(null), 3500);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getStarted = () => {
    console.log('Get Started clicked');
    setSelectedPage('Profile');
    setSelectedScreen('Profile Input');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setShowSignInModal(false);
    setSelectedPage('Home');
    setSelectedScreen('Dashboard');
    showToast(`🎉 Signed in successfully as ${signInEmail}!`);
  };

  const handleFastDemoSignIn = () => {
    setShowSignInModal(false);
    setSelectedPage('Home');
    setSelectedScreen('Dashboard');
    showToast('🎉 Signed in as Alex Rivera! Welcome to your Dashboard.');
  };

  const selectScreen = (screen) => {
    setSelectedScreen(screen);
    setMenuOpen(false);

    switch (screen) {
      case "Welcome":
        setSelectedPage("Welcome");
        break;

      case "Dashboard":
        setSelectedPage("Home");
        break;

      case "Profile Input":
        setSelectedPage("Profile");
        break;

      case "AI Preview":
        setSelectedPage("AI Preview");
        break;

      case "AI Reasoning":
        setSelectedPage("AI Reasoning");
        break;

      case "Score Breakdown":
        setSelectedPage("Score Breakdown");
        break;

      case "PR Pathway":
        setSelectedPage("PR Pathway");
        break;

      case "Program Matches":
        setSelectedPage("Programs");
        break;

      case "Match Justification":
        setSelectedPage("Match Justification");
        break;

      case "Risks & Gaps":
        setSelectedPage("Risks & Gaps");
        break;

      case "Work Pathway":
        setSelectedPage("Work Pathway");
        break;

      case "Provincial PR":
        setSelectedPage("Provincial PR");
        break;

      case "Documents":
        setSelectedPage("Documents");
        break;

      case "SOP Insights":
        setSelectedPage("SOP Insights");
        break;

      case "Checklist":
        setSelectedPage("Checklist");
        break;

      case "Visa Risks":
        setSelectedPage("Visa Risks");
        break;

      case "AI Assistant":
        setSelectedPage("AI Assistant");
        break;

      case "Counsellor":
        setSelectedPage("Counsellor");
        break;

      case "Program Details":
        setSelectedPage("Program Details");
        break;

      case "Career Pathways":
        setSelectedPage("Career Pathways");
        break;

      case "Timeline":
        setSelectedPage("Timeline");
        break;

      default:
        setSelectedPage("Welcome");
    }
  };

  const screens = [
    'Welcome',
    'Dashboard',
    'Profile Input',
    'AI Preview',
    'AI Reasoning',
    'Score Breakdown',
    'PR Pathway',
    'Program Matches',
    'Match Justification',
    'Risks & Gaps',
    'Work Pathway',
    'Provincial PR',
    'Documents',
    'SOP Insights',
    'Checklist',
    'Visa Risks',
    'AI Assistant',
    'Counsellor',
    'Program Details',
    'Career Pathways',
    'Timeline'
  ];

  return (
    <>
      <Navbar />

      {/* Hamburger Menu */}
      <div className="menu" onClick={toggleMenu}>
        ☰
      </div>


      {selectedPage === 'Welcome' && (
        <>
          <Welcome setSelectedPage={setSelectedPage} setSelectedScreen={setSelectedScreen} />

          {/* Get Started */}
          <button
            className="get-started"
            onClick={getStarted}
          >
            Get Started
            <span>→</span>
          </button>

          <p className="signin">
            Already have an account?{" "}
            <span
              onClick={() => setShowSignInModal(true)}
              role="button"
              tabIndex={0}
              title="Click to sign in"
            >
              Sign in
            </span>
          </p>
        </>
      )}

      {/* LOGIN TOAST */}
      {loginToast && (
        <div className="signin-toast">
          <span>{loginToast}</span>
        </div>
      )}

      {/* SIGN IN MODAL */}
      {showSignInModal && (
        <div className="signin-modal-overlay" onClick={() => setShowSignInModal(false)}>
          <div className="signin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="signin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="signin-modal-badge">✦ Arvian AI</span>
                <h2>Sign In</h2>
              </div>
              <button
                type="button"
                className="signin-modal-close"
                onClick={() => setShowSignInModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="signin-modal-sub">
              Sign in to your student pathway account to continue tracking college applications, CRS score, and AI advisor chats.
            </p>

            <form onSubmit={handleSignInSubmit}>
              <div className="signin-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="alex.rivera@example.com"
                  required
                />
              </div>

              <div className="signin-input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="signin-options-row">
                <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px", color: "#8fa3c5" }}>
                  <input type="checkbox" defaultChecked /> Remember me
                </label>
                <span
                  style={{ color: "#38bdf8", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
                  onClick={() => {
                    setSignInEmail("alex.rivera@example.com");
                    setSignInPassword("demo12345");
                  }}
                >
                  Fill Demo Credentials
                </span>
              </div>

              <button type="submit" className="signin-submit-btn">
                Sign In to Dashboard →
              </button>

              <button
                type="button"
                className="signin-demo-btn"
                onClick={handleFastDemoSignIn}
              >
                ⚡ 1-Click Demo Login (Alex Rivera)
              </button>
            </form>

            <div className="signin-modal-footer">
              New student?{" "}
              <span
                onClick={() => {
                  setShowSignInModal(false);
                  setSelectedPage("Profile");
                }}
              >
                Get Started with Profile Assessment →
              </span>
            </div>
          </div>
        </div>
      )}


      {selectedPage === 'Home' && (
        <div className="page">
          <Home setSelectedPage={setSelectedPage} />
        </div>
      )}
      {selectedPage === 'Programs' && (
        <div className="page">
          <Programs setSelectedPage={setSelectedPage} />
        </div>
      )}


      {selectedPage === 'Apply' && (
        <div className="page">
          <Apply setSelectedPage={setSelectedPage} />
        </div>
      )}


      {selectedPage === 'AI Chat' && (
        <div className="page">
          <AIChat setSelectedPage={setSelectedPage} />
        </div>
      )}


      {selectedPage === 'Profile' && (
        <Profile setSelectedPage={setSelectedPage} />
      )}
      {/* ================= AI PREVIEW ================= */}

      {selectedPage === "AI Preview" && (
        <div className="page">
          <AIPreview setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= AI REASONING ================= */}

      {selectedPage === "AI Reasoning" && (
        <div className="page">
          <AIReasoning setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= SCORE BREAKDOWN ================= */}

      {selectedPage === "Score Breakdown" && (
        <div className="page">
          <ScoreBreakdown setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= PR PATHWAY ================= */}

      {selectedPage === "PR Pathway" && (
        <div className="page">
          <PRPathway setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= MATCH JUSTIFICATION ================= */}

      {selectedPage === "Match Justification" && (
        <div className="page">
          <MatchJustification />
        </div>
      )}


      {/* ================= RISKS & GAPS ================= */}

      {selectedPage === "Risks & Gaps" && (
        <div className="page">
          <RisksGaps />
        </div>
      )}


      {/* ================= WORK PATHWAY ================= */}

      {selectedPage === "Work Pathway" && (
        <div className="page">
          <WorkPathway />
        </div>
      )}


      {/* ================= PROVINCIAL PR ================= */}

      {selectedPage === "Provincial PR" && (
        <div className="page">
          <ProvincialPR />
        </div>
      )}


      {/* ================= DOCUMENTS ================= */}

      {selectedPage === "Documents" && (
        <div className="page">
          <Documents setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= SOP INSIGHTS ================= */}

      {selectedPage === "SOP Insights" && (
        <div className="page">
          <SOPInsights setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= CHECKLIST ================= */}

      {selectedPage === "Checklist" && (
        <div className="page">
          <Checklist setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= VISA RISKS ================= */}

      {selectedPage === "Visa Risks" && (
        <div className="page">
          <VisaRisks />
        </div>
      )}


      {/* ================= AI ASSISTANT ================= */}

      {selectedPage === "AI Assistant" && (
        <div className="page">
          <AIAssistant />
        </div>
      )}


      {/* ================= COUNSELLOR ================= */}

      {selectedPage === "Counsellor" && (
        <div className="page">
          <Counsellor />
        </div>
      )}


      {/* ================= PROGRAM DETAILS ================= */}

      {selectedPage === "Program Details" && (
        <div className="page">
          <ProgramDetails setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= CAREER PATHWAYS ================= */}

      {selectedPage === "Career Pathways" && (
        <div className="page">
          <CareerPathways setSelectedPage={setSelectedPage} />
        </div>
      )}


      {/* ================= TIMELINE ================= */}

      {selectedPage === "Timeline" && (
        <div className="page">
          <Timeline />
        </div>
      )}

      <div
        className={`screen-menu ${menuOpen ? 'show' : ''}`}
        id="screenMenu"
      >
        <div className="menu-header">
          <h2>All Screens</h2>
        </div>

        {screens.map((screen) => (
          <div
            key={screen}
            className={`screen-item ${selectedScreen === screen ? 'active' : ''
              }`}
            onClick={() => selectScreen(screen)}
          >
            <span>{screen}</span>
            <span>›</span>
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div
        className={`menu-overlay ${menuOpen ? 'show' : ''}`}
        id="menuOverlay"
        onClick={toggleMenu}
      />

      {/* ================= FOOTER ================= */}
      <Footer
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </>
  );
}

export default App;