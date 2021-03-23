import React from 'react';
import { FooterLink, Container } from './index';
import { colors, breakpoints, spacers } from '../../assets/styles/constants';
import logo from '../../assets/img/footer-gentlestudent.svg';
import { routes } from '../../constants';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container>
          <>
            <nav className="footer-top">
              <ul className="menu">
                <FooterLink href={routes.OPPORTUNITIES}>Leerkansen</FooterLink>
                <FooterLink href={routes.ISSUER}>Word issuer</FooterLink>
                <FooterLink href={routes.ABOUT}>Over ons</FooterLink>
                <FooterLink href={routes.NEWS}>Nieuws</FooterLink>
                <FooterLink href={routes.OPPORTUNITIES}>Inloggen</FooterLink>
                <FooterLink href={routes.OPPORTUNITIES}>Registreer</FooterLink>
              </ul>
            </nav>
            <div className="footer-bottom">
              <img className="logo" src={logo} alt="" />
              <ul>
                <FooterLink secondary href={routes.CONDITIONS}>
                  Conditions
                </FooterLink>
                <FooterLink secondary href={routes.PRIVACY}>
                  Privacy
                </FooterLink>
              </ul>
            </div>
          </>
        </Container>
      </footer>

      <style jsx>
        {`
          .footer {
            margin-top: 12rem;
            background-color: ${colors.primary};
            color: ${colors.white};
            padding: 8rem 0;
          }

          .footer-top {
            border-bottom: 0.1rem solid ${colors.white};
          }

          .footer-bottom {
            padding: ${spacers.large} 0 0;
            display: flex;
            justify-content: space-between;
          }

          .menu {
            display: flex;
            padding: 0 0 ${spacers.large};
          }

          .logo {
            width: 25rem;
          }

          .footer-bottom ul {
            display: flex;
          }

          @media (max-width: ${breakpoints.small}) {
            .menu,
            .footer-bottom {
              flex-direction: column;
            }

            .footer {
              padding: 4rem 0;
            }

            .footer-bottom .logo {
              margin-bottom: 2rem;
            }

            .footer {
              margin-top: 4rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Footer;
