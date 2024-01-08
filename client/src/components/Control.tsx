import { useState, useRef, useEffect, TouchEvent } from "react";
import styled from "@emotion/styled/macro";

import { Nullable, Pair } from "../utils/types";
import {
  getOffset,
  getTouchCoords,
  midiToPx,
  pxOffsetToMidiOffset,
} from "../utils/control";

export const ControlContainer = styled.div`
  aspect-ratio: 1;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: white;
  opacity: 0.7;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const ControlDotContainer = styled.div`
  position: absolute;
  top: -2.5%;
  left: -2.5%;
  height: 5%;
  width: 5%;
  transition: translate 100ms linear;
`;

const ControlDot = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* vertical */
  &:before {
    content: " ";
    position: absolute;
    z-index: -1;
    top: -2000%;
    left: 0;
    display: block;
    width: 100%;
    height: 4200%;
    background: black;
  }
  /* horizontal */
  &:after {
    content: " ";
    z-index: -1;
    position: absolute;
    right: -2000%;
    top: 0;
    display: block;
    width: 4200%;
    height: 100%;
    background: black;
  }
`;

type ControlProps = {
  x: number;
  xLocked: boolean;
  y: number;
  yLocked: boolean;
  offset: (x: number, y: number) => void;
};

export const Control = ({ x, xLocked, y, yLocked, offset }: ControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<number>(0);
  const [prevTouchCoords, setPrevTouchCoords] = useState<Nullable<Pair>>(null);

  const handleTouchStart = (e: TouchEvent) =>
    setPrevTouchCoords(getTouchCoords(e));
  const handleTouchEnd = (e: TouchEvent) => setPrevTouchCoords(null);

  const handleTouchMove = (e: TouchEvent) => {
    if (!prevTouchCoords || !containerRef.current) return;
    const touchCoords = getTouchCoords(e);
    const touchOffset = getOffset(prevTouchCoords, touchCoords);
    const containerWidth = containerRef.current.offsetWidth; // assuming container is a square
    const [xOffset, yOffset] = pxOffsetToMidiOffset(
      touchOffset,
      containerWidth
    );
    offset(xLocked ? 0 : xOffset, yLocked ? 0: yOffset);
    setPrevTouchCoords(touchCoords);
  };

  useEffect(() => {
    containerRef.current && setContainerSize(containerRef.current.offsetWidth);
  }, []);

  return (
    <ControlContainer
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <ControlDotContainer
        style={{
          transform: `translate(${midiToPx(x, containerSize)}px, ${midiToPx(
            y,
            containerSize
          )}px)`,
        }}
      >
        <ControlDot />
      </ControlDotContainer>
    </ControlContainer>
  );
};
