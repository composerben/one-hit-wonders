import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDrumTypes } from "../../store/drumType";
import "./drum-machine.css";

const DrumMachine = () => {
  const dispatch = useDispatch();
  const drumTypes = useSelector((state) =>
    Object.values(state.drumTypeReducer.byId)
  );
  console.log(drumTypes);
  useEffect(() => {
    dispatch(getAllDrumTypes());
  }, [dispatch]);
  return (
    <>
      <h1>Hello from Drum Machine</h1>
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="drum-selector">
            <label htmlFor="kick">Kick: </label>
            <select name="kick">
              {drumTypes &&
                drumTypes[0]?.samples.map((sample) => (
                  <option key={sample.id}>{sample.name}</option>
                ))}
            </select>
          </div>
          <div className="drum-selector">
            <label htmlFor="kick">Click: </label>
            <select name="kick">
              {drumTypes &&
                drumTypes[1]?.samples.map((sample) => (
                  <option key={sample.id}>{sample.name}</option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrumMachine;
