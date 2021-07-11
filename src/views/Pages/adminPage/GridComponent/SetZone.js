import React, { useState, useEffect, useRef } from "react";
import { Image, Transformer, Shape, Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import useImage from 'use-image';
import {
  Button,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { saveZoneData, createSetZone } from "../../../../redux/element/action"
const SetZone = ({ zoomRate, zoomAreaValue }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const business = useSelector(({ business }) => business);
  const element = useSelector(({ element }) => element);
  const [dotsData, setDotsData] = useState([]);
  const [selectedZone, setSelectedZone] = useState(false)
  const [color, setColor] = useState('#90ee90');
  const [colorsByZoneName, setColorsByZoneName] = useState([
    { color: "#90ee90", name: 'zone1' },
    { color: "#a52a2a", name: 'zone2' },
    { color: "#add8e6", name: 'zone3' },
    { color: "#800080", name: 'zone4' },
    { color: "#ffd700", name: 'VIP' }
  ])
  const [elements, setElements] = useState([])
  const [zoneId, setZoneId] = useState("")
  const [state, setState] = useState({
    openedCollapses: ["collapseOne"],
    hTabs: "",
    vTabs: "vt1",
    vTabsIcons: "vti1",
    pageSubcategories: "ps1",
  });
  const stageRef = useRef();
  const layerRef = useRef();
  const trRef = useRef();
  ////////////////////////////////
  const oldPos = React.useRef(null);
  const selectionRectRef = useRef();
  const selection = useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });
  useEffect(() => {
    console.log("%%%%%%%%%%%%%%%%%%", element.zone1)
    if (element.zone1) {
      setSelectedZone(true);
      setZoneId(element.id1);
    }
  }, [element])
  useEffect(() => {
    if (element.resultElements.length > 0) {
      let filterZoneData = element.resultElements.filter(ele => ele.zone_id != null);
      if (filterZoneData.length > 0) {
        filterZoneData.map((item, index) => {
          let filterZoneName = element.zoneData.filter(ele => ele.id == item.zone_id);
          if (filterZoneName[0]) {
            if (filterZoneName[0].config) {
              filterZoneData[index]['zoneName'] = filterZoneName[0].config.slug;
            }
          }
        })
        filterZoneData.map((item, index) => {
          let filterColor = colorsByZoneName.filter(ele => ele.name == item.zoneName);
          if (filterColor[0]) {
            if (filterColor[0].color) {
              filterZoneData[index]['color'] = filterColor[0].color;
            }
          }
        })
        filterZoneData.map((item, index) => {
          let filterWidthHeight = element.allElement.filter(ele => ele.id == item.element_id)
          filterZoneData[index]['width'] = filterWidthHeight[0].width / 2;
          filterZoneData[index]['height'] = filterWidthHeight[0].height / 2;
        })
        if (layerRef && layerRef.current) {
          layerRef.current.find(`.dot`).destroy()
          filterZoneData.map((item, index) => {
            let width1 = item.width * Math.cos(item.rotate_angle * Math.PI / 180);
            let width2 = item.height * Math.sin(item.rotate_angle * Math.PI / 180);
            let height1 = item.width * Math.sin(item.rotate_angle * Math.PI / 180);
            let height2 = item.height * Math.cos(item.rotate_angle * Math.PI / 180);
            var dots = new Konva.Circle({
              x: (item.position.x + (Math.round(width1) - Math.round(width2)) / 2) * zoomRate,
              y: (item.position.y + Math.round(height2) + (Math.round(height1) - Math.round(height2)) / 2) * zoomRate,
              width: 10 * zoomRate,
              height: 10 * zoomRate,
              fill: `${item.color}`,
              name: `dot`,
            });
            layerRef.current.add(dots)
          })
        }
      }
      let elementsData = element.resultElements;
      elementsData.map((item, index) => {
        let filterWidthHeight = element.allElement.filter(ele => ele.id == item.element_id)
        elementsData[index]['width'] = filterWidthHeight[0].width / 2;
        elementsData[index]['height'] = filterWidthHeight[0].height / 2;
      })
      setElements(elementsData)
    }
  }, [business.filterBusinessList, element.resultElements, zoomRate])
  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: "rgba(0, 161, 255, 0)"
    });
    node.getLayer().batchDraw();
  };
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
    // console.log(selection.current.visible)
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
      }
    });
    selection.current.visible = false;
    Konva.listenClickTap = false;
    updateSelectionRect();
    if (trRef.current) {
      trRef.current.nodes(elements);
      if (trRef && trRef.current) {
        if (trRef.current._nodes.length > 0) {
          if (selectedZone) {
            // layerRef.current.find(`.dot${trRef.current._nodes[0].attrs.id}`).destroy()
            let arr = [];
            arr = dotsData;
            let filterResult = arr.filter(ele => ele.id != trRef.current._nodes[0].attrs.id)
            filterResult.push({ zone_id: zoneId, id: trRef.current._nodes[0].attrs.id })
            setDotsData(filterResult)
            dispatch(saveZoneData(filterResult))
            let width1 = trRef.current._nodes[0].attrs.width * Math.cos(trRef.current._nodes[0].attrs.rotation * Math.PI / 180);
            let width2 = trRef.current._nodes[0].attrs.height * Math.sin(trRef.current._nodes[0].attrs.rotation * Math.PI / 180);
            let height1 = trRef.current._nodes[0].attrs.width * Math.sin(trRef.current._nodes[0].attrs.rotation * Math.PI / 180);
            let height2 = trRef.current._nodes[0].attrs.height * Math.cos(trRef.current._nodes[0].attrs.rotation * Math.PI / 180);
            console.log(Math.round(width1), Math.round(width2), Math.round(height1), Math.round(height2))
            var dots = new Konva.Circle({
              x: (trRef.current._nodes[0].attrs.x + (Math.round(width1) - Math.round(width2)) / 2),
              y: (trRef.current._nodes[0].attrs.y + Math.round(height2) + (Math.round(height1) - Math.round(height2)) / 2),
              width: 10,
              height: 10,
              fill: `${color}`,
              // name: `dot${trRef.current._nodes[0].attrs.id}`,
              name: "dots"
            });
            trRef.current.nodes([]);
            layerRef.current.add(dots)
          } else {
            alert("please select one of the zone before acting")
            trRef.current.nodes([]);
          }
        }
      }
    }
  };
  useEffect(() => {
    if (trRef && trRef.current) {
      var confirmButton = new Konva.Rect({
        x: 150,
        y: 40,
        width: 70,
        height: 20,
        fill: '#8600FD',
        // shadowBlur: 10,
        cornerRadius: 8,
      });
      var text = new Konva.Text({
        text: 'Confirm',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white',
        align: 'center',
        stroke: '#29A9E5',
        strokeEnabled: false,
        strokeWidth: 3
      });
      trRef.current.add(confirmButton);
      trRef.current.add(text);
      confirmButton.x(-25.25); confirmButton.y(- 25.25);
      text.x(-25.25 + 8); text.y(- 25.25 + 4);
      text.on('click', () => {
        if (!selectedZone) {
          alert("please select one of the zone before acting")
        } else {
          alert("selected zone!")
        }
      })
      confirmButton.on('click', () => {
        if (!selectedZone) {
          alert("please select one of the zone before acting")
        } else {
          alert("selected zone!")
        }
      })
    }
  }, [selectedZone])
  const selectZone = (name, color, zone) => (event) => {
    console.log(name)
    setState({ hTabs: `${name}` })
    setSelectedZone(true);
    setColor(color)
    setZoneId(zone)
    trRef.current.nodes([]);
  }
  const confirmAction = (event) => {
    dispatch(createSetZone())
  }
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="pb-3">
          <Nav pills className="nav-pills-primary">
            {!(element.zone1 == 1 && element.hasVipZone) && (element.zone1 && element.zone2) && (
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht1" ? "activeColor1 activeColors cursor" : "cursor activeColor1"}
                  onClick={selectZone('ht1', '#90ee90', element.id1)}
                >
                  {t(element.zone1)}
                </NavLink>
              </NavItem>
            )}
            {element.zone2 && (
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht2" ? "activeColor2 activeColors cursor" : "cursor activeColor2"}
                  onClick={selectZone('ht2', '#a52a2a', element.id2)}
                >
                  {t(element.zone2)}
                </NavLink>l
              </NavItem>
            )}
            {element.zone3 && (
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht3" ? "activeColor3 activeColors cursor" : "cursor activeColor3"}
                  onClick={selectZone('ht3', '#add8e6', element.id3)}
                >
                  {t(element.zone3)}
                </NavLink>
              </NavItem>
            )}
            {element.zone4 && (
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht4" ? "activeColor4 activeColors cursor" : "cursor activeColor4"}
                  onClick={selectZone('ht4', '#800080', element.id4)}
                >
                  {t(element.zone4)}
                </NavLink>
              </NavItem>
            )}
            {element.hasVipZone && (
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht5" ? "activeColor5 activeColors cursor" : "cursor activeColor5"}
                  onClick={selectZone('ht5', '#ffd700', element.idVIP)}
                >
                  {t("VIP")}
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div
            className="create-element-style"
          >
            <Stage
              width={(window.innerWidth - 300) * zoomAreaValue}
              height={580 * zoomAreaValue}
              ref={stageRef}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
            // onTouchStart={checkDeselect}
            >
              <Layer
                ref={layerRef}
              >
                {elements.map((element, index) => {
                  return (
                    <SvgImage
                      key={index}
                      element={element}
                      zoomRate={zoomRate}
                    />
                  )
                })}
                <Transformer
                  borderDash={[4, 3]}
                  name="transformer"
                  anchorCornerRadius={5}
                  anchorStrokeWidth={15}
                  borderStrokeWidth={1}
                  padding={16}
                  keepRatio={false}
                  resizeEnabled={false}
                  rotateEnabled={false}
                  enabledAnchors={[]}
                  anchorFill="#29A9E5"
                  rotationSnaps={[0, 90, 180, 270]}
                  rotateAnchorOffset={0}
                  ref={trRef}
                />
                <Rect fill="rgba(0,0,255,0)" ref={selectionRectRef} />
              </Layer>
            </Stage>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button style={{ background: "#609" }} color="success" onClick={confirmAction}>{t("Confirm")}</Button>
      </div>
    </React.Fragment>
  )
}
export default SetZone;

const SvgImage = ({ element, zoomRate }) => {
  const [img] = useImage(`/element/${element.element_id}.png`);
  return (
    <Image
      image={img}
      x={element.position.x * zoomRate}
      y={element.position.y * zoomRate}
      id={element.id}
      name="rectangle"
      width={element.width * zoomRate}
      height={element.height * zoomRate}
      rotation={element.rotate_angle}
    />
  )
}