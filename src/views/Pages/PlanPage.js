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

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { savePlanAction, cuoponCodeValid, getPlanInformation, getPlanData } from "../../redux/business/action";
const PlanPage = () => {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const [businessValue, setBusinessValue] = useState([])
  const [priceValue, setPriceValue] = useState({ beachPoolPrice: 39, restaurantTerracePrice: 9, currentPrice: "", totalPrice: "" })//where u have the 0 value declared for plan 2?
  const [value, setValue] = useState({ plan: "", codeValue: "", printDirectly: false })
  const [couponValid, setCouponValid] = useState({ status: false, message: "" })
  const [planValid, setPlanValid] = useState({ status: false, message: "" })
  const [plan2Value, setPlan2Value] = useState(9)
  const [plan2ValueOther, setPlan2ValueOther] = useState(4)
  const [changeData, setChangeData] = useState({ plan: "", codeValue: "", printDirectly: false })
  const [lockButton, setLockButton] = useState(true)
  useEffect(() => {
    dispatch(getPlanInformation(business.filterBusinessList.id))
    if (business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") {
      setPriceValue({ ...priceValue, currentPrice: priceValue.beachPoolPrice })
    } else {
      setPriceValue({ ...priceValue, currentPrice: priceValue.restaurantTerracePrice })
    }

    setBusinessValue(business.filterBusinessList)
    return new Promise((resolve, reject) => {
      dispatch(getPlanData(business.filterBusinessList.id, resolve, reject))
    }).then((success) => {

    }).catch(errors => {
      if (errors.plan_changes.length > 0) {
        let len = (errors.plan_changes.length) - 1;
        setChangeData({ plan: errors.plan_changes[len].plan_config.type, printDirectly: errors.plan_changes[len].plan_config.allow_print, codeValue: "" })
        setValue({ plan: errors.plan_changes[len].plan_config.type, printDirectly: errors.plan_changes[len].plan_config.allow_print, codeValue: "" })
      } else {
        setChangeData({ plan: "", codeValue: "", printDirectly: false })
        setValue({ plan: "", codeValue: "", printDirectly: false })
      }
    });
  }, [business.filterBusinessList])
  const { t, i18n } = useTranslation();
  const [couponValues, setCouponValues] = useState([])
  const [applyStatus, setApplyStatus] = useState(false)
  const totalPrice = (data, planValueData) => {
    let percentArray = [];
    let tempPriceValue;
    let totalPriceValue;
    if (data.length > 0) {
      data.map((item) => {
        percentArray.push(Number(item.value))
      })
      tempPriceValue = Math.max(...percentArray);
      if (tempPriceValue == 100) {
        if (business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") {
          totalPriceValue = 0
        } else {
          totalPriceValue = 0
        }
      } else {
        if (business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") {
          if (value.plan == "plan1") {
            totalPriceValue = Math.round((priceValue.currentPrice - (priceValue.currentPrice * (tempPriceValue / 100))) * 100) / 100
          } else (
            totalPriceValue = Math.round((plan2Value - (plan2Value * (tempPriceValue / 100))) * 100) / 100
          )
        } else {
          if (value.plan == "plan1") {
            totalPriceValue = Math.round((priceValue.currentPrice - (priceValue.currentPrice * (tempPriceValue / 100))) * 100) / 100
          } else {
            totalPriceValue = Math.round((plan2ValueOther - (plan2ValueOther * (tempPriceValue / 100))) * 100) / 100
          }
        }
      }
    } else {
      if (planValueData == "plan2") {
        if (business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") {
          totalPriceValue = plan2Value
        } else {
          totalPriceValue = plan2ValueOther
        }
      } else {
        totalPriceValue = priceValue.currentPrice
      }
    }
    return totalPriceValue
  }
  let price = totalPrice(business.planData, value.plan);
  const handleChange = (name) => (event) => {
    if (name == "printDirectly") {
      setValue({ ...value, [name]: event.target.checked })
      if (event.target.checked == changeData.printDirectly) {
        setLockButton(true)
      } else {
        setLockButton(false)
      }
    }
    if (name == "codeValue") {
      if (event.target.value.length > 0) {
        setApplyStatus(true)
      } else {
        setApplyStatus(false)
      }
      setValue({ ...value, [name]: event.target.value })
    }
    if (name == "plan") {
      setValue({ ...value, [name]: event.target.value })
      if (event.target.value == changeData.plan) {
        setLockButton(true)
      } else {
        setLockButton(false)
      }
    }
  }
  const savePlan = (event) => {
    let couponId = [];
    business.planData.map((item, index) => {
      couponId.push(item.coupon_id)
    })
    return new Promise((resolve, reject) => {
      setLockButton(true)
      dispatch(savePlanAction(value, couponId, business.filterBusinessList.id, price, resolve, reject))
    }).then((success) => {
      setPlanValid({ status: false, message: "" })
    }).catch(errors => {
      if (errors) {
        setValue(changeData)
        setPlanValid({ status: true, message: errors })
      }
    });
  }
  const couponCodeGenerate = (event) => {
    let values = [];
    return new Promise((resolve, reject) => {
      dispatch(cuoponCodeValid(value.codeValue, business.filterBusinessList.id, resolve, reject))
    }).then((success) => {
      values = couponValues;
      values.push(value.codeValue)
      setCouponValues(values)
      setValue({ ...value, codeValue: "" })
      setApplyStatus(false)
      setCouponValid({ status: false, message: "" })
      dispatch(getPlanInformation(business.filterBusinessList.id))
    }).catch(errors => {
      if (errors) {
        setCouponValid({ status: true, message: errors })
      }
    });
  }
  const onDismiss = () => {
    setPlanValid({ ...planValid, status: !planValid.status })
  }
  return (
    <>
      <div style={{ position: "absolute", top: "50px", right: "50px" }}>
        <Alert
          color="info"
          className="alert-with-icon"
          style={{ zIndex: "200" }}
          isOpen={planValid.status}
          toggle={onDismiss}
        >
          <span data-notify="icon" className="now-ui-icons ui-1_bell-53"></span>
          <span data-notify="message">{planValid.message}</span>
        </Alert>
      </div>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">{t("Choose your plan for")} {business.businessName ? business.businessName : "Location Name"}</h5>
              </CardHeader>
              <CardBody className="px-4">
                <Row>
                  <Col md={12}>
                    <p className="bold">{t("topTitle")}</p>
                    <FormGroup check className="form-check-radio pl-0">
                      <Label check className="font-size-14">
                        <Input
                          id="exampleRadios1"
                          name="plan"
                          type="radio"
                          className="font-size-14"
                          value="plan1"
                          checked={value.plan == "plan1" ? true : false}
                          onChange={handleChange("plan")}
                        />
                        {t('planOne')}
                        <span className="form-check-sign" />
                      </Label>
                    </FormGroup>
                    <FormGroup check className="form-check-radio pl-0">
                      <Label check className="font-size-14">
                        <Input
                          id="exampleRadios2"
                          name="plan"
                          type="radio"
                          value="plan2"
                          className="font-size-14"
                          checked={value.plan == "plan2" ? true : false}
                          onChange={handleChange("plan")}
                        />
                        {t('planTwo')}
                        <span className="form-check-sign" />
                      </Label>
                    </FormGroup>
                    {business.filterBusinessList && (
                      <>
                        {business.filterBusinessList.country_id == 181 && (
                          <FormGroup check className="pl-0">
                            <Label check>
                              <Input type="checkbox"
                                onChange={handleChange("printDirectly")} checked={value.printDirectly} />{' '}
                              {t('printBillsFromReceptionistApp')}
                              <span className="form-check-sign">
                                <span className="check"></span>
                              </span>
                            </Label>
                          </FormGroup>
                        )}
                      </>
                    )}
                  </Col>
                  <Col md={12}>
                    <div className="d-flex py-3">
                      <div>
                        <FormGroup>
                          <Input type="text" name="success" id="success" placeholder="code coupon" value={value.codeValue} onChange={handleChange("codeValue")} />
                        </FormGroup>
                        {couponValid.status && (
                          <FormText color="danger">
                            {couponValid.message}
                          </FormText>
                        )}
                      </div>
                      <div className="pl-3">
                        <Button color="primary" className="btn-round m-0" disabled={!applyStatus} onClick={couponCodeGenerate}>{t('apply')}</Button>
                      </div>
                    </div>
                  </Col>
                  {business.planData.length > 0 && (
                    <div className="px-4">
                      {business.planData.map((item, index) => {
                        return (
                          <Row key={index}>
                            <p className="bold px-4">{item.coupon}</p>
                          </Row>
                        )
                      })}
                    </div>
                  )}
                </Row>
                <hr />
                <div className=" px-5">
                  {value.plan && (
                    <div>
                      {businessValue.type == "beach" || businessValue.type == "pool" ? (
                        <p className="py-2 bold font-size-20 mb-0">{value.plan == "plan1" ? <span>{t('total')}: {price} &nbsp;<span>&#8364;</span> &nbsp;/&nbsp;{t('month')} </span> : <span>{t('total')}: {price} &nbsp;<span>&#8364;</span> &nbsp;/&nbsp;{t('month')} </span>}</p>
                      ) : (
                        <p className="py-2 bold font-size-20 mb-0">{value.plan == "plan1" ? <span>  {t('total')}: {price} &nbsp;<span>&#8364;</span> &nbsp;/&nbsp; {t('month')}</span> : <span>{t('total')}: {price} &nbsp;<span>&#8364;</span> &nbsp;/&nbsp;{t('month')} </span>}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="pt-3">
                    {businessValue.type == "beach" || businessValue.type == "pool" ? (
                      <p>
                        <span className="Italic-font font-size-16">
                          {t('addtionalPayment')}
                        </span>&nbsp;&nbsp;&nbsp;
                        <span className="font-size-16">
                          {t('addtionalDescription1')}
                        </span>
                      </p>
                    ) : (
                      <p>
                        <span className="Italic-font font-size-16">
                          {t('addtionalPayment')}
                        </span>&nbsp;&nbsp;&nbsp;
                        <span className="font-size-16">
                          {t('addtionalDescription2')}
                        </span>
                      </p>
                    )}
                  </div>
                  <div>
                    <Button color="primary" className="btn-round" disabled={lockButton} onClick={savePlan}>{t('save')}</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PlanPage;
