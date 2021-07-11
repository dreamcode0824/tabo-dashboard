import React, { Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { saveIntervalTime, getExtraSunbedPhoto } from "../../../../redux/option/action"
const IntervalReservation = ({ saveIntervalReservation }) => {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [intrvalTime, setIntrvalTime] = useState(5)
  useEffect(() => {
    dispatch(getExtraSunbedPhoto())
  }, [business.filterBusinessList])
  useEffect(() => {
    if (option.businessSettings.length > 0) {
      setIntrvalTime(option.businessSettings[0].booking_time_limit)
    }
  }, [option.businessSettings])
  const { t } = useTranslation();
  const handleChangeSunbedCount = (count) => (event) => {
    setIntrvalTime(count)
    dispatch(saveIntervalTime(count))
    saveIntervalReservation(count)
  }
  return (
    <React.Fragment>
      <Card className="addSunbed">
        <CardHeader className="px-4">
          <h5 className="title">{t('Set time interval for doing reservations')}</h5>
        </CardHeader>
        <CardBody className="px-4">
          <Row>
            <Col xs={12} md={6} sm={3} lg={2}>
              <UncontrolledDropdown>
                <DropdownToggle
                  color="info"
                  className="btn-round btn-block bold option-dropdown-button"
                  caret
                >
                  {`${intrvalTime == 0 ? "Set Time" : `${intrvalTime} min`}`}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={handleChangeSunbedCount(5)}>5 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(10)}>10 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(15)}>15 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(20)}>20 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(30)}>30 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(60)}>60 min</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default IntervalReservation;