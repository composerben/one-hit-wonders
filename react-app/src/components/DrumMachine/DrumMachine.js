import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDrumTypes } from "../../store/drumType";
import "./drum-machine.css";

const DrumMachine = () => {
  const dispatch = useDispatch();
  const drumTypes = useSelector((state) =>
    Object.values(state.drumTypeReducer.byId)
  );

  useEffect(() => {
    dispatch(getAllDrumTypes());
  }, [dispatch]);

  return (
    <div className="page-contents">
      <div className="sidebar-container">
        <div className="sidebar">
          {drumTypes?.map((drumType) => (
            <div key={drumType.id} className="drum-selector">
              <label htmlFor={drumType.name}>{drumType.name}: </label>
              <select name={drumType.name}>
                {drumType.samples?.map((sample) => (
                  <option key={sample.id}>{sample.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <div className="drum-machine-container">
        <h1>Hello from Drum Machine</h1>
        <div className="white-keys-container">
          <div className="white-keys-layer-one">
            <div data-key="87" class="drum">
              <kbd>W</kbd>
              <p>Kick</p>
            </div>
            <div data-key="69" class="drum">
              <kbd>E</kbd>
              <p>Clap</p>
            </div>
          </div>
          <div className="white-keys-layer-two">
            <div data-key="84" class="drum">
              <kbd>T</kbd>
              <p>Hi-hat</p>
            </div>
            <div data-key="89" class="drum">
              <kbd>Y</kbd>
              <p>Ride</p>
            </div>
            <div data-key="85" class="drum">
              <kbd>U</kbd>
              <p>Crash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
