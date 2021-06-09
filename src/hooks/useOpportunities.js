import { useState, useEffect } from 'react';
import { getOpportunities } from '../connector/opportunities';

function useOpportunities(initialOpportunities = []) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const opportunities = await (await getOpportunities()).json();
        setOpportunities(opportunities);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [error, loading, opportunities];
}

export default useOpportunities;
