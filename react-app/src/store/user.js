const GET_USER = "user/GET_USER";

const getUser = (user) => ({
  type: GET_USER,
  user,
});

export const getCurrentPageUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  dispatch(getUser(data.user));
};

const initialState = {
  byId: {},
  allIds: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      const newState = { ...state };
      newState.byId[action.user.id] = action.user;
      newState.allIds.push(action.user.id);
      return newState;
    default:
      return state;
  }
}
