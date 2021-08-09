import { useState, useEffect } from 'react';
import { getOpportunityById } from '../connector/opportunities';

function useOpportunity(initialOpportunity = null, id) {
  const [opportunity, setOpportunity] = useState(initialOpportunity);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [__reload, setReload] = useState(false);

  function reload() {
    setReload(!__reload);
  }

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const opportunity = await (await getOpportunityById(id)).json();
        setOpportunity(opportunity);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, __reload]);

  return [error, loading, opportunity, reload];
}

export default useOpportunity;
