import PropTypes from 'prop-types';
import Link from 'next/link';
import { breakpoints } from '../../assets/styles/constants';

const FooterLink = ({ href, children, secondary }) => {
  return (
    <>
      <li className={`link ${secondary ? 'link-secondary' : ''}`}>
        <Link href={href || '/'} passHref>
          {/* rule is safe to disable here as Next passes the href to the anchor tag */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{children}</a>
        </Link>
      </li>

      <style jsx>
        {`
          .link {
            font-size: 1.8rem;
            padding: 0.5rem 2rem 0.5rem 0;
            opacity: 0.85;
            transition: 0.4s;
          }

          .link:hover {
            opacity: 1;
          }

          .link-secondary {
            padding: 0.5rem 0 0.5rem 2rem;
          }

          @media (max-width: ${breakpoints.small}) {
            .link {
              padding: 0.5 0;
            }

            .link-secondary {
              padding: 0 2rem 0 0;
            }
          }
        `}
      </style>
    </>
  );
};

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool
};

export default FooterLink;
