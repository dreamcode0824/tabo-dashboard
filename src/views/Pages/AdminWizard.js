import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, Input, FormGroup } from "reactstrap";
import bgImage from "assets/img/bg.jpg";
import { useHistory, Redirect } from "react-router-dom";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { businessTypes } from "../../redux/business/action";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "assets/css/custom.scss";
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
const AdminWizard = (props) => {
  const verifyLocation = props.location.pathname;
  let history = useHistory();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const [businessData, setBusinessData] = useState([]);
  const [businessType, setBusinessType] = useState({ beach: 1, pool: 1, restaurant: 1, terrace: 1, club: 1 });
  const [lockStatus, setLockStatus] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    defaultBeach: 0,
    defaultPool: 0,
    defaultRestaurant: 0,
    defaultTerrace: 0,
    defaultClub: 0,
  })
  useEffect(() => {
    let arr = [...title];
    if (business.businessLists) {
      arr.map((item, index) => {
        business.businessLists.map((list, i) => {
          if (item.titleName == list.type) {
            console.log(item.titleName, list, "**********************")
            arr[index].value.map((val, j) => {
              if (val.name == list.number) {
                arr[index].value[j - 1].status = true;
                // arr[index].value[0].status = true;
              }
            });
          } else {
            // arr[index].value[0].status = false;
          }
        });
      });
      if (business.businessLists) {
        var countBeach = [];
        var countPool = [];
        var countRestaurant = [];
        var countTerrace = [];
        var countClub = [];
        business.businessLists.map((items, k) => {
          if (items.type == "beach") {
            countBeach.push(items.id);
          }
          if (items.type == "pool") {
            countPool.push(items.id);
          }
          if (items.type == "restaurant") {
            countRestaurant.push(items.id);
          }
          if (items.type == "terrace") {
            countTerrace.push(items.id);
          }
          if (items.type == "club") {
            countClub.push(items.id);
          }
        });
        console.log(countBeach.length, countPool.length, countRestaurant.length, countTerrace.length, countClub.length, 'PPPPPPPPPPPPPPPPP')
        setBusinessType({
          ...businessType,
          beach: countBeach.length,
          pool: countPool.length,
          restaurant: countRestaurant.length,
          terrace: countTerrace.length,
          club: countClub.length,
        });
        setCurrentLocation({
          defaultBeach: countBeach.length,
          defaultPool: countPool.length,
          defaultRestaurant: countRestaurant.length,
          defaultTerrace: countTerrace.length,
          defaultClub: countClub.length,
        })
      }
      setBusinessData(arr);
    } else {
      setBusinessData(arr);
    }
  }, [business]);
  const dispatch = useDispatch();
  const lockButtonStatus = (name, value) => {
    let status = true;
    switch (name) {
      case "beach":
        if (value !== currentLocation.defaultBeach) {
          status = false;
        } else {
          status = true;
        }
        break;
      case "pool":
        if (value !== currentLocation.defaultPool) {
          status = false;
        } else {
          status = true;
        }
        break;
      case "restaurant":
        if (value !== currentLocation.defaultRestaurant) {
          status = false;
        } else {
          status = true;
        }
        break;
      case "terrace":
        if (value !== currentLocation.defaultTerrace) {
          status = false;
        } else {
          status = true;
        }
        break;
      case "club":
        if (value !== currentLocation.defaultClub) {
          status = false;
        } else {
          status = true;
        }
        break;
    }
    return status;
  }
  const handleChange = (name) => (event) => {
    let status = lockButtonStatus(name, event.target.value * 1);
    console.log(status, "LLLLLLLLLLLLLL")
    setLockStatus(status)
    setBusinessType({ ...businessType, [name]: event.target.value * 1 });
  };
  const next = () => {
    console.log(businessType, currentLocation, "KKKKKKKKKKKKKKKKKKKK")
    dispatch(businessTypes(businessType, history));
  };
  return (
    <>
      {business.accessToken ? (
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <Row className="d-flex justify-content-center">
              <Col md="5">
                <div className="mb-5">
                  <h4
                    className={
                      verifyLocation === "/wizard"
                        ? "text-center mb-5 text-white px-4 pt-5"
                        : "text-center mb-5 text-black px-4 pt-5"
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
                        <FormGroup className="col-md-3 admin-wizard">
                          <Input
                            type="select"
                            name="select"
                            id="inputState"
                            className={"text-black"}
                            onChange={handleChange(`${list.titleName}`)}
                          >
                            {list.value.map((item, index) => {
                              return (
                                <option
                                  className={
                                    item.status ? "light-gray" : "text-dark"
                                  }
                                  disabled={item.status ? true : false}
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
                    disabled={lockStatus}
                  >
                    {t("Confirm")}
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

export default AdminWizard;
