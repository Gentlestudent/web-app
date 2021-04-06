import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Heading from './heading';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import arrow from '../../assets/img/icons/arrow-white.svg';
import { routes } from '../../constants';

const Card = ({ image, title, date, description, onClick, badge, alt, row, id }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`card button-container ${row ? 'card-row' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="img-wrapper">
          <img src={image} alt={alt} />
        </div>
        {badge ? (
          <div className="card-badge">
            <img src={badge} alt={alt} />
          </div>
        ) : (
          ''
        )}

        <div className="card-text">
          <div className="card-header">
            <Heading title={title} level={2} color={hover ? colors.orange : colors.primary} />
          </div>
          <div className="card-body">
            <span className="date">{date}</span>
            <p>{description}</p>
          </div>
        </div>

        <a className="card-button" href={`${routes.OPPORTUNITIES}/${id}`}>
          Meer info
        </a>
      </button>

      <style jsx>
        {`
          .card {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            background: ${colors.blueLight};
            position: relative;
          }

          .img-wrapper {
            width: 100%;
            height: 20rem;
          }

          .img-wrapper > img {
            object-fit: cover;
            height: 100%;
            width: 100%;
          }

          .card-text {
            padding: ${spacers.medium};
          }

          .card-header {
            font-size: 2.1rem;
            margin-bottom: 1.5rem;
          }

          .card-badge {
            position: absolute;
            right: 1rem;
            top: 11rem;
          }

          .card-badge img {
            height: 13rem;
          }

          .card-body > .date {
            font-size: 1.4rem;
          }

          .card-button {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 4rem;
            height: 4rem;
            background: #f58732 url(${arrow}) no-repeat 50% 50%;
            display: inline-block;
            text-indent: -9999px;
            font-size: 0;
            overflow: hidden;
          }

          .card-row {
            margin-bottom: ${spacers.medium};
            height: 100%;
            display: grid;
            grid-template-columns: 1fr 2fr;
          }

          .card-row .img-wrapper {
            height: 28rem;
          }

          .card-row .card-text {
            padding: ${spacers.medium} 15rem ${spacers.medium} ${spacers.medium};
          }

          @media (max-width: 1080px) {
            .card-row .img-wrapper {
              height: 36rem;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .card-header {
              padding: 1rem 0 0 0;
            }

            .card-row {
              display: flex;
              flex-direction: column;
            }

            .card-row .card-text {
              padding: ${spacers.small};
            }

            .card-row .img-wrapper {
              width: 100%;
              height: 20rem;
            }
          }
        `}
      </style>
    </>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  badge: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  date: PropTypes.string,
  alt: PropTypes.string,
  row: PropTypes.bool
};

export default Card;
