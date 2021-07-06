import { useState, useEffect } from 'react';
import { getIssuers } from '../connector/issuers';

function useIssuers(options, initialIssuers = []) {
  const [issuers, setIssuers] = useState(initialIssuers);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const issuers = await (await getIssuers(options)).json();
        setIssuers(issuers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options]);

  return [error, loading, issuers];
}

export default useIssuers;
