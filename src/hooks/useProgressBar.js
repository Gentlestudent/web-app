import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';

export default function useProgressBar(loading) {
  const router = useRouter();
  const [active, setActive] = useState(loading);

  useEffect(() => {
    setActive(loading);
  }, [loading]);

  useEffect(() => {
    if (active) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [active]);

  useEffect(() => {
    const start = () => {
      setActive(true);
    };

    const stop = () => {
      setActive(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', stop);
    router.events.on('routeChangeError', stop);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', stop);
      router.events.off('routeChangeError', stop);
    };
  }, [router]);
}
