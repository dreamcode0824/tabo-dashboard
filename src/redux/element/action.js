export const actionTypes = {
  ACTIVITY_DATE_PERIOD: "ACTIVITY_DATE_PERIOD",
  GET_ALL_ELEMENT: "GET_ALL_ELEMENT",
  RESULT_GET_ALL_ELEMENTS: "RESULT_GET_ALL_ELEMENTS",
  ELEMENT_WIDHT: "ELEMENT_WIDHT",
  IMAGE_NAME: 'IMAGE_NAME',
  CREATE_ELEMENT_INFORMATION: "CREATE_ELEMENT_INFORMATION",
  RESLUT_CREATE_ELEMENT: "RESLUT_CREATE_ELEMENT",
  SAVE_ELEMENTS: "SAVE_ELEMENTS",
  GET_BUSINESS_ELEMENTS: "GET_BUSINESS_ELEMENTS",
  LAST_MOVE_ELEMENTS: "LAST_MOVE_ELEMENTS",
  UPDATE_SEAT_NUMBER: "UPDATE_SEAT_NUMBER",
  RESLUT_CREATE_ELEMENT_SAVE: "RESLUT_CREATE_ELEMENT_SAVE",
  LAST_ELEMENT: "LAST_ELEMENT",
  PREVIOUS_ELEMENT: "PREVIOUS_ELEMENT",
  ZOOM_RATE_ACTION: "ZOOM_RATE_ACTION",
  GET_ZONES: "GET_ZONES",
  RESULT_GET_ZONES: "RESULT_GET_ZONES",
  SAVE_ZONE_DATA: 'SAVE_ZONE_DATA',
  CREATE_SET_ZONE: 'CREATE_SET_ZONE',
  SAVE_ZOOM_AREA_VALUE: 'SAVE_ZOOM_AREA_VALUE'
};
export function initialize() {
  const init = {};
  return { type: actionTypes.INITIAL_STATE, init };
}
export function getAllElement() {
  return { type: actionTypes.GET_ALL_ELEMENT };
}
export function elementWidth(value) {
  return { type: actionTypes.ELEMENT_WIDHT, value }
}
export function imageName(value) {
  return { type: actionTypes.IMAGE_NAME, value }
}
export function createElementInformation(resolve) {
  return { type: actionTypes.CREATE_ELEMENT_INFORMATION, resolve }
}
export function saveElements(value) {
  return { type: actionTypes.SAVE_ELEMENTS, value }
}
export function getElements() {
  return { type: actionTypes.GET_BUSINESS_ELEMENTS }
}
export function lastMoveElementAction(value) {
  return { type: actionTypes.LAST_MOVE_ELEMENTS, value }
}
export function updateSeatNumber(resolve, currentId, seatNumber) {
  return { type: actionTypes.UPDATE_SEAT_NUMBER, resolve, currentId, seatNumber }
}
export function lastElementAction(id) {
  return { type: actionTypes.LAST_ELEMENT, id }
}
export function previousElementAction(id) {
  return { type: actionTypes.PREVIOUS_ELEMENT, id }
}
export function zoomRateAction(value, displayValue) {
  return { type: actionTypes.ZOOM_RATE_ACTION, value, displayValue }
}
export function getZones() {
  return { type: actionTypes.GET_ZONES }
}
export function saveZoneData(value) {
  return { type: actionTypes.SAVE_ZONE_DATA, value }
}
export function createSetZone() {
  return { type: actionTypes.CREATE_SET_ZONE }
}
export function saveZoomAreaValue(zoomAreaValue) {
  return { type: actionTypes.SAVE_ZOOM_AREA_VALUE, zoomAreaValue }
}