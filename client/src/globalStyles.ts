import { css } from "@emotion/react";

export const globalStyles = css`
  html,
  body {
    overscroll-behavior: none;
	  touch-action: none
  }
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
	  overflow: hidden;
  }
  body {
    font-family: sans-serif;
    margin: 0;
    background-color: black;
    color: white;
  }
`;
