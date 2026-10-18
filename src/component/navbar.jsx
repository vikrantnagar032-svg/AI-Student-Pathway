import logo from '../assets/arvian_logo_exact.png';
import "./Navbar.css";
function Navbar() {
  return (
    <div>
      <nav className="Navbar">
        <img src={logo} alt="Logo" className="logo" />

      </nav>
    </div>
  );
}

export default Navbar
