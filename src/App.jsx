import { useState } from 'react';

import Navbar from './component/navbar.jsx';
import Home from './Pages/Home.jsx';
import './App.css';
import Footer from './component/footer.jsx';
import Profile from './Pages/Profile.jsx';
import AIChat from './Pages/AIChat.jsx';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('Welcome');
  const [selectedPage, setSelectedPage] = useState('Home');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getStarted = () => {
    console.log('Get Started clicked');
    setSelectedPage('Profile')
  };

  const selectScreen = (screen) => {
    setSelectedScreen(screen);
    setMenuOpen(false);
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
    'Career Pathway',
    'Timeline'
  ];

  return (
    <>
      <Navbar />

      {/* Hamburger Menu */}
      <div className="menu" onClick={toggleMenu}>
        ☰
      </div>

      {/* ================= HOME ================= */}
      {selectedPage === 'Home' && (
        <>
        <Home />
                 {/* Get Started */ }
  <button
    className="get-started"
    onClick={getStarted}
  >
    Get Started
    <span>→</span>
  </button>
          
          <p className="signin">
            Already have an account? <span>Sign in</span>
          </p>
        </>
      )}

      
      {selectedPage === 'Programs' && (
        <div className="page">
          <Programs />
        </div>
      )}

      
      {selectedPage === 'Apply' && (
        <div className="page">
          <h1>Apply</h1>
          <p>
            Manage your applications here.
          </p>
        </div>
      )}

      
      {selectedPage === 'AI Chat' && (
        <div className="page">
          <AIChat />
        </div>
      )}

    
      {selectedPage === 'Profile' && (
          <Profile />
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
            className={`screen-item ${
              selectedScreen === screen ? 'active' : ''
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