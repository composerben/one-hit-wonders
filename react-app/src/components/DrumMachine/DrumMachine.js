import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDrumTypes } from "../../store/drumType";
import "./drum-machine.css";

const DrumMachine = () => {
  const dispatch = useDispatch();
  // const [kick, setKick] = useState("")
  // const [click, setClick] = useState("")
  // const [snare, setSnare] = useState("")
  // const [clap, setClap] = useState("")
  // const [highTom, setHighTom] = useState("")
  // const [lowTom, setLowTom] = useState("")
  // const [hiHat, setHiHat] = useState("")
  // const [beep, setBeep] = useState("")
  // const [ride, setRide] = useState("")
  // const [vocal, setVocal] = useState("")
  // const [crash, setCrash] = useState("")
  // const [sub, setSub] = useState("")
  const drumTypes = useSelector((state) =>
    Object.values(state?.drumTypeReducer.byId)
  );
  const [drumKey, setDrumKey] = useState({
    65: {
      name: "Kick",
      selectedSample: null,
    },
    87: {
      name: "Click",
      selectedSample: null,
    },
    83: {
      name: "Snare",
      selectedSample: null,
    },
    69: {
      name: "Clap",
      selectedSample: null,
    },
    68: {
      name: "High Tom",
      selectedSample: null,
    },
    70: {
      name: "Low Tom",
      selectedSample: null,
    },
    84: {
      name: "Hi-hat",
      selectedSample: null,
    },
    71: {
      name: "Beep",
      selectedSample: null,
    },
    89: {
      name: "Ride",
      selectedSample: null,
    },
    72: {
      name: "Vocal",
      selectedSample: null,
    },
    85: {
      name: "Crash",
      selectedSample: null,
    },
    74: {
      name: "Sub",
      selectedSample: null,
    },
  });

  const drumKeyCodes = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74];

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      const currentDrumKey = drumKey[e.keyCode];
      console.log("DRUM KEY USE EFFECT", drumKey);
      console.log(e.keyCode);
      if (currentDrumKey) {
        const audio = new Audio(currentDrumKey.selectedSample);
        audio.play();
      }
    });
    console.log(drumKeyCodes);
  }, [drumKey]);

  useEffect(() => {
    dispatch(getAllDrumTypes());
  }, [dispatch]);

  return (
    <div className="page-contents">
      <div className="sidebar-container">
        <div className="sidebar">
          {drumTypes?.map((drumType, idx) => (
            <div key={drumType.id} className="drum-selector">
              <label htmlFor={drumType.name}>{drumType.name}: </label>
              <select
                className="dropdown"
                name={drumType.name}
                onChange={(e) => {
                  console.log("DRUM KEY CODES AT IDX", drumKeyCodes[idx]);
                  console.log("E TARGET VALUE", e.target.value);
                  setDrumKey({
                    ...drumKey,
                    [drumKeyCodes[idx]]: {
                      // drumKey[drumKeyCodes[idx]],
                      selectedSample: e.target.value,
                    },
                  });
                  console.log("DRUM KEY", drumKey);
                }}
              >
                <option selected value="0" disabled>
                  Pick a {drumType.name}
                </option>
                {drumType.samples?.map((sample) => (
                  <option key={sample.id} value={sample.audio_url}>
                    {sample.name}
                  </option>
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
              <kbd>A</kbd>
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
            <div data-key="74" className="drum">
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
