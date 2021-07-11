/*!

=========================================================
* Now UI Dashboard PRO React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { Alert } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPeriod, deleteAction, getPrice } from "../../redux/price/action"
const PanelHeader = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const price = useSelector(({ price }) => price);
  const grid = useSelector(({ grid }) => grid);
  const business = useSelector(({ business }) => business);
  const movingRouter = () => {
    // dispatch(deleteAction())
    // dispatch(getPrice())
    // dispatch(resetPeriod(false))
    history.push("/admin/price")
  }
  return (
    <React.Fragment>
      <div
        className={
          "panel-header " +
          (props.size !== undefined
            ? "panel-header-" + props.size
            : "")
        }
      >
        {props.content}
      </div>
      {price.resetPeriodStatus && (
        <Alert color="danger" className="text-center reset-period cursor" onClick={movingRouter}>
          You have unset prices for some periods. Please define them
        </Alert>
      )
      }
    </React.Fragment >
  );
}

PanelHeader.defaultProps = {
  size: undefined,
  content: null,
};

PanelHeader.propTypes = {
  // size of the panel header
  size: PropTypes.oneOf(["sm", "lg", undefined]),
  // content
  content: PropTypes.node,
};

export default PanelHeader;
