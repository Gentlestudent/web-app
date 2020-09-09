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
    <>
      <li className="link">
        <Link href="www.google.be" passHref>
          {/* rule is safe to disable here as Next passes the href to the anchor tag */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={`${isButton ? 'primary' : ''}`} {...rest}>
            {children}
          </a>
        </Link>
      </li>

      <style jsx>
        {`
          .link {
            margin-left: 2.5rem;
            font-weight: 600;
            transition: 0.2s;
            font-size: 1.8rem;
          }

          .link:hover {
            color: ${colors.orange};
          }

          .active {
            border-bottom: 0.1rem solid ${colors.copy};
          }
        `}
      </style>
    </>
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

            <div className="menu">
              <ul className="links">
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
            border-bottom: 0.1rem solid ${colors.border};
            z-index: 999;
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

          .logo img {
            height: 5rem;
          }

          .links {
            display: flex;
          }
        `}
      </style>
    </>
  );
};

export default Header;
