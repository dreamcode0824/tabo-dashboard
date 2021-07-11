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
import PanelHeader from "../../../components/PanelHeader/PanelHeader"
const SupportPage = () => {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">SupportPage</h5>
              </CardHeader>
              <CardBody className="px-4">
                <Row>
                  <Col md={12}>

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default SupportPage;