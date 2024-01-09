import styled from "@emotion/styled/macro";

import { ControlContainer } from "./Control";

export const Grid = styled.div`
  position: absolute;
  display: grid;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  max-height: 100%;
  max-width: 100%;

  @media (orientation: landscape) {
    grid-template-columns: 2fr 2fr 2fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    aspect-ratio: 7/6;
  }
  @media (orientation: portrait) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 2fr 2fr 2fr 1fr;
    aspect-ratio: 6/7;
  }
`;

export const Keys = styled.div`
  display: flex;
  @media (orientation: landscape) {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 5;
    flex-direction: column;
  }
  @media (orientation: portrait) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;
    flex-direction: row;
  }
`

export const Key = styled.div`
  background-color: white;
  opacity: 0.7;
  transition: opacity ease-in;
  margin: 1rem;
  @media (orientation: landscape) {
    width: calc(100% - 2rem);
  }
  @media (orientation: portrait) {
    height: calc(100% - 2rem);
  }

  &.active {
    opacity: 1;
  }
`

export const ProceedKey = styled(Key)`
  @media (orientation: landscape) {
    height: calc(100% / 3 * 2 - 2rem);
  }
  @media (orientation: portrait) {
    width: calc(100% / 3 * 2 - 2rem);
  }
`

export const LockKey = styled(Key)`
  @media (orientation: landscape) {
    height: calc(100% / 6 - 2rem);
  }
  @media (orientation: portrait) {
    width: calc(100% / 6 - 2rem);
  }
`

export const Controls = styled.div<{}>`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${ControlContainer} {
      margin: 1rem;
      width: calc((100% -6rem )/ 3);
      height: calc((100% - 6rem) / 3);
    };
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 4;
`;
