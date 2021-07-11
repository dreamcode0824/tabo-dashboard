export const actionTypes = {
  ACTIVITY_DATE_PERIOD: "ACTIVITY_DATE_PERIOD",
  GET_RULE: "GET_RULE",
  RESULT_GET_RULE: "RESULT_GET_RULE",
  SAVE_RULE: "SAVE_RULE",
  GET_FACILITIES: 'GET_FACILITIES',
  RESULT_GET_FACILITIES: "RESULT_GET_FACILITIES",
  CREATE_FACILITIES: "CREATE_FACILITIES",
  DELETE_FACILITIES: "DELETE_FACILITIES",
  GET_EXTRA_SUNBED_PHOTO: "GET_EXTRA_SUNBED_PHOTO",
  RESULT_GET_SETTING: "RESULT_GET_SETTING",
  SAVE_EXTRA_SUNBED_PHOTO: "SAVE_EXTRA_SUNBED_PHOTO",
  CHANGE_RULE_VALUE: "CHANGE_RULE_VALUE",
  LANGUAGE_FLAG_STATUS: "LANGUAGE_FLAG_STATUS",
  TRANSLATED_LANGUAGE: "TRANSLATED_LANGUAGE",
  CHAGNE_LANGUAGE_LIST: "CHAGNE_LANGUAGE_LIST",
  SAVE_MAIN_LANGUAGE: "SAVE_MAIN_LANGUAGE",
  GET_BEACH_LOCATION: 'GET_BEACH_LOCATION',
  SAVE_BEACH_LOCATION: "SAVE_BEACH_LOCATION",
  GET_BUSINESS_GALLERY: "GET_BUSINESS_GALLERY",
  RESULT_GET_BUSINESS_GALLERY: "RESULT_GET_BUSINESS_GALLERY",
  BUSINESS_GALLERIES: "BUSINESS_GALLERIES",
  IMAGE_DELETE_ACTION: "IMAGE_DELETE_ACTION",
  BEACH_PHOTO_ID: "BEACH_PHOTO_ID",
  BUSINESS_ELEMENT_PHOTO: "BUSINESS_ELEMENT_PHOTO",
  RESULT_GET_BUSINESS_ELEMENT_PHOTO: "RESULT_GET_BUSINESS_ELEMENT_PHOTO",
  BUSINESS_ELEMENT_GALLERIES: "BUSINESS_ELEMENT_GALLERIES",
  GET_BUSINESS_TYPE: "GET_BUSINESS_TYPE",
  GET_BUSINESS_ELEMENT_TYPE: "GET_BUSINESS_ELEMENT_TYPE",
  SAVE_RESERVATION_GRARANTEED: "SAVE_RESERVATION_GRARANTEED",
  SAVE_ESTIMATED_TIME: "SAVE_ESTIMATED_TIME",
  SAVE_INTERVAL_TIME: "SAVE_INTERVAL_TIME",
  SAVE_MONEY_SELECT: "SAVE_MONEY_SELECT"
};
export function initialize() {
  const init = {};
  return { type: actionTypes.INITIAL_STATE, init };
}
export function getRule() {
  return { type: actionTypes.GET_RULE };
}
export function saveRuleValue(lng, translatedText) {
  return { type: actionTypes.SAVE_RULE, lng, translatedText };
}
export function getFacilities() {
  return { type: actionTypes.GET_FACILITIES };
}
export function createFacility(id) {
  return { type: actionTypes.CREATE_FACILITIES, id };
}
export function deleteFacility(id) {
  return { type: actionTypes.DELETE_FACILITIES, id };
}
export function getExtraSunbedPhoto() {
  return { type: actionTypes.GET_EXTRA_SUNBED_PHOTO };
}
export function saveExtraSunbedPhoto(photoRequired, extraSunbed, umbrellarRequired) {
  return { type: actionTypes.SAVE_EXTRA_SUNBED_PHOTO, photoRequired, extraSunbed, umbrellarRequired };
}
export function changeRuleValue(currentIng, ruleValue) {
  return { type: actionTypes.CHANGE_RULE_VALUE, currentIng, ruleValue };
}
export function languageFlagStatus(currentIngFlag) {
  return { type: actionTypes.LANGUAGE_FLAG_STATUS, currentIngFlag };
}
export function translatedLanguage(language, status) {
  return { type: actionTypes.TRANSLATED_LANGUAGE, language, status };
}
export function changeLaguageList(value) {
  return { type: actionTypes.CHAGNE_LANGUAGE_LIST, value };
}
export function saveMainLanguage(value) {
  return { type: actionTypes.SAVE_MAIN_LANGUAGE, value };
}
export function getBeachLocation() {
  return { type: actionTypes.GET_BEACH_LOCATION };
}
export function saveBeachLocation(mapPosition, country, city) {
  return { type: actionTypes.SAVE_BEACH_LOCATION, mapPosition, country, city };
}
export function getBusinessGallery() {
  return { type: actionTypes.GET_BUSINESS_GALLERY };
}
export function businessGalleries(value) {
  return { type: actionTypes.BUSINESS_GALLERIES, value };
}
export function imageDeleteActions(id) {
  return { type: actionTypes.IMAGE_DELETE_ACTION, id };
}
export function beachPhotoId(id) {
  return { type: actionTypes.BEACH_PHOTO_ID, id };
}
export function getBusinessElementPhoto() {
  return { type: actionTypes.BUSINESS_ELEMENT_PHOTO };
}
export function businessElementGalleries(value) {
  return { type: actionTypes.BUSINESS_ELEMENT_GALLERIES, value };
}
export function getBusinessType() {
  return { type: actionTypes.GET_BUSINESS_TYPE };
}
export function saveReservationGuaranteedAction(value) {
  return { type: actionTypes.SAVE_RESERVATION_GRARANTEED, value };
}
export function saveEstimatedTime(count) {
  return { type: actionTypes.SAVE_ESTIMATED_TIME, count };
}
export function saveIntervalTime(count) {
  return { type: actionTypes.SAVE_INTERVAL_TIME, count };
}
export function saveMoneySelect(name) {
  return { type: actionTypes.SAVE_MONEY_SELECT, name };
}
