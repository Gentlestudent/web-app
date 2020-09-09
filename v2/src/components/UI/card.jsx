import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Heading from './heading';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import arrow from '../../assets/img/icons/arrow-white.svg';

const Card = ({ image, title, date, description, onClick, badge, alt }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        type="button"
        className="card button-container"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={image} alt={alt} />
        <div className="card-badge">
          <img src={badge} alt={alt} />
        </div>
        <div className="card-header">
          <Heading title={title} level={2} color={hover ? colors.orange : colors.primary} />
        </div>
        <div className="card-body">
          <span className="date">{date}</span>
          <p>{description}</p>
        </div>
        <a className="card-button" href="/id">
          tekst
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

          .card > img {
            object-fit: cover;
            height: 20rem;
            width: 100%;
          }

          .card-header {
            font-size: 2.1rem;
            padding: ${spacers.medium} 10rem ${spacers.small} ${spacers.medium};
          }

          .card-badge {
            position: absolute;
            right: 1rem;
            top: 11rem;
          }

          .card-badge img {
            height: 13rem;
          }

          .card-body {
            padding: 0 ${spacers.medium} ${spacers.medium};
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

          @media (max-width: ${breakpoints.extraSmall}) {
            .card-header {
              padding: ${spacers.small};
            }

            .card-body {
              padding: 0 ${spacers.small} ${spacers.small};
            }
          }
        `}
      </style>
    </>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  date: PropTypes.string,
  alt: PropTypes.string
};

export default Card;
