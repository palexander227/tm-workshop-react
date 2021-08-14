import { createStore, combineReducers } from "redux";
import { loginCache } from "./cache";
import configReducer, {
  actionSetCategories,
  actionSetModels,
  actionSetMakes,
} from "./reducer/config";
import userReducer, { actionLogin } from "./reducer/user";
import categorySrvc from "../service/category";
import configSrvc from "../service/config";
import { message } from "antd";
import { MSG_DURATION } from "../common/constants";

const rootReducer = combineReducers({
  userStore: userReducer,
  configStore: configReducer,
});

export const store = createStore(rootReducer);

const [user, token, vendor, customer] = loginCache.fetch();
if (user && token) {
  store.dispatch(actionLogin(user, token, vendor, customer));
}

store.subscribe(() => console.log("Store updated", store.getState()));
