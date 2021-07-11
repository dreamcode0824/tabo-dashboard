export const actionTypes = {
  ACTIVITY_DATE_PERIOD: "ACTIVITY_DATE_PERIOD",
  GET_ALL_EMPLOYEES: "GET_ALL_EMPLOYEES",
  RESULT_GET_ALL_EMPLOYEES: "RESULT_GET_ALL_EMPLOYEES",
  CREATE_ACTION: "CREATE_ACTION",
  UPDATE_ACTION: 'UPDATE_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  EMPLOYEE_VALIDATION: "EMPLOYEE_VALIDATION"
};
export function initialize() {
  const init = {};
  return { type: actionTypes.INITIAL_STATE, init };
}
export function getEmployees() {
  return { type: actionTypes.GET_ALL_EMPLOYEES };
}
export function createAction(employeeData) {
  return { type: actionTypes.CREATE_ACTION, employeeData };
}
export function updateAction(employeeData) {
  return { type: actionTypes.UPDATE_ACTION, employeeData };
}
export function deleteActionRequest(id) {
  return { type: actionTypes.DELETE_ACTION, id };
}
export function employeeValidation(resolve, name, value) {
  return { type: actionTypes.EMPLOYEE_VALIDATION, resolve, name, value };
}