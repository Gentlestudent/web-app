import { useState, useEffect } from 'react';
import { getOpportunities } from '../connector/opportunities';

function useOpportunities(initialOpportunities = {}, options) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [__reload, setReload] = useState(false);

  function reload() {
    setReload(!__reload);
  }

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
  }, [options, __reload]);

  return [error, loading, opportunities, reload];
}

export default useOpportunities;
