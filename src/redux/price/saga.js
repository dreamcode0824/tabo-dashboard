import { put, all, call, takeLatest, delay, select } from "redux-saga/effects";
import { actionTypes, updateAction } from "./action";
import API from './api';
const api = new API();

///////////////////
const getStructureElementRequest = (id) => {
  return api.getStructureElementRequests(id)
}
function* getStructureElement({ id }) {
  try {
    const result = yield call(getStructureElementRequest, id)
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_GET_STRUCTURE_ELEMENT,
        value: result.data.business_element,
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const createPricePlanRequest = (elementType, priceData, business, price, filterResult) => {
  return api.createPricePlanRequests(elementType, priceData, business, price, filterResult)
}
function* createPricePlan({ elementType, priceData }) {
  console.log(elementType, priceData)
  try {
    const business = yield select((store) => store.business);
    const price = yield select((store) => store.price);
    let filterResult = [];
    const result = yield call(createPricePlanRequest, elementType, priceData, business, price, filterResult)
    if (result.data.CreateCustomPrice.result == "ok") {
      console.log(result.data)
      const price = yield select((store) => store.price);
      const business = yield select((store) => store.business);
      const result1 = yield call(getPriceRequest, price, business)
      if (result1.data) {
        console.log(result1.data)
        if (result1.data.price.length > 0) {
          yield put({
            type: actionTypes.RESULT_GET_PRICE,
            value: result1.data.price,
          })
        } else {
          yield put({
            type: actionTypes.RESULT_GET_PRICE,
            value: "",
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const getPriceRequest = (price, business) => {
  return api.getPriceRequests(price, business)
}
function* getPrice() {
  try {
    const price = yield select((store) => store.price);
    const business = yield select((store) => store.business);
    const result = yield call(getPriceRequest, price, business)
    if (result.data) {
      if (result.data.price.length > 0) {
        yield put({
          type: actionTypes.RESULT_GET_PRICE,
          value: result.data.price,
        })
      } else {
        yield put({
          type: actionTypes.RESULT_GET_PRICE,
          value: "",
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const asyncPriceRequest = (price1, price, business) => {
  return api.getPriceRequests(price1, price, business)
}
function* asyncPrice({ resolve }) {
  try {
    const price = yield select((store) => store.price);
    const price1 = yield select((store) => store.price);
    const business = yield select((store) => store.business);
    const result = yield call(asyncPriceRequest, price1, price, business)
    if (result.data) {
      if (result.data.price.length > 0) {
        resolve(result.data.price)
        yield put({
          type: actionTypes.RESULT_GET_PRICE,
          value: result.data.price,
        })
      } else {
        resolve("")
        yield put({
          type: actionTypes.RESULT_GET_PRICE,
          value: "",
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const resetActionRequest = (business) => {
  return api.resetActionRequests(business)
}
function* resetAction() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(resetActionRequest, business)
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_GET_PRICE,
        value: "",
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const asyncCreatePriceRequest = (elementType, priceData, business, price, filterResult) => {
  return api.createPricePlanRequests(elementType, priceData, business, price, filterResult)
}
function* asyncCreatePrice({ elementType, priceData, resolve }) {
  console.log(elementType, priceData)
  try {
    const business = yield select((store) => store.business);
    const price = yield select((store) => store.price);
    let filterResult = [];
    const result = yield call(asyncCreatePriceRequest, elementType, priceData, business, price, filterResult)
    if (result.data.CreateCustomPrice.result == "ok") {
      const price = yield select((store) => store.price);
      const business = yield select((store) => store.business);
      const result1 = yield call(getPriceRequest, price, business)
      if (result1.data) {
        resolve(result1.data.price)
        if (result1.data.price.length > 0) {
          yield put({
            type: actionTypes.RESULT_GET_PRICE,
            value: result1.data.price,
          })
        } else {
          yield put({
            type: actionTypes.RESULT_GET_PRICE,
            value: "",
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_STRUCTURE, getStructureElement),
    takeLatest(actionTypes.CREATE_PRICE_PLAN, createPricePlan),
    takeLatest(actionTypes.ASYNC_CREATE, asyncCreatePrice),
    takeLatest(actionTypes.GET_PRICE, getPrice),
    takeLatest(actionTypes.ASYNC_PRICE, asyncPrice),
    takeLatest(actionTypes.DELETE_RESET_ACTION, resetAction),
  ]);
}
