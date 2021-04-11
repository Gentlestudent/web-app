import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from './useAuth';

export default function usePrivateRoute(pathname) {
  const { isUserSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserSignedIn) {
      router.push({
        pathname: pathname || '/login',
        query: { from: router.pathname }
      });
    }
  }, [isUserSignedIn, router, pathname]);
}
