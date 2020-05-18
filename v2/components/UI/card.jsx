import PropTypes from 'prop-types';
import { Heading } from '.';

const Card = ({ image, title, date, description, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={image} />
    <div className="card-header">
      <Heading title={title} />
    </div>
    <div className="card-body">
      <span className="date">{date}</span>
      <p>{description}</p>
    </div>
    <style jsx>
      {`
        .card {
          display: flex;
          flex-direction: column;
          border-radius: 1rem;
          margin: 1rem;
          box-shadow: 0 0.5rem 1rem 2px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          border-radius: 2rem;
        }

        .card > img {
          border-radius: 2rem 2rem 0 0;
        }

        .card-header {
          font-size: 2.1rem;
          padding: 2rem;
        }

        .card-body {
          padding: 0 2rem;
          padding-bottom: 2rem;
        }

        .card-body > .date {
          font-size: 80%;
        }
      `}
    </style>
  </div>
);

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Card;
