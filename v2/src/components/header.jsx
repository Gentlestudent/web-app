import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks';
import { routes } from '../constants';
import { colors } from '../assets/styles';
import { Button, Icon } from './UI';
import Container from './container';

import logo from '../assets/img/logo.svg';

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
      <Link href="www.google.be" passHref>
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
    <>
      <nav className="nav">
        <Container>
          <div className="nav-wrapper">
            <div className="logo">
              <Link href="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>

            <div className="links">
              <ul className="menu">
                <NavLink href={routes.OPPORTUNITIES}>Leerkansen</NavLink>
                <NavLink href={routes.news}>Nieuws</NavLink>
                <NavLink href={routes.aboutUs}>Over ons</NavLink>
                <NavLink href={routes.becomeIssuer}>Word Issuer</NavLink>
                <NavLink href={routes.login} isButton>
                  Login
                </NavLink>
                <NavLink href={routes.register} isButton>
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
          }
          .nav-wrapper {
            // position: fixed;
            width: 100%;
            display: flex;
            flex-direction: row;

            background-color: pink;
            z-index: 999;
            justify-content: space-between;
          }
          .logo {
            height: 100%;
            width: 2.7rem;
            padding-left: 3rem;
          }
          .logo img {
            height: 3rem;
            // padding: 3.5rem 0;
          }
          .links {
            width: 100%;

        `}
      </style>
    </>
  );
};

export default Header;
