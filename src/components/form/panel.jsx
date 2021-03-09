import PropTypes from 'prop-types';
import { colors } from '../../assets/styles';

const Panel = ({ children }) => (
  <>
    <div className="form-panel">{children}</div>
    <style jsx>
      {`
        .form-panel {
          background: ${colors.blueLight};
          margin: 4rem auto 0;
          padding: 4.5rem;
          max-width: 65rem;
        }
      `}
    </style>
  </>
);

Panel.propTypes = {
  children: PropTypes.element.isRequired
};

export default Panel;
