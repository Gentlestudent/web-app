import { Heading } from '../UI';
import Participant from './participant';

const Participations = ({ opportunity, reloadOpportunity }) => {
  const [newParticipants, acceptedParticipants, refusedParticipants, finishedParticipants] = (opportunity.participants || []).reduce(
    // status 0 = new
    // status 1 = accepted
    // status 2 = refused
    // status 3 = finished
    (accumulator, participant) => {
      if (participant.Participation.status === 0) {
        return [[...accumulator[0], participant], accumulator[1], accumulator[2], accumulator[3]];
      }
      if (participant.Participation.status === 1) {
        return [accumulator[0], [...accumulator[1], participant], accumulator[2], accumulator[3]];
      }
      if (participant.Participation.status === 2) {
        return [accumulator[0], accumulator[1], [...accumulator[2], participant], accumulator[3]];
      }
      if (participant.Participation.status === 3) {
        return [accumulator[0], accumulator[1], accumulator[2], [...accumulator[3], participant]];
      }
      return accumulator;
    },
    [[], [], [], []]
  );

  const badgeIsFree = opportunity.difficulty === 0;

  return (
    <div>
      <Heading title="Inschrijvingen" level={1} marginTop />
      <Heading title="Nieuwe inschrijvingen" level={2} />
      <div className="participants">
        {newParticipants.length
          ? newParticipants.map((participant) => (
            <Participant key={participant.id} participant={participant} reloadOpportunity={reloadOpportunity} />
          ))
          : <p className="participants__empty">Geen nieuwe inschrijvingen.</p>
        }
      </div>

      {!badgeIsFree && (
        <>
          <Heading title="Geaccepteerde inschrijvingen" level={2} marginTop />
          <div className="participants">
            {acceptedParticipants.length
              ? acceptedParticipants.map((participant) => (
                <Participant key={participant.id} participant={participant} reloadOpportunity={reloadOpportunity} opportunity={opportunity} />
              ))
              : <p className="participants__empty">Nog geen geaccepteerde inschrijvingen.</p>
            }
          </div>
        </>
      )}

      <Heading title="Afgewerkte inschrijvingen" level={2} marginTop />
      <div className="participants">
        {finishedParticipants.length
          ? finishedParticipants.map((participant) => (
            <Participant key={participant.id} participant={participant} reloadOpportunity={reloadOpportunity} />
          ))
          : <p className="participants__empty">Nog geen afgewerkte inschrijvingen.</p>
        }
      </div>

      {!badgeIsFree && (
        <>
          <Heading title="Geweigerde inschrijvingen" level={2} marginTop />
          <div className="participants">
            {refusedParticipants.length
              ? refusedParticipants.map((participant) => (
                <Participant key={participant.id} participant={participant} reloadOpportunity={reloadOpportunity} />
              ))
              : <p className="participants__empty">Nog geen geweigerde inschrijvingen.</p>
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Participations;
