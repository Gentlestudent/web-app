import { useState, useEffect } from 'react';
import { getIssuers } from '../connector/issuers';

function useIssuers(options, initialIssuers = []) {
  const [issuers, setIssuers] = useState(initialIssuers);
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
        const issuers = await (await getIssuers(options)).json();
        setIssuers(issuers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options, __reload]);

  return [error, loading, issuers, reload];
}

export default useIssuers;
