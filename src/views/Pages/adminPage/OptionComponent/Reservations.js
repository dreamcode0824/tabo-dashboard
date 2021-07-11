import React, { Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Button
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { saveReservationGuaranteedAction } from "../../../../redux/option/action"
const PhotoExtraSunbed = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [reservationStatus, setReservationStatus] = useState(false)
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (option.businessSettings.length > 0) {
      setReservationStatus(option.businessSettings[0].guaranteed_reservation > 0 ? true : false)
      setValue(option.businessSettings[0].guaranteed_reservation)
    } else {
      setReservationStatus(false)
      setValue(0)
    }
  }, [option.businessSettings])
  const handleReservationStatus = (value) => (event) => {
    if (value == "Yes") {
      setReservationStatus(true)
    } else {
      setValue(0)
      setReservationStatus(false)
      dispatch(saveReservationGuaranteedAction(0))
    }
  }
  const handleChangeValue = (event) => {
    setValue(event.target.value)
  }
  const saveReservation = () => {
    dispatch(saveReservationGuaranteedAction(value))
  }
  return (
    <React.Fragment>
      <Card className="addSunbed">
        <CardHeader className="px-4">
          <h5 className="title">{t('enalble_grarantee_detail')}</h5>
          <p className="light-gray bold">{t('enable_guaranted_content')}</p>
        </CardHeader>
        <CardBody className="px-4">
          <Row>
            <Col className="pb-3">
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    checked={reservationStatus}
                    id="reservation1"
                    name="reservation"
                    type="radio"
                    onChange={handleReservationStatus("Yes")}
                  />
                  <span className="form-check-sign" />
                  {t('Yes')}
                </Label>
              </FormGroup>
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    checked={!reservationStatus}
                    id="reservation2"
                    name="reservation"
                    type="radio"
                    onChange={handleReservationStatus("No")}
                  />
                  <span className="form-check-sign" />
                  {t('No')}
                </Label>
              </FormGroup>
            </Col>
          </Row>
          {reservationStatus && (
            <Row>
              <div className="col-md-4 pt-3">
                <Input
                  type="text"
                  name="test"
                  id="exampleEmail"
                  value={value}
                  onChange={handleChangeValue}
                  placeholder="Enter value"
                />
              </div>
              <div className="col-md-2 mt-3">
                <p className="mb-0 font-weight-bold pt-2">{business.filterBusinessList.currency}</p>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-start">
                  <Button style={{ width: "28%" }} onClick={saveReservation} color="success">{t("Save")}</Button>
                </div>
              </div>
            </Row>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default PhotoExtraSunbed;