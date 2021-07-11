import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";
import "./edit-kit-form.css";

const EditKitForm = () => {
  const { id } = useParams();
  const allGenres = useSelector((state) =>
    Object.values(state.genreReducer.byId)
  );
  const currentKit = useSelector((state) => state.kitReducer.byId[id]);
  const [currentName, setCurrentName] = useState(null);

  const [currentGenreId, setCurrentGenreId] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

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
  }, [dispatch]);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
  };

  return (
    <form className="edit-kit-form">
      <div className="edit-kit-form__element">
        <h1>Update Kit</h1>
        <label htmlFor="name">new name: </label>
        <input
          type="text"
          value={currentName}
          // placeholder={currentKit?.name}
          onChange={(e) => setCurrentName(e.target.value)}
        />
      </div>
      <div className="edit-kit-form__element">
        <label htmlFor="select-genre">new genre: </label>
        <select
          name="genre"
          value={currentGenreId}
          onChange={(e) => parseInt(setCurrentGenreId(e.target.value))}
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
        <input type="file" accept="coer_img_url/*" onChange={updateImage} />
      </div>
    </form>
  );
};

export default EditKitForm;
