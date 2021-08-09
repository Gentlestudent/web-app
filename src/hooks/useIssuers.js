import { useState, useEffect } from 'react';
import { getIssuers } from '../connector/issuers';

function useIssuers(initialIssuers = [], options) {
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
        setError(null);
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
