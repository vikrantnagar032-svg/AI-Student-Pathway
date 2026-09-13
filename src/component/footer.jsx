import React from 'react'

const Footer = ({ selectedPage, setSelectedPage }) => {
    return (
        <div>
            <footer className="Footer">
               
        <div className={selectedPage == "Home"? "Footer-item active" : "Footer-item"}
        onClick ={() => setSelectedPage("Home")}>
          <span>⌂</span>
          <p>Home</p>
        </div>

        <div className={selectedPage == "Programs"? "Footer-item active" : "Footer-item"}
        onClick ={() => setSelectedPage("Programs")}>
          <span>⌕</span>
          <p>Programs</p>
        </div>

        <div className={selectedPage == "Apply"? "Footer-item active" : "Footer-item"}
        onClick ={() => setSelectedPage("Apply")}>
          <span>▤</span>
          <p>Apply</p>
        </div>

        <div className={selectedPage == "AI Chat"? "Footer-item active" : "Footer-item"}
        onClick ={() => setSelectedPage("AI Chat")}>
          <span>□</span>
          <p>AI Chat</p>
        </div>

        <div className={selectedPage == "Profile"? "Footer-item active" : "Footer-item"}
        onClick ={() => setSelectedPage("Profile")}>
          <span>♙</span>
          <p>Profile</p>
        </div>
            </footer>
        </div>
    )
}

export default Footer
