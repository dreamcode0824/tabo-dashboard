import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import PanelHeader from "../../../components/PanelHeader/PanelHeader"
import PriceDayComponenet from "./PriceComponent/PriceDayComponent"
import { getZones } from "../../../redux/element/action"
import { getActivityPeriod } from "../../../redux/grid/action"
import { getExtraSunbedPhoto } from "../../../redux/option/action"
import {
  getStructure,
  getPrice,
  ayncGetPrice,
  savedStatus, deleteAction, resetPeriod, modalAction, cancelActions,
  tempZoneName, currentZoneName, elementTypesAction,
  isData, createPricePlan, ayncCreatePricePlan
} from "../../../redux/price/action"
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import ElementType from "./PriceComponent/ElementType";
const PricePlanner = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const element = useSelector(({ element }) => element);
  const grid = useSelector(({ grid }) => grid);
  const price = useSelector(({ price }) => price);
  const business = useSelector(({ business }) => business);
  const [filterZoneData, setFilterZoneData] = useState([]);
  const [selectStatus, setSelectStatus] = useState("");
  const [state, setState] = useState({
    openedCollapses: ["collapseOne"],
    hTabs: "ht1",
    vTabs: "vt1",
    vTabsIcons: "vti1",
    pageSubcategories: "ps1",
  })
  const [currentId, setCurrentId] = useState("");
  useEffect(() => {
    dispatch(getPrice())
    dispatch(getZones())
    dispatch(getActivityPeriod())
    dispatch(getExtraSunbedPhoto())
  }, [])
  useEffect(() => {
    if (price.allPrice.length > 0) {
      // let endDateValue = new Date(grid.endDate).getTime();
      // let currentEndDateValue = new Date(endDate).getTime();
      // console.log(endDateValue, currentEndDateValue)
      // if (endDateValue - currentEndDateValue > 0) {
      //   console.log("------------>sme1")
      //   dispatch(resetPeriod(false))
      // }
    }
  }, [price.allPrice])
  useEffect(() => {
    if (element.idVIP) {
      dispatch(getStructure(element.idVIP))
      setCurrentId(element.idVIP)
      setState({ hTabs: "ht1" })
      dispatch(currentZoneName("VIP"))
    } else {
      if (element.id1) {
        setState({ hTabs: "ht2" })
        dispatch(currentZoneName("HT1"))
        dispatch(getStructure(element.id1))
        setCurrentId(element.id1)
      }
    }
  }, [element.hasVipZone, element.zone1, price.resetPeriodStatus])
  useEffect(() => {
    if (price.allPrice.length > 0) {
      const result = price.allPrice.filter(ele => ele.zone_id == price.currentZoneId && ele.type == price.elementType)
      if (result.length > 0) {
        setFilterZoneData(result)
      } else {
        setFilterZoneData([])
      }
    }
  }, [price.currentZoneId, price.elementType])
  const vipAction = () => {
    setSelectStatus("zone")
    dispatch(tempZoneName("VIP", element.idVIP))
    if (!price.isSaved) {
      dispatch(modalAction(true))
    } else {
      setCurrentId(element.idVIP)
      setState({ hTabs: "ht1" })
      dispatch(getStructure(element.idVIP))
    }
  }
  const ht1Action = () => {
    setSelectStatus("zone")
    dispatch(tempZoneName("HT1", element.id1))
    if (!price.isSaved) {
      dispatch(modalAction(true))
    } else {
      dispatch(currentZoneName("HT1"))
      setState({ hTabs: "ht2" })
      setCurrentId(element.id1)
      dispatch(getStructure(element.id1))
      if (price.allPrice.length > 0) {
        const result = price.allPrice.filter(ele => ele.zone_id == element.id1 && ele.type == price.elementType)
        if (result.length > 0) {
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      }
    }
  }
  const ht2Action = () => {
    setSelectStatus("zone")
    dispatch(tempZoneName("HT2", element.id2))
    if (!price.isSaved) {
      dispatch(modalAction(true))
    } else {
      dispatch(currentZoneName("HT2"))
      setState({ hTabs: "ht3" })
      setCurrentId(element.id2)
      dispatch(getStructure(element.id2))
      if (price.allPrice.length > 0) {
        const result = price.allPrice.filter(ele => ele.zone_id == element.id2 && ele.type == price.elementType)
        if (result.length > 0) {
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      }
    }
  }
  const ht3Action = () => {
    setSelectStatus("zone")
    dispatch(tempZoneName("HT3", element.id3))
    if (!price.isSaved) {
      dispatch(modalAction(true))
    } else {
      dispatch(currentZoneName("HT3"))
      setState({ hTabs: "ht4" })
      setCurrentId(element.id3)
      dispatch(getStructure(element.id3))
      if (price.allPrice.length > 0) {
        const result = price.allPrice.filter(ele => ele.zone_id == element.id3 && ele.type == price.elementType)
        if (result.length > 0) {
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      }
    }
  }
  const ht4Action = () => {
    setSelectStatus("zone")
    dispatch(tempZoneName("HT4", element.id4))
    if (!price.isSaved) {
      dispatch(modalAction(true))
    } else {
      dispatch(currentZoneName("HT4"))
      setState({ hTabs: "ht5" })
      setCurrentId(element.id4)
      dispatch(getStructure(element.id4))
      if (price.allPrice.length > 0) {
        const result = price.allPrice.filter(ele => ele.zone_id == element.id4 && ele.type == price.elementType)
        if (result.length > 0) {
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      }
    }
  }
  const filterTypeAction = (elementType) => {
    setSelectStatus("type")
    if (price.allPrice.length > 0) {
      const result = price.allPrice.filter(ele => ele.zone_id == price.currentZoneId && ele.type == elementType)
      if (result.length > 0) {
        setFilterZoneData(result)
      } else {
        setFilterZoneData([])
      }
    }
  }
  const resetAction = () => {
    setFilterZoneData([])
    dispatch(deleteAction())
    dispatch(resetPeriod(false))
  }
  const cancelHandle = () => {
    dispatch(modalAction(false))
    //  dispatch(savedStatus(true))
    // dispatch(cancelActions(!price.cancelStatus))
    // if (price.allPrice.length > 0) {
    //   const result = price.allPrice.filter(ele => ele.zone_id == currentId)
    //   console.log(result)
    //   if (result.length > 0) {
    //     setFilterZoneData(result)
    //   } else {
    //     setFilterZoneData([])
    //   }
    // }
    // dispatch(currentZoneName(price.tempZoneName))
    // dispatch(elementTypesAction(price.tempElementType))
  }
  const agreeHandle = (range) => {
    dispatch(isData(true))
    dispatch(createPricePlan(price.elementType, range))
    dispatch(savedStatus(true))
    dispatch(modalAction(false))
    dispatch(elementTypesAction(price.tempElementType))
    dispatch(currentZoneName(price.tempZoneName))
    if (price.allPrice.length > 0) {
      console.log(selectStatus)
      if (selectStatus == "zone") {
        const result = price.allPrice.filter(ele => ele.zone_id == price.tempZoneId && ele.type == price.elementType)
        if (result.length > 0) {
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      } else {
        const result = price.allPrice.filter(ele => ele.zone_id == price.currentZoneId && ele.type == price.tempElementType)
        if (result.length > 0) {
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      }
    }
  }
  const savePricePlanActionHandle = (range) => {
    dispatch(savedStatus(true))
    return new Promise((resolve, reject) => {
      dispatch(ayncCreatePricePlan(price.elementType, range, resolve))
    }).then((success) => {
      console.log(success)
      if (success.length > 0) {
        const result = success.filter(ele => ele.zone_id == price.currentZoneId && ele.type == price.elementType)
        if (result.length > 0) {
          dispatch(isData(true))
          setFilterZoneData(result)
        } else {
          setFilterZoneData([])
        }
      }
    })
  }
  return (
    <React.Fragment>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">{t("Price Planner")}</h5>
              </CardHeader>
              {(element.hasVipZone || element.zone1 || element.zone2 || element.zone3 || element.zone4) ? (
                <CardBody className="px-4">
                  <Row>
                    <Col md={12}>
                      <Nav pills className="nav-pills-primary">
                        {element.hasVipZone && element.zone2 && (
                          <NavItem>
                            <NavLink
                              className={price.currentZonName === "VIP" ? "active cursor" : "cursor"}
                              onClick={vipAction}
                            >
                              VIP
                          </NavLink>
                          </NavItem>
                        )}
                        {element.zone1 && element.zone2 && (
                          <NavItem>
                            <NavLink
                              className={price.currentZonName == "HT1" ? "active cursor" : "cursor"}
                              onClick={ht1Action}
                            >
                              {element.zone1}
                            </NavLink>
                          </NavItem>
                        )}
                        {element.zone2 && (
                          <NavItem>
                            <NavLink
                              className={price.currentZonName === "HT2" ? "active cursor" : "cursor"}
                              onClick={ht2Action}
                            >
                              {element.zone2}
                            </NavLink>
                          </NavItem>
                        )}
                        {element.zone3 && (
                          <NavItem>
                            <NavLink
                              className={price.currentZonName === "HT3" ? "active cursor" : "cursor"}
                              onClick={ht3Action}
                            >
                              {element.zone3}
                            </NavLink>
                          </NavItem>
                        )}
                        {element.zone4 && (
                          <NavItem>
                            <NavLink
                              className={price.currentZonName === "HT4" ? "active cursor" : "cursor"}
                              onClick={ht4Action}
                            >
                              {t(element.zone4)}
                            </NavLink>
                          </NavItem>
                        )}
                      </Nav>
                      <ElementType
                        filterType={filterTypeAction}
                      />
                      {filterZoneData && (
                        <PriceDayComponenet
                          startDate={grid.startDate}
                          endDate={grid.endDate}
                          currency={business.filterBusinessList.currency}
                          filterData={filterZoneData}
                          cancelActionss={cancelHandle}
                          agreeActionss={agreeHandle}
                          savePricePlanAction={savePricePlanActionHandle}
                        />
                      )}
                    </Col>
                  </Row>
                </CardBody>
              ) : (
                <CardBody>
                  <Alert color="danger">
                    You have to set zone.
                  </Alert>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </div>

    </React.Fragment >
  )
}
export default PricePlanner;