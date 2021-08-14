import { createStore, combineReducers } from "redux";
import { loginCache } from "./cache";
import userReducer, { actionLogin } from "./reducer/user";

const rootReducer = combineReducers({
  userStore: userReducer,
});

export const store = createStore(rootReducer);

const [user, token, vendor, customer] = loginCache.fetch();
if (user && token) {
  store.dispatch(actionLogin(user, token, vendor, customer));
}

store.subscribe(() => console.log("Store updated", store.getState()));
