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
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getZoneName, hasVipZone, saveZoneAction, saveCount, getZone, changeValueZone, updateZoneAction } from "../../../../redux/grid/action";
const Zone = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [zoneName, setZoneName] = useState({ zone1: "", zone2: "", zone3: "", zone4: "" });
  const [zoneCount, setZoneCount] = useState(1);
  const [state, setState] = useState(true)
  const grid = useSelector(({ grid }) => grid);
  const business = useSelector(({ business }) => business);
  const [vipZoneState, setVipZoneState] = useState("")
  const [zoneCountState, setZoneCountState] = useState("")
  const [state1, setState1] = useState(true)
  useEffect(() => {
    setVipZoneState(grid.hasVipZone)
    setZoneCountState(grid.zoneCount)
    setState(true)
    setState1(true)
    dispatch(getZone())
    if (business.filterBusinessList.type == "beach") {
      dispatch(getZoneName())
    } else {
      setZoneName({ zone1: "", zone2: "", zone3: "", zone4: "" })
    }
  }, [business.filterBusinessList])
  const selectVipZone = (event) => {
    if (event.target.value == Number(zoneCountState)) {
      setState1(true)
    } else {
      setState1(false)
    }
    setZoneCount(event.target.value)
    dispatch(saveCount(event.target.value))
    if (business.filterBusinessList.type == "beach") {
      dispatch(getZoneName())
    }
  }
  const handleChange = (name) => (event) => {
    setZoneName({ ...zoneName, [name]: event.target.value })
    dispatch(changeValueZone(name, event.target.value))
  }
  const saveZone = (event) => {
    console.log(grid.length)
    if (grid.id) {
      dispatch(updateZoneAction(zoneName))
    } else {
      dispatch(saveZoneAction(zoneName))
    }
    setState1(true)
    setState(true)
  }
  const vipZone = (event) => {
    if (event.target.checked == vipZoneState) {
      setState(true)
    } else {
      setState(false)
    }
    dispatch(hasVipZone(event.target.checked))
  }
  return (
    <>
      {(business.filterBusinessList.type === "beach" || business.filterBusinessList.type === "pool") && (
        <Card className="card-user">
          <CardHeader className="px-4">
            <h5 className="title">{t("ZONE")}</h5>
          </CardHeader>
          <CardBody className="px-4">
            <Row>
              <Col md={10} className="mx-auto px-0">
                <Row>
                  <Col md={6}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" checked={grid.hasVipZone} onChange={vipZone} />{' '}
                        {t("Do you have VIP ZONE")}
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={4} className="pt-2">
                    <Input type="select" name="select" value={grid.zoneCount} onChange={selectVipZone} id="exampleSelect1">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Input>
                  </Col>
                  <Col md={2}>
                    <div className="d-flex justify-content-end">
                      <Button style={{ width: "100%" }} disabled={(state && state1)} onClick={saveZone} className="mt-1" color="success">{t('Save')}</Button>
                    </div>
                  </Col>
                </Row>
                {(grid.zoneCount == 1 || grid.zoneCount == 2 || grid.zoneCount == 3 || grid.zoneCount == 4) && (
                  <Row className="pl-3">
                    {!(Number(grid.zoneCount) == 1 && business.filterBusinessList.type == "beach") && (
                      <Col md={4} className="pt-2">
                        <FormGroup>
                          <Input type="text" name="text" value={t(grid.zone1)} disabled={business.filterBusinessList.type === "beach" ? true : false} onChange={handleChange("zone1")} />
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                )}
                {(grid.zoneCount == 2 || grid.zoneCount == 3 || grid.zoneCount == 4) && (
                  <Row className="pl-3">
                    <Col md={4} className="pt-2">
                      <FormGroup>
                        <Input type="text" name="text" disabled={business.filterBusinessList.type === "beach" ? true : false} value={t(grid.zone2)} onChange={handleChange("zone2")} />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {(grid.zoneCount == 3 || grid.zoneCount == 4) && (
                  <Row className="pl-3">
                    <Col md={4} className="pt-2">
                      <FormGroup>
                        <Input type="text" name="text" disabled={business.filterBusinessList.type === "beach" ? true : false} placeholder="" value={t(grid.zone3)} onChange={handleChange("zone3")} />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {(grid.zoneCount == 4) && (
                  <Row className="pl-3">
                    <Col md={4} className="pt-2">
                      <FormGroup>
                        <Input type="text" name="text" disabled={business.filterBusinessList.type === "beach" ? true : false} value={t(grid.zone4)} placeholder="" onChange={handleChange("zone4")} />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </>
  )

}
export default Zone