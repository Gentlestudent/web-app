import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Heading from './heading';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import arrow from '../../assets/img/icons/arrow-white.svg';

const NewsItem = ({ image, title, date, description, onClick, alt }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        type="button"
        className="news button-container"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img className="news-image" src={image} alt={alt} />
        <div className="news-text">
          <div className="news-header">
            <Heading title={title} level={2} color={hover ? colors.orange : colors.primary} />
          </div>
          <div className="news-body">
            <span className="date">{date}</span>
            <p>{description}</p>
          </div>
          <a className="news-button" href="/id">
            Bekijk
          </a>
        </div>
      </button>
      <style jsx>
        {`
          .news {
            display: flex;
            cursor: pointer;
            background: ${colors.blueLight};
            position: relative;
            margin-bottom: ${spacers.medium};
          }

          .news-image {
            object-fit: cover;
            height: 20rem;
            width: 50rem;
          }

          .news-header {
            font-size: 2.1rem;
            padding: ${spacers.medium} 10rem ${spacers.small} ${spacers.medium};
          }

          .news-body {
            padding: 0 ${spacers.medium} ${spacers.medium};
          }

          .news-body > .date {
            font-size: 1.4rem;
          }

          .news-button {
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
            .news-header {
              padding: ${spacers.small};
            }

            .news-body {
              padding: 0 ${spacers.small} ${spacers.small};
            }
          }
        `}
      </style>
    </>
  );
};

NewsItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  date: PropTypes.string,
  alt: PropTypes.string
};

export default NewsItem;
