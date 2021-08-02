import { useState, useEffect } from 'react';
import { getUsers } from '../connector/users';

function useParticipants(options, initialParticipants = []) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const participants = await (await getUsers(options)).json();
        setParticipants(participants);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options]);

  return [error, loading, participants];
}

export default useParticipants;
