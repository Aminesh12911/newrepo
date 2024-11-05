import React from 'react';
import { Link } from 'react-router-dom';
import{Link as ScrollLink} from 'react-scroll'
import './Navbar.css'
const Navbar = () => {
    return (
      <header>
        <nav className="navbar">
          <div className="logo">DairyOps</div>
          <ul className="nav-links">
            <li><ScrollLink to="benefits" smooth={true} duration={500}>Benefits</ScrollLink></li>
            <li><ScrollLink to="testimonials" smooth={true} duration={500}>Testimonials</ScrollLink></li>
            <li><ScrollLink to="features" smooth={true} duration={500}>Features</ScrollLink></li>
            <li><ScrollLink to="faqs" smooth={true} duration={500}>FAQs</ScrollLink></li>
            <li><Link to="/login" className='login-link'>Login</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Navbar;