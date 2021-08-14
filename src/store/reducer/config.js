const initialState = {
  categories: [],
  makes: [],
  models: [],
};

//actions
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_MAKES = "SET_MAKES";
const SET_MODELS = "SET_MODELS";

//action creators
export const actionSetCategories = (categories) => {
  return { type: SET_CATEGORIES, payload: { categories } };
};

export const actionSetMakes = (makes) => {
  return { type: SET_MAKES, payload: { makes } };
};

export const actionSetModels = (models) => {
  return { type: SET_MODELS, payload: { models } };
};

const configReducer = (state = { ...initialState }, action) => {
  let newstate = { ...state };

  if (action.type === SET_CATEGORIES) {
    newstate.categories = [...action.payload.categories];
  } else if (action.type === SET_MAKES) {
    newstate.makes = [...action.payload.makes];
  } else if (action.type === SET_MODELS) {
    newstate.models = [...action.payload.models];
  }

  return newstate;
};

export default configReducer;
