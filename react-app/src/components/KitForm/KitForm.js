import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postOneKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";

const KitForm = () => {
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState(0);
  const [coverImg, setCoverImg] = useState(null);
  const [coverLoading, setCoverLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const genres = useSelector((state) => Object.values(state.genreReducer.byId));

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(
      postOneKit({
        name,
        genre_id: genreId,
        user_id: userId,
        cover_img_url: coverImg,
      })
    );
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
  };

  return (
    <div className="kit-form-container">
      <h1>Hello from KitForm</h1>
      <form onSubmit={submitForm}>
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
          <select hame="genre">
            {genres &&
              genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  onChange={() => console.log(genre.id)}
                >
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
          <button type="submit">Create Kit</button>
        </div>
      </form>
    </div>
  );
};

export default KitForm;
