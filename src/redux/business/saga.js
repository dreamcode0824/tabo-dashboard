import { put, all, call, takeLatest, delay, select } from "redux-saga/effects";
import { actionTypes } from "./action";
import API from "./api";
const api = new API();
const loginRequest = (business) => {
  return api.loginRequests(business.loginValue);
};
const existBusinessRequest = (value) => {
  return api.existBusinessRequests(value);
};
function* login({ history, resolve, reject }) {
  try {
    const business = yield select((store) => store.business);
    const result1 = yield call(loginRequest, business);
    if (result1.data) {
      resolve("success");
      yield put({
        type: actionTypes.RESULT_LOGIN_DATA,
        value: result1.data.LoginClient.token,
        id: result1.data.LoginClient.result.id,
      });
      const result2 = yield call(
        existBusinessRequest,
        result1.data.LoginClient.result.id
      );
      if (result2.data) {
        if (result2.data.businessCount == 0) {
          history.push("/wizard");
        } else {
          history.push("/admin/business");
        }
      }
    } else {
      reject(result1.message);
      yield put({
        type: actionTypes.RESULT_LOGIN_FAIL_DATA,
        value: false,
        message: result1.message,
      });
      yield delay(3000);
      yield put({
        type: actionTypes.RESULT_DELAY_NOTIFICATION,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
///////////////////
const getCounryRequest = () => {
  return api.getCounryRequests();
};
function* getCounry() {
  try {
    const result = yield call(getCounryRequest);
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_COUNTRY_DATA,
        value: result.data.country,
      });
    }
  } catch (e) { }
}
const registerRequest = (value) => {
  return api.registerRequests(value);
};
function* register({ history }) {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(registerRequest, business.registerValue);
    if (result) {
      if (result.data) {
        // history.push("/login");
        yield put({
          type: actionTypes.RESULT_REGISTER_SUCCESS_DATA,
          value: true,
          message: "Please wait until your registration is approved.",
        });
        yield delay(3000);
        yield put({
          type: actionTypes.RESULT_DELAY_NOTIFICATION,
        });
      } else {
        let messageRegister = result.message.split(".");
        let messageValue = "";
        if (messageRegister[3] == "PHONE") {
          messageValue = "Phone numbers should not be duplicated.";
        } else {
          messageValue = "Email should not be duplicated.";
        }
        yield put({
          type: actionTypes.RESULT_REGISTER_FAIL_DATA,
          value: true,
          message: messageValue,
        });
        yield delay(3000);
        yield put({
          type: actionTypes.RESULT_DELAY_NOTIFICATION,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
}
////////////////////////
const businessTypesRequest = (value) => {
  return api.businessTypesRequests(value);
};
function* businessTypes({ history }) {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(businessTypesRequest, business);
    if (result) {
      yield put({
        type: actionTypes.RESULT_BUSINESS_DATA,
        value: result.data.SaveBusinessTypes.businesses,
      });
      history.push("/admin/business");
    }
  } catch (e) {
    console.log(e);
  }
}
//////////////////////////////
const getBusinessTypeDataRequest = (value) => {
  return api.getBusinessTypeDataRequests(value);
};
function* getBusinessTypeData() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getBusinessTypeDataRequest, business);
    if (result) {
      yield put({
        type: actionTypes.RESULT_BUSINESS_DATA,
        value: result.data.business,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function* getBusinessList(id) {
  const business = yield select((store) => store.business);
  const filterData = business.businessLists.filter((ele) => ele.id == id.value);
  if (filterData) {
    yield put({
      type: actionTypes.FILTER_BUSINESS_LIST_ACTION,
      value: filterData[0],
    });
  }
}
///////////////////////////////
const createBusinessActionRequest = (value) => {
  return api.createBusinessActionRequests(value);
};
function* createBusinessAction(id) {
  try {
    const result = yield call(createBusinessActionRequest, id);
    if (result) {
      if (result.message) {
        id.reject(result.message);
      } else {
        yield put({
          type: actionTypes.RESULT_CREATE_BUSINESS_ACTION,
          value: result.data.businessUpdate,
        });
        const business = yield select((store) => store.business);
        const resultData = yield call(getBusinessTypeDataRequest, business);
        if (resultData) {
          yield put({
            type: actionTypes.RESULT_BUSINESS_DATA,
            value: resultData.data.business,
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
///////////////////////////////////
const getCityListActionRequest = (value) => {
  return api.getCityListActionRequests(value);
};
function* getCityListAction(id) {
  try {
    const result = yield call(getCityListActionRequest, id);
    if (result) {
      yield put({
        type: actionTypes.RESULT_GET_CITY_LIST,
        value: result.data.city,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
///////////////////////////
const savePlanActionsRequest = (value, couponId, id, price) => {
  return api.savePlanActionsRequests(value, couponId, id, price);
};
function* savePlanActions(value, couponId, id, price, resolve, reject) {
  try {
    const result = yield call(
      savePlanActionsRequest,
      value,
      couponId,
      id,
      price
    );
    if (result.message) {
      value.reject(result.message);
    } else {
      value.resolve("success");
    }
  } catch (e) {
    console.log(e);
  }
}
//////////////////////////
const couponValidRequest = (value, business_id) => {
  return api.couponValidRequests(value, business_id);
};
function* couponValid({ value, business_id, resolve, reject }) {
  try {
    const result = yield call(couponValidRequest, value, business_id);
    if (result.message) {
      reject(result.message);
    } else {
      resolve("success");
    }
  } catch (e) {
    console.log(e);
  }
}
////////////////////////////
const getPlanInformationActionRequest = (business_id) => {
  return api.getPlanInformationActionRequests(business_id);
};
function* getPlanInformationAction(business_id) {
  try {
    const result = yield call(getPlanInformationActionRequest, business_id);
    if (result.message) {
    } else {
      yield put({
        type: actionTypes.RESULT_GET_COUPON_BY_BUSINESSID,
        value: result.data.validated_coupons,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
////////////////////////////
const getPlanDataActionRequest = (business_id) => {
  return api.getPlanDataActionRequests(business_id);
};
const getCouponListRequest = (couponId) => {
  return api.getCouponListRequests(couponId);
};
function* getPlanDataAction({ business_id, resolve, reject }) {
  try {
    const result = yield call(getPlanDataActionRequest, business_id);
    if (result.message) {
    } else {
      reject(result.data);
      yield put({
        type: actionTypes.RESULT_GET_PLAN,
        value: result.data.plan_changes,
      });
      if (result.data.plan_changes.length > 0) {
        let couponId = result.data.plan_changes[0].plan_config.couponIds;
        const result1 = yield call(getCouponListRequest, couponId);
        if (result1.message) {
        } else {
          yield put({
            type: actionTypes.RESULT_ALL_COUPONS,
            value: result1.data.all_coupons,
          });
          resolve(result.data.plan_changes, result1.data.all_coupons);
        }
      } else {
        yield put({
          type: actionTypes.RESULT_ALL_COUPONS,
          value: [],
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
}
////////////////////////////
const changeStatusActionRequest = (businessId, status) => {
  return api.changeStatusActionRequests(businessId, status);
};
function* changeStatusAction({ businessId, status }) {
  try {
    const result = yield call(changeStatusActionRequest, businessId, status);
  } catch (e) {
    console.log(e);
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOGIN_ACTION, login),
    takeLatest(actionTypes.GET_COUNTRY_ACTION, getCounry),
    takeLatest(actionTypes.REGISTER_ACTION, register),
    takeLatest(actionTypes.BUSINESS_TYPE, businessTypes),
    takeLatest(actionTypes.BUSINESS_TYPE_DATA, getBusinessTypeData),
    takeLatest(actionTypes.GET_BUSINESS_LIST_GET_BY_ID, getBusinessList),
    takeLatest(actionTypes.CREATE_BUSINESS_PROFILE, createBusinessAction),
    takeLatest(actionTypes.GET_CITY_LIST, getCityListAction),
    takeLatest(actionTypes.SAVE_PLAN_ACTION, savePlanActions),
    takeLatest(actionTypes.CUOPON_CODE_VALID, couponValid),
    takeLatest(actionTypes.GET_PLAN_INFORMATION, getPlanInformationAction),
    takeLatest(actionTypes.GET_PLAN_DATA, getPlanDataAction),
    takeLatest(actionTypes.CHANGE_PUBLISH_STATUS, changeStatusAction),
  ]);
}
