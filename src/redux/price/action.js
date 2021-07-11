export const actionTypes = {
  GET_STRUCTURE: "GET_STRUCTURE",
  RESULT_GET_STRUCTURE_ELEMENT: "RESULT_GET_STRUCTURE_ELEMENT",
  CREATE_PRICE_PLAN: "CREATE_PRICE_PLAN",
  GET_PRICE: "GET_PRICE",
  RESULT_GET_PRICE: "RESULT_GET_PRICE",
  SAVED_STATUS: "SAVED_STATUS",
  RANGE_DATA: "RANGE_DATA",
  ELEMENT_TYPES_ACTION: "ELEMENT_TYPES_ACTION",
  IS_SUNBED_ACTION: "IS_SUNBED_ACTION",
  IS_BED_ACTION: "IS_BED_ACTION",
  IS_DATA: "IS_DATA",
  IS_SAME_PRICE: "IS_SAME_PRICE",
  ASYNC_PRICE: "ASYNC_PRICE",
  DELETE_RESET_ACTION: "DELETE_RESET_ACTION",
  RESET_PERIOD: "RESET_PERIOD",
  MODAL_ACTION: "MODAL_ACTION",
  CANCEL_ACTION: "CANCEL_ACTION",
  TEMP_ELEMENT_TYPE: "TEMP_ELEMENT_TYPE",
  TEMP_ZONE_NAME: "TEMP_ZONE_NAME",
  CURRENT_ZONE_NAME: "CURRENT_ZONE_NAME",
  ASYNC_CREATE: "ASYNC_CREATE"
};
export function initialize() {
  const init = {};
  return { type: actionTypes.INITIAL_STATE, init };
}
export function getStructure(id) {
  return { type: actionTypes.GET_STRUCTURE, id };
}
export function createPricePlan(elementType, priceData) {
  return { type: actionTypes.CREATE_PRICE_PLAN, elementType, priceData };
}
export function getPrice() {
  return { type: actionTypes.GET_PRICE };
}
export function savedStatus(value) {
  return { type: actionTypes.SAVED_STATUS, value };
}
export function elementTypesAction(value) {
  return { type: actionTypes.ELEMENT_TYPES_ACTION, value };
}
export function isSunbedAction(value) {
  return { type: actionTypes.IS_SUNBED_ACTION, value };
}
export function isBedAction(value) {
  return { type: actionTypes.IS_BED_ACTION, value };
}
export function isData(value) {
  return { type: actionTypes.IS_DATA, value };
}
export function isSamePrice(value) {
  return { type: actionTypes.IS_SAME_PRICE, value };
}
export function ayncGetPrice(resolve) {
  return { type: actionTypes.ASYNC_PRICE, resolve };
}
export function deleteAction() {
  return { type: actionTypes.DELETE_RESET_ACTION };
}
export function resetPeriod(value) {
  return { type: actionTypes.RESET_PERIOD, value };
}
export function modalAction(value) {
  return { type: actionTypes.MODAL_ACTION, value };
}
export function cancelActions(value) {
  return { type: actionTypes.CANCEL_ACTION, value };
}
export function tempElementType(value) {
  return { type: actionTypes.TEMP_ELEMENT_TYPE, value };
}
export function tempZoneName(value, valueId) {
  return { type: actionTypes.TEMP_ZONE_NAME, value, valueId };
}
export function currentZoneName(value) {
  return { type: actionTypes.CURRENT_ZONE_NAME, value };
}
export function ayncCreatePricePlan(elementType, priceData, resolve) {
  return { type: actionTypes.ASYNC_CREATE, elementType, priceData, resolve };
}