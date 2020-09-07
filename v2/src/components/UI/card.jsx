import PropTypes from 'prop-types';
import Heading from './heading';

const Card = ({ image, title, date, description, onClick, alt }) => (
  <div className="card" onClick={onClick}>
    <img src={image} alt={alt} />
    <div className="card-header">
      <Heading title={title} level={3} />
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
          box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
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
          font-size: 1.2rem;
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
