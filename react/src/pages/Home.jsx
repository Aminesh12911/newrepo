import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apple_logo from './Images/apple_logo.png';
import googleplay_logo from './Images/googleplay_logo.png';
import home_img1 from './Images/home_img2.jpg';

function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-container">
          {/* Left Side: Text Info */}
          <div className="hero-text">
            <h1>Running a factory, </h1>
            <h1>now <span className="blue-text">simple</span>!</h1>
            <p>Making factories paperless</p>
            <Link to="/Register" className="cta-btn">Sign Up for Free</Link>
            <div className="available-on">
              <p>Also available on</p>
              <img src={apple_logo} alt="Apple App Store" className="app-logo" />
              <img src={googleplay_logo} alt="Google Play Store" className="app-logo" />
            </div>
          </div>
          {/* Right Side: Image */}
          <div className="hero-image">
            <img src={home_img1} alt="Factory Automation" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <h1>BENEFITS</h1>
        <div className="benefits-container">
          {/* Left Column */}
          <div className="benefits-column">
            <div className="benefit-item">
              <h3><b>100% Free</b></h3>
              <p>An always free platform available on Android, iOS, and Web.</p>
            </div>
            <div className="benefit-item">
              <h3><b>Automatic Data Backup</b></h3>
              <p>Never lose your data, with unlimited cloud storage and 256-bit encryption.</p>
            </div>
            <div className="benefit-item">
              <h3><b>Simple to Use</b></h3>
              <p>Even semi-skilled or unskilled workers can use the app with ease.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="benefits-column">
            <div className="benefit-item">
              <h3><b>Save Time</b></h3>
              <p>Manage factory digitally, save time without the hassle of manual paperwork.</p>
            </div>
            <div className="benefit-item">
              <h3><b>Prevent Theft</b></h3>
              <p>Keep track of stock of different goods. Action by every user is recorded on the app.</p>
            </div>
            <div className="benefit-item">
              <h3><b>Built by Manufacturers</b></h3>
              <p>Built by engineers with backgrounds in manufacturing and technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <section id="testimonials" className="section">
        <h2>Testimonials</h2>
        <p>See what our clients say about us!</p>
      </section>

      <section id="features" className="section">
        <h2>Features</h2>
        <div className="services-container">
          <div className="service-box">
            <h3>Automation Solutions</h3>
            <p>Customized automation for diverse dairy operations.</p>
          </div>
          <div className="service-box">
            <h3>Consulting</h3>
            <p>Expert consulting services to optimize your dairy processes.</p>
          </div>
          <div className="service-box">
            <h3>Support & Maintenance</h3>
            <p>24/7 support and maintenance for all dairy systems.</p>
          </div>
        </div>
      </section>

      <section id="faqs" className="section">
        <h2>Frequently Asked Questions</h2>
        <p>For more information, get in touch with us at contact@dairyops.com.</p>
      </section>

      <footer>
        <p>&copy; 2024 DairyOps. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
