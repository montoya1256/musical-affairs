const GET_USER = "users/GET_USER";

const loadOne = (user) => ({
  type: GET_USER,
  user,
});

export const getUser = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);
  const user = await res.json();
  dispatch(loadOne(user));
  return user;
};

const initalState = { user: [] };

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
