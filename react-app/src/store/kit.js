//constants
const GET_KITS = "kit/GET_KITS";

//action creators
const getKits = (kits) => ({
  type: GET_KITS,
  kits,
});

//thunks
export const getKitsByUserId = (userId) => async (dispatch) => {
  const res = await fetch(`/api/kits/users/${userId}`);
  const data = await res.json();

  dispatch(getKits(data.kits));
};

export const getCurrentKit = (kitId) => async (dispatch) => {
  // debugger;
  const response = await fetch(`/api/kits/${kitId}`);
  const data = await response.json();
  dispatch(getKits([data.kit]));
};

//reducer
const initialState = {
  byId: {},
  allIds: [],
};

export default function kitReducer(state = initialState, action) {
  switch (action.type) {
    case GET_KITS:
      const newState = { ...state };
      action.kits.forEach((kit) => {
        newState.byId[kit.id] = kit;
        newState.allIds.push(kit.id);
      });
      return newState;
    default:
      return state;
  }
}
