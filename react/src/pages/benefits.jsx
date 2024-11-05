import React from 'react';
import './Css/Benefits.css';

const Benefits = ()=> {
  return (

    <div id="benefits" className="benefits-section">
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
      <div className="benefits-column">a
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
  </div>
      );
    }
    
   

export default Benefits;
