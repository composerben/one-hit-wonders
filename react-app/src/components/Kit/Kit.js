import React from "react";
import { Link } from "react-router-dom";
import "./kit.css";

function Kit({ kit }) {
  return (
    <div className="kit-card">
      <Link to={`/kits/${kit.id}`}>
        <h2>{kit.name}</h2>
        <img alt={`${kit.name} Kit cover`} src={kit.cover_img_url}></img>
      </Link>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default Kit;
