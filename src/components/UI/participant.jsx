import PropTypes from 'prop-types';
import Icon from './icon';
import { colors } from '../../assets/styles/constants';

const Paticipant = ({ participant, withButtons }) => {
  const acceptParticipant = (participant) => {
    // TODO: accept
    console.log('accept');
  };

  const denyParticipant = (participant) => {
    // TODO: accept
    console.log('deny');
  };

  return (
    <>
      <div className="participant">
        <p>02/03/2021</p>
        <div className="participant__img" />
        <p className="partcipant__name">{participant.name}</p>
        <p className="participant__email">{participant.email}</p>
        <p className="participant__institution">{participant.institution}</p>
        {withButtons && (
          <div className="participant__buttons">
            <button
              type="button"
              className="button button--accept"
              onClick={() => acceptParticipant(participant)}
            >
              <Icon name="check" />
            </button>
            <button
              type="button"
              className="button button--decline"
              onClick={() => denyParticipant(participant)}
            >
              <Icon name="times" />
            </button>
          </div>
        )}
      </div>

      <style jsx>
        {`
          .participant {
            display: grid;
            grid-template-columns: 10rem 4rem 2fr 3fr 1fr 8rem;
            grid-gap: 3rem;
            align-items: center;

            padding: 1.5rem 0;
            background-image: linear-gradient(90deg, #000 33%, hsla(0, 0%, 100%, 0) 0);
            background-position: 0 bottom;
            background-size: 3px 1px;
            background-repeat: repeat-x;
          }

          .participant__buttons > * {
            margin: 0 1rem;
          }

          .participant__img {
            border-radius: 50%;
            background: grey;
            width: 4rem;
            height: 4rem;
          }

          .button {
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            outline: none;
            border: none;
            height: 3rem;
            width: 3rem;
            margin: 0;
            padding: 0 1rem;
            border-radius: 50%;
            opacity: 0.7;
          }

          .button--accept {
            color: ${colors.green};
          }

          .button--decline {
            color: ${colors.sub};
          }

          .participant__buttons {
            display: flex;
          }

          .button:hover {
            background: ${colors.blueLight};
            cursor: pointer;
            opacity: 1;
          }

          @media (max-width: 1080px) {
            .participant {
              flex-direction: column;
              grid-template-columns: 10rem 1fr 8rem;
            }

            .participant__img,
            .participant__email,
            .participant__institution {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

Paticipant.propTypes = {
  participant: PropTypes.isRequired
};

export default Paticipant;
