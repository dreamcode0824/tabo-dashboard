import { put, all, call, takeLatest, delay, select } from "redux-saga/effects";
import { actionTypes, updateAction } from "./action";
import API from './api';
const api = new API();

///////////////////
const getAllEmployeesRequest = (business) => {
  return api.getAllEmployeesRequests(business)
}
function* getAllEmployees() {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(getAllEmployeesRequest, business)
    if (result.data) {
      yield put({
        type: actionTypes.RESULT_GET_ALL_EMPLOYEES,
        value: result.data.business_user,
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const createActionsRequest = (employeeData, business) => {
  return api.createActionsRequests(employeeData, business)
}
function* createActions({ employeeData }) {
  try {
    const business = yield select((store) => store.business);
    const result = yield call(createActionsRequest, employeeData, business)
    if (result.data) {
      if (result.data.business_userCreate) {
        const result = yield call(getAllEmployeesRequest, business)
        if (result.data) {
          yield put({
            type: actionTypes.RESULT_GET_ALL_EMPLOYEES,
            value: result.data.business_user,
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const updateActionsRequest = (employeeData) => {
  return api.updateActionsRequests(employeeData)
}
function* updateActions({ employeeData }) {
  try {
    const result = yield call(updateActionsRequest, employeeData)
    if (result.data) {
      if (result.data.business_userUpdate) {
        const business = yield select((store) => store.business);
        const result = yield call(getAllEmployeesRequest, business)
        if (result.data) {
          yield put({
            type: actionTypes.RESULT_GET_ALL_EMPLOYEES,
            value: result.data.business_user,
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const deleteActionsRequest = (id) => {
  return api.deleteActionsRequests(id)
}
function* deleteActions({ id }) {
  try {
    const result = yield call(deleteActionsRequest, id)
    if (result.data) {
      if (result.data.business_userDelete) {
        const business = yield select((store) => store.business);
        const result = yield call(getAllEmployeesRequest, business)
        if (result.data) {
          yield put({
            type: actionTypes.RESULT_GET_ALL_EMPLOYEES,
            value: result.data.business_user,
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
const employeeNameValidationActionRequest = (name, value) => {
  return api.employeeNameValidationActionRequests(name, value)
}
const employeeCodeValidationActionRequest = (name, value) => {
  return api.employeeCodeValidationActionRequests(name, value)
}
function* employeeValidationAction({ resolve, name, value }) {
  try {
    if (name == "name") {
      const result = yield call(employeeNameValidationActionRequest, name, value)
      if (result.data) {
        resolve(result.data)
      }
    } else {
      const result = yield call(employeeCodeValidationActionRequest, name, value)
      if (result.data) {
        resolve(result.data)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_ALL_EMPLOYEES, getAllEmployees),
    takeLatest(actionTypes.CREATE_ACTION, createActions),
    takeLatest(actionTypes.UPDATE_ACTION, updateActions),
    takeLatest(actionTypes.DELETE_ACTION, deleteActions),
    takeLatest(actionTypes.EMPLOYEE_VALIDATION, employeeValidationAction),
  ]);
}
