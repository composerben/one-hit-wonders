//constants
const GET_KITS = "kit/GET_KITS";
const POST_KIT = "kit/POST_KIT";
const DELETE_KIT = "kit/DELETE_KIT";
const EDIT_KIT = "kit/EDIT_KIT";

//action creators
const getKits = (kits) => ({
  type: GET_KITS,
  kits,
});

const postKit = (kit) => ({
  type: POST_KIT,
  kit,
});

const deleteKit = (kitId) => ({
  type: DELETE_KIT,
  kitId,
});

const editKit = (kit) => ({
  type: EDIT_KIT,
  kit,
});

export const getAllKits = () => async (dispatch) => {
  const response = await fetch("/api/kits");
  const data = await response.json();
  dispatch(getKits(data.kits));
};

export const getCurrentKit = (kitId) => async (dispatch) => {
  const response = await fetch(`/api/kits/${kitId}`);
  const data = await response.json();
  dispatch(getKits([data.kit]));
};

export const getKitsByUserId = (userId) => async (dispatch) => {
  const response = await fetch(`/api/kits/users/${userId}`);
  const data = await response.json();
  dispatch(getKits(data.kits));
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

export const editOneKit = (kitId, body) => async (dispatch) => {
  const res = await fetch(`/api/kits/${kitId}`, {
    method: "PATCH",
    body: body,
  });
  const data = await res.json();
  dispatch(editKit(data.kit));
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
      delete newState.byId[action.kitId];
      return newState;
    }
    case EDIT_KIT: {
      const newState = { ...state };
      newState.byId[action.kit.id] = action.kit;
      return newState;
    }
    default:
      return state;
  }
}
