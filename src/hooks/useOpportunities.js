import { useState, useEffect } from 'react';
import { getOpportunities } from '../connector/opportunities';

function useOpportunities(options, initialOpportunities = []) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const opportunities = await (await getOpportunities(options)).json();
        setOpportunities(opportunities);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options]);

  return [error, loading, opportunities];
}

export default useOpportunities;
