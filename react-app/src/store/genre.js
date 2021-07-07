const GET_GENRES = "genre/GET_GENRES";

const getGenres = (genres) => ({
  type: GET_GENRES,
  genres,
});

export const getAllGenres = () => async (dispatch) => {
  const res = await fetch(`/api/genres`);
  const data = await res.json();
  dispatch(getGenres(data.genres));
  return data.genres;
};

const initialState = {
  byId: {},
  allIds: [],
};

export default function genreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GENRES:
      const newState = { ...state };
      action.genres.forEach((genre) => {
        newState.byId[genre.id] = genre;
        newState.allIds.push(genre.id);
      });
      return newState;
    default:
      return state;
  }
}
