import PropTypes from 'prop-types';
import { colors } from '../../assets/styles';
import { Icon } from '.';

const Search = ({ type, name, placeholder, required, error, value, ...rest }) => {
  return (
    <>
      <div className="search">
        <div className="search-icon">
          <Icon name="search" />
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          className="search-input"
          {...rest}
        />
      </div>
      <style jsx>
        {`
          .search {
            display: flex;
            align-items: center;
          }

          .search-icon {
            position: absolute;
            z-index: 2;
            margin-left: 1.7rem;
            color: pink;
          }

          .search-input {
            width: 100%;
            height: 4.6rem;
            border: 0.1rem solid #bad2df;
            border-radius: 30px;
            padding: 10px 12px 10px 44px;
            position: relative;
          }
        `}
      </style>
    </>
  );
};

Search.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string
};

Search.defaultProps = {
  icon: null,
  placeholder: ''
};

export default Search;
