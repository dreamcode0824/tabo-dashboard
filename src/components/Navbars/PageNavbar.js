import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

import classNames from "classnames";
import style from "../../assets/scss/additional/dropDownItem.module.scss";
import { BsBoxArrowRight, BsPeopleCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import en from "../../assets/img/en.png";
import ro from "../../assets/img/ro.png";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import { changeLanguages } from "../../redux/business/action";
import "../../assets/css/custom.scss";
const businessTypeData = [
  { id: 1, businessType: "Beach", count: 1 },
  { id: 2, businessType: "Beach", count: 2 },
  { id: 3, businessType: "Beach", count: 3 },
  { id: 4, businessType: "Pool", count: 1 },
  { id: 5, businessType: "Pool", count: 2 },
  { id: 6, businessType: "Pool", count: 3 },
  { id: 7, businessType: "Restaurant", count: 1 },
  { id: 8, businessType: "Restaurant", count: 2 },
  { id: 9, businessType: "Restaurant", count: 3 },
  { id: 10, businessType: "Club", count: 1 },
  { id: 11, businessType: "Club", count: 2 },
  { id: 12, businessType: "Add", count: "" },
];
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
const PageNavbar = (props) => {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const { t, i18n } = useTranslation();
  const [languageStatus, setLanguageStatus] = useState(en);
  useEffect(() => {
    if (business.language == "en") {
      setLanguageStatus(en);
      i18n.changeLanguage("en");
    } else {
      setLanguageStatus(ro);
      i18n.changeLanguage("ro");
    }
  }, []);
  const [state, setState] = useState({
    dropdownOpen: false,
    isOpen: false,
  });
  const toggle = () => {
    setState({
      isOpen: !state.isOpen,
    });
  };
  const [businessState, setBusinessState] = useState({
    dropdownOpen: false,
    isOpen: false,
  });
  const dropdownToggle = (e) => {
    setState({
      dropdownOpen: !state.dropdownOpen,
    });
  };
  const businessdropdownToggle = (e) => {
    setBusinessState({
      dropdownOpen: !businessState.dropdownOpen,
    });
  };
  const changeLanguage = (lng) => (event) => {
    if (lng == "en") {
      setLanguageStatus(en);
    } else {
      setLanguageStatus(ro);
    }
    dispatch(changeLanguages(lng));
    i18n.changeLanguage(lng);
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  };
  const businessAction = () => {
    if (size.width < 960) {
      setState({
        isOpen: !state.isOpen,
      });
    }
  };
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("persist:business");
    sessionStorage.clear();
    window.history.replaceState(null, null, "/login");
    history.push("/login");
  };
  let location = useLocation();
  return (
    <Navbar
      expand="lg"
      className={
        state.isOpen
          ? "bg-white navbar-absolute"
          : "navbar-transparent navbar-absolute"
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <NavbarToggler onClick={toggle}>
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </NavbarToggler>
          </div>
        </div>
        <Collapse isOpen={state.isOpen} navbar>
          {location.pathname == "/wizard" && location.pathname == "/business" && (
            <Button style={{ background: "#609" }} color="light">
              Logo
            </Button>
          )}
          <Nav className="ml-auto" navbar>
            {props.location.pathname !== "/admin/wizard" &&
              location.pathname != "/wizard" &&
              location.pathname != "/business" && (
                <React.Fragment>
                  <NavItem
                    className={activeRoute("/register")}
                    onClick={businessAction}
                  >
                    <Link to="/register" className="nav-link">
                      <i className="now-ui-icons tech_mobile" /> {t("register")}
                    </Link>
                  </NavItem>
                  <NavItem
                    className={activeRoute("/  ")}
                    onClick={businessAction}
                  >
                    <Link to="/login" className="nav-link">
                      <i className="now-ui-icons users_circle-08" />{" "}
                      {t("login")}
                    </Link>
                  </NavItem>
                </React.Fragment>
              )}

            {location.pathname == "/business" && (
              <Dropdown
                nav
                isOpen={businessState.dropdownOpen}
                toggle={(e) => businessdropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  Business Type
                </DropdownToggle>
                <DropdownMenu className={classNames(style.iconMenu)} right>
                  {businessTypeData.map((item, index) => {
                    return (
                      <DropdownItem tag="a" key={index}>
                        {item.businessType} {item.count}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            )}
            <Dropdown
              nav
              isOpen={state.dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <img src={languageStatus} />
              </DropdownToggle>
              <DropdownMenu className={classNames(style.iconMenu)} right>
                <DropdownItem
                  tag="a"
                  className="cursor"
                  onClick={changeLanguage("en")}
                >
                  <img src={en} />
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  className="cursor"
                  onClick={changeLanguage("ro")}
                >
                  <img src={ro} />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {location.pathname == "/wizard" && (
              <NavItem className="cursor">
                <div onClick={logout} className="nav-link">
                  <BsBoxArrowRight className="text-white font-size-20  users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Logout</span>
                  </p>
                </div>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default PageNavbar;
