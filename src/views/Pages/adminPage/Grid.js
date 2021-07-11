import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";
import { getAllElement } from "../../../redux/element/action"
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Stage, Layer, Rect, Image, Circle, Transformer } from "react-konva";
import Konva from 'konva';
import useImage from 'use-image';
import {
  createElementInformation,
  saveElements,
  getElements,
  lastMoveElementAction,
  zoomRateAction,
  getZones,
  lastElementAction,
  previousElementAction,
  saveZoomAreaValue
} from "../../../redux/element/action";
import { URLImage, OldUrlImage } from "./components/URLImage";
import { findNewElementPosition, getElementItem, moveElement, getElementDistance } from "./utils/utils";
import SetNumber from "./GridComponent/SetNumber"
import SetZone from "./GridComponent/SetZone"
import { Slider, IconButton, Grid } from '@material-ui/core';
import { ZoomIn, ZoomOut } from '@material-ui/icons';
const Options = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const storeElement = useSelector(({ element }) => element);
  storeElement.zoomRate = 0.8;
  const rate = useSelector(({ element }) => element.zoomRate);
  const business = useSelector(({ business }) => business);
  const [changeStatus, setChangeStatus] = useState(false);
  const [elementChangeStatus, setElementChangeStatus] = useState(false)
  const [activeDragElement, setActiveDragElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [tableName, setTableName] = useState(['', '2P', '4P', '6P', '8P', '10P', '12P'])
  const [movedLastElements, setMovedLastElements] = useState([])
  const [elementPaddingWidth, setElementPaddingWidth] = useState(10)
  const [elementPaddingHeight, setElementPaddingHeight] = useState(0)
  const [elementArrangeType, setElementArrangeType] = useState("horizontal")
  const [elementRotate, setElementRotate] = useState(0);
  const [elementIcon, setElementIcon] = useState(0);
  const [isMulti, setIsMulti] = useState(false);
  const [totalStatus, setTotalStatus] = useState(true);
  const [zoomRate, setZoomRate] = useState(0.8)
  const [value, setValue] = useState(50);
  const [zoomAreaValue, setZoomAreaValue] = useState(1)
  const [savedStatus, setSavedStatus] = useState(true)
  const [zoomInStatus, setZoomInStatus] = useState("")
  const [states, setStates] = useState({
    modalDemoRule: false
  });
  const [zoneStatus, setZoneStatus] = useState(false)
  useEffect(() => {
    dispatch(getAllElement())
    dispatch(getElements())
  }, [business.filterBusinessList])
  useEffect(() => {
    if (storeElement.resultElements) {
      dispatch(getZones())
      let arr = [];
      let lastElementArr = [];
      storeElement.resultElements.map((item, index) => {
        const filterResult = storeElement.allElement.filter(ele => ele.id === item.element_id)
        arr.push({
          id: `${item.id}`,
          elementId: item.element_id,
          h: filterResult[0].height / 2 * zoomRate,
          w: filterResult[0].width / 2 * zoomRate,
          moved: false,
          number: item.position.number,
          src: `/element/${item.element_id}.png`,
          static: false,
          x: item.position.x * zoomRate,
          y: item.position.y * zoomRate,
          r: item.rotate_angle ? item.rotate_angle : 0
        })
      })
      console.log(arr, "LLLLLLLLLLLLLLL")
      setElements(arr)
      dispatch(saveElements(arr))
      if (storeElement.lastMoved2) {
        var filterArray2 = arr.filter(ele => ele.id == storeElement.lastMoved2)
        if (filterArray2[0] == undefined) {
        }
        else {
          lastElementArr.push(filterArray2[0])
        }
      }
      if (storeElement.lastMoved1) {
        var filterArray1 = arr.filter(ele => ele.id == storeElement.lastMoved1)
        if (filterArray1[0] == undefined) {
        }
        else {
          lastElementArr.push(filterArray1[0])
        }
      }
      if (lastElementArr.length > 0) {
        dispatch(lastMoveElementAction(lastElementArr))
        let getDistance = getElementDistance(lastElementArr, elements, lastElementArr[lastElementArr.length - 1])
        setElementPaddingWidth(getDistance[0])
        setElementPaddingHeight(getDistance[2])
        setElementRotate(getDistance[1])
        setElementArrangeType(getDistance[3])
        setActiveElementNumber(storeElement.lastMoved1)
      }
      const zoneFilterResult = storeElement.resultElements.filter(ele => ele.zone_id == null)
      if (zoneFilterResult.length > 0) {
        setZoneStatus(true)
      } else {
        setZoneStatus(false)
      }
    }
  }, [storeElement.resultElements])
  useEffect(() => {
    setValue(storeElement.displayValue)
    setZoomRate(storeElement.zoomRate)
    setZoomAreaValue(storeElement.zoomAreaValue)
    if (storeElement.elementInformation.length > 0) {
      let arr = [...storeElement.elementInformation];
      if (zoomInStatus == "zoomIn") {
        arr.map((item, index) => {
          item.w = item.w * storeElement.zoomRate / (storeElement.zoomRate - 0.1);
          item.h = item.h * storeElement.zoomRate / (storeElement.zoomRate - 0.1);
          item.x = item.x * storeElement.zoomRate / (storeElement.zoomRate - 0.1);
          item.y = item.y * storeElement.zoomRate / (storeElement.zoomRate - 0.1);
        })
      }
      if (zoomInStatus == "zoomOut") {
        arr.map((item, index) => {
          item.w = item.w * storeElement.zoomRate / (storeElement.zoomRate + 0.1);
          item.h = item.h * storeElement.zoomRate / (storeElement.zoomRate + 0.1);
          item.x = item.x * storeElement.zoomRate / (storeElement.zoomRate + 0.1);
          item.y = item.y * storeElement.zoomRate / (storeElement.zoomRate + 0.1);
        })
      }
      dispatch(saveElements(arr))
      setElements(arr)
    }
  }, [storeElement.zoomRate])
  ////////////////////
  const dragElement = useRef();
  const stageRef = useRef();
  const layerRef = useRef();
  const trRef = useRef();
  const [activeElementNumber, setActiveElementNumber] = useState(0)
  const [state, setState] = useState({
    openedCollapses: ["collapseOne"],
    hTabs: "ht1",
    vTabs: "vt1",
    vTabsIcons: "vti1",
    pageSubcategories: "ps1",
  })
  const placeholder = () => {
    if (!activeDragElement) return null;
    activeDragElement.placeholder = true;
    return <URLImage
      draggable="true"
      element={activeDragElement}
    />
  }
  const handleChange = (event, newValue) => {
    setSavedStatus(false)
    setZoomAreaValue(newValue)
    dispatch(saveZoomAreaValue(newValue))
  };
  const zoomInHandle = (event) => {
    setSavedStatus(false)
    setZoomInStatus("zoomIn")
    if (value !== 100) {
      setValue(value + 10);
      setZoomRate(zoomRate + 0.1);
      dispatch(zoomRateAction(zoomRate + 0.1, value + 10))
    }
  }
  const zoomOutHandle = (event) => {
    setSavedStatus(false)
    setZoomInStatus("zoomOut")
    if (value !== 0) {
      setValue(value - 10);
      setZoomRate(zoomRate - 0.1);
      dispatch(zoomRateAction(zoomRate - 0.1, value - 10))
    }
  }
  const lastMoveElement = (element, actionType) => {
    let arr = [];
    arr = movedLastElements;
    if (actionType == "onDrop") {
      if (arr.length == 0) {
        arr.push(element)
      }
      if (arr.length == 1) {
        let elementIndex = -1;
        arr.map((item, index) => {
          if (item.id === element.id) {
            elementIndex = index;
          }
        })
        if (elementIndex != -1) {
          arr.push(element)
          arr.splice(elementIndex, 1)
        } else {
          arr.push(element)
        }
      }
      if (arr.length == 2) {
        let elementIndex = -1;
        arr.map((item, index) => {
          if (item.id === element.id) {
            elementIndex = index;
          }
        })
        if (elementIndex != -1) {
          arr.push(element)
          arr.splice(elementIndex, 1)
        } else {
          arr.push(element)
          arr.splice(0, 1)
        }
      }
    }
    if (actionType == "onDragEnd" || actionType == "transFormEnd") {
      if (arr.length > 0) {
        arr.map((item, index) => {
          if (item.id == element.id) {
            arr[index].r = element.r;
            arr[index].x = element.x;
            arr[index].y = element.y;
          }
        })
      }
      // console.log(element)
    }
    if (arr.length == 1) {
      dispatch(lastElementAction(arr[0].id))
    }
    if (arr.length == 2) {
      dispatch(lastElementAction(arr[1].id))
      dispatch(previousElementAction(arr[0].id))
    }
    setMovedLastElements(arr)
    dispatch(lastMoveElementAction(arr))
    return arr
  }
  const [selectedId, selectShape] = useState(null);
  const [nodesArray, setNodes] = useState([]);
  const selectionRectRef = useRef();
  const selection = useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      trRef.current.nodes([]);
      setNodes([]);
      // layerRef.current.remove(selectionRectangle);
    }
  };
  const [selectStatus, setSelectStatus] = useState(false)
  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: "rgba(0, 161, 255, 0.3)"
    });
    node.getLayer().batchDraw();
  };

  const oldPos = React.useRef(null);
  const onMouseDown = (e) => {
    const isElement = e.target.findAncestor(".elements-container");
    const isTransformer = e.target.findAncestor("Transformer");
    if (isElement || isTransformer) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    selection.current.visible = true;
    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };
  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };
  const onMouseUp = () => {
    oldPos.current = null;
    if (!selection.current.visible) {
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();
    const elements = [];
    layerRef.current.find(".rectangle").forEach((elementNode) => {
      const elBox = elementNode.getClientRect();
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
        setSelectStatus(true)
      }
    });
    if (trRef.current) {
      trRef.current.nodes(elements);
      if (trRef && trRef.current) {
        if (trRef.current._nodes.length > 1) {
          setIsMulti(true)
        } else {
          setIsMulti(false)
          setElementIcon(trRef.current._nodes[0] ? trRef.current._nodes[0].attrs.width : elementIcon)
        }
      }
    }
    selection.current.visible = false;
    Konva.listenClickTap = false;
    updateSelectionRect();
  };

  const onClickTap = (e) => {
    let stage = e.target.getStage();
    let layer = layerRef.current;
    let tr = trRef.current;
    if (e.target === stage) {
      selectShape(null);
      setNodes([]);
      tr.nodes([]);
      layer.draw();
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName(".rectangle")) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;
    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
    layer.draw();
  };
  //////////////////////
  useEffect(() => {
    if (trRef && trRef.current) {
      var buttons = {
        rotater: {
          path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-rotate</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M0.9,0.5c0.1,0,0.3,0.1,0.3,0.3L1.1,2.9c1-1.4,2.6-2.4,4.5-2.4c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3c-1.4,0-2.6-0.5-3.6-1.4c-0.1-0.1-0.1-0.3,0-0.4L2.3,9c0.1-0.1,0.3-0.1,0.4,0c0.7,0.7,1.7,1.1,2.8,1.1c2.3,0,4.2-1.9,4.2-4.2S7.8,1.7,5.5,1.7c-1.7,0-3.2,1-3.8,2.5l2.7-0.1c0.1,0,0.3,0.1,0.3,0.3v0.6c0,0.1-0.1,0.3-0.3,0.3H0.3C0.1,5.2,0,5.1,0,4.9V0.8c0-0.1,0.1-0.3,0.3-0.3H0.9z"/></svg>',
          shape: trRef.current.findOne('.rotater')
        },
        top_left: {
          path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>box-configurator-delete</title><circle cx="16" cy="16" r="16" style="fill:#fff"/><path d="M10.24,1.08v.66a.39.39,0,0,1-.36.36H1.12a.39.39,0,0,1-.36-.36V1.08A.39.39,0,0,1,1.12.72H3.64L3.82.3A.52.52,0,0,1,4.24,0h2.4a.61.61,0,0,1,.48.3L7.3.72H9.82C10.06.78,10.24.9,10.24,1.08ZM1.42,2.82h8.1V9.91a1.05,1.05,0,0,1-1,1H2.44a1.05,1.05,0,0,1-1-1ZM3.1,9.19a.39.39,0,0,0,.36.36.39.39,0,0,0,.36-.36V4.44a.39.39,0,0,0-.36-.36.39.39,0,0,0-.36.36Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,1,0-.72,0Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,0,0-.72,0Z"/></svg>',
          shape: trRef.current.findOne('.top-left')
        }
      };
      layerRef.current.find(".rotater-icon").destroy()
      for (var button in buttons) {
        var shape = buttons[button].shape;
        var selector = button.replace('_', '-');
        var icon = new Konva.Path({
          fill: "white",
          data: buttons[button].path,
          name: selector + '-icon'
        });
        var deleteButton = new Konva.Circle({
          radius: 12,
          fill: 'transparent'
        });
        icon.position(shape.position());
        if (selector == 'rotater') {
          trRef.current.add(icon);
          icon.x(shape.x() + elementIcon / 14 - 12); icon.y(shape.y() - 5.25);
        }
        if (selector == 'top-left') {
          deleteButton.x(shape.x() - 16); deleteButton.y(shape.y() - 16);
          icon.x(shape.x() - 22.25); icon.y(shape.y() - 21.25);
        }
        if (selector == 'top-left') {
          trRef.current.add(icon);
          trRef.current.add(deleteButton)
          shape.listening(false);
          deleteButton.on('click', (e) => {
            var array = [...elements];
            var anotherOne = trRef.current._nodes;
            var filteredArray = array.filter(function (array_el) {
              return anotherOne.filter(function (anotherOne_el) {
                return anotherOne_el.attrs.id == array_el.id;
              }).length == 0
            });
            setElements(filteredArray)
            // setChangeStatus(true)
            setSelectStatus(false)
            dispatch(saveElements(filteredArray))
            // clearInterval(myVar);
            return new Promise((resolve, reject) => {
              if (totalStatus) {
                dispatch(createElementInformation(resolve))
                setTotalStatus(false)
              }
            }).then((success) => {
              if (success) {
                setTotalStatus(true)
              }
            }).catch(errors => {
            });
          })
        }
      }
    }
  }, [elementIcon, selectStatus]);
  const doubleClickAction = (id) => (e) => {
    setSavedStatus(false)
    selectShape(null)
    e.preventDefault();
    // register event position
    stageRef.current.setPointersPositions(e);
    const droppedElement = findNewElementPosition(elements, storeElement.allElement, stageRef.current.getPointerPosition(), id, activeElementNumber, elementPaddingWidth, elementRotate, elementPaddingHeight, elementArrangeType);
    droppedElement.w = droppedElement.w * storeElement.zoomRate * 1.240;
    droppedElement.h = droppedElement.h * storeElement.zoomRate * 1.240;
    droppedElement.x = droppedElement.x;
    droppedElement.y = droppedElement.y;
    setElements(
      elements.concat([
        droppedElement
      ])
    );
    setChangeStatus(true)
    // clearInterval(myVar);
    dispatch(saveElements(
      elements.concat([
        droppedElement
      ])))
    setActiveElementNumber(droppedElement.id)
    setActiveDragElement(null);
    const getLastElements = lastMoveElement(droppedElement, "onDrop")
    const getDistance = getElementDistance(getLastElements, elements, droppedElement)
    setElementPaddingWidth(getDistance[0])
    setElementPaddingHeight(getDistance[2])
    setElementRotate(getDistance[1])
    setElementArrangeType(getDistance[3])
  }
  const grid = 15 * storeElement.zoomRate;
  const saveElementsAction = () => {
    return new Promise((resolve) => {
      setSavedStatus(true)
      dispatch(createElementInformation(resolve))
    }).then((success) => {
      if (success) {
        alert("Grid map saved.")
      }
    }).catch(errors => {
    });
  }
  const toggleModalDemoRule = () => {
    setStates({ ...states, modalDemoRule: !states.modalDemoRule });
  }
  const agreeSave = () => {
    return new Promise((resolve) => {
      setSavedStatus(true)
      dispatch(createElementInformation(resolve))
      setStates({ ...states, modalDemoRule: !states.modalDemoRule });
    }).then((success) => {
      // if (success) {
      //   alert("Grid map saved.")
      // }
    }).catch(errors => {
    });
  }
  const canceleSave = () => {
    setStates({ ...states, modalDemoRule: !states.modalDemoRule });
    setSavedStatus(true)
  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12" className="mx-auto">
            <Card className="card-user">
              <CardHeader className="px-4">
                <h5 className="title">{t("Grid")}</h5>
              </CardHeader>
              <CardBody className="px-4">
                {(business.filterBusinessList.type === "beach" || business.filterBusinessList.type === "pool") ? (
                  <Row>
                    <Col md={12}>
                      <h5 className="title mb-0 font-size-16">{t("Sunbeds")}</h5>
                      <Row className="py-2 px-3">
                        <div className="d-flex">
                          {storeElement.sunbedUmbrella && (
                            storeElement.sunbedUmbrella.map((item, index) => {
                              return (
                                <div className="p-1" key={index}>
                                  <img
                                    src={`/element/${item.id}.png`}
                                    width="50%"
                                    className="cursor"
                                    onDoubleClick={doubleClickAction(item.id)}
                                    draggable="true"
                                    onDragStart={(e) => {
                                      if (trRef && trRef.current) {
                                        trRef.current.nodes([]);
                                      }
                                      dragElement.current = item.id;//e.target.src;
                                    }}
                                  />
                                </div>
                              )
                            })
                          )}
                        </div>
                      </Row>
                      <h5 className="title mb-0 font-size-16">{t("Umbrellas with beds")}</h5>
                      <Row className="py-2 px-3">
                        <div className="d-flex">
                          {storeElement.bedUmbrella && (
                            storeElement.bedUmbrella.map((item, index) => {
                              return (
                                <div className="p-1" key={index}>
                                  <img
                                    src={`/element/${item.id}.png`}
                                    width="50%"
                                    draggable="true"
                                    className="cursor"
                                    onDoubleClick={doubleClickAction(item.id)}
                                    onDragStart={(e) => {
                                      if (trRef && trRef.current) {
                                        trRef.current.nodes([]);
                                      }
                                      dragElement.current = item.id;//e.target.src;
                                    }}
                                  />
                                </div>
                              )
                            })
                          )}
                        </div>
                      </Row>
                      <h5 className="title mb-0 font-size-16">{t("Beds without umbrellas")}</h5>
                      <Row className="py-2 px-3">
                        <div className="d-flex mb-0">
                          {storeElement.allElement && (
                            storeElement.allElement.map((item, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {(item.type === "bed") && (
                                    <div className="p-1" key={index}>
                                      <img
                                        src={`/element/${item.id}.png`}
                                        width="50%"
                                        className="cursor"
                                        onDoubleClick={doubleClickAction(item.id)}
                                        draggable="true"
                                        onDragStart={(e) => {
                                          if (trRef && trRef.current) {
                                            trRef.current.nodes([]);
                                          }
                                          dragElement.current = item.id;//e.target.src;
                                        }}
                                      />
                                    </div>
                                  )}
                                </React.Fragment>
                              )
                            })
                          )}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md={12}>
                      <h5 className="title mb-0 font-size-16">{t("Tables")}</h5>
                      <Row className="py-2 px-3">
                        <div className="d-flex justify-content-start">
                          {storeElement.allElement.length > 0 && (
                            storeElement.allElement.map((item, index) => {
                              return (
                                <React.Fragment>
                                  {item.type == "table" && (
                                    <div className="p-1" key={index}>
                                      <div className="table-layout">
                                        <img
                                          src={`/element/${item.id}.png`}
                                          width="50%"
                                          className="cursor"
                                          onDoubleClick={doubleClickAction(item.id)}
                                          draggable="true"
                                          onDragStart={(e) => {
                                            if (trRef && trRef.current) {
                                              trRef.current.nodes([]);
                                            }
                                            dragElement.current = item.id;//e.target.src;
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              )
                            })
                          )}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col md={12}>
                    <Nav pills className="nav-pills-primary">
                      <NavItem>
                        <NavLink
                          className={state.hTabs === "ht1" ? "active cursor" : "cursor"}
                          onClick={() => {
                            setState({ hTabs: "ht1" })
                            if (zoneStatus && state.hTabs == "ht3") {
                              setState({ hTabs: "ht3" })
                              alert("Please review the Set Zones section and set zones for the elements remaining")
                            } else {
                              setState({ hTabs: "ht1" })
                            }
                          }}
                        >
                          {t("create/edit/delete")}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={state.hTabs === "ht2" ? "active cursor" : "cursor"}
                          onClick={() => {
                            if (savedStatus) {
                              setState({ hTabs: "ht2" })
                            } else {
                              setStates({
                                modalDemoRule: true
                              })
                            }
                            if (zoneStatus && state.hTabs == "ht3") {
                              setState({ hTabs: "ht3" })
                              alert("Please review the Set Zones section and set zones for the elements remaining")
                            } else {
                              setState({ hTabs: "ht2" })
                            }
                          }}
                        >
                          {t("Set numbers")}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={state.hTabs === "ht3" ? "active cursor" : "cursor"}
                          onClick={() => {
                            if (savedStatus) {
                              setState({ hTabs: "ht3" })
                            } else {
                              setStates({
                                modalDemoRule: true
                              })
                            }
                          }}
                        >
                          {t("Set zones")}
                        </NavLink>
                      </NavItem>
                      {/* {storeElement.zoneData.length > 1 && (
                        <>
                          {
                            storeElement.zone1 ? (
                              <NavItem>
                                <NavLink
                                  className={state.hTabs === "ht3" ? "active cursor" : "cursor"}
                                  onClick={() => {
                                    if (savedStatus) {
                                      setState({ hTabs: "ht3" })
                                    } else {
                                      setStates({
                                        modalDemoRule: true
                                      })
                                    }
                                  }}
                                >
                                  {t("Set zones")}
                                </NavLink>
                              </NavItem>
                            ) : (
                              storeElement.hasVipZone ? (
                                <NavItem>
                                  <NavLink
                                    className={state.hTabs === "ht3" ? "active cursor" : "cursor"}
                                    onClick={() => {
                                      if (savedStatus) {
                                        setState({ hTabs: "ht3" })
                                      } else {
                                        setStates({
                                          modalDemoRule: true
                                        })
                                      }
                                    }}
                                  >
                                    {t("Set zones")}
                                  </NavLink>
                                </NavItem>
                              ) : (
                                <></>
                              )
                            )
                          }
                        </>
                      )} */}
                    </Nav>
                    <TabContent
                      activeTab={state.hTabs}
                      className="py-3"
                    >
                      <TabPane tabId="ht1" className="pt-0">
                        <Row>
                          <Col md={12}>
                            <div
                              onDrop={(e) => {
                                selectShape(null)
                                e.preventDefault();
                                // register event position
                                stageRef.current.setPointersPositions(e);
                                const droppedElement = findNewElementPosition(elements, storeElement.allElement, stageRef.current.getPointerPosition(), dragElement.current, activeElementNumber, elementPaddingWidth, elementRotate, elementPaddingHeight, elementArrangeType);
                                droppedElement.w = droppedElement.w * storeElement.zoomRate * 1.240;
                                droppedElement.h = droppedElement.h * storeElement.zoomRate * 1.240;
                                droppedElement.x = droppedElement.x;
                                droppedElement.y = droppedElement.y;
                                setElements(
                                  elements.concat([
                                    droppedElement
                                  ])
                                );
                                setChangeStatus(true)
                                dispatch(saveElements(
                                  elements.concat([
                                    droppedElement
                                  ])))
                                setActiveElementNumber(droppedElement.id)
                                setActiveDragElement(null);
                                const getLastElements = lastMoveElement(droppedElement, "onDrop")
                                const getDistance = getElementDistance(getLastElements, elements, droppedElement)
                                setElementPaddingWidth(getDistance[0])
                                setElementPaddingHeight(getDistance[2])
                                setElementRotate(getDistance[1])
                                setElementArrangeType(getDistance[3])
                              }}
                              onDragLeave={(e) => {
                                setActiveDragElement(null);
                              }}
                              onDragOver={(e) => {
                                setSavedStatus(false)
                                selectShape(null)
                                e.preventDefault()
                                stageRef.current.setPointersPositions(e);
                                const element = findNewElementPosition(elements, storeElement.allElement, stageRef.current.getPointerPosition(), dragElement.current, activeElementNumber, elementPaddingWidth, elementRotate, elementPaddingHeight, elementArrangeType);
                                const placeholder = {
                                  w: element.w * storeElement.zoomRate * 1.240,
                                  h: element.h * storeElement.zoomRate * 1.240,
                                  x: element.x,
                                  y: element.y,
                                  r: element.r,
                                  placeholder: true,
                                  id: element.id
                                };
                                setActiveDragElement(placeholder);
                                // const getLastElements = lastMoveElement(element)
                                // const getDistance = getElementDistance(elements, element, getLastElements)
                                // setElementPaddingWidth(getDistance[0])
                                // setElementPaddingHeight(getDistance[2])
                                // setElementRotate(getDistance[1])
                              }}
                              className="create-element-style"
                            // style={{ width: '900px', height: '580px', overflow: 'auto' }}
                            >
                              <Stage
                                width={(window.innerWidth - 300) * zoomAreaValue}
                                height={580 * zoomAreaValue}
                                ref={stageRef}
                                onMouseDown={onMouseDown}
                                onMouseUp={onMouseUp}
                                onMouseMove={onMouseMove}
                                onTouchStart={checkDeselect}
                              // onClick={onClickTap}
                              >
                                <Layer
                                  ref={layerRef}
                                >
                                  {placeholder()}
                                  {elements.map((element, index) => {
                                    return (
                                      <URLImage
                                        key={index}
                                        elementIndex={index}
                                        onDragStart={(e, id) => {
                                          const element = getElementItem(elements, id);
                                          const placeholder = {
                                            w: element.w,
                                            h: element.h,
                                            x: element.x,
                                            y: element.y,
                                            r: element.r,
                                            placeholder: true,
                                            id: id
                                          };
                                          if (element) setActiveDragElement(placeholder); else console.log('not found')
                                        }}
                                        onDragMove={(e, id) => {
                                          setSavedStatus(false)
                                          if (trRef && trRef.current) {
                                            trRef.current.nodes([]);
                                          }
                                          let element = getElementItem(elements, id);
                                          const items = moveElement(elements, element, Math.round(e.target.x()) > 0 ? Math.round(e.target.x() / grid) * grid : 10, Math.round(e.target.y()) > 0 ? Math.round(e.target.y() / grid) * grid : 10, true, true, 'horizontal');
                                          // setElements(items);
                                          // setChangeStatus(true)
                                          // dispatch(saveElements(items))
                                          const placeholder = {
                                            w: element.w,
                                            h: element.h,
                                            x: element.x,
                                            y: element.y,
                                            r: element.r,
                                            // src:element.src,
                                            placeholder: true,
                                            id: id
                                          };
                                          if (element && !isMulti) setActiveDragElement(placeholder); else console.log('not found')

                                          // const getLastElements = lastMoveElement(element, "transFormEnd")
                                          // const getDistance = getElementDistance(getLastElements)
                                          // setElementPaddingWidth(getDistance[0])
                                          // setElementPaddingHeight(getDistance[2])
                                          // setElementRotate(getDistance[1])
                                          // setElementArrangeType(getDistance[3])
                                        }}
                                        onDragEnd={(e, id) => {
                                          setSavedStatus(false)
                                          let element = getElementItem(elements, id);
                                          setActiveElementNumber(element.id)
                                          const items = moveElement(elements, element, Math.round(e.target.x()) > 0 ? Math.round(e.target.x() / grid) * grid : 10, Math.round(e.target.y()) > 0 ? Math.round(e.target.y() / grid) * grid : 10, true, true, 'horizontal');
                                          const getLastElements = lastMoveElement(element, "onDragEnd")
                                          const getDistance = getElementDistance(getLastElements, elements, element)
                                          setElementPaddingWidth(getDistance[0])
                                          setElementPaddingHeight(getDistance[2])
                                          setElementArrangeType(getDistance[3])
                                          setElementRotate(getDistance[1])
                                          setChangeStatus(true)
                                          setElements([]);
                                          setTimeout(() => {
                                            setElements(items);
                                            dispatch(saveElements(items))
                                          }, 10);
                                          setActiveDragElement(null);
                                          if (trRef && trRef.current) {
                                            trRef.current.detach()
                                          }
                                        }}
                                        onTransFormEnd={
                                          (e, id) => {
                                            setSavedStatus(false)
                                            let element = getElementItem(elements, id);
                                            let arr = [...elements];
                                            arr.map((item, index) => {
                                              if (item.id === id) {
                                                arr[index].x = Math.round(e.target.x())
                                                arr[index].y = Math.round(e.target.y())
                                                arr[index].r = Math.round(e.target.rotation())
                                              }
                                            })
                                            setElements(arr);
                                            dispatch(saveElements(arr))
                                            setChangeStatus(true)
                                            const getLastElements = lastMoveElement(element, "transFormEnd")
                                            const getDistance = getElementDistance(getLastElements, elements, element)
                                            setElementPaddingWidth(getDistance[0])
                                            setElementPaddingHeight(getDistance[2])
                                            setElementRotate(getDistance[1])
                                            setElementArrangeType(getDistance[3])
                                          }
                                        }
                                        draggable="true"
                                        element={element}
                                        isSelected={element.id === selectedId}
                                        // onSelect={() => {
                                        //   selectShape(element.id);
                                        // }}
                                        onSelect={(e) => {
                                          if (e.current !== undefined) {
                                            let temp = nodesArray;
                                            if (!nodesArray.includes(e.current)) temp.push(e.current);
                                            setNodes(temp);
                                            trRef.current.nodes(nodesArray);
                                            trRef.current.nodes(nodesArray);
                                            trRef.current.getLayer().batchDraw();
                                          }
                                          selectShape(element.id);
                                        }}
                                      // onChange={(newAttrs) => {
                                      //   const rects = elements.slice();
                                      //   rects[index] = newAttrs;
                                      //   setElements(rects)
                                      // }}
                                      />
                                    )
                                  })}
                                  {selectStatus && (
                                    <Transformer
                                      borderDash={[4, 3]}
                                      name="transformer"
                                      anchorCornerRadius={5}
                                      anchorStrokeWidth={15}
                                      borderStrokeWidth={1}
                                      padding={16}
                                      keepRatio={false}
                                      rotateEnabled={!isMulti}
                                      enabledAnchors={['top-left']}
                                      anchorFill="#29A9E5"
                                      rotationSnaps={[0, 90, 180, 270]}
                                      rotateAnchorOffset={0}
                                      ref={trRef}
                                    />
                                  )}
                                  <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />
                                </Layer>
                              </Stage>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="ht2">
                        <SetNumber zoomRate={0.8} zoomAreaValue={1} />
                      </TabPane>
                      <TabPane tabId="ht3">
                        <SetZone zoomRate={0.8} zoomAreaValue={1} />
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} className="pt-3">
                    <Grid container spacing={2}>
                      <Grid item xs className="pt-3">
                        <Slider onChange={handleChange} value={zoomAreaValue} min={1} max={2} step={0.1} aria-labelledby="continuous-slider" />
                      </Grid>
                      <Grid item>
                        <IconButton aria-label="zoomOut" onClick={zoomOutHandle} >
                          <ZoomOut className="cursor" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton aria-label="zoomIn" onClick={zoomInHandle}>
                          <ZoomIn className="cursor" />
                        </IconButton>
                      </Grid>
                      <Grid item className="pt-3">
                        <p className="bold mb-0 pt-1">{value}%</p>
                      </Grid>
                    </Grid>
                  </Col>
                </Row>
                {state.hTabs === "ht1" && (
                  <div className="d-flex justify-content-end">
                    <Button color="primary" className="btn-round" disabled={savedStatus} onClick={saveElementsAction}>{t("Save")}</Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Modal isOpen={states.modalDemoRule} toggle={toggleModalDemoRule}>
            <ModalBody>
              <p className="bold">{t("is_save")}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={agreeSave}>
                {t("Yes")}
              </Button>
              <Button color="danger" onClick={canceleSave}>
                {t("No")}
              </Button>
            </ModalFooter>
          </Modal>
        </Row>
      </div >
    </>
  )
}
export default Options;
