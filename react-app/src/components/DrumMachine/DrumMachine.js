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
              <select className="dropdown" name={drumType.name}>
                <option value="0" disabled>
                  Pick a {drumType.name}
                </option>
                {drumType.samples?.map((sample) => (
                  <option key={sample.id}>{sample.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <div className="drum-machine-container">
        <h1 className="drum-machine-h1">MAKE SOME NOISE</h1>
        <div className="black-keys-container">
          <div className="black-keys-layer-one">
            <div data-key="87" className="drum">
              <kbd>W</kbd>
              <p>Click</p>
            </div>
            <div data-key="69" className="drum">
              <kbd>E</kbd>
              <p>Clap</p>
            </div>
          </div>
          <div className="black-keys-layer-two">
            <div data-key="84" className="drum">
              <kbd>T</kbd>
              <p>Hi-hat</p>
            </div>
            <div data-key="89" className="drum">
              <kbd>Y</kbd>
              <p>Ride</p>
            </div>
            <div data-key="85" className="drum">
              <kbd>U</kbd>
              <p>Crash</p>
            </div>
          </div>
        </div>
        <div className="white-keys-container">
          <div className="white-keys">
            <div data-key="65" className="drum">
              <kbd onClick={(e) => console.log(e)}>A</kbd>
              <p>Kick</p>
            </div>
            <div data-key="83" className="drum">
              <kbd>S</kbd>
              <p>Snare</p>
            </div>
            <div data-key="68" className="drum">
              <kbd>D</kbd>
              <p>High Tom</p>
            </div>
            <div data-key="70" className="drum">
              <kbd>F</kbd>
              <p>Low Tom</p>
            </div>
            <div data-key="71" className="drum">
              <kbd>G</kbd>
              <p>Beep</p>
            </div>
            <div data-key="72" className="drum">
              <kbd>H</kbd>
              <p>Vocal</p>
            </div>
            <div data-key="73" className="drum">
              <kbd>J</kbd>
              <p>Sub</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
