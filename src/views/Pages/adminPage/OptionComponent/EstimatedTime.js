import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Alert,
  Input,
  FormGroup,
  Label,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { saveEstimatedTime } from "../../../../redux/option/action";
const EstimatedTime = (props) => {
  console.log("Check estimate time props", props);
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [estimatedTime, setEstimatedTime] = useState(30);
  useEffect(() => {
    if (option.businessSettings.length > 0) {
      setEstimatedTime(option.businessSettings[0].estimated_time);
    }
  }, [option.businessSettings]);
  const { t } = useTranslation();
  const handleChangeSunbedCount = (count) => (event) => {
    setEstimatedTime(count);
    dispatch(saveEstimatedTime(count));
  };
  return (
    <React.Fragment>
      <Card className="addSunbed">
        <CardHeader className="px-4">
          <h5 className="title">{t("estimated_time")}</h5>
        </CardHeader>
        <CardBody className="px-4">
          <Alert color="info" style={{ backgroundColor:'#4207a2'}}>
            <span style={{ fontWeight: "600" }}>
              Reservations can be done by every 15 min
            </span>
          </Alert>
          {/* <Row>
            <Col xs={12} md={6} sm={3} lg={2}>
              
              <UncontrolledDropdown>
                
                <DropdownToggle
                  color="info"
                  className="btn-round btn-block bold option-dropdown-button"
                  caret
                >
                  {`${estimatedTime == 0 ? "Set Time" : `${estimatedTime} min`}`}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={handleChangeSunbedCount(30)}>30 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(45)}>45 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(60)}>60 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(75)}>75 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(90)}>90 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(105)}>105 min</DropdownItem>
                  <DropdownItem onClick={handleChangeSunbedCount(120)}>120 min</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row> */}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default EstimatedTime;
