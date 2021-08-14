import { loginCache } from "../cache";

const initialState = {
  token: null,
  user: {},
  isLoggedIn: false,
};

//actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";

//action creators
export const actionLogin = (user, token) => {
  return { type: LOGIN, payload: { user, token } };
};

export const actionLogout = (token) => {
  return { type: LOGOUT, payload: token };
};

export const actionUpdateUserDetails = (user) => {
  return { type: UPDATE_USER_DETAILS, payload: user };
};

const userReducer = (state = { ...initialState }, action) => {
  let newstate = { ...state };

  if (action.type === LOGIN) {
    newstate.isLoggedIn = true;

    const { user, token } = action.payload;
    [newstate.token, newstate.user] = [token, user];

    loginCache.save(user, token);
  } else if (action.type === LOGOUT) {
    loginCache.clear();

    newstate = { ...initialState };
  } else if (action.type === UPDATE_USER_DETAILS) {
    newstate.user = action.payload;

    loginCache.save(newstate.user, newstate.token);
  }

  return newstate;
};

export default userReducer;
