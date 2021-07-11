import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Datetime from "react-datetime";
import PriceEveryDayComponent from './PriceEveryDayComponent'
import SweetAlert from "react-bootstrap-sweetalert";
import { savedStatus } from "../../../../redux/price/action"
import { useTranslation } from 'react-i18next';
import moment from 'moment';
const PriceRangeComponent = ({ item, currency, changePriceValue, changeDate, changeCheckEqual, changeEqualPrice, addNewPeriod, deletePeriod, rangeData, lastDate }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const grid = useSelector(({ grid }) => grid);
  const price = useSelector(({ price }) => price);
  const [componentId, setcomponentId] = useState("")
  const [startDateValue, setStartDateValue] = useState("")
  const [endDateValue, setEndDateValue] = useState("")
  const [sameStatus, setSameStatus] = useState(false)
  const [sameValue, setSameValue] = useState("")
  const [plusButton, setPlusButton] = useState(true);
  const [minusButton, setMinusButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false)
  useEffect(() => {
    console.log(item)
    setcomponentId(item.id)
    setStartDateValue(item.startDate)
    setEndDateValue(item.endDate)
    setSameStatus(item.equalPrice)
    setSameValue(item.equalValue)
  }, [item])
  useEffect(() => {
    setPlusButton(item.plusStatus)
  }, [item.plusStatus])
  useEffect(() => {
    setMinusButton(item.minusStatus)
  }, [item.minusStatus])
  useEffect(() => {
    setSameStatus(false)
    setSameValue("")
    changeEqualPrice("", item.id)
  }, [price.structureElement, price.elementType])
  const handleChangeCheck = (event) => {
    changeCheckEqual(event.target.checked, componentId)
    setSameStatus(!sameStatus)
  }
  const handleChangePriceValue = (name, value) => {
    changePriceValue(name, value, componentId)
  }
  const startDateValid = (current) => {
    return current.isAfter(grid.startDate) && current.isBefore(item.endDate);
  };
  const endDateValid = (current) => {
    let result = moment(grid.endDate).add(1, 'd').format('MM/DD/YYYY');
    return current.isAfter(startDateValue) && current.isBefore(result);
  }
  const samePriceValue = (event) => {
    dispatch(savedStatus(false))
    setSameValue(event.target.value)
    changeEqualPrice(event.target.value, componentId)
  }
  const startDate = (date) => {
    let rangeIndex;
    if (rangeData.length > 0) {
      rangeData.map((list, index) => {
        if (list.id == item.id) {
          rangeIndex = index;
        }
      })
    }
    if (rangeIndex > 0) {
      let endDateValue = new Date(rangeData[rangeIndex - 1].endDate).getTime();
      let currentDate = new Date(date.format("MM/DD/YYYY")).getTime();
      if (currentDate - endDateValue > 0) {
        setStartDateValue(date.format("MM/DD/YYYY"))
        changeDate(date.format("MM/DD/YYYY"), componentId, "start")
      } else {
        setAlertMessage(true)
      }
    }
  }
  const endDate = (date) => {
    let rangeIndex;
    if (rangeData.length > 0) {
      rangeData.map((list, index) => {
        if (list.id == item.id) {
          rangeIndex = index;
        }
      })
    }
    if (rangeIndex + 1 == rangeData.length) {
      setEndDateValue(date.format("MM/DD/YYYY"))
      changeDate(date.format("MM/DD/YYYY"), componentId, "end")
    } else {
      let startDateValue = new Date(rangeData[rangeIndex + 1].startDate).getTime();
      let currentDate = new Date(date.format("MM/DD/YYYY")).getTime();
      if (currentDate - startDateValue < 0) {
        setEndDateValue(date.format("MM/DD/YYYY"))
        changeDate(date.format("MM/DD/YYYY"), componentId, "end")
      } else {
        setAlertMessage(true)
      }
    }
  }
  const add = () => {
    console.log(componentId)
    addNewPeriod(componentId)
  }
  const deleteAction = () => {
    deletePeriod(componentId)
  }
  const hideAlert = () => {
    setAlertMessage(!alertMessage)
  }
  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col md={8} className="mx-auto">
          <Row>
            <Col md={4} className="px-3">
              <p className="mb-0 bold py-1">{t("Start at")}</p>
              <Datetime
                name="start"
                value={startDateValue}
                timeFormat={false}
                inputProps={{ placeholder: startDateValue ? startDateValue : "Start Date" }}
                isValidDate={startDateValid}
                onChange={startDate}
                closeOnSelect
              />
            </Col>
            <Col md={4} className="px-3 py-1">
              <p className="mb-0 bold py-1">{t("Ends_at")}</p>
              <Datetime
                name="end"
                value={endDateValue}
                closeOnTab={false}
                timeFormat={false}
                isValidDate={endDateValid}
                onChange={endDate}
                closeOnSelect
                inputProps={{ placeholder: endDateValue ? endDateValue : "End Date" }}
              />
            </Col>
            <Col md={3} className="px-3 pt-4">
              <div className="d-flex">
                {(grid.endDate != endDateValue && plusButton) && (
                  <Button color="info mx-2" onClick={add}>
                    <i className="now-ui-icons ui-1_simple-add" />
                  </Button>
                )}
                {minusButton && (
                  <Button color="danger" onClick={deleteAction}>
                    <i className="now-ui-icons ui-1_simple-delete" />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          <Row>
            <FormGroup check>
              <Label check className="same-price-every bold">
                <Input type="checkbox" checked={sameStatus} onChange={handleChangeCheck} />{' '}
                {t("Same price every day")}
                <span className="form-check-sign">
                  <span className="check"></span>
                </span>
              </Label>
            </FormGroup>
          </Row>
        </Col>
      </Row>
      {
        sameStatus ? (
          <div className="d-flex justify-content-center">
            <div className="px-3">
              <Input type="number" name="price" id="example" value={sameValue} placeholder="price..." onChange={samePriceValue} />
            </div>
            <div className="px-3">
              <p className="mb-0 bold pt-2 text-md-right">Euro</p>
            </div>
          </div>
        ) : (
            <Row>
              <Col md={8} className="mx-auto">
                {item.priceData.map((list, index) => {
                  return (
                    <PriceEveryDayComponent
                      key={index}
                      name={list.name}
                      valueData={list.price}
                      currency={currency}
                      priceValue={handleChangePriceValue}
                    />
                  )
                })}
              </Col>
            </Row>
          )
      }
      {alertMessage && (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={`${t("Please reconsider your date selection. Is coliding with next one")}`}
          onConfirm={hideAlert}
          onCancel={hideAlert}
          confirmBtnBsStyle="warning"
        >
        </SweetAlert>
      )}
    </React.Fragment>
  )
}
export default PriceRangeComponent