import css from 'styled-jsx/css';
import { colors, fonts } from './constants';

export default css.global`
  @font-face {
    font-family: 'Source Sans Pro';
    src: url(/assets/fonts/SourceSansPro-Regular.woff2) format('woff2'),
      url(/assets/fonts/SourceSansPro-Regular.woff) format('woff');
    font-weight: 400;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: 'Source Sans Pro';
    src: url(/assets/fonts/SourceSansPro-SemiBold.woff2) format('woff2'),
      url(/assets/fonts/SourceSansPro-SemiBold.woff) format('woff');
    font-weight: 600;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: 'Source Sans Pro';
    src: url(/assets/fonts/SourceSansPro-Bold.woff2) format('woff2'),
      url(/assets/fonts/SourceSansPro-Bold.woff) format('woff');
    font-weight: 700;
    font-display: swap;
    font-style: normal;
  }

  html {
    box-sizing: inherit;
    font-size: 62.5%;
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    background-color: ${colors.white};
    color: ${colors.copy};
    font-size: 1.8rem;
    font-family: ${fonts.copy};
    height: 100%;
  }

  body > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
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
    margin: 0;
  }

  p + h1,
  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-top: 3rem;
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

  ul.list > li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;
