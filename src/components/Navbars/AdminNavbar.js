import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import classNames from "classnames";
import { BsBoxArrowRight, BsPeopleCircle } from "react-icons/bs";
import { useLocation, useHistory } from "react-router-dom";
import style from "../../assets/scss/additional/dropDownItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { businessTypesData } from "../../redux/business/action";
import en from "../../assets/img/en.png";
import ro from "../../assets/img/ro.png";
import { useTranslation } from "react-i18next";
import {
  changeLanguages,
  getBusinessListGetById,
  businessName,
} from "../../redux/business/action";
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
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
const AdminNavbar = (props) => {
  const { t, i18n } = useTranslation();
  const business = useSelector(({ business }) => business);
  const [languageStatus, setLanguageStatus] = useState(en);
  const changeLanguage = (lng) => (event) => {
    if (lng == "en") {
      setLanguageStatus(en);
    } else {
      setLanguageStatus(ro);
    }
    dispatch(changeLanguages(lng));
    i18n.changeLanguage(lng);
    console.log(lng);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [state, setState] = useState({
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
  });
  const [businessState, setBusinessState] = useState({
    dropdownOpen: false,
    isOpen: false,
  });
  const businessdropdownToggle = (e) => {
    setBusinessState({
      dropdownOpen: !businessState.dropdownOpen,
    });
  };
  const sidebarToggle = React.createRef();
  const toggle = () => {
    if (state.isOpen) {
      setState({
        color: "transparent",
      });
    } else {
      setState({
        color: "white",
      });
    }
    setState({
      isOpen: !state.isOpen,
    });
  };
  const dropdownToggle = (e) => {
    setState({
      dropdownOpen: !state.dropdownOpen,
    });
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  const updateColor = () => {
    if (window.innerWidth < 993 && state.isOpen) {
      setState({
        color: "white",
      });
    } else {
      setState({
        color: "transparent",
      });
    }
  };
  useEffect(() => {
    dispatch(businessTypesData());
  }, [location.pathname])
  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      history.location.pathname !== location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
    if (business.language == "en") {
      setLanguageStatus(en);
      i18n.changeLanguage("en");
    } else {
      setLanguageStatus(ro);
      i18n.changeLanguage("ro");
    }
    // console.log(business.businessLists)
  }, []);

  const bussiness = () => {
    history.push(`/admin/business/${business.filterBusinessList.id}`);
  };

  const logout = () => {
    localStorage.removeItem("persist:business");
    sessionStorage.clear();
    window.history.replaceState(null, null, "/login");
    history.push("/login");
  };
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        window.location.href.indexOf("full-screen-maps") !== -1
          ? "white"
          : state.color
      }
      expand="lg"
      className={
        window.location.href.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute "
          : "navbar-absolute " +
          (state.color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          {/* <NavbarBrand href="/">{props.brandText}</NavbarBrand> */}
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={state.isOpen} navbar className="justify-content-end">
          {/* <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />

              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="now-ui-icons ui-1_zoom-bold" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form> */}
          <Nav navbar>
            {/* <NavItem>
              <Link to="#pablo" className="nav-link">
                <i className="now-ui-icons media-2_sound-wave" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem> */}
            {business.businessLists.length > 0 && (
              <Dropdown
                nav
                isOpen={businessState.dropdownOpen}
                toggle={(e) => businessdropdownToggle(e)}
                className="businessTypes"
              >
                <DropdownToggle caret nav>
                  {business.filterBusinessList.location_name
                    ? business.filterBusinessList.location_name
                    : business.businessLists[0].location_name}
                </DropdownToggle>
                <DropdownMenu className={classNames(style.iconMenu)} right>
                  {business.businessLists.map((item, index) => {
                    // console.log("Check drop down items name", item);
                    return (
                      <DropdownItem
                        tag="a"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          console.log(location.pathname.split("/"));
                          const path = location.pathname;
                          dispatch(getBusinessListGetById(item.id));
                          dispatch(businessName(item.location_name));
                          if (path.split("/")[2] == "business") {
                            history.push(`/admin/business/${item.id}`);
                          }
                          if (path.split("/")[2] == "plan") {
                            history.push(`/admin/plan`);
                          }
                          if (path.split("/")[2] == "gridPlan") {
                            history.push(`/admin/gridPlan`);
                          }
                          if (path.split("/")[2] == "beachMap") {
                            history.push(`/admin/beachMap`);
                          }
                        }}
                        key={index}
                      >
                        {item.location_name}
                      </DropdownItem>
                    );
                  })}
                  <DropdownItem
                    tag="a"
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/admin/wizard")}
                  >
                    <span className="fa fa-plus"></span> {t("Add More")}
                  </DropdownItem>
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
            <NavItem className="cursor">
              <div onClick={bussiness} className="nav-link">
                <BsPeopleCircle className="text-white font-size-20  users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Profile</span>
                </p>
              </div>
            </NavItem>
            <NavItem className="cursor">
              <div onClick={logout} className="nav-link">
                <BsBoxArrowRight className="text-white font-size-20  users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Logout</span>
                </p>
              </div>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

AdminNavbar.defaultProps = {
  brandText: "Default Brand Text",
};

AdminNavbar.propTypes = {
  // string for the page name
  brandText: PropTypes.string,
};

export default AdminNavbar;
