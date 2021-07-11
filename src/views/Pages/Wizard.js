import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, Input, FormGroup } from "reactstrap";
import bgImage from "assets/img/bg.jpg";
import { useHistory, Redirect } from "react-router-dom";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { businessTypes } from "../../redux/business/action";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { businessTypesData } from "../../redux/business/action";
var title = [
  {
    id: 1,
    titleName: "beach",
    value: [
      { name: 0, label: 0, status: false },
      { name: 1, label: 1, status: false },
      { name: 2, label: 2, status: false },
      { name: 3, label: 3, status: false },
      { name: 4, label: 4, status: false },
      { name: 5, label: 5, status: false },
      { name: 6, label: 6, status: false },
      { name: 7, label: 7, status: false },
      { name: 8, label: 8, status: false },
      { name: 9, label: 9, status: false },
      { name: 10, label: 10, status: false },
    ],
  },
  {
    id: 2,
    titleName: "pool",
    value: [
      { name: 0, label: 0, status: false },
      { name: 1, label: 1, status: false },
      { name: 2, label: 2, status: false },
      { name: 3, label: 3, status: false },
      { name: 4, label: 4, status: false },
      { name: 5, label: 5, status: false },
      { name: 6, label: 6, status: false },
      { name: 7, label: 7, status: false },
      { name: 8, label: 8, status: false },
      { name: 9, label: 9, status: false },
      { name: 10, label: 10, status: false },
    ],
  },
  {
    id: 3,
    titleName: "restaurant",
    value: [
      { name: 0, label: 0, status: false },
      { name: 1, label: 1, status: false },
      { name: 2, label: 2, status: false },
      { name: 3, label: 3, status: false },
      { name: 4, label: 4, status: false },
      { name: 5, label: 5, status: false },
      { name: 6, label: 6, status: false },
      { name: 7, label: 7, status: false },
      { name: 8, label: 8, status: false },
      { name: 9, label: 9, status: false },
      { name: 10, label: 10, status: false },
    ],
  },
  {
    id: 4,
    titleName: "terrace",
    value: [
      { name: 0, label: 0, status: false },
      { name: 1, label: 1, status: false },
      { name: 2, label: 2, status: false },
      { name: 3, label: 3, status: false },
      { name: 4, label: 4, status: false },
      { name: 5, label: 5, status: false },
      { name: 6, label: 6, status: false },
      { name: 7, label: 7, status: false },
      { name: 8, label: 8, status: false },
      { name: 9, label: 9, status: false },
      { name: 10, label: 10, status: false },
    ],
  },
  {
    id: 5,
    titleName: "club",
    value: [
      { name: 0, label: 0, status: false },
      { name: 1, label: 1, status: false },
      { name: 2, label: 2, status: false },
      { name: 3, label: 3, status: false },
      { name: 4, label: 4, status: false },
      { name: 5, label: 5, status: false },
      { name: 6, label: 6, status: false },
      { name: 7, label: 7, status: false },
      { name: 8, label: 8, status: false },
      { name: 9, label: 9, status: false },
      { name: 10, label: 10, status: false },
    ],
  },
];
const Wizard = (props) => {
  const verifyLocation = props.location.pathname;
  let history = useHistory();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const [businessData, setBusinessData] = useState([]);
  const [businessType, setBusinessType] = useState({
    beach: 0,
    pool: 0,
    restaurant: 0,
    terrace: 0,
    club: 0,
  });
  useEffect(() => {
    let arr = [];
    arr = title;
    setBusinessData(arr);
    dispatch(businessTypesData());
  }, []);
  const dispatch = useDispatch();
  const handleChange = (name) => (event) => {
    setBusinessType({ ...businessType, [name]: event.target.value });
  };
  const next = () => {
    console.log(businessType, "KKKKKKKKKKKKKKKKKKKK")
    dispatch(businessTypes(businessType, history));
  };
  return (
    <>
      {business.accessToken ? (
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <Row className="d-flex justify-content-center">
              <Col md="4">
                <div className="mb-5">
                  <h4
                    className={
                      verifyLocation === "/wizard"
                        ? "text-center mb-5 text-white px-4"
                        : "text-center mb-5 text-black px-4"
                    }
                  >
                    {t("businessLocationType")}
                  </h4>
                </div>
                <Form>
                  {businessData.map((list, i) => {
                    return (
                      <div className="form-row px-4" key={i}>
                        <FormGroup className="col-md-9">
                          <p
                            className={
                              verifyLocation === "/wizard"
                                ? "pt-2 text-white"
                                : "pt-2 text-black"
                            }
                          >
                            {t(`${list.titleName}`)}
                          </p>
                        </FormGroup>
                        <FormGroup className="col-md-3 Business-Profile">
                          <Input
                            type="select"
                            name="select"
                            id="inputState"
                            className={
                              verifyLocation === "/wizard"
                                ? "text-white"
                                : "text-black"
                            }
                            onChange={handleChange(`${list.titleName}`)}
                          >
                            {list.value.map((item, index) => {
                              return (
                                <option
                                  className={
                                    item.status ? "light-gray" : "text-dark"
                                  }
                                  // disabled={item.status ? true : false}
                                  key={item.name}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </div>
                    );
                  })}
                </Form>
                <div className="d-flex justify-content-end px-4">
                  <Button
                    style={{ background: "#609" }}
                    color="success"
                    onClick={next}
                  >
                    {t("next")}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div
            className="full-page-background"
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Wizard;
