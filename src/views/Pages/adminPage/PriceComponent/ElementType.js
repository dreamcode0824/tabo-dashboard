import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Col from "reactstrap/lib/Col";
import { elementTypesAction, isBedAction, isSunbedAction, modalAction, savedStatus, tempElementType } from '../../../../redux/price/action'
const ElementType = ({ filterType }) => {
  const dispatch = useDispatch();
  const option = useSelector(({ option }) => option);
  const price = useSelector(({ price }) => price);
  const [isSunbed, setIsSunbed] = useState(false)
  const [isBed, setIsBed] = useState(false)
  const [state, setState] = useState({
    openedCollapses: ["collapseOne"],
    hTabs: "ht1",
    vTabs: "vt1",
    vTabsIcons: "vti1",
    pageSubcategories: "ps1",
  })
  useEffect(() => {
    if (price.structureElement.length > 0) {
      const sunbedResult = price.structureElement.filter(ele => ele.element.type == "umbrella")
      const bedResult = price.structureElement.filter(ele => ele.element.type == "bed")
      const result = price.structureElement.filter(ele => ele.element.type == "sunbed")
      if (sunbedResult.length > 0 || result.length > 0) {
        setIsSunbed(true)
        dispatch(isSunbedAction(true))
        setState({ hTabs: "ht1" })
        filterType("sunBed")
        dispatch(elementTypesAction('sunBed'))
      } else {
        setIsSunbed(false)
        dispatch(isSunbedAction(false))
        setState({ hTabs: "ht2" })
        dispatch(elementTypesAction('bed'))
        filterType("bed")
      }
      if (bedResult.length > 0) {
        setIsBed(true)
        dispatch(isBedAction(true))
      } else {
        setIsBed(false)
        dispatch(isBedAction(false))
      }
    } else {
      dispatch(isBedAction(false))
      dispatch(isSunbedAction(false))
      setIsBed(false)
      setIsSunbed(false)
    }
  }, [price.structureElement])
  const elementSelectAction = (type, elementType) => (event) => {
    dispatch(tempElementType(elementType))
    if (!price.isSaved) {
      dispatch(modalAction(true))
    } else {
      setState({ hTabs: type })
      dispatch(elementTypesAction(elementType))
      filterType(elementType)
    }
  }
  return (
    <Row>
      <Col >
        <div className="d-flex justify-content-center py-3 flex-wrap">
          <Nav pills className="nav-pills-info">
            {isSunbed && (
              <NavItem>
                <NavLink
                  className={price.elementType === "sunBed" ? "active cursor" : "cursor"}
                  onClick={elementSelectAction('ht1', 'sunBed')}
                >
                  Sunbed
                  </NavLink>
              </NavItem>
            )}
            {isBed && (
              <NavItem>
                <NavLink
                  className={price.elementType === "bed" ? "active cursor" : "cursor"}
                  onClick={elementSelectAction('ht2', 'bed')}
                >
                  Bed
                </NavLink>
              </NavItem>
            )}
            {option.businessSettings.length > 0 && ((isSunbed || isBed) && (option.businessSettings[0].umbrella_requrired != 0)) && (
              <NavItem>
                <NavLink
                  className={price.elementType === "umbrellaRequired" ? "active cursor" : "cursor"}
                  onClick={elementSelectAction('ht3', 'umbrellaRequired')}
                >
                  Umbrella
                </NavLink>
              </NavItem>
            )}
            {option.businessSettings.length > 0 && ((isSunbed || isBed) && (option.businessSettings[0].extra_sunbeds != 0)) && (
              <NavItem>
                <NavLink
                  className={price.elementType === "addtionalSunbed" ? "active cursor" : "cursor"}
                  onClick={elementSelectAction('ht4', 'addtionalSunbed')}
                >
                  Addtional Sunbed
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
      </Col>
    </Row>
  )
}
export default ElementType