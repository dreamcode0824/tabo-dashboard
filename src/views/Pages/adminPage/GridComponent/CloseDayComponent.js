import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar-multiday';
import {
  CardBody,
  Button,
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { saveClosedDay } from "../../../../redux/grid/action";
const CloseDayComponent = ({ businessId }) => {
  const dispatch = useDispatch();
  const grid = useSelector(({ grid }) => grid);
  useEffect(() => {
    if (grid.getActivityPeriod.length > 0) {
      let data = grid.getActivityPeriod[0].closed_days;
      if (data.length > 0) {
        let arr = [];
        data.map((item, index) => {
          arr.push(item.closed_day)
        })
        setDays(arr)
      }
    } else {
      setDays([])
    }
  }, [grid.getActivityPeriod])
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const reactToChange = (ob) => {
    console.log(ob.selected, typeof ob.selected)
    if (ob.selected.length > 0) {
      let arr = [];
      ob.selected.map((item, index) => {
        console.log(item)
        arr.push(item)
      })
      setDays(arr)
    } else {
      setDays([])
    }
  }
  const closedDayAction = () => {
    dispatch(saveClosedDay(businessId, days))
  }
  return (
    <CardBody className="px-4">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-start flex-wrap">
            {days.length > 0 && days.map((item, index) => {
              return (
                <div key={index} className="top-calendar">
                  <p>{item.split('T')[0]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mx-auto py-5">
          <div>
            <div>
              <Calendar
                isMultiple={true}
                selected={days}
                onChange={reactToChange}
              />
            </div>
          </div>
        </div>
      </div>
      {days.length > 0 && (
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-end">
              <Button
                style={{ background: "#609" }}
                onClick={closedDayAction}
                // disabled={lockButton}
                color="success">
                {t("Save")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </CardBody>
  )
}
export default CloseDayComponent;