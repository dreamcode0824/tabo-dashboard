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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { getExtraSunbedPhoto, saveExtraSunbedPhoto } from "../../../../redux/option/action"
const PhotoExtraSunbed = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const option = useSelector(({ option }) => option);
  const [photoRequired, setPhotoRequired] = useState(false)
  const [umbrellaRequired, setUmbrellaRequired] = useState(false)
  const [extraSunbed, setExtraSunbed] = useState(0)
  useEffect(() => {
    dispatch(getExtraSunbedPhoto())
  }, [business.filterBusinessList])
  useEffect(() => {
    if (option.businessSettings.length > 0) {
      setPhotoRequired(option.businessSettings[0].photo_required)
      setExtraSunbed(option.businessSettings[0].extra_sunbeds)
      setUmbrellaRequired(option.businessSettings[0].umbrella_requrired)
    } else {
      setPhotoRequired(true)
      setExtraSunbed(0)
    }
  }, [option.businessSettings])
  const handlePhoto = (value) => (event) => {
    if (value == "Yes") {
      setPhotoRequired(true)
      dispatch(saveExtraSunbedPhoto(true, extraSunbed, umbrellaRequired))
    } else {
      setPhotoRequired(false)
      dispatch(saveExtraSunbedPhoto(false, extraSunbed, umbrellaRequired))
    }
  }
  const handleUmbrella = (value) => (event) => {
    if (value == "Yes") {
      setUmbrellaRequired(true)
      dispatch(saveExtraSunbedPhoto(false, extraSunbed, true))
    } else {
      setUmbrellaRequired(false)
      dispatch(saveExtraSunbedPhoto(false, extraSunbed, false))
    }
  }
  const handleChangeSunbedCount = (count) => (event) => {
    setExtraSunbed(count)
    dispatch(saveExtraSunbedPhoto(photoRequired, count, umbrellaRequired))
  }
  return (
    <React.Fragment>
      <Card className="addSunbed">
        <CardHeader className="px-4">
          <h5 className="title">{t('Photo required')}</h5>
        </CardHeader>
        <CardBody className="px-4">
          <Row>
            <Col className="pb-3">
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    checked={photoRequired}
                    defaultValue="option1"
                    id="exampleRadios1"
                    name="exampleRadios"
                    type="radio"
                    onChange={handlePhoto("Yes")}
                  />
                  <span className="form-check-sign" />
                  {t('Yes')}
                </Label>
              </FormGroup>
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    checked={photoRequired}
                    defaultValue="option2"
                    id="exampleRadios1"
                    name="exampleRadios"
                    type="radio"
                    onChange={handlePhoto("No")}
                  />
                  <span className="form-check-sign" />
                  {t('No')}
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {(business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") && (
        <Card className="addSunbed">
          <CardHeader className="px-4">
            <h5 className="title">{t('Rent_umbrella')}</h5>
          </CardHeader>
          <CardBody className="px-4">
            <Row>
              <Col className="pb-3">
                <FormGroup check className="form-check-radio">
                  <Label check>
                    <Input
                      checked={umbrellaRequired}
                      id="exampleRadios111"
                      name="umbrella"
                      type="radio"
                      onChange={handleUmbrella("Yes")}
                    />
                    <span className="form-check-sign" />
                    {t('Yes')}
                  </Label>
                </FormGroup>
                <FormGroup check className="form-check-radio">
                  <Label check>
                    <Input
                      checked={!umbrellaRequired}
                      id="exampleRadios1112"
                      name="umbrella"
                      type="radio"
                      onChange={handleUmbrella("No")}
                    />
                    <span className="form-check-sign" />
                    {t('No')}
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
      {(business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") && (
        <Card className="addSunbed">
          <CardHeader className="px-4">
            <h5 className="title mb-0">{t("accept_baldiquin")}</h5>
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
                    {`${extraSunbed}`}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleChangeSunbedCount(0)}>0</DropdownItem>
                    <DropdownItem onClick={handleChangeSunbedCount(1)}>1</DropdownItem>
                    <DropdownItem onClick={handleChangeSunbedCount(2)}>2</DropdownItem>
                    <DropdownItem onClick={handleChangeSunbedCount(3)}>3</DropdownItem>
                    <DropdownItem onClick={handleChangeSunbedCount(4)}>4</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  )
}
export default PhotoExtraSunbed;