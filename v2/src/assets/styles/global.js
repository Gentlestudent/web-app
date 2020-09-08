import css from 'styled-jsx/css';
import { colors, fonts } from './constants';

export default css.global`
  @font-face {
    font-family: 'Open Sans';
    font-weight: 400;
    font-display: swap;
  }

  html {
    box-sizing: inherit;
    font-size: 62.5%;
  }

  body {
    padding: 0;
    margin: 0;
    background-color: ${colors.white};
    color: ${colors.copy};
    font-size: 1.6rem;
    font-family: ${fonts.copy};
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${fonts.titles};
    font-weight: normal;
  }

  p,
  ul li,
  ol li {
    line-height: 1.6;
  }

  a,
  a:visited,
  a:active,
  a:hover {
    color: inherit;
    text-decoration: none;
  }

  input,
  select,
  label,
  textarea {
    font-family: ${fonts.copy};
    font-size: inherit;
  }

  .button-container {
    cursor: pointer;
    background-color: inherit;
    border: none;
    padding: 0;
    margin: 0;
    text-align: inherit;
    outline: 0;
    width: 100%;
    height: 100%;
    text-align: inherit;
    font-size: inherit;
    font-family: inherit;
    border-radius: inherit;
  }

  .button-container:focus,
  .button-container:active,
  .button-container::-moz-focus-inner {
    outline: 0;
    border: 0;
  }
`;
