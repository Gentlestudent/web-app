import { colors, fonts } from './constants';

export default () => (
  <style jsx global>
    {`
      @font-face {
        font-family: 'Open Sans';
        src: url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
        font-display: swap;
      }

      html {
        box-sizing: border-box;
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
        box-sizing: inherit;
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
      textarea {
        font-family: ${fonts.copy};
      }
    `}
  </style>
);
