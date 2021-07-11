import { put, all, call, takeLatest, delay, select } from "redux-saga/effects";
import { actionTypes } from "./action";
import API from './api';
const api = new API();

///////////////////
const activityDatePeriodRequest = (value, businessId) => {
  return api.activityDatePeriodRequests(value, businessId)
}
function* activityDatePeriod({ value }) {
  console.log(value)
  try {
    const business = yield select((store) => store.business);
    const result = yield call(activityDatePeriodRequest, value, business.filterBusinessList.id)
    if (result.data) {

    }
  } catch (e) {
    console.log(e)
  }
}
const getActivityPeriodRequest = (businessId) => {
  return api.getActivityPeriodRequests(businessId)
}
function* getActivityPeriod() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getActivityPeriodRequest, business.filterBusinessList.id)
    if (result.data) {
      if (result.data.business_year.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_BUSINESS_DATA,
          value: result.data.business_year,
          startDate: result.data.business_year[0].start,
          endDate: result.data.business_year[0].end,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_FAIL_GET_BUSINESS_DATA,
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
//////////////
const saveWorkHourActionRequest = (businessId, gridValue) => {
  return api.saveWorkHourActionRequests(businessId, gridValue)
}
function* saveWorkHourAction() {
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(saveWorkHourActionRequest, business.filterBusinessList.id, grid.workHourValue)
    if (result.data) {
      console.log(result.data)
      // yield put({
      //   type: actionTypes.RESULT_GET_BUSINESS_DATA,
      //   value: result.data.business_year,
      // })
    }
  } catch (e) {
    console.log(e)
  }
}
/////////////////////////////
const getWorkHour = (businessId) => {
  return api.getWorkHourRequests(businessId)
}
function* getHourWork({ resolve }) {
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(getWorkHour, business.filterBusinessList.id, grid.weekHourData)
    if (result.data) {
      resolve(result.data.business_week)
      yield put({
        type: actionTypes.RESULT_GET_WEEK_HOUR,
        value: result.data.business_week,
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const updateActivityDatePeriodRequest = (value, businessId, id, grid) => {
  return api.updateActivityDatePeriodRequests(value, businessId, id, grid)
}
function* updateActivityDatePeriod({ value }) {
  console.log(value)
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(updateActivityDatePeriodRequest, value, business.filterBusinessList.id, grid.getActivityPeriod[0].id, grid)
    if (result.data) {

    }
  } catch (e) {
    console.log(e)
  }
}
const updateWorkHourActionRequest = (businessId, gridValue, id) => {
  return api.updateWorkHourActionRequests(businessId, gridValue, id)
}
function* updateWorkHourAction() {
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(updateWorkHourActionRequest, business.filterBusinessList.id, grid.workHourValue, grid.weekHourData[0].id)
    if (result.data) {
      console.log(result.data)
    }
  } catch (e) {
    console.log(e)
  }
}
const getZoneNamesRequest = (business, grid) => {
  return api.getZoneNamesRequests(business, grid)
}
function* getZoneNames() {
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(getZoneNamesRequest, business, grid)
    if (result.data) {
      console.log(result.data.custom_query[0].result)
      // resolve(result.data.custom_query[0].result)
      console.log(result.data.custom_query[0].result)
      yield put({
        type: actionTypes.RESULT_GET_ZONE_NAME,
        zone1: result.data.custom_query[0].result[0].name,
        zone2: result.data.custom_query[0].result.length > 1 ? result.data.custom_query[0].result[1].name : "",
        zone3: result.data.custom_query[0].result.length > 2 ? result.data.custom_query[0].result[2].name : "",
        zone4: result.data.custom_query[0].result.length > 3 ? result.data.custom_query[0].result[3].name : "",
      })
    }
  } catch (e) {
    console.log(e)
  }
}
/////////////////////////
const saveZoneNamesRequest = (value, business, grid) => {
  return api.saveZoneNamesRequests(value, business, grid)
}
function* saveZoneNames({ value }) {
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(saveZoneNamesRequest, value, business, grid)
    if (result.data) {
    }
  } catch (e) {
    console.log(e)
  }
}
const getZoneActionRequest = (business) => {
  return api.getZoneActionRequests(business)
}
function* getZoneAction() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getZoneActionRequest, business)
    if (result.data) {
      if (result.data.zone.length > 0) {
        const zone1Result = result.data.zone.filter(ele => ele.config.slug === "zone1");
        const zone2Result = result.data.zone.filter(ele => ele.config.slug === "zone2");
        const zone3Result = result.data.zone.filter(ele => ele.config.slug === "zone3");
        const zone4Result = result.data.zone.filter(ele => ele.config.slug === "zone4");
        const vipResult = result.data.zone.filter(ele => ele.config.slug === "VIP");
        console.log(zone1Result, zone2Result, zone3Result, zone4Result, vipResult)
        console.log(result.data.zone)
        yield put({
          type: actionTypes.RESULT_GET_ZONE,
          id1: zone1Result.length > 0 ? zone1Result[0].id : "",
          id2: zone2Result.length > 0 ? zone2Result[0].id : "",
          id3: zone3Result.length > 0 ? zone3Result[0].id : "",
          id4: zone4Result.length > 0 ? zone4Result[0].id : "",
          idVIP: vipResult.length > 0 ? vipResult[0].id : "",
          zone1: zone1Result.length > 0 ? zone1Result[0].name : "",
          zone2: zone2Result.length > 0 ? zone2Result[0].name : "",
          zone3: zone3Result.length > 0 ? zone3Result[0].name : "",
          zone4: zone4Result.length > 0 ? zone4Result[0].name : "",
          hasVipZone: vipResult.length > 0 ? true : false,
          count: vipResult.length > 0 ? result.data.zone.length - 1 : result.data.zone.length,
          length: vipResult.length > 0 ? result.data.zone.length - 1 : result.data.zone.length,
        })
        const business = yield select((store) => store.business);
        const grid = yield select((store) => store.grid);
        const result1 = yield call(getZoneNamesRequest, business, grid)
        if (result1.data) {
          yield put({
            type: actionTypes.RESULT_GET_ZONE_NAME,
            zone1: result1.data.custom_query[0].result[0].name,
            zone2: result1.data.custom_query[0].result.length > 1 ? result1.data.custom_query[0].result[1].name : "",
            zone3: result1.data.custom_query[0].result.length > 2 ? result1.data.custom_query[0].result[2].name : "",
            zone4: result1.data.custom_query[0].result.length > 3 ? result1.data.custom_query[0].result[3].name : "",
          })
        }
      } else {
        yield put({
          type: actionTypes.RESULT_GET_ZONE,
          id1: "",
          id2: "",
          id3: "",
          id4: "",
          idVIP: "",
          zone1: "",
          zone2: "",
          zone3: "",
          zone4: "",
          hasVipZone: false,
          count: 1,
          length: 1,
        })
      }
    } else {
      yield put({
        type: actionTypes.RESULT_GET_ZONE,
        id1: "",
        id2: "",
        id3: "",
        id4: "",
        idVIP: "",
        zone1: "",
        zone2: "",
        zone3: "",
        zone4: "",
        hasVipZone: false,
        count: 1,
        length: 1,
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const updateZoneNamesRequest = (value, business, grid) => {
  return api.updateZoneNamesRequests(value, business, grid)
}
function* updateZoneNames({ value }) {
  try {
    const business = yield select((store) => store.business);
    const grid = yield select((store) => store.grid);
    const result = yield call(updateZoneNamesRequest, value, business, grid)
    if (result.data) {
    }
  } catch (e) {
    console.log(e)
  }
}
const saveClosedDaySagaRequest = (businessId, days) => {
  return api.saveClosedDaySagaRequests(businessId, days)
}
function* saveClosedDaySaga({ businessId, days }) {
  try {
    const result = yield call(saveClosedDaySagaRequest, businessId, days)
    if (result.data) {

    }
  } catch (e) {
    console.log(e)
  }
}
const saveTimeLineRequest = (timeArrs, businessId, timeLineData) => {
  return api.saveTimeLineRequests(timeArrs, businessId, timeLineData)
}
function* saveTimeLineSaga({ timeArrs, businessId }) {
  try {
    const grid = yield select((store) => store.grid);
    const result = yield call(saveTimeLineRequest, timeArrs, businessId, grid.timeLineData)
    if (result.data) {
      console.log(result.data, ")))))))))))))))))))))))")
    }
  } catch (e) {
    console.log(e)
  }
}
const getTimeLineRequest = (businessId) => {
  return api.getTimeLineRequests(businessId)
}
function* getTimeLineSaga() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getTimeLineRequest, business.filterBusinessList.id)
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_GET_TIME_LINE,
        timeLineData: result.data.time_line
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const getTemporaryRequest = (id, value) => {
  return api.getTemporaryRequests(id, value)
}
const createBusinessSettingTemporary_closedRequest = (id, value) => {
  return api.createBusinessSettingTemporary_closedRequests(id, value)
}
function* getTemporary({ value }) {
  try {
    const businessSetting = yield select((store) => store.option.businessSettings[0]);
    const business = yield select((store) => store.business);
    let result = {}
    if (businessSetting) {
      result = yield call(getTemporaryRequest, businessSetting.id, value)
    } else {
      result = yield call(createBusinessSettingTemporary_closedRequest, business.filterBusinessList.id, value)
    }
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_GET_TIME_LINE,
        timeLineData: result.data.time_line
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const gridSaveDataRequest = (value, businessId) => {
  return api.gridSaveDataRequests(value, businessId)
}
function* gridSaveDataSaga({ value }) {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(gridSaveDataRequest, value, business.filterBusinessList.id)
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_GET_TIME_LINE,
        timeLineData: result.data.time_line
      })
    }
  } catch (e) {
    console.log(e)
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.ACTIVITY_DATE_PERIOD, activityDatePeriod),
    takeLatest(actionTypes.UPDATE_ACTIVITY_DATE_PERIOD, updateActivityDatePeriod),
    takeLatest(actionTypes.GET_ACTIVITY_PERIOD, getActivityPeriod),
    takeLatest(actionTypes.SAVE_WORK_HOUR, saveWorkHourAction),
    takeLatest(actionTypes.GET_HOUR_WORK, getHourWork),
    takeLatest(actionTypes.UPDATE_WORK_HOUR, updateWorkHourAction),
    takeLatest(actionTypes.GET_ZONE_NAME, getZoneNames),
    takeLatest(actionTypes.SAVE_ZONE_NAME, saveZoneNames),
    takeLatest(actionTypes.UPDATE_ZONE, updateZoneNames),
    takeLatest(actionTypes.GET_ZONE, getZoneAction),
    takeLatest(actionTypes.SAVE_CLOSED_DAYS, saveClosedDaySaga),
    takeLatest(actionTypes.SAVE_TIME_LINE, saveTimeLineSaga),
    takeLatest(actionTypes.GET_TIME_LINE, getTimeLineSaga),
    takeLatest(actionTypes.TEMPORARY_CLOSED, getTemporary),
    takeLatest(actionTypes.GRID_DATA_SAVE, gridSaveDataSaga),
  ]);
}
