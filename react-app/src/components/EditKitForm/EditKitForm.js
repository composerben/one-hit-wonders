import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentKit, editOneKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";
import "./edit-kit-form.css";

const EditKitForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const allGenres = useSelector((state) =>
    Object.values(state.genreReducer.byId)
  );
  const currentKit = useSelector((state) => state.kitReducer.byId[id]);
  const [currentName, setCurrentName] = useState(currentKit?.name);
  const [currentGenreId, setCurrentGenreId] = useState(currentKit?.genre_id);
  const [coverImg, setCoverImg] = useState(currentKit?.cover_img_url);

  useEffect(() => {
    if (currentKit) {
      setCurrentName(currentKit.name);
      setCurrentGenreId(currentKit.genre_id);
      setCoverImg(currentKit.cover_img_url);
    }
  }, [currentKit]);

  useEffect(() => {
    dispatch(getCurrentKit(id));
    dispatch(getAllGenres());
  }, [dispatch, id]);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover_img_url", coverImg);
    formData.append("genre_id", currentGenreId);
    formData.append("name", currentName);
    dispatch(editOneKit(id, formData));
    history.push(`/users/${currentKit.user_id}`);
  };

  return (
    <form className="edit-kit-form" onSubmit={handleSubmit}>
      <div className="edit-kit-form__element">
        <h1>Update Kit</h1>
        <label htmlFor="name">new name: </label>
        <input
          type="text"
          value={currentName}
          onChange={(e) => {
            setCurrentName(e.target.value);
          }}
        />
      </div>
      <div className="edit-kit-form__element">
        <label htmlFor="select-genre">new genre: </label>
        <select
          name="genre"
          value={currentGenreId}
          onChange={(e) => setCurrentGenreId(parseInt(e.target.value))}
        >
          {allGenres?.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="edit-kit-form__element">
        <label htmlFor="kit-photo">new cover image: </label>
        <input type="file" accept="cover_img_url/*" onChange={updateImage} />
      </div>
      <button>Submit Edits</button>
      <button onClick={() => history.push(`/users/${currentKit.user_id}`)}>
        Cancel
      </button>
    </form>
  );
};

export default EditKitForm;
