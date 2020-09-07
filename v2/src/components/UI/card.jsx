import PropTypes from 'prop-types';
import Heading from './heading';
import { colors, spacers } from '../../assets/styles/constants';
import arrow from '../../assets/img/icons/arrow-white.svg';

const hover = false;

const Card = ({ image, title, date, description, onClick, alt }) => (
  <div className="card" onClick={onClick}>
    <img src={image} alt={alt} />
    <div className="card-header">
      <Heading title={title} level={2} color={hover ? colors.orange : colors.primary} />
    </div>
    <div className="card-body">
      <span className="date">{date}</span>
      <p>{description}</p>
    </div>
    <a
      className="card-button"
      href="https://www.arteveldehogeschool.be/inschrijven/inschrijven-voor-een-bachelor-graduaat-bachelor-na-bachelor"
    >
      tekst
    </a>
    <style jsx>
      {`
        .card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          background: ${colors.blueLight};
          // margin: 1rem;
          // border-radius: 1rem;
          // box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
          // border-radius: 2rem;

          position: relative;
        }

        .card > img {
          object-fit: cover;
          height: 20rem;
          // border-radius: 2rem 2rem 0 0;
        }

        .card-header {
          font-size: 2.1rem;
          padding: ${spacers.medium} ${spacers.medium} ${spacers.small};
          // padding: 2rem;
        }

        .card-body {
          padding: 0 ${spacers.medium} ${spacers.medium};
          // padding: 0 2rem;
          // padding-bottom: 2rem;
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
      `}
    </style>
  </div>
);

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  date: PropTypes.string
};

export default Card;
