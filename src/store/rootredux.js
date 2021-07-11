import { combineReducers } from "redux";
import * as business from "../redux/business/reducer";
import * as grid from "../redux/grid/reducer";
import * as element from "../redux/element/reducer";
import * as employee from "../redux/employee/reducer";
import * as option from "../redux/option/reducer";
import * as price from "../redux/price/reducer";
export default combineReducers({
  business: business.reducer,
  grid: grid.reducer,
  element: element.reducer,
  employee: employee.reducer,
  option: option.reducer,
  price: price.reducer,
});
