import PropTypes from 'prop-types';

import { colors, breakpoints, spacers } from '../../assets/styles/constants';
import banner from '../../assets/img/home/banner.jpg';
import { Container } from '../layout/index';

const BannerSplit = ({ children }) => {
  return (
    <>
      <div className="heading">
        <Container>
          <div className="heading__content">
            <div className="heading__image" />
            <div className="heading__text">{children}</div>
          </div>
        </Container>
      </div>

      <style jsx>
        {`
          .heading {
            position: relative;
          }

          .heading::before {
            content: '';
            position: absolute;
            height: 100%;
            width: calc((1300px + ((100% - 1300px) / 2)) - 10rem);
            right: 0;
            z-index: -1;
            background: ${colors.orange};
          }

          .heading__content {
            padding: 5rem 5rem 5rem 0;
            color: white;
            display: grid;
            grid-template-columns: 40rem 1fr;
            grid-gap: 6rem;
          }

          .heading__image {
            background-image: url(${banner});
          }

          .heading__text {
            margin-right: 5rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .heading::before {
              width: calc(100% - 5rem);
            }
            .heading__text {
              margin-right: 0rem;
            }
          }

          @media (max-width: 900px) {
            .heading__content {
              grid-template-columns: 1fr;
              grid-gap: 3rem;
            }

            .heading__image {
              height: 30rem;
              width: calc(100% + 3rem);
              top: 0;
              left: -3rem;
              position: absolute;
            }

            .heading__text {
              margin-top: 30rem;
            }

            .heading__content {
              padding: ${spacers.medium} 0;
            }

            .heading::before {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

BannerSplit.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default BannerSplit;
