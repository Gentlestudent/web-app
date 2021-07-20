import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { routes } from '../constants';

export default function usePrivateRoute(pathname) {
  const { isUserSignedIn, authStatusReported, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authStatusReported) {
      return;
    }

    if (!isUserSignedIn || !currentUser?.emailVerified) {
      router.push({
        pathname: pathname || routes.LOGIN,
        query: { from: router.pathname }
      });
    }
  }, [authStatusReported, isUserSignedIn, router, pathname, currentUser]);
}
