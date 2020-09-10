import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../hooks';
import { routes } from '../../constants';
import { colors, breakpoints } from '../../assets/styles';
import { Button, Icon } from '../UI';
import Container from '../container';
import NavLink from './nav-link';
import logo from '../../assets/img/logo.svg';

const Header = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="nav">
        <Container>
          <div className="nav-wrapper">
            <div className="nav-top">
              <Link href="/">
                <img src={logo} alt="logo" />
              </Link>
              <div className="nav-toggle">
                <button type="button" onClick={() => setMenu(!menu)}>
                  <p>Menu</p>
                </button>
              </div>
            </div>

            <div className={`menu ${menu ? 'menu-open' : ''}`}>
              <ul className="links">
                <NavLink onClick={() => setMenu(false)} href={routes.OPPORTUNITIES}>
                  Leerkansen
                </NavLink>
                <NavLink onClick={() => setMenu(false)} href={routes.news}>
                  Nieuws
                </NavLink>
                <NavLink onClick={() => setMenu(false)} href={routes.aboutUs}>
                  Over ons
                </NavLink>
                <NavLink onClick={() => setMenu(false)} href={routes.becomeIssuer}>
                  Word Issuer
                </NavLink>
                <NavLink onClick={() => setMenu(false)} href={routes.login} isButton>
                  Login
                </NavLink>
                <NavLink onClick={() => setMenu(false)} href={routes.register} isButton>
                  Registreer
                </NavLink>
              </ul>
            </div>
          </div>
        </Container>
      </nav>

      <style jsx>
        {`
          .nav {
            height: 11.5rem;
            border-bottom: 0.1rem solid ${colors.border};
            z-index: 999;
          }

          .nav-top:hover {
            cursor: pointer;
          }

          .nav-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            z-index: 999;
            justify-content: space-between;
            height: 100%;
            align-items: center;
          }

          .nav-top img {
            height: 5rem;
          }

          .links {
            display: flex;
          }

          .nav-toggle {
            display: none;
          }

          @media (max-width: ${breakpoints.nav}) {
            .nav {
              height: 100%;
            }

            .menu {
              width: 100%;
            }

            .nav-wrapper {
              height: 100%;
              width: 100%;
              position: fixed;
              overflow: scroll;
              top: 0;
              right: 0;
              z-index: 800;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
            }

            .menu {
              opacity: 0;
              visibility: hidden;
            }

            .menu-open {
              opacity: 100%;
              visibility: inherit;
              background: #eff6fa;
              height: 100%;
            }

            .nav-toggle {
              display: inherit;
            }

            .nav-top {
              height: 8rem;
              width: 100%;
              background: white;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 2.5rem;
              text-transform: uppercase;
              font-size: 1.8rem;
              border-bottom: 0.1rem solid ${colors.border};
            }

            .links {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
