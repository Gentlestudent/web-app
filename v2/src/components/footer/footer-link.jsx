import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

const FooterLink = ({ href, children, secondary }) => {
  const router = useRouter();
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
            margin-right: 2rem;
            opacity: 0.85;
            transition: 0.4s;
          }

          .link:hover {
            opacity: 1;
          }

          .link-secondary {
            margin: 0 0 0 2rem;
          }
        `}
      </style>
    </>
  );
};

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FooterLink;
