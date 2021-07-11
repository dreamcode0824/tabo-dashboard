import { actionTypes } from "./action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AcUnitTwoTone } from "@material-ui/icons";
export const initState = {
  initials: null,
  allElement: "",
  sunbedUmbrella: "",
  bedUmbrella: "",
  eleWidth: "",
  name: '',
  elementInformation: [],
  resultElements: [],
  lastElements: [],
  lastMoved1: "",
  lastMoved2: "",
  zoomRate: 0.8,
  zoomAreaValue: 1,
  displayValue: 50,
  hasVipZone: false,
  zone1: "",
  zone2: "",
  zone3: "",
  zone4: "",
  id1: "",
  id2: "",
  id3: "",
  id4: "",
  idVIP: "",
  dotsData: [],
  zoneData: []
};

export const reducer = persistReducer(
  {
    storage,
    key: "element",
    whitelist: [
      'allElement',
      'sunbedUmbrella',
      'bedUmbrella',
      'lastMoved1',
      'lastMoved2',
      'zoomRate',
      'zoomAreaValue',
      'displayValue',
    ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actionTypes.INITIAL_STATE:
        return { ...state };
      case actionTypes.RESULT_GET_ALL_ELEMENTS:
        return {
          ...state,
          allElement: action.value,
          sunbedUmbrella: action.sunbedUmbrella,
          bedUmbrella: action.bedUmbrella
        };
      case actionTypes.ELEMENT_WIDHT:
        return {
          ...state,
          eleWidth: action.value
        };
      case actionTypes.IMAGE_NAME:
        return {
          ...state,
          name: action.value
        };
      case actionTypes.RESLUT_CREATE_ELEMENT:
        return {
          ...state,
          resultElements: action.value,
          zoomRate: 0.8,
          zoomAreaValue: 1,
          displayValue: 50,
        };
      case actionTypes.SAVE_ELEMENTS:
        return {
          ...state,
          elementInformation: action.value
        };
      case actionTypes.LAST_MOVE_ELEMENTS:
        return {
          ...state,
          lastElements: action.value
        };
      case actionTypes.LAST_ELEMENT:
        return {
          ...state,
          lastMoved1: action.id
        };
      case actionTypes.PREVIOUS_ELEMENT:
        return {
          ...state,
          lastMoved2: action.id
        };
      case actionTypes.ZOOM_RATE_ACTION:
        return {
          ...state,
          zoomRate: action.value,
          displayValue: action.displayValue
        };
      case actionTypes.RESULT_GET_ZONES:
        return {
          ...state,
          id1: action.id1,
          id2: action.id2,
          id3: action.id3,
          id4: action.id4,
          idVIP: action.idVIP,
          zone1: action.zone1,
          zone2: action.zone2,
          zone3: action.zone3,
          zone4: action.zone4,
          hasVipZone: action.hasVipZone,
          zoneData: action.zoneData
        };
      case actionTypes.RESLUT_CREATE_ELEMENT_SAVE:
        return {
          ...state,
          resultElements: action.value,
          lastMoved1: action.last,
          lastMoved2: action.previous,
          zoomRate: action.zoomRate,
          zoomAreaValue: action.zoomAreaValue,
          displayValue: action.displayValue
        };
      case actionTypes.SAVE_ZONE_DATA:
        return {
          ...state,
          dotsData: action.value,
        };
      case actionTypes.SAVE_ZOOM_AREA_VALUE:
        return {
          ...state,
          zoomAreaValue: action.zoomAreaValue,
        };

      default:
        return state;
    }
  }
)
