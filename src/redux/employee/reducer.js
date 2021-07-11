import { actionTypes } from "./action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const initState = {
  initials: null,
  allEmployees: [],

};

export const reducer = persistReducer(
  {
    storage,
    key: "employee",
    // whitelist: [
    //   'allElement',
    // ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actionTypes.INITIAL_STATE:
        return { ...state };
      case actionTypes.RESULT_GET_ALL_EMPLOYEES:
        return {
          ...state,
          allEmployees: action.value,
        };
      default:
        return state;
    }
  }
)
