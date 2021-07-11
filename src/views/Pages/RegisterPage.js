import React, { useState, useEffect } from 'react';
import classNames from 'classnames'
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Button,
  FormText,
  Alert,
} from "reactstrap";
import { useFormik } from 'formik';
import { Multiselect } from 'multiselect-react-dropdown';
import * as Yup from 'yup';
import style from '../../assets/scss/additional/select.module.scss'
import bgImage from "assets/img/bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registerValue, registerAction, getCountryAction } from "../../redux/business/action"
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../../assets/css/custom.scss";
var selectPositions = [
  { value: "Owner", label: "Owner" },
  { value: "Administrator", label: "Administrator" },
  { value: "Company Representative", label: "Company Representative" },
  { value: "Manager", label: "Manager" },
]

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [display, setDisplay] = useState(false)
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth < 960) {
        setDisplay(true)
      }
      if (window.innerWidth > 960) {
        setDisplay(false)
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return display;
}
const RegisterPage = () => {
  const size = useWindowSize();
  const [state, setState] = useState({ country: null });
  const [allowRegister, setAllowRegister] = useState(true);
  const [countryList, setCounryList] = useState([])
  const business = useSelector(({ business }) => business);
  const [visible, setVisible] = useState(false)
  const filterOptions = (candidate, input) => {
    if (input) {
      return candidate.label.toLowerCase().startsWith(input.toLowerCase());
    }
    return true;
  }
  useEffect(() => {
    dispatch(getCountryAction())
  }, [])
  useEffect(() => {
    if (business.countryData) {
      let arr = [];
      business.countryData.map((item, index) => {
        arr.push({ value: item.id, label: item.name })
      })
      setCounryList(arr)
    }
  }, [business.countryData])
  const onDismiss = () => {
    setVisible(!visible)
  }
  const dispatch = useDispatch();
  const history = useHistory();
  const allowPolicy = (event) => {
    setAllowRegister(!(event.target.checked))
  }
  const { t } = useTranslation();
  const selectResources = [
    { value: "Pool", label: t("Pool") },
    { value: "Beach", label: t("Beach") },
    { value: "Restaurant", label: t("Restaurant") },
    { value: "Club", label: t("Club") },
    { value: "Terrace", label: t("Terrace") },
    { value: "Events", label: t("Events") },
  ]
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      position: "",
      phoneNumber: "",
      country: "",
      email: "",
      password: "",
      interested_in: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('Required'),
      lastName: Yup.string()
        .required('Required'),
      phoneNumber: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: values => {
      let arr = [];
      arr.push(values);
      arr.map((item, index) => {
        if (state.position) {
          arr[index].position = state.position.value;
        }
        if (state.country) {
          arr[index].country = state.country.value;
        }
        if (state.interested_in && state.interested_in.length > 0) {
          arr[index].interested_in = state.interested_in
        }
      })
      dispatch(registerValue(arr[0]))
      dispatch(registerAction(history))
    }
  })
  return (
    <>
      <div style={{ position: "absolute", top: "50px", right: "50px" }}>
        <Alert
          color="info"
          className="alert-with-icon"
          style={{ zIndex: "200" }}
          isOpen={business.loginStatus}
          toggle={onDismiss}
        >
          <span data-notify="icon" className="now-ui-icons ui-1_bell-53"></span>
          <span data-notify="message">{business.registerMessage}</span>
        </Alert>
      </div>
      <div className="content">
        <div className="register-page">
          <Container>
            <Row className="justify-content-center">
              <Col lg={5} md={8} xs={12} className={size ? "d-none" : ""}>
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-primary">
                    <i className="now-ui-icons media-2_sound-wave" />
                  </div>
                  <div className="description">
                    <h5 className="info-title">Marketing</h5>
                    <p className="description">
                      We've created the marketing campaign of the website. It
                      was a very interesting collaboration.
                      </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="now-ui-icons media-1_button-pause" />
                  </div>
                  <div className="description">
                    <h5 className="info-title">Fully Coded in React 16</h5>
                    <p className="description">
                      We've developed the website with React 16, HTML5 and
                      CSS3. The client has access to the code using GitHub.
                      </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons users_single-02" />
                  </div>
                  <div className="description">
                    <h5 className="info-title">Built Audience</h5>
                    <p className="description">
                      There is also a Fully Customizable CMS Admin Dashboard
                      for this product.
                      </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={8} xs={12}>
                <Form onSubmit={formik.handleSubmit}>
                  <Card className="card-signup register-style">
                    <CardHeader className="text-center">
                      <CardTitle tag="h4">{t("register")}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border form-control-lg px-4px" +
                          (state.firstnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder={t("First Name")}
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.errors.firstName && formik.touched.firstName && (
                        <FormText color="danger">
                          {formik.errors.firstName}
                        </FormText>
                      )}
                      <InputGroup
                        className={
                          "no-border form-control-lg  px-4px" +
                          (state.firstnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder={t("Last Name")}
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.errors.lastName && formik.touched.lastName && (
                        <FormText color="danger">
                          {formik.errors.lastName}
                        </FormText>
                      )}
                      <InputGroup
                        className={
                          "no-border padding-left-4px" +
                          (state.countryFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons location_pin" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Select
                          className={classNames(style.countrySelect, "react-select basic-font position-select-style")}
                          classNamePrefix="react-select"
                          placeholder={t("Position")}
                          name="position"
                          options={selectPositions}
                          value={state.position}
                          onChange={(value) =>
                            setState({ position: value })
                          }
                        />
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border form-control-lg  px-4px" +
                          (state.emailFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          placeholder={t("Email")}
                          name="email"
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
                          "no-border form-control-lg  px-4px" +
                          (state.phoneNumberFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons tech_mobile" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          placeholder={t("Phone Number")}
                          name="phoneNumber"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                        <FormText color="danger">
                          {formik.errors.phoneNumber}
                        </FormText>
                      )}
                      <InputGroup
                        className={
                          "no-border form-control-lg  px-4px" +
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
                          placeholder={t("password")}
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.errors.password && formik.touched.password && (
                        <FormText color="danger">
                          {formik.errors.password}
                        </FormText>
                      )}
                      {countryList.length > 0 && (
                        <InputGroup
                          className={
                            "no-border padding-left-4px" +
                            (state.countryFocus ? "input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons business_globe" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Select
                            className={classNames(style.countrySelect, "react-select basic-font country-select-style")}
                            classNamePrefix="react-select"
                            placeholder={t("Country")}
                            name="country"
                            options={countryList}
                            value={state.country}
                            filterOption={filterOptions}
                            onChange={(value) =>
                              setState({ ...state, country: value })
                            }
                          />
                        </InputGroup>
                      )}
                      <InputGroup
                        className={
                          "no-border padding-left-4px" +
                          (state.countryFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons files_box" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Multiselect
                          name="interested_in"
                          options={selectResources}
                          selectedValues={state.interested_in}
                          onSelect={(v) => {
                            setState({ ...state, interested_in: v })
                          }}
                          onRemove={(v) => {
                            setState({ ...state, interested_in: v })
                          }}
                          showCheckbox={true}
                          displayValue="label"
                          placeholder={t("Interested in")}
                        />
                      </InputGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" onClick={allowPolicy} />
                          <span className="form-check-sign" />
                          <div>
                            {t("I agree to the")}{" "}
                            <a href="#something">{t("terms and conditions")}</a>.
                            </div>
                        </Label>
                      </FormGroup>

                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        color="primary"
                        size="lg"
                        className="btn-round"
                        type="submit"
                        disabled={allowRegister}
                      >
                        {t("Send Request")}
                      </Button>
                    </CardFooter>
                  </Card></Form>
              </Col>
            </Row>
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
export default RegisterPage;
