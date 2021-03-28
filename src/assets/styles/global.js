import css from 'styled-jsx/css';
import { colors, fonts } from './constants';

export default css.global`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
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
  nav a,
  nav a:visited,
  nav a:active,
  nav a:hover,
  footer a,
  footer a:visited,
  footer a:active,
  footer a:hover {
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
    /* height: 100%; */
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

  /* FORMS */
  input,
  select,
  textarea {
    border: 0.1rem solid ${colors.border};
    border-radius: 0.5rem;
    padding: 1rem 1.2rem 1rem 1.4rem;
    position: relative;
    margin-top: 0.5rem;
  }

  input[type=text],
  input[type=email],
  input[type=number],
  input[type=password],
  input[type=date] {
    width: 100%;
  }

  i + input {
    padding-left: 4.4rem;
  }

  input:focus {
    border: 0.1rem solid ${colors.blue};
    outline: none;
  }

  textarea {
    padding: 1rem 1.2rem 1rem 1.2rem;
  }

  .quill {
    margin-top: 1rem;
    background: white;
  }

  .ql-container.ql-snow,
  .ql-toolbar.ql-snow {
    border: 0.1rem solid ${colors.border};
  }

  .ql-editor {
    padding: 1.5rem;
  }
`;
