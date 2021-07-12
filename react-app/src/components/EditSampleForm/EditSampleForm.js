import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllDrumTypes } from "../../store/drumType";
import { getSampleById, editOneSample } from "../../store/sample";

import "./edit-sample-form.css";

const EditSampleForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const drumTypes = useSelector((state) =>
    Object.values(state.drumTypeReducer.byId)
  );
  const currentSample = useSelector((state) => state.sampleReducer.byId[id]);
  const [currentName, setCurrentName] = useState(currentSample?.name);
  const [currentDrumTypeId, setCurrentDrumTypeId] = useState(
    currentSample?.drum_type_id
  );
  const [audioFile, setAudioFile] = useState(currentSample?.audio_url);

  useEffect(() => {
    if (currentSample) {
      setCurrentName(currentSample.name);
      setCurrentDrumTypeId(currentSample.drum_type_id);
      setAudioFile(currentSample.audio_url);
    }
  }, [currentSample]);

  useEffect(() => {
    dispatch(getSampleById(id));
    dispatch(getAllDrumTypes());
  }, [dispatch]);

  const updateAudio = (e) => {
      const file = e.target.files[0];
      setAudioFile(file)
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", currentName);
      formData.append("drum_type_id", currentDrumTypeId);
      formData.append("audio_url", audioFile)
      dispatch(editOneSample(id, formData));
      history.push(`/kits/${currentSample.kit_id}`)
  }

  return (
    <form className="edit-sample-form" onSubmit={handleSubmit}>
    <div className="edit-sample-form__element">
      <h1>Update Sample</h1>
      <label htmlFor="name">new name: </label>
      <input
        type="text"
        value={currentName}
        onChange={(e) => {
          setCurrentName(e.target.value);
        }}
      />
    </div>
    <div className="edit-sample-form__element">
      <label htmlFor="select-drum-type">new drum: </label>
      <select
        name="drum-type"
        value={currentDrumTypeId}
        onChange={(e) => setCurrentDrumTypeId(parseInt(e.target.value))}
      >
        {drumTypes?.map((drum) => (
          <option key={drum.id} value={drum.id}>
            {drum.name}
          </option>
        ))}
      </select>
    </div>
    <div className="edit-sample-form__element">
      <label htmlFor="sample-audio">new audio file: </label>
      <input type="file" accept="audio_url/*" onChange={updateAudio} />
    </div>
    <button>Submit Edits</button>
  </form>
  )
};

export default EditSampleForm;
