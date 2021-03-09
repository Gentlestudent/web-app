import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks';
import { routes } from '../constants';
import { colors } from '../assets/styles';
import { Button, Icon } from './UI';

import logo from '../../assets/img/logo.svg';

const NavigationIssuer = () => (
  <>
    <Link href={routes.issuer.OPPORTUNITIES}>Aangemaakte leerkansen</Link>
    <Link href={routes.issuer.CREATE_OPPORTUNITY}>Maak leerkans</Link>
  </>
);

const NavigationAdmin = () => (
  <>
    <Link href={routes.ValidateIssuer}>Valideer issuer</Link>
    <Link href={routes.admin.VALIDATE_OPPORTUNITY}>Valideer leerkans</Link>
  </>
);
const NavLink = ({ href, children, isButton, ...rest }) => {
  const router = useRouter();
  return (
    <li>
      <Link href={href} passHref>
        {/* rule is safe to disable here as Next passes the href to the anchor tag */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={`${router.pathname === '/' ? 'active' : ''} ${isButton ? 'primary' : ''}`}
          {...rest}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const Header = () => {
  const { authStatusReported, user } = useAuth();

  if (!authStatusReported) return <></>;

  // TODO: if user is logged in && they're an issuer
  const isIssuer = false;

  // TODO: if user is admin
  const isAdmin = true;

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="logo">
          <Link href="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="nav">
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon" />
          </label>
          <ul className="menu">
            <NavLink href={routes.OPPORTUNITIES}>Leerkansen</NavLink>
            {/* <NavLink href={routes.quests}>Quests</NavLink> */}
            <NavLink href={routes.news}>Nieuws</NavLink>
            <NavLink href={routes.aboutUs}>Over ons</NavLink>
            {!loading && user && !isIssuer && (
              <NavLink href={routes.becomeIssuer}>Word Issuer</NavLink>
            )}
            {!loading && !user && (
              <>
                <NavLink href={routes.login} isButton>
                  Login
                </NavLink>
                <NavLink href={routes.register} isButton>
                  Registreer
                </NavLink>
              </>
            )}

            {!loading && user && (
              <>
                <li className="dropdown">
                  <Button primary onClick={this.showMenu}>
                    Welkom {user.name}!
                    <i>
                      <Icon name="fa-caret-down" />
                    </i>
                  </Button>

                  {this.state.showMenu ? (
                    <div
                      className="dropdown-menu"
                      ref={(element) => {
                        this.dropdownMenu = element;
                      }}
                    >
                      <div className="dropdown-menu-list">
                        <Link href={routes.Profile}>Profiel</Link>
                        <Link href={routes.Backpack}>Backpack</Link>
                        <Link href={routes.user.OPPORTUNITIES}>Mijn Leerkansen</Link>
                        {!!isIssuer && (
                          <div className="nav-dropdown-ext">
                            <NavigationIssuer />
                          </div>
                        )}

                        {!!isAdmin && (
                          <div className="nav-dropdown-ext">
                            <NavigationAdmin />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </li>
                <div className="dropdown_mobile">
                  <li className="nav_item">
                    <Link href={routes.Profile}>Profiel</Link>
                  </li>
                  <li className="nav_item">
                    <Link href={routes.Backpack}>Backpack</Link>
                  </li>
                  {(isAdmin || isIssuer) && (
                    <NavLink href={routes.issuer.CREATE_OPPORTUNITY}>Maak leerkans</NavLink>
                  )}
                  {isIssuer && (
                    <NavLink href={routes.issuer.CREATE_OPPORTUNITY}>
                      Aangemaakte Leerkansen
                    </NavLink>
                  )}
                  {isAdmin && (
                    <>
                      <NavLink href={routes.validateIssuer}>Valideer issuer</NavLink>
                      <NavLink href={routes.admin.VALIDATE_OPPORTUNITY}>Valideer leerkans</NavLink>
                    </>
                  )}
                </div>
                <li>
                  <Button primary onClick={auth.signOut}>
                    Log uit
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          nav {
            height: 100px;
          }
          .nav-wrapper {
            position: fixed;
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: row;
            box-shadow: $shadow;
            background-color: $color-white;
            z-index: 999;
          }
          .logo {
            height: 100%;
            width: 2.7rem;
            padding-left: 3rem;
          }
          .logo img {
            height: 3rem;
            padding: 3.5rem 0;
          }
          .nav {
            width: 100%;
          }
          .menu {
            display: flex;
            position: absolute;
            right: 3rem
            padding: 2.2rem 0;
          }
          .menu li {
            list-style: none;
          }
          .menu li.active {
            border-bottom: .2rem solid ${colors.primary};
          }
          .menu li.language {
            font-size: 1.4rem;
          }
          .menu li a {
            display: block;
              font-weight: 700;
              color: ${colors.gray};
              padding: .5rem 1rem;
              margin: 0 .5rem;
              line-height: 2.2rem;
              height: 2.2rem;
          }
          .menu li a:hover {
            transition: all 258ms ease-in-out;
            color: ${colors.grayDark}
          }
          @media screen and (min-width: 320px) {
            .menu {
              flex-direction: column;
            }
          }
          @media screen and (min-width: 960px) {
            .menu {
              flex-direction: row;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Header;
