import PropTypes from 'prop-types';
import { colors } from '../assets/styles';
import { Icon, FormField } from '../components/UI';

const SearchBackup = ({ type, name, placeholder, required, error, value, ...rest }) => {
  return (
    <>
      <form className="form form-search">
        <div className="search">
          <label htmlFor="search" className="label form-title">
            Zoeken
          </label>
          <div>
            {/* <div className="search-icon">
              <Icon name="search" />
            </div> */}

            <FormField id="search" type="search" icon="search" name={name} />

            {/* <input
              id="search"
              type={type}
              name={name}
              required={required}
              value={value}
              className="search-input"
              {...rest}
            /> */}
          </div>
        </div>

        <div className="filter">
          <p className="form-title">Filter</p>
          <FormField id="ghent" type="checkbox" name="city[]" label="component" />
          {/* <label className="filter-label" htmlFor="ghent">
            <input className="filter-input" type="checkbox" id="ghent" name="city[]" />
            <span className="checkbox" />
            Gent
          </label> */}
          <label className="filter-label" htmlFor="antwerp">
            <input className="filter-input" type="checkbox" id="antwerp" name="city[]" />
            <span className="checkbox" />
            Antwerpen
          </label>
        </div>
      </form>
      <style jsx>
        {`
          .form-search {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .form-title {
            font-weight: 600;
            font-size: 1.8rem;
            text-transform: uppercase;
          }

          .filter {
            display: flex;
          }

          .label {
            margin-right: 2rem;
          }

          .search,
          .filter {
            display: flex;
            align-items: center;
            width: 50%;
          }

          .filter {
            margin-left: 5rem;
          }

          .filter > p {
            margin-right: 2rem;
          }

          .search > div {
            width: 100%;
            display: flex;
            align-items: center;
          }

          .search-icon {
            position: absolute;
            z-index: 2;
            margin-left: 1.7rem;
            color: ${colors.blue};
          }

          .search-input {
            width: 100%;
            height: 4.6rem;
            border: 0.1rem solid ${colors.border};
            border-radius: 30px;
            padding: 10px 12px 10px 44px;
            position: relative;
          }

          .search-input:focus {
            border: 0.1rem solid ${colors.blue};
            outline: none;
          }

          .filter-label {
            display: inherit;
            position: relative;
            padding-left: 1rem;
            margin-right: 2rem;
            font-size: 1.7rem;
          }

          .filter-label:hover {
            cursor: pointer;
          }

          .filter-input {
            position: absolute;
            opacity: 0 !important;
            cursor: pointer;
          }

          .checkbox {
            width: 2.3rem;
            height: 2.3rem;
            display: inline-block;
            position: relative;
            margin-right: 1rem;
            background-color: white;
            border: 0.1rem solid ${colors.border};
          }

          input[type='checkbox']:checked + span {
            background-color: ${colors.orange};
            border: 0.1rem solid ${colors.orange};
          }

          input[type='checkbox']:checked + span::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: -0.2rem;
            left: -0.3rem;
            border-bottom: 2px solid transparent;
            border-left: 2px solid transparent;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-transform-origin: 18px -1px;
            transform-origin: 18px -1px;
            width: 13px;
            height: 8px;
            border-color: white;
            -webkit-transition: height 0.08s ease-out, width 0.08s ease-out 0.1s;
            transition: height 0.08s ease-out, width 0.08s ease-out 0.1s;
          }
        `}
      </style>
    </>
  );
};

SearchBackup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string
};

SearchBackup.defaultProps = {
  icon: null,
  placeholder: ''
};

export default SearchBackup;
