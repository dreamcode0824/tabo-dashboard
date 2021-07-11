
import React, { useEffect, useState } from "react";

// reactstrap components
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
  Alert,
} from "reactstrap";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useHistory } from "react-router-dom";
import Datetime from "react-datetime";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { createBsuinessProfile, getCountryAction, getBusinessListGetById, getCityList, changePublishStatus, businessTypesData } from "../../redux/business/action"
import "assets/css/custom.scss";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Modal } from 'react-bootstrap'
const currencyList = [
  { name: "EUR" },
  { name: "USD" },
  { name: "RON" },
  { name: "GBP" },
  { name: "CHF" },
  { name: "NOK" },
  { name: "SEK" },
  { name: "DKK" },
]
const BusinessProfile = ({ match }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const [values, setValues] = useState([])
  const [stateFileUpload, setStateFileUpload] = useState({ idCardUpload: "", additionalDocument: "" })
  const [fileName, setFileName] = useState({ idCard: "", additionalDocument: "", companyIdentification: "" })
  const [countryCityValue, setCountryCityValue] = useState({ birthdatData: "", countryId: 1, cityId: 50, countryStatus: false, cityStatus: false, birthdatDataStatus: false })
  const [state, setState] = useState(false)
  const [useableList, setUseableList] = useState([]);
  const [publishStatus, setPublishStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [checkResultData, setCheckResultData] = useState({
    businessProfileStatus: false,
    planDataLength: 0,
    businessSettings: 0,
    businessYear: 0,
    businessRules: 0,
    price: 0,
    businessElement: 0,
    businessUser: 0,
    businessZone: 0,
    businessPhotos: 0,
    businessWeek: 0,
    businessFacilities: 0
  })
  const getPublishStatus = async (businessId) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/checkPublish`, {
      id: businessId,
    })
      .then(function (response) {
        if (response.data.status) {
          changeStatusAction("pending")
        } else {
          handleShow()
        }
        setCheckResultData(response.data)
        setPublishStatus(response.data.status)
      })
  }
  useEffect(() => {
    console.log("first call")
    dispatch(businessTypesData());
  }, [])
  useEffect(() => {
    if (business.businessLists.length > 0) {
      const filterResult = business.businessLists.filter(ele => ele.id == match.params.id)
      setSelectedStatus(filterResult[0].status)
    }
  }, [business])
  useEffect(() => {
    dispatch(getCountryAction())
    setValues(business.filterBusinessList)
    if (business.businessLists) {
      const filterList = business.businessLists.filter(ele => ele.representative_email != null)
      if (filterList) {
        setUseableList(filterList)
      }
    }
  }, [match.params.id])
  const idCard = React.createRef();
  const additionalDocument = React.createRef();
  const companyIdentification = React.createRef();
  const handleFileInput = (e, type) => {
    console.log(type)
    if (type === "idCard") {
      idCard.current.click(e);
    }
    if (type === "additionalDocument") {
      additionalDocument.current.click(e);
    }
    if (type === "companyIdentification") {
      companyIdentification.current.click(e);
    }
  };
  const addIdCardFile = (e, type) => {
    setStateFileUpload({ ...stateFileUpload, [type]: e.target.files })
    let fileNames;
    for (let i = 0; i < e.target.files.length; i++) {
      fileNames = e.target.files[i].name;
    }
    setFileName({ ...fileName, [type]: fileNames })
    docsUpload(type, e.target.files[0])
    console.log(type)
  };
  const docsUpload = (type, file) => {
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    if (type === "idCard") {
      formData.append('idCard', file);
      formData.append('type', "idCard");
    }
    if (type === "additionalDocument") {
      formData.append('additionalDocument', file);
      formData.append('type', "additionalDocument");
    }
    if (type === "companyIdentification") {
      formData.append('companyIdentification', file);
      formData.append('type', "companyIdentification");
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/file-docs/upload`, formData, config)
      .then((response) => {
        if (response) {
          console.log(response)
        }
      }).catch((error) => {
      });
  }
  const handleChangeData = date => {
    const valueOfInput = date.format("MM/DD/YYYY");
    setCountryCityValue({ ...countryCityValue, birthdatData: valueOfInput })
  };
  const demoData = (id) => (event) => {
    setState(true)
    const arrFilter = business.businessLists.filter(ele => ele.id == id)
    setValues(arrFilter[0])
  }
  const handleClick = (event) => {
    dispatch(getCityList(event.target.value))
  }
  const changeStatusAction = (status) => {
    setSelectedStatus(status)
    dispatch(changePublishStatus(business.filterBusinessList.id, status))
  }
  const formik = useFormik({
    initialValues: {
      location_name: state ? business.businessData.location_name : values.location_name ? values.location_name : "",
      representative_first_name: values.representative_first_name ? values.representative_first_name : "",
      representative_last_name: values.representative_last_name ? values.representative_last_name : "",
      name: values.name ? values.name : "",
      representative_phone: values.representative_phone ? values.representative_phone : "",
      representative_email: values.representative_email ? values.representative_email : "",
      address: values.address ? values.address : "",
      country_id: values.country_id ? values.country_id : 1,
      city_id: values.city_id ? values.city_id : 50,
      zipcode: values.zipcode ? values.zipcode : "",
      reg_com_number: values.reg_com_number ? values.reg_com_number : "",
      capital_social: values.capital_social ? values.capital_social : "",
      cui_number: values.cui_number ? values.cui_number : "",
      vat: values.vat ? values.vat : "",
      vat_number: values.vat_number ? values.vat_number : "",
      bank_name: values.bank_name ? values.bank_name : "",
      bank_account: values.bank_account ? values.bank_account : "",
      bank_routing_number: values.bank_routing_number ? values.bank_routing_number : "",
      bank_account_holder_name: values.bank_account_holder_name ? values.bank_account_holder_name : "",
      description: values.description ? values.description : "",
      currency: values.currency ? values.currency : "EUR",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      location_name: Yup.string().required('Required'),
      representative_first_name: Yup.string().required('Required'),
      representative_last_name: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      representative_phone: Yup.string().required('Required'),
      representative_email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().required('Required'),
      // country: Yup.string().required('Required'),
      // city: Yup.string().required('Required'),
      zipcode: Yup.string().required('Required'),
      reg_com_number: Yup.string().required('Required'),
      capital_social: Yup.string().required('Required'),
      cui_number: Yup.string().required('Required'),
      vat: Yup.string().required('Required'),
      vat_number: Yup.string().required('Required'),
      bank_name: Yup.string().required('Required'),
      bank_account: Yup.string().required('Required'),
      bank_routing_number: Yup.string().required('Required'),
      bank_account_holder_name: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(createBsuinessProfile(values, countryCityValue, match.params.id, resolve, reject))
      }).then((success) => {
        console.log(success)
      }).catch(errors => {
        if (errors) {
          formik.errors.location_name = errors;
          console.log(errors)
        }
      });
    }
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const publishAction = () => {
    if (selectedStatus == "inactive") {
      getPublishStatus(business.filterBusinessList.id)
    }
  }
  console.log(selectedStatus, "selected status------------------->")
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Form onSubmit={formik.handleSubmit}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <h5 className="title pt-2">{t("Business Profile")}</h5>
                      <Button color="primary" className="m-0 mx-3 btn-round" color="success" onClick={publishAction}>
                        {
                          selectedStatus == "inactive" ? "PUBLISH" :
                            selectedStatus == "pending" ? "PENDING APPROVAL" :
                              selectedStatus == "active" ? "PUBLISHED" : "SUSPENDED"
                        }
                      </Button>
                    </div>
                    {useableList.length > 0 && (
                      <React.Fragment>
                        <div className="d-flex">
                          {business.filterBusinessList.representative_email == null && (
                            <UncontrolledDropdown tyle={{ background: "#609" }}>
                              <DropdownToggle caret tyle={{ background: "#609" }} color="info" className="m-0 btn-round">
                                 {t("Use an already added company")}
                              </DropdownToggle>
                              <DropdownMenu>
                                {useableList && (
                                  useableList.map((item, index) => {
                                    return (
                                      <DropdownItem key={index} onClick={demoData(item.id)}>{item.location_name}</DropdownItem>
                                    )
                                  })
                                )}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          )}
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <div>
                    <h6>{t("Location Name")}</h6>
                  </div>
                  <Row>
                    <Col className="pl-3" md="4">
                      <FormGroup>
                        <label>{t("Location Name")}</label>
                        <Input
                          placeholder={t("Location Name")}
                          type="text"
                          name="location_name"
                          value={formik.values.location_name}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.location_name && formik.touched.location_name && (
                        <FormText color="danger">
                          {formik.errors.location_name}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <div>
                    <h6>{t("User Profile")}</h6>
                  </div>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>{t("First_Name")}</label>
                        <Input
                          placeholder={t("First_Name")}
                          type="text"
                          name="representative_first_name"
                          value={formik.values.representative_first_name}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.representative_first_name && formik.touched.representative_first_name && (
                        <FormText color="danger">
                          {formik.errors.representative_first_name}
                        </FormText>
                      )}
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>{t("Last_Name")}</label>
                        <Input
                          placeholder={t("Last_Name")}
                          type="text"
                          name="representative_last_name"
                          value={formik.values.representative_last_name}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.representative_last_name && formik.touched.representative_last_name && (
                        <FormText color="danger">
                          {formik.errors.representative_last_name}
                        </FormText>
                      )}
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>{t("Company Name")}</label>
                        <Input
                          placeholder={t("Company Name")}
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.name && formik.touched.name && (
                        <FormText color="danger">
                          {formik.errors.name}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>{t("Birth Day")}</label>
                        <Datetime
                          timeFormat={false}
                          onChange={handleChangeData}
                          dateFromat='YYYY-MM-dd'
                          value={countryCityValue.birthdatData}
                          inputProps={{ placeholder: `${t("Birth Day")}` }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                        {t("Email")}
                        </label>
                        <Input
                          placeholder={t("Email")}
                          type="email"
                          name="representative_email"
                          value={formik.values.representative_email}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.representative_email && formik.touched.representative_email && (
                        <FormText color="danger">
                          {formik.errors.representative_email}
                        </FormText>
                      )}
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                        {t("Phone")}
                        </label>
                        <Input
                          placeholder={t("Phone")}
                          type="number"
                          name="representative_phone"
                          value={formik.values.representative_phone}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.representative_phone && formik.touched.representative_phone && (
                        <FormText color="danger">
                          {formik.errors.representative_phone}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>{t("Address")}</label>
                        <Input
                          placeholder={t("Home Address")}
                          type="text"
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.address && formik.touched.address && (
                        <FormText color="danger">
                          {formik.errors.address}
                        </FormText>
                      )}
                    </Col>
                    <Col className="" md="6">
                      {business.countryData && (
                        <>
                          <FormGroup>
                            <Label for="disabled1">{t("Country")}</Label>
                            <Input
                              type="select"
                              id="disabled1"
                              name="country_id"
                              onClick={handleClick}
                              value={formik.values.country_id}
                              onChange={formik.handleChange}
                            >
                              {business.countryData.map((item, index) => {
                                return (
                                  <option value={item.id} key={index} className="text-dark">{item.name}</option>
                                )
                              })}
                            </Input>
                          </FormGroup>
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="6">

                      <FormGroup>
                        <Label for="disabled1">{t("City")}</Label>
                        <Input
                          type="select"
                          id="disabled1"
                          name="city_id"
                          value={formik.values.city_id}
                          onChange={formik.handleChange}
                        >
                          {business.cityLists.length > 0 ? (
                            <>
                              {business.cityLists.map((item, index) => {
                                return (
                                  <option value={item.id} key={index} className="text-dark">{item.name}</option>
                                )
                              })}
                            </>
                          ) : (
                              <option value="0"></option>
                            )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>{t("Postal Code")}</label>
                        <Input
                          placeholder={t("ZIP Code")}
                          type="number"
                          name="zipcode"
                          value={formik.values.zipcode}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.zipcode && formik.touched.zipcode && (
                        <FormText color="danger">
                          {formik.errors.zipcode}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup className="form-file-upload form-file-simple">
                        <Label for="disabled1">{t("ID card")}</Label>
                        <Input
                          type="text"
                          className="inputFileVisible"
                          placeholder={t("ID card")}
                          onClick={(e) => handleFileInput(e, "idCard")}
                          defaultValue={fileName.idCard}
                        />
                        <input
                          type="file"
                          className="inputFileHidden"
                          style={{ zIndex: -1 }}
                          ref={idCard}
                          onChange={(e) => addIdCardFile(e, "idCard")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup className="form-file-upload form-file-simple">
                        <Label for="disabled1">{t("Additional Document")}</Label>
                        <Input
                          type="text"
                          className="inputFileVisible"
                          placeholder={t("Additional Document")}
                          onClick={(e) => handleFileInput(e, "additionalDocument")}
                          defaultValue={fileName.additionalDocument}
                        />
                        <input
                          type="file"
                          className="inputFileHidden"
                          style={{ zIndex: -1 }}
                          ref={additionalDocument}
                          onChange={(e) => addIdCardFile(e, "additionalDocument")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup className="form-file-upload form-file-simple">
                        <Label for="disabled1">{t("Company Identification")}</Label>
                        <Input
                          type="text"
                          className="inputFileVisible"
                          placeholder={t("Company Identification")}
                          onClick={(e) => handleFileInput(e, "companyIdentification")}
                          defaultValue={fileName.companyIdentification}
                        />
                        <input
                          type="file"
                          className="inputFileHidden"
                          style={{ zIndex: -1 }}
                          ref={companyIdentification}
                          onChange={(e) => addIdCardFile(e, "companyIdentification")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div>
                    <h6>{t("Company")}</h6>
                  </div>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label>{t("Commerical Number")}</label>
                        <Input
                          placeholder={t("Commerical Number")}
                          type="text"
                          name="reg_com_number"
                          value={formik.values.reg_com_number}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.reg_com_number && formik.touched.reg_com_number && (
                        <FormText color="danger">
                          {formik.errors.reg_com_number}
                        </FormText>
                      )}
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>{t("Woriking Capital")}</label>
                        <Input
                          placeholder={t("Woriking Capital")}
                          type="text"
                          name="capital_social"
                          value={formik.values.capital_social}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.capital_social && formik.touched.capital_social && (
                        <FormText color="danger">
                          {formik.errors.capital_social}
                        </FormText>
                      )}
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>{t("Fiscal Number")}</label>
                        <Input
                          placeholder={t("Fiscal Number")}
                          type="text"
                          name="cui_number"
                          value={formik.values.cui_number}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.cui_number && formik.touched.cui_number && (
                        <FormText color="danger">
                          {formik.errors.cui_number}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label>{t("VAT %")}</label>
                        <Input
                          placeholder={t("VAT %")}
                          type="number"
                          name="vat"
                          value={formik.values.vat}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.vat && formik.touched.vat && (
                        <FormText color="danger">
                          {formik.errors.vat}
                        </FormText>
                      )}
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>{t("Vat Number")}</label>
                        <Input
                          placeholder={t("Vat Number")}
                          type="text"
                          name="vat_number"
                          value={formik.values.vat_number}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.vat_number && formik.touched.vat_number && (
                        <FormText color="danger">
                          {formik.errors.vat_number}
                        </FormText>
                      )}
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="disabled1">{t("Select Currency")}</Label>
                        <Input type="select" id="disabled1"
                          name="currency"
                          value={formik.values.currency}
                          onChange={formik.handleChange}>
                          {currencyList.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>{item.name}</option>
                            )
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div>
                    <h6>{t("Company Bank Details")}</h6>
                  </div>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>{t("Bank Name")}</label>
                        <Input
                          placeholder={t("Bank Name")}
                          type="text"
                          name="bank_name"
                          value={formik.values.bank_name}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.bank_name && formik.touched.bank_name && (
                        <FormText color="danger">
                          {formik.errors.bank_name}
                        </FormText>
                      )}
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>{t("Bank Account")}</label>
                        <Input
                          placeholder={t("Bank Account")}
                          type="text"
                          name="bank_account"
                          value={formik.values.bank_account}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.bank_account && formik.touched.bank_account && (
                        <FormText color="danger">
                          {formik.errors.bank_account}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>{t("Routing Number")}</label>
                        <Input
                          placeholder={t("Routing Number")}
                          type="text"
                          name="bank_routing_number"
                          value={formik.values.bank_routing_number}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.bank_routing_number && formik.touched.bank_routing_number && (
                        <FormText color="danger">
                          {formik.errors.bank_routing_number}
                        </FormText>
                      )}
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>{t("Account holder name")}</label>
                        <Input
                          placeholder={t("Account holder name")}
                          type="text"
                          name="bank_account_holder_name"
                          value={formik.values.bank_account_holder_name}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.bank_account_holder_name && formik.touched.bank_account_holder_name && (
                        <FormText color="danger">
                          {formik.errors.bank_account_holder_name}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>{t("Description")}</label>
                        <Input
                          cols="80"
                          placeholder={t("Here can be your description")}
                          rows="4"
                          type="textarea"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                        />
                      </FormGroup>
                      {formik.errors.description && formik.touched.description && (
                        <FormText color="danger">
                          {formik.errors.description}
                        </FormText>
                      )}
                    </Col>
                  </Row>
                </CardBody>
                <div className="d-flex justify-content-end p-4">
                  <Button style={{ background: "#609" }} type="submit" className="m-0 btn-round" color="success">{t("Save")}</Button>
                </div>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div>
            {(business.filterBusinessList.type == "beach" || business.filterBusinessList.type == "pool") ? (
              <div>
                {!checkResultData.businessProfileStatus && (
                  <p className="mb-0">You have to set Business Profile.</p>
                )}
                {checkResultData.businessPlan == 0 && (
                  <p className="mb-0">You have to set Business Plan.</p>
                )}
                {checkResultData.businessYear == 0 && (
                  <p className="mb-0">You have to set Activity Period.</p>
                )}
                {checkResultData.businessWeek == 0 && (
                  <p className="mb-0">You have to set Working Hour.</p>
                )}
                {checkResultData.businessElement == 0 && (
                  <p className="mb-0">You have to set Business Grid.</p>
                )}
                {!checkResultData.businessZoneStatus && (
                  <p className="mb-0">You have to set Business Zone.</p>
                )}
                {!checkResultData.businessLocationStatus && (
                  <p className="mb-0">You have to set Business Location.</p>
                )}
                {checkResultData.businessPhotos == 0 && (
                  <p className="mb-0">You have to set Location Photos.</p>
                )}
                {checkResultData.businessRules == 0 && (
                  <p className="mb-0">You have to set Business Rule.</p>
                )}
                {checkResultData.businessFacilities == 0 && (
                  <p className="mb-0">You have to set Business Facilities.</p>
                )}
                {checkResultData.price == 0 && (
                  <p className="mb-0">You have to set Price Planner.</p>
                )}
                {checkResultData.businessUser == 0 && (
                  <p className="mb-0">You have to set Business Employee.</p>
                )}
              </div>
            ) : (
              <div>
                {!checkResultData.businessProfileStatus && (
                  <p className="mb-0">You have to set Business Profile.</p>
                )}
                {checkResultData.businessPlan == 0 && (
                  <p className="mb-0">You have to set Business Plan.</p>
                )}
                {checkResultData.businessYear == 0 && (
                  <p className="mb-0">You have to set Activity Period.</p>
                )}
                {checkResultData.businessWeek == 0 && (
                  <p className="mb-0">You have to set Working Hour.</p>
                )}
                {checkResultData.businessElement == 0 && (
                  <p className="mb-0">You have to set Business Grid.</p>
                )}
                {!checkResultData.businessLocationStatus && (
                  <p className="mb-0">You have to set Business Location.</p>
                )}
                {checkResultData.businessPhotos == 0 && (
                  <p className="mb-0">You have to set Location Photos.</p>
                )}
                {checkResultData.businessRules == 0 && (
                  <p className="mb-0">You have to set Business Rule.</p>
                )}
                {checkResultData.businessFacilities == 0 && (
                  <p className="mb-0">You have to set Business Facilities.</p>
                )}
                {checkResultData.businessUser == 0 && (
                  <p className="mb-0">You have to set Business Employee.</p>
                )}
              </div>
            )}
            <Button color="success" onClick={handleClose}>OK</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BusinessProfile;
