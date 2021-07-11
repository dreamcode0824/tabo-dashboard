import { all } from "redux-saga/effects";
import business from "../redux/business/saga";
import grid from "../redux/grid/saga";
import element from "../redux/element/saga";
import employee from "../redux/employee/saga";
import option from "../redux/option/saga";
import price from "../redux/price/saga";
export default function* rootSaga() {
  yield all([
    business(),
    grid(),
    element(),
    employee(),
    option(),
    price(),
  ]);
}
