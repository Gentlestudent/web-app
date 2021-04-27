import PropTypes from 'prop-types';

const List = ({ children }) => (
  <>
    <ul className="list">{children}</ul>
    <style jsx>
      {`
        .list {
          list-style-type: disc;
          padding: 0;
          margin: 0.5rem 0 3rem 1.8rem;
        }
      `}
    </style>
  </>
);

List.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default List;
