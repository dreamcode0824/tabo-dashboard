import { actionTypes } from "./action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const initState = {
  initials: null,
  structureElement: [],
  currentZoneId: "",
  allPrice: [],
  isSaved: true,
  elementType: "",
  isBed: false,
  isSunbed: false,
  isData: false,
  isSamePrice: false,
  resetPeriodStatus: false,
  modalStatus: false,
  cancelStatus: false,
  tempElementType: "",
  tempZoneName: "",
  tempZoneId: "",
  currentZonName: ""
};

export const reducer = persistReducer(
  {
    storage,
    key: "price",
    // whitelist: [
    //   'allElement',
    // ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actionTypes.INITIAL_STATE:
        return { ...state };
      case actionTypes.RESULT_GET_STRUCTURE_ELEMENT:
        return {
          ...state,
          structureElement: action.value,
        };
      case actionTypes.RESULT_GET_PRICE:
        return {
          ...state,
          allPrice: action.value,
          isSaved: true
        };
      case actionTypes.GET_STRUCTURE:
        return {
          ...state,
          currentZoneId: action.id,
        };
      case actionTypes.SAVED_STATUS:
        return {
          ...state,
          isSaved: action.value,
        };
      case actionTypes.ELEMENT_TYPES_ACTION:
        return {
          ...state,
          elementType: action.value,
        };
      case actionTypes.IS_BED_ACTION:
        return {
          ...state,
          isBed: action.value,
        };
      case actionTypes.IS_SUNBED_ACTION:
        return {
          ...state,
          isSunbed: action.value,
        };
      case actionTypes.IS_DATA:
        return {
          ...state,
          isData: action.value,
        };
      case actionTypes.IS_SAME_PRICE:
        return {
          ...state,
          isSamePrice: action.value,
        };
      case actionTypes.RESET_PERIOD:
        return {
          ...state,
          resetPeriodStatus: action.value,
        };
      case actionTypes.MODAL_ACTION:
        return {
          ...state,
          modalStatus: action.value,
        };
      case actionTypes.CANCEL_ACTION:
        return {
          ...state,
          cancelStatus: action.value,
        };
      case actionTypes.TEMP_ELEMENT_TYPE:
        return {
          ...state,
          tempElementType: action.value,
        };
      case actionTypes.CURRENT_ZONE_NAME:
        return {
          ...state,
          currentZonName: action.value,
        };
      case actionTypes.TEMP_ZONE_NAME:
        return {
          ...state,
          tempZoneName: action.value,
          tempZoneId: action.valueId
        };
      default:
        return state;
    }
  }
)
