import React, { useState } from 'react';
import Link from 'next/link';
import HamburgerMenu from 'react-hamburger-menu';
import { Container, NavLink } from './index';
import { routes } from '../../constants';
import { colors, breakpoints } from '../../assets/styles';
import logo from '../../assets/img/logo.svg';
import { useAuth } from '../../hooks';
import hasRole from '../../utils/hasRole';
import { DropdownMenu } from '../UI';
import { signOut } from '../../connector/auth';
import loginEvents from '../../utils/loginEvents';

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const { isUserSignedIn, currentUser } = useAuth();

  async function handleLogoutClick(event) {
    event.preventDefault();
    await signOut();
    window.localStorage.removeItem('token');
    loginEvents.trigger('logout');
  }

  return (
    <>
      <nav className="nav">
        <Container>
          <div className={`nav-wrapper ${menu ? 'nav-wrapper-open' : ''}`}>
            <div className="nav-top">
              <Link href={routes.HOME}>
                <img src={logo} alt="logo" />
              </Link>
              <div className="nav-toggle">
                <HamburgerMenu
                  isOpen={menu}
                  menuClicked={() => setMenu(!menu)}
                  width={18}
                  height={15}
                  strokeWidth={2}
                  rotate={0}
                  color={colors.blue}
                  borderRadius={0}
                  animationDuration={0.5}
                />
              </div>
            </div>

            <div className={`menu ${menu ? 'menu-open' : ''}`}>
              <ul className="links">
                <NavLink onClick={() => setMenu(false)} href={routes.OPPORTUNITIES}>
                  Leerkansen
                </NavLink>
                {(!isUserSignedIn || !hasRole(currentUser, 'issuer')) && (
                  <NavLink onClick={() => setMenu(false)} href={routes.ISSUER}>
                    Word Issuer
                  </NavLink>
                )}
                <NavLink onClick={() => setMenu(false)} href={routes.NEWS}>
                  Nieuws
                </NavLink>
                <NavLink onClick={() => setMenu(false)} href={routes.ABOUT}>
                  Over ons
                </NavLink>
                {!isUserSignedIn ? (
                  <>
                    <NavLink onClick={() => setMenu(false)} href={routes.LOGIN} isButton>
                      Login
                    </NavLink>
                    <NavLink onClick={() => setMenu(false)} href={routes.REGISTER} isButton>
                      Registreer
                    </NavLink>
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                      <DropdownMenu.Button>
                        {`Welkom ${currentUser.firstName || ''}!`}
                      </DropdownMenu.Button>
                      <DropdownMenu.Content>
                        <DropdownMenu.Option href={routes.user.PROFILE}>
                          Profiel
                        </DropdownMenu.Option>
                        <DropdownMenu.Option href={routes.user.OPPORTUNITIES}>
                          Mijn leerkansen
                        </DropdownMenu.Option>
                        {hasRole(currentUser, 'issuer') && (
                          <>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Option href={routes.issuer.OPPORTUNITIES}>
                              Aangemaakte leerkansen
                            </DropdownMenu.Option>
                            <DropdownMenu.Option href={routes.issuer.CREATE_OPPORTUNITY}>
                              Maak leerkans
                            </DropdownMenu.Option>
                            <DropdownMenu.Option href={routes.issuer.CREATE_QUEST} disabled>
                              Maak quest
                            </DropdownMenu.Option>
                          </>
                        )}
                        {hasRole(currentUser, 'admin') && (
                          <>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Option href={routes.admin.VALIDATE_ISSUER}>
                              Valideer issuer
                            </DropdownMenu.Option>
                            <DropdownMenu.Option href={routes.admin.VALIDATE_OPPORTUNITY}>
                              Valideer leerkans
                            </DropdownMenu.Option>
                          </>
                        )}
                      </DropdownMenu.Content>
                    </DropdownMenu>
                    <NavLink onClick={handleLogoutClick}>Log uit</NavLink>
                  </>
                )}
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
            align-items: center;
            grid-gap: 2.5rem;
          }

          .nav-toggle {
            display: none;
          }

          @media (max-width: ${breakpoints.nav}) {
            .nav {
              height: 100%;
            }

            .nav-top img {
              height: 4rem;
            }

            .menu {
              width: 100%;
              transition: 0.2s;
            }

            .nav-wrapper {
              height: auto;
              position: fixed;
              top: 0;
              right: 0;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
            }

            .nav-wrapper-open {
              height: 100%;
            }

            .menu {
              opacity: 0;
              visibility: hidden;
              display: none;
            }

            .menu-open {
              opacity: 100%;
              visibility: inherit;
              background: #eff6fa;
              height: 100%;
              display: inherit;
            }

            .nav-toggle {
              display: inherit;
            }

            .nav-top {
              height: 8rem;
              width: 100vw;
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
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Nav;
