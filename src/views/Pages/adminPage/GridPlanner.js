import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Alert
} from "reactstrap";
import Datetime from 'react-datetime';
import PanelHeader from "../../../components/PanelHeader/PanelHeader"
import { useHistory } from "react-router-dom";
import GridComponent from "./GridComponent/GridComponent";
import CloseDayComponent from "./GridComponent/CloseDayComponent";
import IntervalReservation from "./GridComponent/IntervalReservation";
import { getExtraSunbedPhoto } from "../../../redux/option/action"
import Zone from "./GridComponent/Zone";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { getPrice, resetPeriod } from "../../../redux/price/action";
import {
  activityDatePeriod,
  getActivityPeriod,
  workHourValue,
  saveWorkHourAction,
  getHourWork,
  updateActivityDatePeriod,
  updateWorkHourAction,
  startDates,
  endDates,
  apllySameSchedule,
  applyWorkTimeFrom,
  applyWorkTimeTo,
  applyWorkTimeFromBreak,
  applyWorkTimeToBreak,
  saveTimeLine,
  getTimeLineAction,
  temporaryClosedChange,
  gridSaveDataAction
} from "../../../redux/grid/action"
import { getElements } from "../../../redux/element/action"
import moment from 'moment';
import { FormCheck } from "react-bootstrap";
const GridPlanner = () => {
  let history = useHistory();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const price = useSelector(({ price }) => price);
  const grid = useSelector(({ grid }) => grid);
  const option = useSelector(({ option }) => option);
  const element = useSelector(({ element }) => element);
  const [applyCheckState, setCheckApplyState] = useState(true)
  const [selectCheckState, setSelectCheckState] = useState(true)
  const [changeValueState, setChangeValueState] = useState(true)
  const [startDateValueStatus, setStartValueDateStatus] = useState(true)
  const [endDateValueStatus, setEndValueDateStatus] = useState(true)
  const [state3, setState3] = useState(true);
  const [lockButton, setLockButton] = useState(false)
  const [gridEndDateValue, setGridEndDateValue] = useState("")
  const [state4, setState4] = useState(true);
  const [dateValue, setDateValue] = useState([
    {
      id: 1,
      name: `${t("Monday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
    {
      id: 2,
      name: `${t("Tuesday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
    {
      id: 3,
      name: `${t("Wednesday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
    {
      id: 4,
      name: `${t("Thursday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
    {
      id: 5,
      name: `${t("Friday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
    {
      id: 6,
      name: `${t("Saturday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
    {
      id: 7,
      name: `${t("Sunday")}`,
      from: "",
      to: "",
      status: "Open",
      break_from: "",
      break_to: ""
    },
  ])
  const [timeLineArrs, setTimeLineArrs] = useState([]);
  const dispatch = useDispatch();
  const [activityDate, setActivityDate] = useState({ startDate: "", endDate: "", startValid: false, endValid: false, status: false })
  useEffect(() => {
    setLockButton(true)
    dispatch(getElements())
  }, [])
  useEffect(() => {
    setStartValueDateStatus(grid.startDate)
    setEndValueDateStatus(grid.endDate)
    dispatch(getActivityPeriod());
    dispatch(getTimeLineAction());
    return new Promise((resolve, reject) => {
      dispatch(getHourWork(resolve))
    }).then((data) => {
      if (data.length > 0) {
        setDateValue([
          {
            id: 1,
            name: `${t("Monday")}`,
            from: data[0].mon_start,
            to: data[0].mon_end,
            status: data[0].mon,
            break_from: data[0].mon_start_break,
            break_to: data[0].mon_end_break,
          },
          {
            id: 2,
            name: `${t("Tuesday")}`,
            from: data[0].tue_start,
            to: data[0].tue_end,
            status: data[0].tue,
            break_from: data[0].tue_start_break,
            break_to: data[0].tue_end_break,
          },
          {
            id: 3,
            name: `${t("Wednesday")}`,
            from: data[0].wed_start,
            to: data[0].wed_end,
            status: data[0].wed,
            break_from: data[0].wed_start_break,
            break_to: data[0].wed_end_break,
          },
          {
            id: 4,
            name: `${t("Thursday")}`,
            from: data[0].thu_start,
            to: data[0].thu_end,
            status: data[0].thu,
            break_from: data[0].thu_start_break,
            break_to: data[0].thu_end_break,
          },
          {
            id: 5,
            name: `${t("Friday")}`,
            from: data[0].fri_start,
            to: data[0].fri_end,
            status: data[0].fri,
            break_from: data[0].fri_start_break,
            break_to: data[0].fri_end_break,
          },
          {
            id: 6,
            name: `${t("Saturday")}`,
            from: data[0].sat_start,
            to: data[0].sat_end,
            status: data[0].sat,
            break_from: data[0].sat_start_break,
            break_to: data[0].sat_end_break,
          },
          {
            id: 7,
            name: `${t("Sunday")}`,
            from: data[0].sun_start,
            to: data[0].sun_end,
            status: data[0].sun,
            break_from: data[0].sun_start_break,
            break_to: data[0].sun_end_break,
          },
        ])
      } if (data.length == 0) {
        setDateValue([
          {
            id: 1,
            name: `${t("Monday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
          {
            id: 2,
            name: `${t("Tuesday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
          {
            id: 3,
            name: `${t("Wednesday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
          {
            id: 4,
            name: `${t("Thursday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
          {
            id: 5,
            name: `${t("Friday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
          {
            id: 6,
            name: `${t("Saturday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
          {
            id: 7,
            name: `${t("Sunday")}`,
            from: "",
            to: "",
            status: "Open",
            break_from: "",
            break_to: ""
          },
        ])
      }
    })
  }, [business.filterBusinessList.id])
  useEffect(() => {
    dispatch(getPrice())
    dispatch(getExtraSunbedPhoto())
  }, [])
  var currentTime = new Date().getTime()
  const [milidate, setMilidate] = useState(0)
  const [milidate1, setMilidate1] = useState(0)
  const [miliStart, setMiliStart] = useState(0)
  const [miliEnd, setMiliEnd] = useState(0)
  const [visible, setVisible] = useState(false)
  const [gridCheck, setGridCheck] = useState(false)
  const [temporaryClosed, setTemporaryClosed] = useState(option.businessSettings[0] ? option.businessSettings[0].id : 0)
  const onDismiss = () => {
    setVisible(!visible)
  }
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
  var futureDaty = moment().subtract(milidate - 1, 'day');
  var endValid = function (current) {
    return current.isAfter(futureDaty);
  };
  var valid = function (current) {
    return current.isAfter(yesterday);
  };
  const endDate = (date) => {
    setLockButton(false)
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
  const [message, setMessage] = useState("InValid Activity Period")
  const activityDateAction = (event) => {
    setLockButton(true)
    setState3(true)
    if (grid.getActivityPeriod.length > 0) {
      dispatch(updateActivityDatePeriod(activityDate))
      if (price.allPrice.length > 0) {
        const sortArray = price.allPrice.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
        const endDate = sortArray[sortArray.length - 1].end_date
        let endDateValue = new Date(grid.endDate).getTime();
        let currentEndDateValue = new Date(endDate).getTime();
        console.log(endDateValue, currentEndDateValue)
        if (endDateValue <= currentEndDateValue) {
          console.log("------------>sme1")
          dispatch(resetPeriod(false))
        } else {
          console.log("------------>sme1")
          dispatch(resetPeriod(true))
        }
      } else {
        console.log("------------>sme1")
        dispatch(resetPeriod(false))
      }
    } else {
      dispatch(activityDatePeriod(activityDate))
    }
    if (miliEnd > miliStart) {
      setState4(true)
      setVisible(false)
    } else {
      setVisible(true)
      setState4(false)
    }
  }
  const handleChange = (id, name, value) => {
    setChangeValueState(false)
    let arr = dateValue;
    arr.map((item, index) => {
      if (item.id == id) {
        if (name == "from") {
          arr[index].from = value;
        }
        if (name == "to") {
          arr[index].to = value;
        }
        if (name == "break_from") {
          arr[index].break_from = value;
        }
        if (name == "break_to") {
          arr[index].break_to = value;
        }
        if (name == "status") {
          if (value == "Open") {
            arr[index].status = value;
          } else {
            arr[index].status = value;
            arr[index].from = "";
            arr[index].to = "";
            arr[index].break_from = "";
            arr[index].break_to = "";
          }
        }
      }
    })
    setDateValue(arr)
    arr.map((item, index) => {
      if (item.status == "Open") {
        if (item.from.length == 0) {
          setChangeValueState(true)
          return;
        } else {
          if (item.to.length == 0) {
            setChangeValueState(true)
            return;
          } else {
            setChangeValueState(false)
          }
        }
      }
    })
    dispatch(workHourValue(arr))
  }
  const saveWorkHour = (event) => {
    setChangeValueState(true)
    setCheckApplyState(true)
    setSelectCheckState(true)
    let arr = [
      {
        id: 1,
        name: "Monday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
      {
        id: 2,
        name: "Tuesday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
      {
        id: 3,
        name: "Wednesday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
      {
        id: 4,
        name: "Thursday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
      {
        id: 5,
        name: "Friday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
      {
        id: 6,
        name: "Saturday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
      {
        id: 7,
        name: "Sunday",
        from: grid.from,
        to: grid.to,
        status: "Open",
        break_from: grid.from_break,
        break_to: grid.to_break
      },
    ]
    SaveGridData(dateValue);
    if (grid.weekHourData.length > 0) {
      if (option.businessSettings[0]) {
        getTimeLine(dateValue, option.businessSettings[0].booking_time_limit)
      }
      if (gridCheck) {
        setDateValue(arr)
        dispatch(workHourValue(arr))
        dispatch(updateWorkHourAction())
      } else {
        dispatch(workHourValue(dateValue))
        dispatch(updateWorkHourAction())
      }
    } else {
      if (gridCheck) {
        dispatch(workHourValue(arr))
        dispatch(saveWorkHourAction())
      } else {
        dispatch(workHourValue(dateValue))
        dispatch(saveWorkHourAction())
      }
    }
  }
  const SaveGridData = (arrs) => {
    let timeArrs = [];
    let totalArray = [];
    arrs.map((item, index) => {
      let timeArr = [];
      let arr = [];
      if (item.from) {
        arr = [item.from];
      }
      let arr1 = [];
      arr1 = getTimeLineArr(item, 15, timeArr)
      arr = [...arr, ...arr1];
      let time_index = 0;
      arr.map((list, index) => {
        if (index < arr.length - 1) {
          var startTime = moment(arr[index], "HH:mm");
          var endTime = moment(arr[index + 1], "HH:mm");
          var duration = moment.duration(endTime.diff(startTime)).asHours();
          if (duration != 0.25) {
            time_index = index + 1;
          }
        }
      })
      if (time_index != 0) {
        arr.splice(time_index, 0, item.break_from);
      }
      timeArrs.push({
        id: index,
        arrs: arr,
        name: item.name
      })
    })
    timeArrs.map((item, index) => {
      if (element.resultElements.length > 0) {
        let elementArr = [];
        element.resultElements.map((list, i) => {
          item.arrs.map((time, j) => {
            elementArr.push(`{ id: ${i}, index: "${list.id}_${time}", x: ${0 + 35 * i}, y: ${0 + 60 * j},status:false }`)
          })
        })
        totalArray.push(`{id: ${index},day: "${item.name}",grid_arr:[${elementArr.join('')}]}`)
      }
    })
    dispatch(gridSaveDataAction(totalArray));
    console.log(totalArray, ")))))))))))))))))))")
  }
  const getTimeLine = (value, limitTime) => {
    let timeArrs = [];
    value.map((item, index) => {
      let timeArr = [];
      let arr = [];
      if (item.from) {
        arr = [item.from];
      }
      let arr1 = [];
      arr1 = getTimeLineArr(item, limitTime, timeArr)
      arr = [...arr, ...arr1];
      let time_index = 0;
      arr.map((list, index) => {
        if (index < arr.length - 1) {
          var startTime = moment(arr[index], "HH:mm");
          var endTime = moment(arr[index + 1], "HH:mm");
          var duration = moment.duration(endTime.diff(startTime)).asHours();
          if (duration != 0.25) {
            time_index = index + 1;
            // console.log(duration, list, index, "duration")
          }
        }
      })
      if (time_index != 0) {
        arr.splice(time_index, 0, item.break_from);
      }
      timeArrs.push({
        id: index,
        arrs: arr,
        name: item.name
      })
    })
    setTimeLineArrs(timeArrs)
    dispatch(saveTimeLine(timeArrs, business.filterBusinessList.id))
  }
  const getTimeLineArr = (item, limitTime, timeArr) => {
    return repeatTime(item.from, item.to, limitTime, timeArr, item.break_from, item.break_to, 1);
  }
  const repeatTime = (from, to, limitTime, arr, break_from, break_to, status) => {
    let dataArr = [];
    dataArr = arr;
    if (status == 1) {
    }
    let output = moment(from, 'hh:mm').format('HH mm');
    let time = moment(output.split(' ')[0] + ':' + output.split(' ')[1], 'HH:mm');
    let updateTime = time.add(limitTime, 'm').format('HH mm');
    let beginningTime = moment(`${updateTime.split(' ')[0]}:${updateTime.split(' ')[1]}`, 'HH:mm');
    let endTime = moment(`${to}`, 'HH:mm');
    let start_BreakTime = moment(`${break_from}`, 'HH:mm');
    let end_BreakTime = moment(`${break_to}`, 'HH:mm');
    if (beginningTime.isBefore(endTime)) {
      if (beginningTime.isBefore(start_BreakTime)) {
        arr.push(`${updateTime.split(' ')[0]}:${updateTime.split(' ')[1]}`)
      } else {
        if (beginningTime.isBefore(end_BreakTime)) {
          // arr.push(break_from);
        } else {
          arr.push(`${updateTime.split(' ')[0]}:${updateTime.split(' ')[1]}`)
        }
      }
      repeatTime(`${updateTime.split(' ')[0]}:${updateTime.split(' ')[1]}`, to, limitTime, arr, break_from, break_to, 0)
      return arr;
    } else {
      return arr;
    }
  }
  const checkChange = (event) => {
    setGridCheck(event.target.checked)
    if (event.target.checked == true) {
      setCheckApplyState(false)
    } else {
      setCheckApplyState(true)
    }
    dispatch(apllySameSchedule(event.target.checked))
  }
  const applyWorkHourFrom = (date) => {
    let dateTime = date.format("HH:mm")
    dispatch(applyWorkTimeFrom(dateTime))
  }
  const onTemporaryClose = (event) => {
    setTemporaryClosed(event.target.checked)
    dispatch(temporaryClosedChange(event.target.checked))
  }
  const applyWorkHourTo = (date) => {
    let dateTime = date.format("HH:mm")
    dispatch(applyWorkTimeTo(dateTime))
  }
  const applyWorkHourFromBreak = (date) => {
    let dateTime = date.format("HH:mm")
    dispatch(applyWorkTimeFromBreak(dateTime))
  }
  const applyWorkHourToBreak = (date) => {
    let dateTime = date.format("HH:mm")
    dispatch(applyWorkTimeToBreak(dateTime))
  }
  const handleChangeCheck = (checkStatus, id) => {
    let arr = [...dateValue];
    arr.map((item, index) => {
      if (item.id == id && !checkStatus) {
        item.break_to = "";
        item.break_from = "";
      }
    })
    dispatch(workHourValue(arr))
    setDateValue(arr)
  }
  const saveIntervalAction = (count) => {
    if (option.businessSettings[0]) {
      getTimeLine(dateValue, count)
    }
  }
  return (
    <>
      <div style={{ position: "absolute", top: "50px", right: "50px" }}>
        <Alert
          color="info"
          className="alert-with-icon"
          style={{ zIndex: "200" }}
          isOpen={visible}
          toggle={onDismiss}
        >
          <span data-notify="icon" className="now-ui-icons ui-1_bell-53"></span>
          <span data-notify="message">{message}</span>
        </Alert>
      </div>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">{t("Activity Period")}</h5>
              </CardHeader>
              <CardBody className="px-4 edit_height">
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={8} className="mx-auto">
                        <Row>
                          <Col md={4} className="px-3">
                            <p className="mb-0 bold py-1">{t("From")}</p>
                            <Datetime
                              name="start"
                              value={grid.startDate}
                              timeFormat={false}
                              inputProps={{ placeholder: grid.startDate ? grid.startDate : `${t("Start Date")}` }}
                              isValidDate={valid}
                              onChange={startDate}
                              closeOnSelect
                            />
                          </Col>
                          <Col md={4} className="px-3 py-1">
                            <p className="mb-0 bold">{t("To")}</p>
                            {grid.status ? (
                              <Datetime
                                name="end"
                                closeOnTab={false}
                                isValidDate={endValid}
                                timeFormat={false}
                                onChange={endDate}
                                value={grid.endDate}
                                closeOnSelect
                                inputProps={{ placeholder: grid.endDate ? grid.endDate : `${t("End Date")}` }}
                              />
                            ) : (
                              <Input
                                type="text"
                                name="data"
                                placeholder={grid.endDate ? grid.endDate : `${t("End Date")}`}
                                disabled={true}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} className="px-0 py-2">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" checked={temporaryClosed} onChange={onTemporaryClose} />{' '}
                                {t("Temporary closed")}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            </FormGroup>
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
                          <Button onClick={activityDateAction} disabled={lockButton} color="success" className="btn-round">{t("Save")}</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">{t("Working Hours")}</h5>
              </CardHeader>
              <CardBody className="px-4">
                <Row>
                  <Col md={8} className="mx-auto">
                    <Row>
                      <Col md={8}>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" onChange={checkChange} value={grid.check} />{' '}
                            {t("Apply same schedule for all days")}
                            <span className="form-check-sign">
                              <span className="check"></span>
                            </span>
                          </Label>
                        </FormGroup>
                      </Col>
                      {((business.filterBusinessList.type == "restaurant" || business.filterBusinessList.type == "terrace") && !gridCheck) && (
                        <Col md={4} className="p-0">
                          <p className="mb-0 pt-2 font-weight-bold text-right" style={{ color: '#4207a2', textAlign: 'right' }}>{t('Break time')}</p>
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
                {gridCheck ? (
                  <Row>
                    <Col md={8} className="mx-auto">
                      <Row>
                        <Col md={3} className="px-3">
                          <p className="mb-0 bold py-1">{t("From")}</p>
                          <Datetime
                            dateFormat={false}
                            timeFormat={"HH:mm"}
                            inputProps={{ placeholder: grid.from ? grid.from : `${t("From")}` }}
                            onChange={applyWorkHourFrom}
                          // onFocus={applyWorkHourFromOpen}
                          />
                        </Col>
                        <Col md={3} className="px-3 py-1">
                          <p className="mb-0 bold">To</p>
                          <Datetime
                            dateFormat={false}
                            timeFormat={"HH:mm"}
                            inputProps={{ placeholder: grid.to ? grid.to : `${t("to")}` }}
                            onChange={applyWorkHourTo}
                          // onFocus={applyWorkHourToOpen}
                          />
                        </Col>
                        {(business.filterBusinessList.type == "restaurant" || business.filterBusinessList.type == "terrace") && (
                          <React.Fragment>
                            <Col md={3} className="px-3 py-1">
                              <p className="mb-0 bold">Break Time From</p>
                              <Datetime
                                dateFormat={false}
                                timeFormat={"HH:mm"}
                                inputProps={{ placeholder: grid.from_break ? grid.from_break : `${t("From")}` }}
                                onChange={applyWorkHourFromBreak}
                              // onFocus={applyWorkHourFromOpen}
                              />
                            </Col>
                            <Col md={3} className="px-3 py-1">
                              <p className="mb-0 bold">Break Time To</p>
                              <Datetime
                                dateFormat={false}
                                timeFormat={"HH:mm"}
                                inputProps={{ placeholder: grid.to_break ? grid.to_break : `${t("to")}` }}
                                onChange={applyWorkHourToBreak}
                              // onFocus={applyWorkHourToOpen}
                              />
                            </Col>
                          </React.Fragment>
                        )}
                      </Row>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md={11} className="mx-auto pt-3">
                      {dateValue.map((item, index) => {
                        return (
                          <GridComponent key={index} parentMethod={handleChange} props={item} type={business.filterBusinessList.type} changeCheck={handleChangeCheck} />
                        )
                      })}
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col md={8} className="mx-auto pt-3">
                    <Row>
                      <Col md={12} className="py-1">
                        <div className="d-flex justify-content-end">
                          <Button onClick={saveWorkHour} color="success">{t("Save")}</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Zone />
          </Col>
        </Row>
        {(business.filterBusinessList.type == "restaurant" || business.filterBusinessList.type == "terrace") && (
          <React.Fragment>
            <IntervalReservation
              businessId={business.filterBusinessList.id}
              saveIntervalReservation={saveIntervalAction}
            />
            <Row>
              <Col md="12" className="mx-auto">
                <Card className="card-user">
                  <CardHeader className="px-4">
                    <h5 className="title">{t("Closed days by calendar")}</h5>
                  </CardHeader>
                  <CloseDayComponent
                    businessId={business.filterBusinessList.id}
                  />
                </Card>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </div >
    </>
  )
}
export default GridPlanner;