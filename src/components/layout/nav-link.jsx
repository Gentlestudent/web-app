import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { colors, breakpoints } from '../../assets/styles';

const NavLink = ({ href, children, isButton, ...rest }) => {
  const router = useRouter();
  return (
    <>
      <li className={`link ${router.pathname === href ? 'link-active' : ''} `}>
        <Link href={href || '/'} passHref>
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

          .link:not(.link-active):hover {
            color: ${colors.orange};
          }

          .link-active {
            border-bottom: 0.1rem solid ${colors.copy};
          }

          @media (max-width: ${breakpoints.nav}) {
            .link {
              margin-left: 0;
              padding: 0;
              display: block;
              text-align: left;
              font-size: 1.9rem;
            }

            .link-active {
              border-bottom: 0;
            }

            .link a {
              display: block;
              padding: 10px 20px;
              background-color: #fff;
              border-bottom: 1px solid #cbdde7;
              border-top: 1px solid #cbdde7;
              margin-bottom: -1px;
            }
          }
        `}
      </style>
    </>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isButton: PropTypes.bool
};

export default NavLink;
