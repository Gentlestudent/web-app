import { useState, useEffect } from 'react';
import { getAssertions } from '../connector/assertions';

function useAssertions(options, initialAssertions = []) {
  const [assertions, setAssertions] = useState(initialAssertions);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const assertions = await (await getAssertions(options)).json();
        setAssertions(assertions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [options]);

  return [error, loading, assertions];
}

export default useAssertions;
