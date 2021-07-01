import React from "react";
import { useSelector } from "react-redux";

function Kit() {
  const userKits = useSelector((state) => Object.values(state.kitReducer.byId));

  const kitComponents = userKits?.map((kit) => {
    return (
      <div key={kit.id}>
        <h2>{kit.name}</h2>
        <img alt={`${kit.name} Kit cover`} src={kit.cover_img_url}></img>
      </div>
    );
  });
  return kitComponents;
}

export default Kit;
