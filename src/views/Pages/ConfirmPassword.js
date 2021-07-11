import React, { useState, useEffect } from "react";

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
import { useTranslation } from "react-i18next";
import bgImage from "assets/img/bg.jpg";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
const ConfirmPassword = ({ match }) => {
  const history = useHistory();
  const [state, setState] = useState({
    passwordFocus: false,
    confirmPasswordFocus: false,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [compareStatus, setCompareStatus] = useState(true);
  const [errorStatus, setErrorStatus] = useState(true);
  const confirmPasswordAction = () => {
    if (password === confirmPassword) {
      setCompareStatus(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/confirmPassword`, { password: password, linkId: match.params.id })
        .then((response) => {
          if (response) {
            if (response.data.status == "success") {
              history.push('/login');
            } else {
              setErrorStatus(false);
            }
          }
        }).catch((error) => {
        });
    } else {
      setCompareStatus(false);
    }
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
                        placeholder="New password"
                        onChange={
                          (e) => { setPassword(e.target.value) }
                        }
                        onFocus={(e) =>
                          setState({ ...state, passwordFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, passwordFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border form-control-lg " +
                        (state.confirmPasswordFocus ? "input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Confirms password"
                        onChange={
                          (e) => { setConfirmPassword(e.target.value) }
                        }
                        onFocus={(e) =>
                          setState({ ...state, confirmPasswordFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, confirmPasswordFocus: false })
                        }
                      />
                    </InputGroup>
                    {!compareStatus && (
                      <p className="text-danger mb-0">password is not match</p>
                    )}
                    {!errorStatus && (
                      <p className="text-danger mb-0">Your link is wrong.</p>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      color="primary"
                      size="lg"
                      className="mb-3 btn-round"
                      onClick={confirmPasswordAction}
                    >
                      Confirm
                      </Button>
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

export default ConfirmPassword;
