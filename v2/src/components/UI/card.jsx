import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Heading from './heading';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import arrow from '../../assets/img/icons/arrow-white.svg';

const Card = ({ image, title, date, description, onClick, badge, alt, row }) => {
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

        <a className="card-button" href="/id">
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
          }

          .img-wrapper > img {
            object-fit: cover;
            height: 20rem;
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
            width: 40px;
            height: 40px;
            background: #f58732 url(${arrow}) no-repeat 50% 50%;
            display: inline-block;
            text-indent: -9999px;
            font-size: 0;
            overflow: hidden;
          }

          .card-row {
            flex-direction: row;
            margin-bottom: ${spacers.medium};
          }

          .card-row .img-wrapper {
            width: 50rem;
            height: 100%;
          }

          .card-row > img {
            object-fit: cover;
            height: auto;
            width: 100%;
          }

          .card-row .card-text {
            padding: ${spacers.medium} 15rem ${spacers.medium} ${spacers.medium};
          }

          @media (max-width: ${breakpoints.small}) {
            .card-header {
              padding: 1rem 0 0 0;
            }

            .card-row {
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
