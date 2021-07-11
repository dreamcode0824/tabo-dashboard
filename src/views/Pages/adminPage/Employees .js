import React, { useState, useEffect } from "react";
import {
  Table,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import PanelHeader from "../../../components/PanelHeader/PanelHeader"
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, createAction, updateAction, deleteActionRequest, employeeValidation } from "../../../redux/employee/action"
const Employees = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const employee = useSelector(({ employee }) => employee);
  const [employeeData, setEmployeeData] = useState({ name: "", unlock_code: "", role: "Owner", id: "" })
  const [updateStatus, setUpdateStatus] = useState(false);
  const [codeValidation, setCodeValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  useEffect(() => {
    dispatch(getEmployees())
  }, [business.filterBusinessList])
  const [state, setState] = useState({
    modalDemo: false,
    modalDemoPop: false
  })
  const toggleModalDemo = () => {
    setState({
      ...state,
      modalDemo: !state.modalDemo
    });
  }
  const toggleModalDemoPop = () => {
    setState({
      ...state,
      modalDemoPop: !state.modalDemoPop
    });
  }
  const unLockCodeValidation = (name, value) => {
    return new Promise((resolve, reject) => {
      dispatch(employeeValidation(resolve, name, value))
    }).then((success) => {
      if (name == "name") {
        if (success.business_user.length > 0) {
          setNameValidation(true)
        } else {
          setNameValidation(false)
        }
      } else {
        if (success.business_user.length > 0) {
          setCodeValidation(true)
        } else {
          setCodeValidation(false)
        }
      }
    }).catch(errors => {
      if (errors) {
      }
    });
  }
  const handleChange = (name) => (event) => {
    if (name !== "role") {
      unLockCodeValidation(name, event.target.value)
    }
    setEmployeeData({ ...employeeData, [name]: event.target.value })
  }
  const saveAction = (event) => {
    if (!codeValidation && !nameValidation) {
      if (updateStatus) {
        dispatch(updateAction(employeeData))
      } else {
        dispatch(createAction(employeeData))
      }
      setState({
        ...state,
        modalDemo: !state.modalDemo
      });
    }
  }
  const editAction = (id) => (event) => {
    setCodeValidation(false)
    setNameValidation(false)
    setDeleteId(id)
    setUpdateStatus(true)
    setState({
      ...state,
      modalDemo: !state.modalDemo
    });
    const filterData = employee.allEmployees.filter(ele => ele.id === id);
    if (filterData.length > 0) {
      setEmployeeData({ id: filterData[0].id, name: filterData[0].name, unlock_code: filterData[0].unlock_code, role: filterData[0].role })
    }
  }
  const deleteAction = (id) => (event) => {
    setDeleteId(id)
    setState({
      ...state,
      modalDemoPop: !state.modalDemoPop
    });
  }
  const deletActionAgain = (event) => {
    dispatch(deleteActionRequest(deleteId))
    setState({
      ...state,
      modalDemoPop: !state.modalDemoPop
    });
  }
  const addEmployee = () => {
    setCodeValidation(false)
    setNameValidation(false)
    setState({
      ...state,
      modalDemo: !state.modalDemo
    });
    setEmployeeData({ name: "", unlock_code: "", role: "Owner", id: "" })
  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="px-4">
                <h5 className="title">{t("Employees")}</h5>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-end">
                  <Button color="primary rule-button" className="btn-round" onClick={addEmployee}>
                    <i className="fa fa-plus" />{t("Add Employee")}
                  </Button>
                </div>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-left">{t("Name")}</th>
                      <th className="text-center">{t("Position")}</th>
                      <th className="text-center">{t("PIN code")}</th>
                      <th className="text-center">{t("Verified?")}</th>
                      <th className="text-center">{t("Date")}</th>
                      <th className="text-right">{t("Actions")}</th>
                    </tr>
                  </thead>
                  {employee.allEmployees.length > 0 ? (
                    <tbody>
                      {employee.allEmployees.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-left">{item.name}</td>
                            <td className="text-center">{item.role}</td>
                            <td className="text-center">{item.unlock_code}</td>
                            <td className="text-center">{item.verified ? "YES" : "NO"}</td>
                            <td className="text-center">{item.updated_at.split('T')[0]}</td>
                            <td className="text-right btns-mr-5">
                              <Button
                                className="btn-icon"
                                color="success"
                                id="tooltip26024663"
                                size="sm"
                                type="button"
                                onClick={editAction(item.id)}
                              >
                                <i className="now-ui-icons ui-2_settings-90" />
                              </Button>
                              <Button
                                className="btn-icon btn-round"
                                color="danger"
                                id="tooltip930083782"
                                size="sm"
                                type="button"
                                onClick={deleteAction(item.id)}
                              >
                                <i className="now-ui-icons ui-1_simple-remove" />
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="bold text-center">
                        <td colSpan="6">There is no data to display.</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Modal isOpen={state.modalDemo} toggle={toggleModalDemo}>
            <ModalHeader className="justify-content-center" toggle={toggleModalDemo}>
              <p className="bold mb-0">{t("Employee")}</p>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input type="text" name="name" id="exampleName" value={employeeData.name} placeholder="Name" onChange={handleChange("name")} />
                {nameValidation && (
                  <p className="mb-0 text-danger">{`${employeeData.name} aready taken`}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect1">{t("Choose_rank")}</Label>
                <Input type="select" name="select" value={employeeData.role} onChange={handleChange("role")} id="exampleSelect1">
                  <option>{t("Owner")} </option>
                  <option>{t("Manager")}</option>
                  <option>{t("Cashier")}</option>
                  <option>{t("Hostess")}</option>
                  <option>{t("Beach boy")}</option>
                </Input>
              </FormGroup>
              <FormGroup className="py-3">
                <Input type="number" name="pinCode" id="PIN_code" value={employeeData.unlock_code} placeholder={t("Set unlock code")} onChange={handleChange("unlock_code")} />
                {codeValidation && (
                  <p className="mb-0 text-danger">{t("Unlock code must be unique")}</p>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" className="btn-round" onClick={toggleModalDemo}>
                {t("Close")}
              </Button>
              <Button color="primary" className="btn-round" onClick={saveAction}>
                {t("Save Profile")}
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={state.modalDemoPop} toggle={toggleModalDemoPop}>
            <ModalBody>
              <h5 className="title text-center">Are you sure to delete?</h5>
            </ModalBody>
            <ModalFooter>
              <Button color="success" className="btn-round" onClick={deletActionAgain}>
                Yes
              </Button>
              <Button color="danger" className="btn-round" onClick={toggleModalDemoPop}>
                No
              </Button>
            </ModalFooter>
          </Modal>
        </Row>
      </div>
    </>
  )
}
export default Employees;