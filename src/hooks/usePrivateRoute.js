import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { routes } from '../constants';

export default function usePrivateRoute(pathname) {
  const { isUserSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserSignedIn) {
      router.push({
        pathname: pathname || routes.LOGIN,
        query: { from: router.pathname }
      });
    }
  }, [isUserSignedIn, router, pathname]);
}
