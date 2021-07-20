import { useState, useEffect } from 'react';
import { getParticipations } from '../connector/participations';

function useParticipations(options, initialParticipations = []) {
  const [participations, setParticipations] = useState(initialParticipations);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const participations = await (await getParticipations(options)).json();
        setParticipations(participations);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options]);

  return [error, loading, participations];
}

export default useParticipations;
