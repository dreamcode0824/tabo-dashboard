import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import PriceRangeComponent from './PriceRangeComponent'
import { createPricePlan, savedStatus, isData, modalAction, getPrice, cancelActions, elementTypesAction, currentZoneName, resetPeriod } from '../../../../redux/price/action'
import { save } from "react-cookies";
const PriceDayComponenet = ({ startDate, endDate, currency, filterData, cancelActionss, agreeActionss, savePricePlanAction }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const grid = useSelector(({ grid }) => grid);
  const price = useSelector(({ price }) => price);
  const [range, setRange] = useState([])
  const [count, setCount] = useState(1)
  const [lockStatus, setLockStatus] = useState(false)
  const [redAlertStatus, setRedAlertStatus] = useState(false)
  const [resetStatus, setResetStatus] = useState(false)
  const allowPlusButton = (allPriceData, priceEndData) => {
    const sortArray = allPriceData.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
    const endDate = sortArray[sortArray.length - 1].end_date
    let endDateValue = new Date(endDate).getTime();
    let currentEndDateValue = new Date(priceEndData).getTime();
    if (endDateValue <= currentEndDateValue) {
      setRedAlertStatus(true)
      return true;
    }
    setRedAlertStatus(false)
    return false;
  }
  useEffect(() => {
    if (price.allPrice.length > 0) {
      if (filterData.length > 0) {
        const allowStauts = allowPlusButton(filterData, grid.endDate)
        dispatch(isData(true))
        let arrs = [];
        arrs = filterData.filter(ele => ele.type == price.elementType)
        let rangeDatas = [];
        arrs.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        arrs.map((item, index) => {
          let arr = [];
          let repeatPriceArr = [];
          arr.push({ id: 1, name: "monday", price: `${item.price.monday}` });
          arr.push({ id: 2, name: "tuesday", price: `${item.price.tuesday}` });
          arr.push({ id: 3, name: "wednesday", price: `${item.price.wednesday}` });
          arr.push({ id: 4, name: "thursday", price: `${item.price.thursday}` });
          arr.push({ id: 5, name: "friday", price: `${item.price.friday}` });
          arr.push({ id: 6, name: "saturday", price: `${item.price.saturday}` });
          arr.push({ id: 6, name: "sunday", price: `${item.price.sunday}` });

          repeatPriceArr.push({ id: 1, name: "monday", price: `${item.price.monday}` });
          repeatPriceArr.push({ id: 2, name: "tuesday", price: `${item.price.tuesday}` });
          repeatPriceArr.push({ id: 3, name: "wednesday", price: `${item.price.wednesday}` });
          repeatPriceArr.push({ id: 4, name: "thursday", price: `${item.price.thursday}` });
          repeatPriceArr.push({ id: 5, name: "friday", price: `${item.price.friday}` });
          repeatPriceArr.push({ id: 6, name: "saturday", price: `${item.price.saturday}` });
          repeatPriceArr.push({ id: 6, name: "sunday", price: `${item.price.sunday}` });
          repeatPriceArr.pop();
          const resultStatus = repeatPriceArr.some(ele => ele.price == item.price.sunday);
          console.log(resultStatus, "---------->")
          rangeDatas.push(
            {
              id: item.id,
              startDate: item.start_date,
              endDate: item.end_date,
              minusStatus: false,
              plusStatus: ((arrs.length - 1) == index) && allowStauts ? true : false,
              equalPrice: resultStatus,
              equalValue: resultStatus ? item.price.sunday : "",
              priceData: arr,
            }
          )
          arr = [];
        })
        setRange(rangeDatas)
      } else {
        const allowStauts = allowPlusButton(price.allPrice, grid.endDate)
        dispatch(isData(false))
        console.log("price----------akk---------------sf")
        let arr = [];
        arr = price.allPrice
        arr.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        let a = null;
        let data = [];
        let rangeDatas = [];
        arr.map((item, index) => {
          if (item.start_date !== a) {
            a = item.start_date
            data.push(item)
          }
        })
        data.map((item, index) => {
          let arr = [];
          arr.push({ id: 1, name: "monday", price: "" });
          arr.push({ id: 2, name: "tuesday", price: "" });
          arr.push({ id: 3, name: "wednesday", price: "" });
          arr.push({ id: 4, name: "thursday", price: "" });
          arr.push({ id: 5, name: "friday", price: "" });
          arr.push({ id: 6, name: "saturday", price: "" });
          arr.push({ id: 6, name: "sunday", price: "" });
          rangeDatas.push(
            {
              id: item.id,
              startDate: item.start_date,
              endDate: item.end_date,
              minusStatus: false,
              plusStatus: ((data.length - 1) == index) && allowStauts ? true : false,
              equalPrice: false,
              equalValue: "",
              priceData: arr,
            }
          )
          arr = [];
        })
        setRange(rangeDatas)
      }
    } else {
      setRange([
        {
          id: `i${count}`,
          startDate: grid.startDate,
          endDate: grid.endDate,
          plusStatus: true,
          minusStatus: false,
          equalPrice: false,
          equalValue: "",
          priceData: [
            {
              id: 1,
              name: "monday",
              price: ""
            },
            {
              id: 2,
              name: "tuesday",
              price: ""
            },
            {
              id: 3,
              name: "wednesday",
              price: ""
            },
            {
              id: 4,
              name: "thursday",
              price: ""
            },
            {
              id: 5,
              name: "friday",
              price: ""
            },
            {
              id: 6,
              name: "saturday",
              price: ""
            },
            {
              id: 7,
              name: "sunday",
              price: ""
            }
          ]
        }
      ])
      console.log("=====================")
    }
  }, [grid.startDate, grid.endDate, filterData])
  const nextDate = (dateValue) => {
    let date = new Date(dateValue).getTime() + 1000 * 3600 * 24;
    let result1 = new Date(date).getDate();
    let result2 = new Date(date).getMonth() + 1;
    let result3 = new Date(date).getFullYear();
    return `${result2 > 9 ? result2 : `0${result2}`}` + '/' + `${result1 > 9 ? result1 : `0${result1}`}` + "/" + `${result3}`;
  }
  const previousDate = (dateValue) => {
    // let result = moment(dateValue).add(1, 'd').format('MM/DD/YYYY');
    let date = new Date(dateValue).getTime() - 1000 * 3600 * 24;
    let result1 = new Date(date).getDate();
    let result2 = new Date(date).getMonth() + 1;
    let result3 = new Date(date).getFullYear();
    return `${result2 > 9 ? result2 : `0${result2}`}` + '/' + `${result1 > 9 ? result1 : `0${result1}`}` + "/" + `${result3}`;
  }
  const addPeriod = (componentId) => {
    if (redAlertStatus) {
      setResetStatus(true)
    }
    console.log(componentId)
    let rangeIndex = range[range.length - 1];
    setCount(count + 1)
    let dateValue = range[range.length - 1].endDate;
    const dates = nextDate(dateValue);
    let arr = [...range];
    arr[arr.length - 1]["plusStatus"] = false;
    setLockStatus(false)
    if (componentId == range[range.length - 1].id) {
      setRange(
        [...arr,
        {
          id: `i${count + 1}`,
          startDate: dates,
          endDate: grid.endDate,
          equalPrice: false,
          equalValue: "",
          plusStatus: true,
          minusStatus: false,
          priceData: [
            {
              id: 1,
              name: "monday",
              price: ""
            },
            {
              id: 2,
              name: "tuesday",
              price: ""
            },
            {
              id: 3,
              name: "wednesday",
              price: ""
            },
            {
              id: 4,
              name: "thursday",
              price: ""
            },
            {
              id: 5,
              name: "friday",
              price: ""
            },
            {
              id: 6,
              name: "saturday",
              price: ""
            },
            {
              id: 7,
              name: "sunday",
              price: ""
            }
          ]
        }
        ])
    } else {
      range.map((list, index) => {
        if (list.id === componentId) {
          rangeIndex = index;
        }
      })
      let arrs = [...range];
      arrs[rangeIndex]["plusStatus"] = false;
      setLockStatus(false);
      let nextDates = nextDate(arr[rangeIndex].endDate)
      let previousDates = previousDate(arr[rangeIndex + 1].startDate)
      arrs.splice(rangeIndex + 1, 0, {
        id: `i${count + 1}`,
        startDate: nextDates,
        endDate: previousDates,
        equalPrice: false,
        equalValue: "",
        plusStatus: false,
        minusStatus: true,
        priceData: [
          {
            id: 1,
            name: "monday",
            price: ""
          },
          {
            id: 2,
            name: "tuesday",
            price: ""
          },
          {
            id: 3,
            name: "wednesday",
            price: ""
          },
          {
            id: 4,
            name: "thursday",
            price: ""
          },
          {
            id: 5,
            name: "friday",
            price: ""
          },
          {
            id: 6,
            name: "saturday",
            price: ""
          },
          {
            id: 7,
            name: "sunday",
            price: ""
          }
        ]
      });
      setRange(arrs)
    }
  }
  const changePriceHandle = (name, value, id) => {
    let arr = [...range];
    arr.map((list) => {
      if (list.id === id) {
        list.priceData.map((listData) => {
          if (listData.name === name) {
            listData.price = value;
          }
        })
      }
    })
    setRange(arr)
  }
  const changeDateHandle = (date, id, type) => {
    let arr = [...range];
    arr.map((list, index) => {
      if (list.id === id) {
        if (type === "start") {
          let endDateValue = new Date(arr[index - 1].endDate).getTime();
          let currentDate = new Date(date).getTime();
          if ((currentDate - endDateValue) > 1000 * 3600 * 24) {
            arr[index - 1]["plusStatus"] = true;
            setLockStatus(true)
            arr[index]["startDate"] = date;
          } else {
            arr[index - 1]["plusStatus"] = false;
            setLockStatus(false)
            // arr[index]["startDate"] = date;
          }
          console.log(arr[arr.length - 2].endDate)
          list.startDate = date;
        }
        if (type === "end") {
          let endDateValue = new Date(arr[index].endDate).getTime();
          let currentDate = new Date(date).getTime();
          if ((currentDate - endDateValue) > 1000 * 3600 * 24) {
            arr[index]["endDate"] = date;
            arr[index]["plusStatus"] = true;
            setLockStatus(true)
          } else {
            arr[index]["endDate"] = date;
            arr[index]["plusStatus"] = true;
            setLockStatus(true)
          }
          list.endDate = date;
        }
      }
    })
    setRange(arr)
  }
  const changeCheckEqualHandle = (status, id) => {
    let arr = [...range];
    arr.map((list) => {
      if (list.id === id) {
        list.equalPrice = status;
      }
    })
    setRange(arr)
  }
  const changeEqualPriceHandle = (value, id) => {
    let arr = [...range];
    arr.map((list) => {
      if (list.id === id) {
        list.equalValue = value;
        list.priceData[0]["price"] = value;
        list.priceData[1]["price"] = value;
        list.priceData[2]["price"] = value;
        list.priceData[3]["price"] = value;
        list.priceData[4]["price"] = value;
        list.priceData[5]["price"] = value;
        list.priceData[6]["price"] = value;
      }
    })
    setRange(arr)
  }
  const savePricePlan = () => {
    savePricePlanAction(range)
    if (resetStatus) {
      dispatch(resetPeriod(false))
    }
  }
  const deletePeriodHandle = (id) => {
    let arr = [...range];
    arr.map((item, index) => {
      if (item.id == id) {
        arr[index - 1]["plusStatus"] = true;
        setLockStatus(true)
      }
    })
    const result = arr.filter(ele => ele.id != id);
    setRange(result);
  }
  const toggleModalDemo = () => {
    dispatch(modalAction(!price.modalStatus))
  }
  const agreeAction = () => {
    if (resetStatus) {
      dispatch(resetPeriod(false))
    }
    agreeActionss(range)
    // dispatch(agreeActions(true))
  }
  const cancelAction = () => {
    cancelActionss();
    // dispatch(cancelActions(false))
  }
  return (
    <React.Fragment>
      {(price.isBed || price.isSunbed) && (
        <p className="light-gray bold my-3">{`${t("Your season start at")} ${startDate}${t("Ends at")} ${endDate} ${t("set_period")}`}</p>
      )}
      <Row>
        <Col md={12}>
          {(price.isBed || price.isSunbed) ? (
            <React.Fragment>
              {range && range.map((item, index) => {
                return (
                  <PriceRangeComponent
                    key={index}
                    item={item}
                    lastDate={index > 0 ? range[index - 1].endDate : grid.endDate}
                    changePriceValue={changePriceHandle}
                    changeDate={changeDateHandle}
                    changeCheckEqual={changeCheckEqualHandle}
                    changeEqualPrice={changeEqualPriceHandle}
                    addNewPeriod={addPeriod}
                    deletePeriod={deletePeriodHandle}
                    currency={currency}
                    rangeData={range}
                  />
                )
              })}
              <Row>
                <Col md={8} className="mx-auto">
                  <div className="d-flex justify-content-end">
                    <Button color="success" onClick={savePricePlan}>{t("Save")}</Button>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
              <Alert color="danger">
                {t("This section empty because you didnt associate the elements from grid with it.")}
              </Alert>
            )}
        </Col>
      </Row>
      <Modal isOpen={price.modalStatus} toggle={toggleModalDemo}>
        <ModalBody>
          <h5 className="title text-center">
            {t("Do you like to save")}
          </h5>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={agreeAction}>
            {t("Yes")}
          </Button>
          <Button color="danger" onClick={cancelAction}>
            {t("No")}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment >
  )
}
export default PriceDayComponenet
