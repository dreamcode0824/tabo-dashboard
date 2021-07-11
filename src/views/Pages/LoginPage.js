import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  Col,
  Input,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormText,
  Alert,
} from "reactstrap";
import nowLogo from "assets/img/tabo-logo.png";
import bgImage from "assets/img/bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { loginValueAction, loginAction } from "../../redux/business/action";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [state, setState] = useState({
    emailFocus: false,
    lastnameFocus: false,
  });
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const history = useHistory();
  const changeRegister = () => {
    history.push("/register");
  };
  const changeForgot = () => {
    history.push("/reset");
  };
  const onDismiss = () => {
    setVisible(!visible);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(loginValueAction(values));
        dispatch(loginAction(history, resolve, reject));
      })
        .then((success) => {
          console.log(success);
        })
        .catch((errors) => {
          if (errors) {
            setVisible(true);
          }
        });
    },
  });
  return (
    <>
      {location.pathname == "/" ? (
        <Redirect to="/login" />
      ) : (
        <React.Fragment>
          <div style={{ position: "absolute", top: "50px", right: "50px" }}>
            <Alert
              color="danger"
              className="alert-with-icon"
              style={{ zIndex: "200" }}
              isOpen={business.loginStatus ? business.loginStatus : false}
              toggle={onDismiss}
            >
              <span
                data-notify="icon"
                className="now-ui-icons ui-1_bell-53"
              ></span>
              <span data-notify="message">{business.loginMessage}</span>
            </Alert>
          </div>
          <div className="content">
            <div className="login-page">
              <Container>
                <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                  <Form onSubmit={formik.handleSubmit}>
                    <Card className="card-login card-plain">
                      <CardHeader>
                        <div className="logo-container">
                          <img src={nowLogo} alt="smart-beach-logo" />
                        </div>
                      </CardHeader>
                      <CardBody>
                        <InputGroup
                          className={
                            "no-border form-control-lg " +
                            (state.emailFocus ? "input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            name="email"
                            placeholder={t("emailAddress")}
                            onFocus={(e) => setState({ emailFocus: true })}
                            onBlur={(e) => setState({ emailFocus: false })}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                        </InputGroup>
                        {formik.errors.email && formik.touched.email && (
                          <FormText color="danger">
                            {formik.errors.email}
                          </FormText>
                        )}
                        <InputGroup
                          className={
                            "no-border form-control-lg " +
                            (state.passwordFocus ? "input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            name="password"
                            placeholder={t("password")}
                            onFocus={(e) => setState({ passwordFocus: true })}
                            onBlur={(e) => setState({ passwordFocus: false })}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            id={
                              formik.errors.password && formik.touched.password
                                ? "success"
                                : "error"
                            }
                          />
                        </InputGroup>
                        {formik.errors.password && formik.touched.password && (
                          <FormText color="danger">
                            {formik.errors.password}
                          </FormText>
                        )}
                      </CardBody>
                      <CardFooter>
                        <Button
                          block
                          color="primary"
                          size="lg"
                          type="submit"
                          className="mb-3 btn-round"
                        >
                          {t("letsGo")}
                        </Button>
                        <div className="pull-left">
                          <h6>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={changeRegister}
                              className="link footer-link"
                            >
                              {t("createAccount")}
                            </a>
                          </h6>
                        </div>
                        <div className="pull-right">
                          <h6>
                            <a
                              style={{ cursor: "pointer" }}
                              className="link footer-link"
                              onClick={changeForgot}
                            >
                              {t("forgotPassword")}
                            </a>
                          </h6>
                        </div>
                      </CardFooter>
                    </Card>
                  </Form>
                </Col>
              </Container>
            </div>
          </div>
          <div
            className="full-page-background"
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          />
        </React.Fragment>
      )}
    </>
  );
};

export default LoginPage;
