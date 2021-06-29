import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { colors } from '../../assets/styles';

const MenuContext = createContext({
  open: false
});

const DropdownMenu = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    function handleClick() {
      setOpen(false);
    }

    if (isOpen) {
      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('click', handleClick);
      };
    }

    return () => {};
  }, [isOpen]);

  function handlePropagationClick(event) {
    event.stopPropagation();
  }

  return (
    <MenuContext.Provider value={{ isOpen, setOpen }}>
      <div onClick={handlePropagationClick}>{children}</div>
      <style jsx>
        {`
          div {
            position: relative;
          }
        `}
      </style>
    </MenuContext.Provider>
  );
};

const Button = ({ children }) => {
  const { isOpen, setOpen } = useContext(MenuContext);

  function handleClick() {
    setOpen(!isOpen);
  }

  return (
    <>
      <button onClick={handleClick}>{children}</button>
      <style jsx>
        {`
          button {
            border: 2px solid ${colors.blue};
            border-radius: 1rem;
            background: none;
            color: ${colors.blue};
            font-weight: 600;
            font-size: 18px;
            padding: 1rem 2rem;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

const Content = ({ children }) => {
  const contextState = useContext(MenuContext);

  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            z-index: 1;
            display: ${contextState.isOpen ? 'flex' : 'none'};
            flex-flow: column;
            position: absolute;
            top: 100%;
            right: 0;
            border: 2px solid ${colors.gray};
            border-radius: 1rem;
            padding: 1rem 0;
            background-color: ${colors.white};
            box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.2);
            white-space: nowrap;
          }
        `}
      </style>
    </>
  );
};

const Option = ({ href, disabled, children }) => {
  return (
    <>
      {href && !disabled ? (
        <a href={href} className="dropdown-option">
          {children}
        </a>
      ) : (
        <div className="dropdown-option">{children}</div>
      )}
      <style jsx>
        {`
          .dropdown-option {
            ${disabled ? 'opacity: 0.5;' : ''}
            width: 100%;
            padding: 0 2rem;
            color: ${colors.gray};
            font-size: 18px;
            font-weight: 600;
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            transition: color 0.2s ease-in-out;
          }

          div:hover {
            color: ${colors.grayDark};
          }
        `}
      </style>
    </>
  );
};

const Separator = () => {
  return (
    <>
      <div />
      <style jsx>
        {`
          div {
            width: 100%;
            border-bottom: 2px dotted ${colors.grayLight};
            margin: 1rem 0;
          }
        `}
      </style>
    </>
  );
};

DropdownMenu.Button = Button;
DropdownMenu.Content = Content;
DropdownMenu.Option = Option;
DropdownMenu.Separator = Separator;

DropdownMenu.propTypes = {
  children: PropTypes.node
};

Button.propTypes = {
  children: PropTypes.node
};

Content.propTypes = {
  children: PropTypes.node
};

Option.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

export default DropdownMenu;
