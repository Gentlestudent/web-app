import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faUser,
  faBuilding,
  faLock,
  faCaretDown,
  faCaretLeft,
  faExclamation,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faSearch,
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faEnvelope,
  faUser,
  faBuilding,
  faLock,
  faCaretDown,
  faCaretLeft,
  faExclamation,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faSearch,
  faEdit,
  faTimes
);

const Icon = ({ name }) => <FontAwesomeIcon icon={name} />;

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
