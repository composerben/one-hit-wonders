//constants
const GET_KITS = "kit/GET_KITS";
const POST_KIT = "kit/POST_KIT";
const DELETE_KIT = "kit/DELETE_KIT";

//action creators
const getKits = (kits) => ({
  type: GET_KITS,
  kits,
});

const postKit = (kit) => ({
  type: POST_KIT,
  kit,
});

const deleteKit = (kit) => ({
  type: DELETE_KIT,
  kit,
});

export const getCurrentKit = (kitId) => async (dispatch) => {
  // debugger;
  const response = await fetch(`/api/kits/${kitId}`);
  const data = await response.json();
  dispatch(getKits([data.kit]));
};

export const postOneKit = (data) => async (dispatch) => {
  const res = await fetch("/api/kits", {
    method: "POST",
    body: data,
  });

  if (res.ok) {
    const kit = await res.json();

    dispatch(postKit(kit));
    return kit;
  }
};

export const deleteOneKit = (kitId) => async (dispatch) => {
  const res = await fetch(`/api/kits/${kitId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteKit(kitId));
  }
};

//reducer
const initialState = {
  byId: {},
  allIds: [],
};

export default function kitReducer(state = initialState, action) {
  switch (action.type) {
    case GET_KITS: {
      const newState = { ...state };
      action.kits.forEach((kit) => {
        newState.byId[kit.id] = kit;
        newState.allIds.push(kit.id);
      });
      return newState;
    }
    case POST_KIT: {
      const newState = { ...state };
      newState.byId[action.kit.id] = action.kit;
      return newState;
    }
    case DELETE_KIT: {
      const newState = { ...state };
      console.log(newState);
      delete newState.byId[action.kit.id];
      return newState;
    }
    default:
      return state;
  }
}
