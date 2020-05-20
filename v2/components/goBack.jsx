import Router from 'next/router';
import Icon from './UI/icon';

export default () => (
  <div>
    <Icon name="caret-left" />
    <a onClick={() => Router.back()}>Terug</a>
    <style jsx>
      {`
        div {
          display: flex;
          align-items: center;
          min-height: 4rem;
          cursor: pointer;
        }

        a {
          margin-left: 1rem;
          font-weight: bold;
        }
      `}
    </style>
  </div>
);
