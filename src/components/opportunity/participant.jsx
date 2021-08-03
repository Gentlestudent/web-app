import PropTypes from 'prop-types';
import { Icon } from '../UI';
import { colors } from '../../assets/styles/constants';
import { getFullDate } from '../../utils';
import { updateParticipationStatus } from '../../connector/participations';
import { createAssertion } from '../../connector/assertions';

const Participant = ({ participant, withButtons, opportunity, reloadOpportunity }) => {
  function updateParticipation(status) {
    return async () => {
      try {
        await updateParticipationStatus({ id: participant.Participation.id, status });
        reloadOpportunity();
      } catch (error) {
        // TODO show error
        console.error(error);
      }
    }
  }

  async function giveBadge() {
    if (!opportunity?.id) {
      return;
    }
    try {
      await updateParticipationStatus({ id: participant.Participation.id, status: 3 });
      await createAssertion({ opportunity: opportunity.id, participant: participant.id });
      reloadOpportunity();
    } catch (error) {
      // TODO show error
      console.error(error);
    }
  }

  let [showAcceptButton, showDenyButton, showUndoButton, showFinishButton] = new Array(4).fill(false);
  switch (participant.Participation.status || 0) {
    case 0: {
      showAcceptButton = true;
      showDenyButton = true;
      break
    }
    case 1: {
      showFinishButton = true;
      break
    }
    case 2: {
      showUndoButton = true;
      break
    }
    default:
  }

  return (
    <>
      <div className="participant">
        <p>{getFullDate(participant.Participation.createdAt)}</p>
        <div className="participant__img" />
        <p className="partcipant__name">{`${participant.firstName || ''} ${participant.lastName || ''}`}</p>
        <p className="participant__email">{participant.email}</p>
        <p className="participant__institution">{participant.institute}</p>
        <div className="participant__buttons">
          {showAcceptButton && (
            <button type="button" className="button button--accept" onClick={updateParticipation(1)}>
              <Icon name="check" />
            </button>
          )}
          {showDenyButton && (
            <button type="button" className="button button--decline" onClick={updateParticipation(2)}>
              <Icon name="times" />
            </button>
          )}
          {showFinishButton && (
            <button type="button" className="button button--finish" onClick={giveBadge}>
              Geef badge
            </button>
          )}
          {showUndoButton && (
            <button type="button" className="button button--undo" onClick={updateParticipation(0)}>
              Ongedaan maken
            </button>
          )}
        </div>
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

          .button--finish, .button--undo {
            color: ${colors.sub};
            width: unset;
            border-radius: 1.5rem;
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

Participant.propTypes = {
  participant: PropTypes.object,
  withButtons: PropTypes.bool
};

export default Participant;
