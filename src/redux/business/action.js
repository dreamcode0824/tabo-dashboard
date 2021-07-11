export const actionTypes = {
  LOGIN_VALUE_ACTION: "LOGIN_VALUE_ACTION",
  LOGIN_ACTION: "LOGIN_ACTION",
  RESULT_LOGIN_DATA: "RESULT_LOGIN_DATA",
  RESULT_LOGIN_DATA: "RESULT_LOGIN_DATA",
  REGISTER_ACTION: "REGISTER_ACTION",
  REGISTER_VALUE_ACTION: "REGISTER_VALUE_ACTION",
  GET_COUNTRY_ACTION: "GET_COUNTRY_ACTION",
  RESULT_COUNTRY_DATA: "RESULT_COUNTRY_DATA",
  RESULT_REGISTER_DATA: "RESULT_REGISTER_DATA",
  RESULT_LOGIN_FAIL_DATA: "RESULT_LOGIN_FAIL_DATA",
  RESULT_REGISTER_FAIL_DATA: "RESULT_REGISTER_FAIL_DATA",
  RESULT_REGISTER_SUCCESS_DATA: "RESULT_REGISTER_SUCCESS_DATA",
  BUSINESS_TYPE: "BUSINESS_TYPE",
  RESULT_BUSINESS_DATA: "RESULT_BUSINESS_DATA",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
  GET_BUSINESS_TYPE: "GET_BUSINESS_TYPE",
  LOGOUT_ACTION: "LOGOUT_ACTION",
  RESULT_LOG_OUT: "RESULT_LOG_OUT",
  BUSINESS_TYPE_DATA: "BUSINESS_TYPE_DATA",
  GET_BUSINESS_LIST_GET_BY_ID: "GET_BUSINESS_LIST_GET_BY_ID",
  FILTER_BUSINESS_LIST_ACTION: "FILTER_BUSINESS_LIST_ACTION",
  CREATE_BUSINESS_PROFILE: "CREATE_BUSINESS_PROFILE",
  RESULT_CREATE_BUSINESS_ACTION: "RESULT_CREATE_BUSINESS_ACTION",
  GET_CITY_LIST: "GET_CITY_LIST",
  RESULT_GET_CITY_LIST: "RESULT_GET_CITY_LIST",
  BUSINESS_NAME: "BUSINESS_NAME",
  SAVE_PLAN_ACTION: "SAVE_PLAN_ACTION",
  CUOPON_CODE_VALID: "CUOPON_CODE_VALID",
  RESULT_VALID_CUOPON: "RESULT_VALID_CUOPON",
  GET_PLAN_INFORMATION: "GET_PLAN_INFORMATION",
  RESULT_GET_COUPON_BY_BUSINESSID: "RESULT_GET_COUPON_BY_BUSINESSID",
  GET_PLAN_DATA: "GET_PLAN_DATA",
  RESULT_GET_PLAN: "RESULT_GET_PLAN",
  RESULT_ALL_COUPONS: "RESULT_ALL_COUPONS",
  RESULT_DELAY_NOTIFICATION: "RESULT_DELAY_NOTIFICATION",
  LOCATION_NAME_UPDATE: "LOCATION_NAME_UPDATE",
  CHANGE_PUBLISH_STATUS: "CHANGE_PUBLISH_STATUS"
};
export function initialize() {
  const init = {};
  return { type: actionTypes.INITIAL_STATE, init };
}
export function loginValueAction(value) {
  return { type: actionTypes.LOGIN_VALUE_ACTION, value };
}
export function loginAction(history, resolve, reject) {
  return { type: actionTypes.LOGIN_ACTION, history, resolve, reject };
}
export function registerValue(value) {
  return { type: actionTypes.REGISTER_VALUE_ACTION, value };
}
export function registerAction(history) {
  return { type: actionTypes.REGISTER_ACTION, history };
}
export function getCountryAction() {
  return { type: actionTypes.GET_COUNTRY_ACTION };
}
export function businessTypes(value, history) {
  return { type: actionTypes.BUSINESS_TYPE, value, history };
}
export function changeLanguages(value) {
  return { type: actionTypes.CHANGE_LANGUAGE, value };
}
export function getBusinessType() {
  return { type: actionTypes.GET_BUSINESS_TYPE };
}
export function logoutAction() {
  return { type: actionTypes.LOGOUT_ACTION };
}
export function businessTypesData() {
  return { type: actionTypes.BUSINESS_TYPE_DATA };
}
export function getBusinessListGetById(value) {
  return { type: actionTypes.GET_BUSINESS_LIST_GET_BY_ID, value };
}
export function createBsuinessProfile(
  value,
  countryCityValue,
  id,
  resolve,
  reject
) {
  return {
    type: actionTypes.CREATE_BUSINESS_PROFILE,
    value,
    countryCityValue,
    id,
    resolve,
    reject,
  };
}
export function getCityList(value) {
  return { type: actionTypes.GET_CITY_LIST, value };
}
export function businessName(value) {
  console.log("Check bussiness name", value);
  return { type: actionTypes.BUSINESS_NAME, value };
}
export function savePlanAction(
  value,
  couponId,
  business_id,
  price,
  resolve,
  reject
) {
  return {
    type: actionTypes.SAVE_PLAN_ACTION,
    value,
    couponId,
    business_id,
    price,
    resolve,
    reject,
  };
}
export function cuoponCodeValid(value, business_id, resolve, reject) {
  return {
    type: actionTypes.CUOPON_CODE_VALID,
    value,
    business_id,
    resolve,
    reject,
  };
}
export function getPlanInformation(business_id) {
  return { type: actionTypes.GET_PLAN_INFORMATION, business_id };
}
export function getPlanData(business_id, resolve, reject) {
  return { type: actionTypes.GET_PLAN_DATA, business_id, resolve, reject };
}
export function locationNameUpdate(updateLocationName) {
  console.log("Check action in update location name", updateLocationName);
  return { type: actionTypes.LOCATION_NAME_UPDATE, updateLocationName };
}
export function changePublishStatus(businessId, status) {
  return { type: actionTypes.CHANGE_PUBLISH_STATUS, businessId, status };
}