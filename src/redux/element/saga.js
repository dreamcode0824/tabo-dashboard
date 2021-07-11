import { put, all, call, takeLatest, delay, select } from "redux-saga/effects";
import { actionTypes } from "./action";
import API from './api';
const api = new API();

///////////////////
const getAllElementsRequest = () => {
  return api.getAllElementsRequests()
}
function* getAllElements() {
  try {
    // const business = yield select((store) => store.business);
    const result = yield call(getAllElementsRequest)
    if (result.data) {
      const sunbedElement = result.data.element.filter(ele => ele.structure.sunbed || ele.type === "sunbed");
      const bedElement = result.data.element.filter(ele => ele.structure.bed)
      // console.log(sunbedElement)
      yield put({
        type: actionTypes.RESULT_GET_ALL_ELEMENTS,
        value: result.data.element,
        sunbedUmbrella: sunbedElement,
        bedUmbrella: bedElement,
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const createElementInformationRequest = (business, element) => {
  console.log("------------>SAVE Element")
  return api.createElementInformationRequests(business, element)
}
function* createElementInformation({ resolve }) {
  try {
    const business = yield select((store) => store.business);
    const element = yield select((store) => store.element);
    const result = yield call(createElementInformationRequest, business, element)
    if (result.data) {
      resolve(true)
      yield put({
        type: actionTypes.RESLUT_CREATE_ELEMENT_SAVE,
        value: result.data.CreateGrid.businesse_elements,
        last: result.data.CreateGrid.moved,
        previous: result.data.CreateGrid.moved1,
        zoomRate: result.data.CreateGrid.businesse_elements[0].position.zoomRate,
        zoomAreaValue: result.data.CreateGrid.businesse_elements[0].position.zoomAreaValue,
        displayValue: result.data.CreateGrid.businesse_elements[0].position.displayValue
      })
    }
  } catch (e) {
    console.log(e)
  }
}

const getBusinessElementsRequest = (business) => {
  return api.getBusinessElementsRequest(business)
}
function* getBusinessElements() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getBusinessElementsRequest, business)
    if (result.data) {
      if (result.data) {
        if (result.data.business_element.length == 0) {
          yield put({
            type: actionTypes.RESLUT_CREATE_ELEMENT,
            value: result.data.business_element,
            last: "",
            previous: "",
          })
        } else {
          yield put({
            type: actionTypes.RESLUT_CREATE_ELEMENT_SAVE,
            value: result.data.business_element,
            last: result.data.business_element[0].business.location.grid.moved,
            previous: result.data.business_element[0].business.location.grid.moved1,
            zoomRate: result.data.business_element[0].position.zoomRate,
            zoomAreaValue: result.data.business_element[0].position.zoomAreaValue,
            displayValue: result.data.business_element[0].position.displayValue
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const updateSeatNumberRequest = (business, element, currentId, seatNumber) => {
  return api.updateSeatNumberRequests(business, element, currentId, seatNumber)
}
function* updateSeatNumber({ resolve, currentId, seatNumber }) {
  try {
    console.log(seatNumber)
    const business = yield select((store) => store.business);
    const element = yield select((store) => store.element);
    const result = yield call(updateSeatNumberRequest, business, element, currentId, seatNumber)
    if (result.data) {
      if (result.data) {
        resolve(true)
        const business = yield select((store) => store.business);
        const result = yield call(getBusinessElementsRequest, business)
        if (result.data) {
          if (result.data) {
            yield put({
              type: actionTypes.RESLUT_CREATE_ELEMENT,
              value: result.data.business_element,
            })
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const getZonesActionRequest = (business) => {
  return api.getZonesActionRequests(business)
}
function* getZonesAction() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getZonesActionRequest, business)
    if (result.data.zone.length > 0) {
      const zone1Result = result.data.zone.filter(ele => ele.config.slug === "zone1");
      const zone2Result = result.data.zone.filter(ele => ele.config.slug === "zone2");
      const zone3Result = result.data.zone.filter(ele => ele.config.slug === "zone3");
      const zone4Result = result.data.zone.filter(ele => ele.config.slug === "zone4");
      const vipResult = result.data.zone.filter(ele => ele.config.slug === "VIP");
      yield put({
        type: actionTypes.RESULT_GET_ZONES,
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
        zoneData: result.data.zone
      })
    } else {
      yield put({
        type: actionTypes.RESULT_GET_ZONES,
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
        zoneData: []
      })
    }
  } catch (e) {
    console.log(e)
  }
}

const createSetZonesRequest = (element) => {
  return api.createSetZonesRequests(element)
}
function* createSetZones() {
  try {
    const element = yield select((store) => store.element);
    const result = yield call(createSetZonesRequest, element)
    if (result.data) {
      const business = yield select((store) => store.business);
      const result = yield call(getBusinessElementsRequest, business)
      if (result.data) {
        if (result.data) {
          if (result.data.business_element.length == 0) {
            yield put({
              type: actionTypes.RESLUT_CREATE_ELEMENT,
              value: result.data.business_element,
              last: "",
              previous: "",
            })
          } else {
            yield put({
              type: actionTypes.RESLUT_CREATE_ELEMENT_SAVE,
              value: result.data.business_element,
              last: result.data.business_element[0].business.location.grid.moved,
              previous: result.data.business_element[0].business.location.grid.moved1,
              zoomRate: result.data.business_element[0].position.zoomRate,
              zoomAreaValue: result.data.business_element[0].position.zoomAreaValue,
              displayValue: result.data.business_element[0].position.displayValue
            })
          }
        }
      }
    }
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_ALL_ELEMENT, getAllElements),
    takeLatest(actionTypes.CREATE_ELEMENT_INFORMATION, createElementInformation),
    takeLatest(actionTypes.GET_BUSINESS_ELEMENTS, getBusinessElements),
    takeLatest(actionTypes.UPDATE_SEAT_NUMBER, updateSeatNumber),
    takeLatest(actionTypes.GET_ZONES, getZonesAction),
    takeLatest(actionTypes.CREATE_SET_ZONE, createSetZones),
  ]);
}
