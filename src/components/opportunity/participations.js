import { Heading, Participant } from '../UI';

const Participations = ({ opportunity }) => {
  const [newParticipants, acceptedParticipants] = (opportunity.participants || []).reduce(
    // status 0 = new
    // status 1 = accepted
    // status 2 = refused
    // status 3 = finished
    (accumulator, participant) => {
      if (participant.Participation.status === 0) {
        return [[...accumulator[0], participant], accumulator[1]];
      }
      if (participant.Participation.status === 1) {
        return [accumulator[0], [...accumulator[1], participant]];
      }
      // if (participant.Participation.status === 2) {
      //   return [accumulator[0], [...accumulator[1], participant]];
      // }
      // if (participant.Participation.status === 3) {
      //   return [accumulator[0], [...accumulator[1], participant]];
      // }
      return accumulator;
    },
    [[], []]
  );

  return (
    <div>
      <Heading title="Inschrijvingen" level={1} marginTop />
      <Heading title="Nieuwe inschrijvingen" level={2} />
      <div className="participants">
        {newParticipants.length
          ? newParticipants.map((participant) => (
            <Participant key={participant.id} participant={participant} withButtons />
          ))
          : <p className="participants__empty">Geen nieuwe inschrijvingen.</p>
        }
      </div>

      <Heading title="Geaccepteerde inschrijvingen" level={2} marginTop />
      <div className="participants">
        {acceptedParticipants.length
          ? acceptedParticipants.map((participant) => (
            <Participant key={participant.id} participant={participant} />
          ))
          : <p className="participants__empty">Nog geen geaccepteerde inschrijvingen.</p>
        }
      </div>
    </div>
  );
}

export default Participations;
