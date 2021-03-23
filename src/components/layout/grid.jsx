import PropTypes from 'prop-types';

const Grid = ({ children }) => (
  <>
    <div className="grid">{children}</div>
    <style jsx>
      {`
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: 3rem;
        }
      `}
    </style>
  </>
);

Grid.propTypes = {
  children: PropTypes.element.isRequired
};

export default Grid;
