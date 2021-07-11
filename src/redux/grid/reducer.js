import { actionTypes } from "./action";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const initState = {
  initials: null,
  activityPeriod: "",
  getActivityPeriod: [],
  workHourValue: "",
  weekHourData: [],
  startDate: "",
  endDate: "",
  status: false,
  check: false,
  from: "",
  to: "",
  from_break: "",
  to_break: "",
  zoneCount: 1,
  zoneNames: "",
  hasVipZone: false,
  zone1: "",
  zone2: "",
  zone3: "",
  zone4: "",
  length: "",
  id1: "",
  id2: "",
  id3: "",
  id4: "",
  idVIP: "",
  timeLineData: []
};

export const reducer = persistReducer(
  {
    storage,
    key: "grid",
    whitelist: [
      'getActivityPeriod',
      'weekHourData',
      'workHourValue',
      'zoneCount',
      'hasVipZone'
    ],
  },
  (state = initState, action) => {
    switch (action.type) {
      case actionTypes.INITIAL_STATE:
        return { ...state };
      case actionTypes.ACTIVITY_DATE_PERIOD:
        return { ...state, activityPeriod: action.value };
      case actionTypes.RESULT_GET_BUSINESS_DATA:
        return { ...state, getActivityPeriod: action.value, startDate: action.startDate, endDate: action.endDate, status: true };
      case actionTypes.RESULT_FAIL_GET_BUSINESS_DATA:
        return { ...state, startDate: "", endDate: "", status: false };
      case actionTypes.WORK_HOUR_VALUE:
        return { ...state, workHourValue: action.value };
      case actionTypes.RESULT_GET_WEEK_HOUR:
        return { ...state, weekHourData: action.value };
      case actionTypes.UPDATE_ACTIVITY_DATE_PERIOD:
        return { ...state, activityPeriod: action.value };
      case actionTypes.START_DATES:
        return { ...state, startDate: action.value, status: true };
      case actionTypes.END_DATES:
        return { ...state, endDate: action.value };
      case actionTypes.APPLY_SAME_SCHEDULE:
        return { ...state, cehck: action.check };
      case actionTypes.APPLY_WORK_TIME_FROM_BREAK:
        return { ...state, from_break: action.from_break };
      case actionTypes.APPLY_TO_TIME_FROM_BREAK:
        return { ...state, to_break: action.to_break };
      case actionTypes.APPLY_WORK_TIME_FROM:
        return { ...state, from: action.from };
      case actionTypes.APPLY_TO_TIME_FROM:
        return { ...state, to: action.to };
      case actionTypes.RESULT_GET_ZONE_NAME:
        return {
          ...state,
          zone1: action.zone1,
          zone2: action.zone2,
          zone3: action.zone3,
          zone4: action.zone4
        };
      case actionTypes.HAS_VIP_ZONE:
        return { ...state, hasVipZone: action.value };
      case actionTypes.SAVE_COUNT:
        return { ...state, zoneCount: action.value };
      case actionTypes.RESULT_GET_TIME_LINE:
        return { ...state, timeLineData: action.timeLineData };
      case actionTypes.RESULT_GET_ZONE:
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
          zoneCount: action.count,
          length: action.length,
        };
      case actionTypes.CHANGE_VALUE_ZONE:
        return {
          ...state,
          [action.name]: action.value
        };
      default:
        return state;
    }
  }
)
