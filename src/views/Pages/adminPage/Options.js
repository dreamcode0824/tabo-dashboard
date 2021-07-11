import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import PanelHeader from "../../../components/PanelHeader/PanelHeader"
import PhotoExtraSunbed from "./OptionComponent/PhotoExtraSunbed"
import BeachLocation from "./OptionComponent/BeachLocation"
import { Facilities, Facilities2 } from "./OptionComponent/Facilities"
import BeachPhotos from "./OptionComponent/BeachPhotos"
import Reservations from "./OptionComponent/Reservations"
import EstimatedTime from "./OptionComponent/EstimatedTime"
import Rules from "./OptionComponent/Rules"
import { useDispatch, useSelector } from "react-redux";
const Options = () => {
  const business = useSelector(({ business }) => business);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            {(business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") ? (
              <></>
            ) : (
              <React.Fragment>
                <Reservations />
                <EstimatedTime />
              </React.Fragment>
            )}
            <PhotoExtraSunbed />
            <BeachLocation />
            <BeachPhotos />
            <Rules />
            {(business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") ? (
              <Facilities />
            ) : (
              <Facilities2 />
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Options;