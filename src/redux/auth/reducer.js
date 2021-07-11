import { actionTypes } from "./action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const initState = {
  initials: null,
  loginValue: "",
  accessToken: "",
  registerValue: "",
  countryData: "",
  loginStatus: "false",
  registerStatus: "",
  userId: "",
  registerState: "true",
  loginMessage: "",
  businessType: "",
  businessLists: "",
  language: "en",
  filterBusinessList: "",
  businessValues: "",
  cityLists: [],
  businessData: "",
  businessName: "",
  planData: "",
  planDataById: [],
  allCoupons: []
};

export const reducer = persistReducer(
  {
    storage,
    key: "business",
    whitelist: [
      'accessToken',
      'countryData',
      'businessLists',
      'userId',
      'language',
      'businessValues',
      'filterBusinessList',
      'businessName',
      'planDataById',
      'allCoupons'
    ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actionTypes.INITIAL_STATE:
        return { ...state };
      case actionTypes.LOGIN_VALUE_ACTION:
        return { ...state, loginValue: action.value };
      case actionTypes.RESULT_LOGIN_DATA:
        return { ...state, accessToken: action.value, loginStatus: "true", userId: action.id };
      case actionTypes.REGISTER_VALUE_ACTION:
        return { ...state, registerValue: action.value };
      case actionTypes.RESULT_COUNTRY_DATA:
        return { ...state, countryData: action.value };
      case actionTypes.RESULT_LOGIN_FAIL_DATA:
        return { ...state, loginStatus: action.value, loginMessage: action.message };
      case actionTypes.RESULT_REGISTER_FAIL_DATA:
        return { ...state, registerStatus: action.value, registerState: "false" };
      case actionTypes.RESULT_REGISTER_SUCCESS_DATA:
        return { ...state, registerState: "true" };
      case actionTypes.BUSINESS_TYPE:
        return { ...state, businessType: action.value };
      case actionTypes.RESULT_BUSINESS_DATA:
        return { ...state, businessLists: action.value };
      case actionTypes.CHANGE_LANGUAGE:
        return { ...state, language: action.value };
      case actionTypes.LOGOUT_ACTION:
        return { ...state, accessToken: "" }
      case actionTypes.FILTER_BUSINESS_LIST_ACTION:
        return { ...state, filterBusinessList: action.value, businessData: action.value }
      case actionTypes.RESULT_CREATE_BUSINESS_ACTION:
        return { ...state, filterBusinessList: action.value }
      case actionTypes.CREATE_BUSINESS_PROFILE:
        return { ...state, businessValues: action.value }
      case actionTypes.RESULT_GET_CITY_LIST:
        return { ...state, cityLists: action.value }
      case actionTypes.BUSINESS_NAME:
        return { ...state, businessName: action.value }
      case actionTypes.RESULT_VALID_CUOPON:
        return { ...state, businessName: action.value }
      case actionTypes.RESULT_GET_COUPON_BY_BUSINESSID:
        return { ...state, planData: action.value }
      case actionTypes.RESULT_GET_PLAN:
        return { ...state, planDataById: action.value }
      case actionTypes.RESULT_ALL_COUPONS:
        return { ...state, allCoupons: action.value }
      default:
        return state;
    }
  }
)
