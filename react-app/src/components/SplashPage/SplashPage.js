import React from "react";
import "./splash-page.css";

const SplashPage = () => {
  return (
    <>
      <h1 className="welcome-text">Welcome to One Hit Wonders</h1>
      <h3 className="subtitle">
        The site dedicated to making noise and bothering your neighbors
      </h3>
      <img src="https://one-hit-wonders.s3.us-west-2.amazonaws.com/site_capture.png" className="screenshot"></img>
    </>
  );
};

export default SplashPage;
