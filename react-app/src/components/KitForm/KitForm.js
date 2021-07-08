import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postOneKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";
import { getAllDrumTypes } from "../../store/drumType";
import "./kit-form.css";

const SampleFormField = ({ editSample, idx }) => {
  const [name, setName] = useState("");
  const [drumTypeId, setDrumTypeId] = useState(1);
  const [audioFile, setAudioFile] = useState(null);
  const drumTypes = useSelector((state) =>
    Object.values(state.drumTypeReducer.byId)
  );

  const sampleChange = () =>
    editSample(idx, {
      name: name,
      drum_type_id: drumTypeId,
      audio_url: audioFile,
    });

  const updateAudio = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  useEffect(() => {
    sampleChange();
  }, [name, drumTypeId, audioFile]);

  return (
    <div className="sample-fields">
      <div>
        <label htmlFor="name">Sample name: </label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Name your sample"
        />
        <label htmlFor="select-drum-type">Drum Type: </label>
        <select
          name="drum-type"
          value={drumTypeId}
          onChange={(e) => {
            setDrumTypeId(() => parseInt(e.target.value));
          }}
        >
          {drumTypes &&
            drumTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </select>
        <input
          type="file"
          accept="audio_url/*"
          onChange={(e) => {
            updateAudio(e);
          }}
        />
      </div>
    </div>
  );
};

const KitForm = () => {
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState(1);
  const [coverImg, setCoverImg] = useState(null);
  const [coverLoading, setCoverLoading] = useState(false);
  const [samples, setSamples] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const genres = useSelector((state) => Object.values(state.genreReducer.byId));

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllDrumTypes());
  }, [dispatch]);

  const addSampleField = (e) => {
    e.preventDefault();
    setSamples(samples.concat({}));
  };

  const editSample = (idx, newSample) => {
    setSamples((prevState) => [
      ...prevState.slice(0, idx),
      newSample,
      ...prevState.slice(idx + 1),
    ]);
  };

  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover_img_url", coverImg);
    formData.append("name", name);
    formData.append("genre_id", genreId);
    formData.append("user_id", userId);
    formData.append("samples", JSON.stringify(samples));
    formData.append("sample_field_files", samples.map((sample) => sample.audio_url))
    dispatch(postOneKit(formData));
    history.push(`/users/${userId}`);
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
  };
  console.log(samples);
  return (
    <div className="kit-form-container">
      <h1>Add a kit, hit some drums!</h1>
      <form className="kit-form" onSubmit={submitForm}>
        <div className="kit-form__kit-fields">
          <div>
            <label htmlFor="name">Kit name: </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name your kit"
            />
          </div>
          <div>
            <label htmlFor="select-genre">Genre:</label>
            <select
              name="genre"
              value={genreId}
              onChange={(e) => {
                setGenreId(() => parseInt(e.target.value));
              }}
            >
              {genres &&
                genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
            </select>
            <div>
              <input
                type="file"
                accept="cover_img_url/*"
                onChange={updateImage}
              />
            </div>
          </div>
        </div>
        <div className="kit-form__sample-fields-container">
          <h3>Add Samples</h3>
          {samples.map((sample, idx) => (
            <SampleFormField
              // onChange={(data) => editSample(idx, data)}
              editSample={editSample}
              sample={sample}
              idx={idx}
            />
          ))}
        </div>
        <div className="sample-button">
          <button className="add-sample-field" onClick={addSampleField}>
            Add another sample
          </button>
        </div>
        <div className="submit-button">
          <button type="submit">Create Kit</button>
        </div>
      </form>
    </div>
  );
};

export default KitForm;
