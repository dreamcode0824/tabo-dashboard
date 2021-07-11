import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getFacilities, createFacility, deleteFacility, saveMoneySelect } from "../../../../redux/option/action"
const Facilities = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [facilities, setFacilities] = useState(
    [
      {
        id: 1,
        status: false,
        facility_id: 0
      },
      {
        id: 2,
        status: false,
        facility_id: 0
      },
      {
        id: 3,
        status: false,
        facility_id: 0
      },
      {
        id: 4,
        status: false,
        facility_id: 0
      },
      {
        id: 5,
        status: false,
        facility_id: 0
      },
      {
        id: 6,
        status: false,
        facility_id: 0
      },
      {
        id: 7,
        status: false,
        facility_id: 0
      },
      {
        id: 8,
        status: false,
        facility_id: 0
      },
      {
        id: 9,
        status: false,
        facility_id: 0
      },
      {
        id: 10,
        status: false,
        facility_id: 0
      },
    ]
  )
  useEffect(() => {
    dispatch(getFacilities())
  }, [business.filterBusinessList])
  useEffect(() => {
    if (option.facilities.length > 0) {
      let arr = [...facilities];
      arr.map((item, index) => {
        arr[index]["status"] = false;
      })
      arr.map((item, index) => {
        option.facilities.map((list, i) => {
          if (item.id === list.facility_id) {
            arr[index]["status"] = true;
            arr[index]["facility_id"] = list.id;
          }
        })
      })
      setFacilities(arr)
    }
  }, [option.facilities])
  const handleFacilities = (id, state, facilityId) => (event) => {
    if (state) {
      dispatch(deleteFacility(facilityId))
    } else {
      dispatch(createFacility(id))
    }
    console.log(id, state)
  }
  return (
    <React.Fragment>
      <Card className="card-user">
        <CardHeader className="px-4">
          <h5 className="title mb-0">{t("Facilities")}</h5>
        </CardHeader>
        <CardBody className="px-4">
          <Row>
            <Col xs={12} sm={12} md={12}>
              <p className="light-gray bold">{t("From the list bellow, select your beach facilities")}</p>
              <div className="d-flex justify-content-center flex-wrap">
                {facilities.map((item, index) => {
                  return (
                    <img src={`/Facilities/Facilities_${item.id}_${item.status ? "on" : "off"}.png`} key={index} className="circle-rounded m-3 cursor" width="60px" height="60px" onClick={handleFacilities(item.id, item.status, item.facility_id)} />
                  )
                })}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
const Facilities2 = () => {
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [optionStatus, setOptionStatus] = useState("");
  const [facilities, setFacilities] = useState(
    [
      {
        id: 1,
        status: false,
        facility_id: 0,
        hideStatus: true
      },
      {
        id: 2,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
      {
        id: 3,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
      {
        id: 4,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
      {
        id: 5,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
      {
        id: 6,
        status: false,
        facility_id: 0,
        hideStatus: true
      },
      {
        id: 7,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
      {
        id: 8,
        status: false,
        facility_id: 0,
        hideStatus: true
      },
      {
        id: 9,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
      {
        id: 10,
        status: false,
        facility_id: 0,
        hideStatus: false
      },
    ]
  )
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFacilities())
  }, [business.filterBusinessList])
  useEffect(() => {
    if (option.facilities.length > 0) {
      let arr = [...facilities];
      arr.map((item, index) => {
        arr[index]["status"] = false;
      })
      arr.map((item, index) => {
        option.facilities.map((list, i) => {
          if (item.id === list.facility_id) {
            arr[index]["status"] = true;
            arr[index]["facility_id"] = list.id;
          }
        })
      })
      setFacilities(arr)
    }
  }, [option.facilities])
  useEffect(() => {
    if (option.businessSettings.length > 0) {
      setOptionStatus(option.businessSettings[0].money_selected)
    } else {
      setOptionStatus("")
    }
  }, [option.businessSettings])
  const handleFacilities = (id, state, facilityId) => (event) => {
    if (state) {
      dispatch(deleteFacility(facilityId))
    } else {
      dispatch(createFacility(id))
    }
    console.log(id, state)
  }
  const handleOptionChange = (name) => (event) => {
    setOptionStatus(name)
    dispatch(saveMoneySelect(name))
  }
  return (
    <Card className="card-facilities">
      <CardHeader className="px-4">
        <h5 className="title mb-0">{t("Facilities")}</h5>
      </CardHeader>
      <CardBody className="px-4">
        <Row>
          <Col xs={12} sm={12} md={12}>
            <p className="light-gray bold">{t("From the list bellow, select your beach facilities")}</p>
            <div className="d-flex justify-content-center flex-wrap">
              {facilities.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.hideStatus && (
                      <img src={`/Facilities/Facilities_${item.id}_${item.status ? "on" : "off"}.png`} className="circle-rounded m-3 cursor" width="60px" height="60px" onClick={handleFacilities(item.id, item.status, item.facility_id)} />
                    )}
                  </React.Fragment>
                )
              })}
              <div className="pl-4">
                <div className="d-flex justify-content-center">
                  <div className="pl-4 pt-3">
                    <span className="fa fa-money-bill-alt money-icon"></span>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <FormGroup check className="form-check-radio">
                    <Label check>
                      <Input
                        checked={optionStatus == "cheap" ? true : false}
                        id="facilities21"
                        name="facilities2"
                        type="radio"
                        onChange={handleOptionChange("cheap")}
                      />
                      {t('Cheap')} <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio">
                    <Label check>
                      <Input
                        checked={optionStatus == "moderate" ? true : false}
                        id="facilities22"
                        name="facilities2"
                        type="radio"
                        onChange={handleOptionChange("moderate")}
                      />
                      {t('Moderate')} <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio">
                    <Label check>
                      <Input
                        checked={optionStatus == "expensive" ? true : false}
                        id="facilities23"
                        name="facilities2"
                        type="radio"
                        onChange={handleOptionChange("expensive")}
                      />
                      {t('Expensive')} <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export { Facilities2, Facilities };