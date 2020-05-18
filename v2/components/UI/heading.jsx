import PropTypes from 'prop-types';
import { fonts, colors } from '../../assets/styles/constants';

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
        `}
      </style>
    </H>
  );
};

Heading.propTypes = {
  color: PropTypes.string,
  title: PropTypes.element,
  level: PropTypes.number
};

export default Heading;
