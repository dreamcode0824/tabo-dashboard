import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import Datetime from 'react-datetime';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
const GridComponent = (props) => {
  const { t } = useTranslation();
  const [data, setData] = useState({ selectData: "Open", from: "", to: "", break_from: "", break_to: "" })
  const [checkStatus, setCheckStatus] = useState(false);
  useEffect(() => {
    if (props.props.break_from && props.props.break_to) {
      setCheckStatus(true)
    } else {
      setCheckStatus(false)
    }
    setData({
      ...data,
      selectData: props.props.status,
      from: props.props.from,
      to: props.props.to,
      break_from: props.props.break_from,
      break_to: props.props.break_to
    })
  }, [props.props])
  const statusSelect = (event) => {
    if (event.target.value == "Open") {
      setData({ ...data, selectData: "Open" })
      props.parentMethod(props.props.id, "status", event.target.value);
    } else {
      setData({ ...data, selectData: "Close" })
      props.parentMethod(props.props.id, "status", event.target.value);
    }
  }
  const checkChange = (event) => {
    props.changeCheck(event.target.checked, props.props.id)
    setCheckStatus(event.target.checked)
  }
  const handleChangeFrom = (date) => {
    let dateTime = date.format("HH:mm")
    let value = dateTime;
    setData({ ...data, from: value })
    props.parentMethod(props.props.id, "from", value);
  }
  const handleChangeTo = (date) => {
    let dateTime = date.format("HH:mm")
    let value = dateTime;
    setData({ ...data, to: value })
    props.parentMethod(props.props.id, "to", value);
  }
  const handleChangeFromBreak = (date) => {
    let dateTime = date.format("HH:mm")
    let value = dateTime;
    console.log(data, "(((((((((((")
    if (moment(`${data.from}`, 'HH:mm').isBefore(moment(`${value}`, 'HH:mm'))) {
      setData({ ...data, break_from: value })
      props.parentMethod(props.props.id, "break_from", value);
    }
  }
  const handleChangeToBreak = (date) => {
    let dateTime = date.format("HH:mm")
    let value = dateTime;
    if (moment(`${data.to}`, 'HH:mm').isBefore(moment(`${value}`, 'HH:mm'))) {

    } else {
      setData({ ...data, break_to: value })
      props.parentMethod(props.props.id, "break_to", value);
    }
  }
  const handleFocuseFromBreak = () => {
    if (!data.break_from) {
      setData({ ...data, break_from: "00:00" })
    }
  }
  const handleFocuseToBreak = () => {
    if (!data.break_to) {
      setData({ ...data, break_to: "00:00" })
    }
  }
  return (
    <Row className="">
      <Col md={1} className="pt-3">
        <p className="bold" style={{ marginTop: "14%",whiteSpace:'nowrap' }}>{props.props.name}</p>
      </Col>
      <Col className="bold" md={2} className="pt-3">
        <Input type="select" name="select" value={data.selectData} onChange={statusSelect} id="exampleSelect1">
          <option value="Open">{t("Open")}</option>
          <option value="Close">{t("Close")}</option>
        </Input>
      </Col>
      <Col className="bold" md={2} className="pt-3">
        {data.selectData == "Open" && (
          <Datetime
            dateFormat={false}
            value={data.from}
            timeFormat={"HH:mm"}
            inputProps={{ placeholder: data.from ? data.from : `${t("From")}` }}
            onChange={handleChangeFrom}
          />
        )}
      </Col>
      <Col className="bold" md={2} className="pt-3">
        {data.selectData == "Open" && (
          <Datetime
            dateFormat={false}
            value={data.to}
            onChange={handleChangeTo}
            timeFormat={"HH:mm"}
            inputProps={{ placeholder: data.to ? data.to : `${t("To")}` }}
          />
        )}
      </Col>
      {(props.type == "restaurant" || props.type == "terrace") && (
        <React.Fragment>
          <Col className="bold" md={2} className="pt-3">
            {(data.selectData == "Open" && checkStatus) && (
              <Datetime
                dateFormat={false}
                value={data.break_from}
                inputProps={{ placeholder: data.break_from ? data.break_from : `${t("From")}` }}
                onChange={handleChangeFromBreak}
                timeFormat={"HH:mm"}
                onFocus={handleFocuseFromBreak}
              />
            )}
          </Col>
          <Col className="bold" md={2} className="pt-3">
            {(data.selectData == "Open" && checkStatus) && (
              <Datetime
                dateFormat={false}
                value={data.break_to}
                onChange={handleChangeToBreak}
                onFocus={handleFocuseToBreak}
                inputProps={{ placeholder: data.break_to ? data.break_to : `${t("To")}` }}
                timeFormat={"HH:mm"}
              />
            )}
          </Col>
          <Col md={1}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox"
                  onChange={checkChange}
                  checked={checkStatus}
                />{' '}
                {/* {t("Apply same schedule for all days")} */}
                <span className="form-check-sign">
                  <span className="check"></span>
                </span>
              </Label>
            </FormGroup>
          </Col>
        </React.Fragment>
      )}
    </Row>
  )
}
export default GridComponent;