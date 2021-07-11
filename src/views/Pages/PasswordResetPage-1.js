import React, { useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";

// core components
import nowLogo from "assets/img/tabo-logo.png";
import { useSSR, useTranslation } from "react-i18next";
import bgImage from "assets/img/bg.jpg";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
const PasswordResetPage1 = () => {
  const history = useHistory();
  const [state, setState] = useState({
    emailFocus: false,
    lastnameFocus: false,
  });
  const [emailValue, setEmailValue] = useState("");
  const [validStatus, setValidStatus] = useState(false);
  const changeRegister = () => {
    history.push("/register");
  };
  const changeLogin = () => {
    history.push("/login");
  };
  const forgotPasswordAction = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/forgotPassword`, { email: emailValue })
      .then((response) => {
        if (response) {
          if (response.data.status === "fail") {
            setEmailValue("")
            setValidStatus(true)
          } else {
            setValidStatus(false)
          }
        }
      }).catch((error) => {
      });
  }
  const { t } = useTranslation();
  return (
    <>
      <div className="content">
        <div className="login-page">
          <Container>
            <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
              <Form>
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
                        placeholder="E-mail Address"
                        onChange={
                          (e) => { setEmailValue(e.target.value) }
                        }
                        onFocus={(e) =>
                          setState({ emailFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ emailFocus: false })
                        }
                      />
                    </InputGroup>
                    {validStatus && (
                      <p className="text-danger">Invalid Email!</p>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      color="primary"
                      size="lg"
                      className="mb-3 btn-round"
                      onClick={forgotPasswordAction}
                    >
                      Send
                      </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={changeRegister}
                          className="link footer-link"
                        >
                          {t("register")}
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          style={{ cursor: "pointer" }}
                          className="link footer-link"
                          onClick={changeLogin}
                        >
                          {t("login")}
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
    </>
  );
}

export default PasswordResetPage1;
