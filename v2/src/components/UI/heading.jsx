import PropTypes from 'prop-types';
import { fonts, colors } from '../../assets/styles';

const Heading = ({ color, title, level }) => {
  const H = `h${level}`;
  return (
    <H className="title">
      {title}
      <style jsx>
        {`
          .title {
            color: ${color || colors.primary};
            font-weight: bold;
            font-family: ${fonts.titles};
          }

          h1 {
            // font-size: 4.5rem;
            font-size: 5.6rem;
            margin: 0.45rem 0;
          }

          h2 {
            // font-size: 3rem;
            font-size: 2rem;
            // margin: 0.3rem 0;
            margin: 0 0 0.1rem;
            line-height: 27px;
          }

          h3 {
            font-size: 1.8rem;
            margin: 0.18rem 0;
          }

          h4 {
            font-size: 1.5rem;
            margin: 0.15 0;
          }

          h5 {
            font-size: 1.2rem;
            margin: 0.12 0;
          }

          h6 {
            font-size: 1rem;
            margin: 0.1 0;
          }
        `}
      </style>
    </H>
  );
};

Heading.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  level: PropTypes.number
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
