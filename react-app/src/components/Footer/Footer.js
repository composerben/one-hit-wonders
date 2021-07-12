import React from "react";
import "./footer.css"

const Footer = () => {
  return (
    <div className="footer">
        <h3>Ben Ash</h3>
      <a href="https://github.com/composerben">
        <img alt="author github" src="https://one-hit-wonders.s3.us-west-2.amazonaws.com/GitHub-Mark-Light-120px-plus.png" />
      </a>
      <a href="https://www.linkedin.com/in/ben-ash-347b2b1b6/">
        <img alt="author linkedin" src="https://one-hit-wonders.s3.us-west-2.amazonaws.com/LI-In-Bug.png"></img>
      </a>
    </div>
  );
};

export default Footer;