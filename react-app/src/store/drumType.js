const GET_DRUM_TYPES = "drum_types/GET_DRUM_TYPES";

const getDrums = (drumTypes) => ({
  type: GET_DRUM_TYPES,
  drumTypes,
});

export const getAllDrumTypes = () => async (dispatch) => {
  const res = await fetch("/api/drum_types");
  const data = await res.json();
  dispatch(getDrums(data.drum_types));
  return data.drum_types;
};

const initialState = {
  byId: {},
  allIds: [],
};

export default function drumTypeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRUM_TYPES:
      const newState = { ...state };
      console.log("NEW STATE", newState);
      action.drumTypes.forEach((type) => {
        newState.byId[type.id] = type;
        newState.allIds.push(type.id);
      });
      return newState;
    default:
      return state;
  }
}
