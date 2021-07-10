import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentKit } from "../../store/kit";
import { getAllGenres } from "../../store/genre";

const EditKitForm = () => {
  const { id } = useParams();
  const allGenres = useSelector((state) =>
    Object.values(state.genreReducer.byId)
  );
  const currentKit = useSelector((state) => state.kitReducer.byId[id]);
  const [currentName, setCurrentName] = useState(currentKit?.name);
  const [currentGenreId, setCurrentGenreId] = useState(0);
  const [coverImg, setCoverImg] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

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
      <h1>Hello from EditKitForm</h1>
      <div>
        <label htmlFor="name">Kit name: </label>
        <input
          type="text"
          value={currentName}
          placeholder={currentKit?.name}
          onChange={(e) => setCurrentName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="select-genre">New Genre: </label>
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
      <div>
        <label htmlFor="kit-photo">New Cover Image: </label>
        <input type="file" accept="coer_img_url/*" onChange={updateImage} />
      </div>
    </form>
  );
};

export default EditKitForm;
