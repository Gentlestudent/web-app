import { useState, useMemo, useCallback } from 'react';

export default function useExec(fn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const init = () => {
    setLoading(true);
    setError(null);
  };

  const exec = useCallback(
    async (...param) => {
      try {
        init();
        const res = await fn(...param);
        setData(res);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return useMemo(() => [loading, error, data, exec], [loading, error, data, exec]);
}
