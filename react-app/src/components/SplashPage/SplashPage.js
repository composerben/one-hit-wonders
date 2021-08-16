import React from "react";
import "./splash-page.css";

const SplashPage = () => {
  return (
    <>
      <h1 className="welcome-text">Welcome to One Hit Wonders</h1>
      <h3 className="subtitle">
        The site dedicated to making noise and bothering your neighbors
      </h3>
      <div className="site-info-container">
        <div className="instructions">
          <p>1) Create samples</p>
          <p>2) Upload samples into a kit</p>
          <p className="fun-instruction">3) HIT STUFF</p>
        </div>
        <img
          src="https://one-hit-wonders.s3.us-west-2.amazonaws.com/site_capture.png"
          className="screenshot"
        ></img>
      </div>
    </>
  );
};

export default SplashPage;
