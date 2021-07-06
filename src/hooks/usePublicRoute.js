import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { routes } from '../constants';

export default function usePublicRoute(pathname) {
  const { isUserSignedIn, authStatusReported, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authStatusReported) {
      return;
    }

    if (isUserSignedIn && currentUser?.isVerified) {
      router.push({
        pathname: pathname || router.query.from || routes.HOME
      });
    }
  }, [authStatusReported, isUserSignedIn, router, pathname, currentUser]);
}
