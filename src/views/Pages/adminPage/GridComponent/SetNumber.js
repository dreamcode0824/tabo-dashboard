import React, { useState, useEffect, useRef } from "react";
import { Image, Transformer, Shape, Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import useImage from 'use-image';
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  Button
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { updateSeatNumber } from '../../../../redux/element/action'
const SetZone = ({ zoomRate, zoomAreaValue }) => {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business);
  const element = useSelector(({ element }) => element);
  const [dotsData, setDotsData] = useState([]);
  const [elements, setElements] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const [seatNumber, setSeatNumber] = useState("0");
  const [currentId, setCurrentId] = useState(0);
  const stageRef = useRef();
  const layerRef = useRef();
  const trRef = useRef();
  ////////////////////////////////
  const oldPos = useRef(null);
  const selectionRectRef = useRef();
  const selection = useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });
  useEffect(() => {
    if (element.resultElements.length > 0) {
      let filterZoneData = element.resultElements;
      if (filterZoneData.length > 0) {
        filterZoneData.map((item, index) => {
          let filterWidthHeight = element.allElement.filter(ele => ele.id == item.element_id)
          filterZoneData[index]['width'] = filterWidthHeight[0].width / 2;
          filterZoneData[index]['height'] = filterWidthHeight[0].height / 2;
        })
        if (layerRef && layerRef.current) {
          layerRef.current.find(`.text`).destroy()
          layerRef.current.find(`.backgroundReact`).destroy()
          filterZoneData.map((item, index) => {
            let width1 = item.width * Math.cos(item.rotate_angle * Math.PI / 180);
            let width2 = item.height * Math.sin(item.rotate_angle * Math.PI / 180);
            let height1 = item.width * Math.sin(item.rotate_angle * Math.PI / 180);
            let height2 = item.height * Math.cos(item.rotate_angle * Math.PI / 180);
            var rect2 = new Konva.Rect({
              x: (item.position.x + (Math.round(width1) - Math.round(width2)) / 2) * zoomRate - 5 - 17,
              y: (item.position.y + Math.round(height2) + (Math.round(height1) - Math.round(height2)) / 2) * zoomRate - 13,
              width: 60 * zoomRate,
              height: 25 * zoomRate,
              fill: '#2CA8FF',
              cornerRadius: 5,
              name: "backgroundReact"
            });
            var text = new Konva.Text({
              x: (item.position.x + (Math.round(width1) - Math.round(width2)) / 2) * zoomRate - 8,
              y: (item.position.y + Math.round(height2) + (Math.round(height1) - Math.round(height2)) / 2) * zoomRate - 14,
              text: `${item.position.number}`,
              fontSize: 20 * zoomRate,
              fontWeight: 'bold',
              fontFamily: 'Nucleo Outline',
              fill: '#fff',
              stroke: '#29A9E5',
              name: "text",
              strokeEnabled: false,
              strokeWidth: 3
            });
            layerRef.current.add(rect2);
            layerRef.current.add(text)
          })
        }
      }
      setElements(filterZoneData)
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
          console.log(trRef.current._nodes[0].attrs)
          let attrs = trRef.current._nodes[0].attrs;
          setModalStatus(true)
          setSeatNumber(attrs.number)
          setCurrentId(attrs.id)
          trRef.current.nodes([]);
        }
      }
    }
  };
  const handleChangeSeat = (event) => {
    if (event.target.value.length < 5) {
      setSeatNumber(event.target.value)
    }
  }
  const agreeSave = (event) => {
    return new Promise((resolve, reject) => {
      dispatch(updateSeatNumber(resolve, currentId, seatNumber))
    }).then((success) => {
      console.log(success)
      if (success) {
        setModalStatus(false)
      }
    }).catch(errors => {
    });
  }
  const toggleModalDemoRule = () => {
    setModalStatus(!modalStatus)
  }
  console.log(seatNumber)
  return (
    <React.Fragment>
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
      {modalStatus && (
        <Modal isOpen={modalStatus} toggle={toggleModalDemoRule}>
          <ModalBody>
            <h5 className="bold text-center">Edit Seat Number</h5>
            <div>
              <Input
                placeholder="Edit seat number"
                type="text"
                name="seatNumber"
                value={seatNumber}
                onChange={handleChangeSeat}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={agreeSave}>
              Save
            </Button>
            <Button color="danger" onClick={toggleModalDemoRule}>
              Cancel
              </Button>
          </ModalFooter>
        </Modal>
        // <SweetAlert
        //   input
        //   showCancel
        //   style={{ display: "block", marginTop: "-100px" }}
        //   title="Edit Seat Number"
        //   onConfirm={handleSuccess}
        //   value={seatNumber}
        //   onCancel={hideAlert}
        //   confirmBtnBsStyle="info"
        //   cancelBtnBsStyle="danger"
        // />
      )}
    </React.Fragment>
  )
}

export default SetZone;

const SvgImage = ({ element, zoomRate }) => {
  // console.log(element)
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
      number={element.position.number}
    />
  )
}