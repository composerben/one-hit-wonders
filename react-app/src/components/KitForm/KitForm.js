import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postOneKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";
import { getAllDrumTypes } from "../../store/drumType";

const KitForm = () => {
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState(1);
  const [coverImg, setCoverImg] = useState(null);
  const [coverLoading, setCoverLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const genres = useSelector((state) => Object.values(state.genreReducer.byId));
  const drumTypes = useSelector((state) =>
    Object.values(state.drumTypeReducer.byId)
  );

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllDrumTypes());
  }, [dispatch]);

  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover_img_url", coverImg);
    formData.append("name", name);
    formData.append("genre_id", genreId);
    formData.append("user_id", userId);
    dispatch(postOneKit(formData));
    history.push(`/users/${userId}`);
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
  };

  return (
    <div className="kit-form-container">
      <h1>Hello from KitForm</h1>
      <form onSubmit={submitForm}>
        <div className="kit-form__kit-fields">
          <div>
            <label htmlFor="name">Kit name:</label>
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
                debugger;
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
        <div className="kit-form__sample-fields"></div>
        <button type="submit">Create Kit</button>
      </form>
    </div>
  );
};

export default KitForm;
