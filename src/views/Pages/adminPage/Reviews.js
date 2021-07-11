import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  FormText,
  Alert
} from "reactstrap";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import Datetime from 'react-datetime';
import moment from 'moment';
import { activityDatePeriod, getActivityPeriod, workHourValue, saveWorkHourAction, getHourWork, updateActivityDatePeriod, updateWorkHourAction, startDates, endDates, apllySameSchedule, applyWorkTimeFrom, applyWorkTimeTo } from "../../../redux/grid/action"
const Reviews = () => {
  const dispatch = useDispatch();
  const grid = useSelector(({ grid }) => grid);
  const [milidate, setMilidate] = useState(0);
  const [activityDate, setActivityDate] = useState({ startDate: "", endDate: "", startValid: false, endValid: false, status: false });
  const [startDateValueStatus, setStartValueDateStatus] = useState(true)
  const [state3, setState3] = useState(true);
  var futureDaty = moment().subtract(milidate - 1, 'day');
  var currentTime = new Date().getTime()
  var endValid = function (current) {
    return current.isAfter(futureDaty);
  };
  var valid = function (current) {
    return current.isAfter(yesterday);
  };
  var yesterday = moment().subtract(0, 'day');
  var endValue;
  const startDate = (date) => {
    endValue = date;
    setMiliStart(endValue._d.getTime())
    var a = Math.round((((currentTime - endValue._d.getTime())) / (24 * 3600 * 60)) / 16.7);
    setMilidate(a + 1)
    endValid(endValue);
    let dateFormat = date.format("MM/DD/YYYY")
    if (dateFormat == startDateValueStatus) {
      setState3(true)
    } else {
      setState3(false)
    }
    dispatch(startDates(date.format("MM/DD/YYYY")))
    setActivityDate({ ...activityDate, startDate: dateFormat, startValid: true, status: true })
  }
  const endDate = (date) => {
    setMiliEnd(date._d.getTime())
    let dateFormat = date.format("MM/DD/YYYY")
    if (dateFormat == endDateValueStatus) {
      setState4(true)
    } else {
      setState4(false)
    }
    dispatch(endDates(date.format("MM/DD/YYYY")))
    var a = Math.round((((currentTime - date._d.getTime())) / (24 * 3600 * 60)) / 16.7);
    setMilidate1(a + 1)
    setActivityDate({ ...activityDate, endDate: dateFormat, endValid: true })
  }
  const [milidate1, setMilidate1] = useState(0)
  const [miliStart, setMiliStart] = useState(0)
  const [miliEnd, setMiliEnd] = useState(0)
  const [endDateValueStatus, setEndValueDateStatus] = useState(true);
  const [state4, setState4] = useState(true)
  const activityDateAction = (event) => {
    setState3(true)
    if (miliEnd > miliStart) {
      if (grid.getActivityPeriod.length > 0) {
        dispatch(updateActivityDatePeriod(activityDate))
      } else {
        dispatch(activityDatePeriod(activityDate))
      }
      setState4(true)
    } else {
      setState4(false)
    }
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">Activity Period</h5>
              </CardHeader>
              <CardBody className="px-4">
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={8} className="mx-auto">
                        <Row>
                          <Col md={6} className="px-3">
                            <p className="mb-0 bold py-1">From</p>
                            <Datetime
                              name="start"
                              value={grid.startDate}
                              timeFormat={false}
                              inputProps={{ placeholder: grid.startDate ? grid.startDate : "Start Date" }}
                              isValidDate={valid}
                              onChange={startDate}
                              closeOnSelect
                            />
                          </Col>
                          <Col md={6} className="px-3 py-1">
                            <p className="mb-0 bold">To</p>
                            {grid.status ? (
                              <Datetime
                                name="end"
                                closeOnTab={false}
                                isValidDate={endValid}
                                timeFormat={false}
                                onChange={endDate}
                                value={grid.endDate}
                                closeOnSelect
                                inputProps={{ placeholder: grid.endDate ? grid.endDate : "End Date" }}
                              />
                            ) : (
                                <Input
                                  type="text"
                                  name="data"
                                  placeholder={grid.endDate ? grid.endDate : "End Date"}
                                  disabled={true}
                                />
                              )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={8} className="mx-auto">
                    <Row>
                      <Col md={12}>
                        <div className="d-flex justify-content-end">
                          <Button style={{ background: "#609" }} onClick={activityDateAction} disabled={state3 && state4} color="success">Save</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Reviews;