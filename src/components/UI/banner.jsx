import PropTypes from 'prop-types';

const Banner = ({ image }) => {

  return (
    <>
      <div className="banner" style={{background: `url(${image})`}}/>

      <style jsx>
        {`
          .banner {
            position: relative;
          }

          .banner::before {
            background: url(${image});
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            position: absolute;
            height: 60rem;
            width: 100%;
            z-index: -1;
          }

          @media (max-width: 900px) {
            .banner::before {
              height: 50rem;
            }
          }
        `}
      </style>
    </>
  );
};

Banner.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Banner;
