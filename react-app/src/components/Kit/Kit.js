import React from "react";
import { Link } from "react-router-dom";
import "./kit.css";

function Kit({ kit }) {
  return (
    <Link to={`/kits/${kit.id}`}>
      <div className="kit-card">
        <h2>{kit.name}</h2>
        <img alt={`${kit.name} Kit cover`} src={kit.cover_img_url}></img>
      </div>
    </Link>
  );
}

export default Kit;
