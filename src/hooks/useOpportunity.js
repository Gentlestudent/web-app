import { useState, useEffect } from 'react';
import { getOpportunityById } from '../connector/opportunities';

function useOpportunity(id, initialOpportunity = null) {
  const [opportunity, setOpportunity] = useState(initialOpportunity);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        const opportunity = await (await getOpportunityById(id)).json();
        setOpportunity(opportunity);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return [error, loading, opportunity];
}

export default useOpportunity;
