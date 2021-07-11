export const actionTypes = {
  ACTIVITY_DATE_PERIOD: "ACTIVITY_DATE_PERIOD",
  GET_ACTIVITY_PERIOD: "GET_ACTIVITY_PERIOD",
  RESULT_GET_BUSINESS_DATA: "RESULT_GET_BUSINESS_DATA",
  WORK_HOUR_VALUE: "WORK_HOUR_VALUE",
  SAVE_WORK_HOUR: "SAVE_WORK_HOUR",
  RESULT_GET_WEEK_HOUR: "RESULT_GET_WEEK_HOUR",
  GET_HOUR_WORK: "GET_HOUR_WORK",
  UPDATE_ACTIVITY_DATE_PERIOD: "UPDATE_ACTIVITY_DATE_PERIOD",
  UPDATE_WORK_HOUR: "UPDATE_WORK_HOUR",
  START_DATES: "START_DATES",
  END_DATES: "END_DATES",
  RESULT_FAIL_GET_BUSINESS_DATA: "RESULT_FAIL_GET_BUSINESS_DATA",
  APPLY_SAME_SCHEDULE: 'APPLY_SAME_SCHEDULE',
  APPLY_WORK_TIME_FROM: "APPLY_WORK_TIME_FROM",
  APPLY_TO_TIME_FROM: "APPLY_TO_TIME_FROM",
  GET_ZONE_NAME: "GET_ZONE_NAME",
  RESULT_GET_ZONE_NAME: "RESULT_GET_ZONE_NAME",
  HAS_VIP_ZONE: "HAS_VIP_ZONE",
  SAVE_ZONE_NAME: "SAVE_ZONE_NAME",
  SAVE_COUNT: "SAVE_COUNT",
  GET_ZONE: "GET_ZONE",
  RESULT_GET_ZONE: "RESULT_GET_ZONE",
  CHANGE_VALUE_ZONE: 'CHANGE_VALUE_ZONE',
  UPDATE_ZONE: "UPDATE_ZONE",
  SAVE_CLOSED_DAYS: "SAVE_CLOSED_DAYS",
  APPLY_WORK_TIME_FROM_BREAK: "APPLY_WORK_TIME_FROM_BREAK",
  APPLY_TO_TIME_FROM_BREAK: "APPLY_TO_TIME_FROM_BREAK",
  SAVE_TIME_LINE: "SAVE_TIME_LINE",
  GET_TIME_LINE: "GET_TIME_LINE",
  RESULT_GET_TIME_LINE: "RESULT_GET_TIME_LINE",
  TEMPORARY_CLOSED: "TEMPORARY_CLOSED",
  GRID_DATA_SAVE: "GRID_DATA_SAVE"
};
export function initialize() {
  const init = {};
  return { type: actionTypes.INITIAL_STATE, init };
}
export function activityDatePeriod(value) {
  return { type: actionTypes.ACTIVITY_DATE_PERIOD, value };
}
export function temporaryClosedChange(value) {
  return { type: actionTypes.TEMPORARY_CLOSED, value }
}
export function getActivityPeriod(reject) {
  return { type: actionTypes.GET_ACTIVITY_PERIOD, reject };
}
export function workHourValue(value) {
  return { type: actionTypes.WORK_HOUR_VALUE, value };
}
export function saveWorkHourAction() {
  return { type: actionTypes.SAVE_WORK_HOUR };
}
export function getHourWork(resolve) {
  return { type: actionTypes.GET_HOUR_WORK, resolve };
}
export function updateActivityDatePeriod(value) {
  return { type: actionTypes.UPDATE_ACTIVITY_DATE_PERIOD, value };
}
export function updateWorkHourAction() {
  return { type: actionTypes.UPDATE_WORK_HOUR };
}
export function startDates(value) {
  return { type: actionTypes.START_DATES, value };
}
export function endDates(value) {
  return { type: actionTypes.END_DATES, value };
}
export function apllySameSchedule(check, from, to) {
  return { type: actionTypes.APPLY_SAME_SCHEDULE, check, from, to };
}
export function applyWorkTimeFrom(from) {
  return { type: actionTypes.APPLY_WORK_TIME_FROM, from };
}
export function applyWorkTimeTo(to) {
  return { type: actionTypes.APPLY_TO_TIME_FROM, to };
}
export function applyWorkTimeFromBreak(from_break) {
  return { type: actionTypes.APPLY_WORK_TIME_FROM_BREAK, from_break };
}
export function applyWorkTimeToBreak(to_break) {
  return { type: actionTypes.APPLY_TO_TIME_FROM_BREAK, to_break };
}
export function getZoneName() {
  return { type: actionTypes.GET_ZONE_NAME };
}
export function hasVipZone(value) {
  return { type: actionTypes.HAS_VIP_ZONE, value };
}
export function saveZoneAction(value) {
  return { type: actionTypes.SAVE_ZONE_NAME, value };
}
export function saveCount(value) {
  return { type: actionTypes.SAVE_COUNT, value };
}
export function getZone() {
  return { type: actionTypes.GET_ZONE };
}
export function changeValueZone(name, value) {
  return { type: actionTypes.CHANGE_VALUE_ZONE, name, value };
}
export function updateZoneAction(value) {
  return { type: actionTypes.UPDATE_ZONE, value };
}
export function saveClosedDay(businessId, days) {
  return { type: actionTypes.SAVE_CLOSED_DAYS, businessId, days };
}
export function saveTimeLine(timeArrs, businessId) {
  return { type: actionTypes.SAVE_TIME_LINE, timeArrs, businessId };
}
export function getTimeLineAction() {
  return { type: actionTypes.GET_TIME_LINE };
}
export function gridSaveDataAction(value) {
  return { type: actionTypes.GRID_DATA_SAVE, value };
}