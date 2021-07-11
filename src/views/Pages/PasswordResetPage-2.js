import React from "react";

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

import bgImage from "assets/img/bg.jpg";

class PasswordResetPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.body.classList.add("login-page");
  }
  componentWillUnmount() {
    document.body.classList.remove("login-page");
  }
  render() {
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
                            (this.state.codeFocus ? "input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons text_caps-small" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Vetification Code..."
                            onFocus={(e) =>
                              this.setState({ codeFocus: true })
                            }
                            onBlur={(e) =>
                              this.setState({ codeFocus: false })
                            }
                          />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        color="primary"
                        size="lg"
                        href="/password-reset"
                        className="mb-3 btn-round"
                      >
                        Verify Code
                      </Button>
                      <div className="pull-left">
                        <h6>
                          <a href="/login" className="link footer-link">
                            Resend Code
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a href="/login" className="link footer-link">
                            cancel
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
}

export default PasswordResetPage2;
