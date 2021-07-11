import React, { useState, useEffect, useRef } from "react";
import { Image, Transformer, Shape } from "react-konva";
import Konva from "konva";
import useImage from 'use-image';
const URLImage = ({ element, onDragStart, onDragEnd, onDragMove, shapeProps, isSelected, onSelect, onChange, onTransFormEnd, deleteAction, rate }) => {
  const [img] = useImage(element.src);
  const handleDragStop = () => {
    console.log("Element Drag stop")
  }
  const handleDragStart = (e) => {
    onDragStart(e, element.id);
  }
  const handleDrag = () => {
    console.log("Element Dragging")
  }
  const handleDragEnd = (e) => {
    onDragEnd(e, element.id);
  }
  const handleDrageMove = (e) => {
    onDragMove(e, element.id);
  }
  const onHandleSelect = (e) => {
    onSelect(e);
  }
  const handleTransFormEnd = (e) => {
    const node = shapeRef.current.attrs;
    onTransFormEnd(e, element.id)
  }
  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
    if (trRef && trRef.current) {
      var buttons = {
        rotater: {
          path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-rotate</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M0.9,0.5c0.1,0,0.3,0.1,0.3,0.3L1.1,2.9c1-1.4,2.6-2.4,4.5-2.4c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3c-1.4,0-2.6-0.5-3.6-1.4c-0.1-0.1-0.1-0.3,0-0.4L2.3,9c0.1-0.1,0.3-0.1,0.4,0c0.7,0.7,1.7,1.1,2.8,1.1c2.3,0,4.2-1.9,4.2-4.2S7.8,1.7,5.5,1.7c-1.7,0-3.2,1-3.8,2.5l2.7-0.1c0.1,0,0.3,0.1,0.3,0.3v0.6c0,0.1-0.1,0.3-0.3,0.3H0.3C0.1,5.2,0,5.1,0,4.9V0.8c0-0.1,0.1-0.3,0.3-0.3H0.9z"/></svg>',
          shape: trRef.current.findOne('.rotater')
        },
        top_right: {
          path: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>box-configurator-delete</title><circle cx="8" cy="8" r="8" style="fill:#fff"/><path d="M10.24,1.08v.66a.39.39,0,0,1-.36.36H1.12a.39.39,0,0,1-.36-.36V1.08A.39.39,0,0,1,1.12.72H3.64L3.82.3A.52.52,0,0,1,4.24,0h2.4a.61.61,0,0,1,.48.3L7.3.72H9.82C10.06.78,10.24.9,10.24,1.08ZM1.42,2.82h8.1V9.91a1.05,1.05,0,0,1-1,1H2.44a1.05,1.05,0,0,1-1-1ZM3.1,9.19a.39.39,0,0,0,.36.36.39.39,0,0,0,.36-.36V4.44a.39.39,0,0,0-.36-.36.39.39,0,0,0-.36.36Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,1,0-.72,0Zm2,0a.36.36,0,0,0,.72,0V4.44a.36.36,0,0,0-.72,0Z"/></svg>',
          shape: trRef.current.findOne('.top-right')
        }
      };
      for (var button in buttons) {
        var shape = buttons[button].shape;
        var selector = button.replace('_', '-');
        var icon = new Konva.Path({
          fill: "white",
          data: buttons[button].path,
          name: selector + '-icon'
        });
        icon.position(shape.position());
        if (selector == 'rotater') {
          icon.x(shape.x() - 5.25); icon.y(shape.y() - 5.25);
        }
        if (selector == 'top-right') {
          icon.x(shape.x() + 10.25); icon.y(shape.y() - 21.25);
        }
        if (selector == 'top-left') {
          icon.x(shape.x() - 22.25); icon.y(shape.y() - 21.25);
        }
        trRef.current.add(icon);
        if (selector == 'top-right') {
          shape.listening(false);
          icon.on('click', () => {
            console.log(element.id)
            deleteAction(element.id)
          })
        }
      }
      console.log("Selected")
    }
  }, [isSelected]);
  return (
    element.placeholder ?
      <Image
        image={img}
        x={element.x}
        y={element.y}
        draggable
        width={element.w}
        height={element.h}
        rotation={element.r}
        onDragStop={handleDragStop}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragMove={handleDrageMove}
        onDragEnd={handleDragEnd}
        fill="#29A9E5"
      />
      :
      <>
        <Image
          onClick={() => onSelect(shapeRef)}
          onTap={() => onSelect(shapeRef)}
          ref={shapeRef}
          {...shapeProps}
          name="rectangle"
          image={img}
          id={element.id}
          x={element.x}
          y={element.y}
          draggable
          width={element.w}
          height={element.h}
          rotation={element.r}
          onDragStop={handleDragStop}
          // onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragMove={handleDrageMove}
          onDragEnd={handleDragEnd}
          ////////////////////////////////
          onTransformEnd={handleTransFormEnd}
        />
        {isSelected && (
          <>
            <Transformer
              borderDash={[4, 3]}
              anchorCornerRadius={5}
              anchorStrokeWidth={15}
              borderStrokeWidth={1}
              padding={16}
              keepRatio={false}
              enabledAnchors={['top-right']}
              anchorFill="#29A9E5"
              rotationSnaps={[0, 90, 180, 270]}
              rotateAnchorOffset={0}
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </>
        )
        }
      </>
  )
}
export { URLImage };