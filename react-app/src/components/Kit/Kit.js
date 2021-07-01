import React from "react";
import { useSelector } from "react-redux";
import "./kit.css";

function Kit() {
  const userKits = useSelector((state) => Object.values(state.kitReducer.byId));
  console.log(userKits);

  const kitComponents = userKits?.map((kit) => {
    return (
      <div key={kit.id} className="kit-card">
        <h2>{kit.name}</h2>
        <img alt={`${kit.name} Kit cover`} src={kit.cover_img_url}></img>
      </div>
    );
  });
  return kitComponents;
}

export default Kit;
