import { useEffect, useMemo, useReducer } from 'react';
import { useRouter } from 'next/router';
import { getProfile } from '../connector/users';
import fetchStatusReducer from '../reducers/fetchStatusReducer';
import loginEvents from '../utils/loginEvents';
import { routes } from '../constants';

const setError = (dispatch, error) => {
  dispatch(['ERROR', error]);
};

const setData = async (dispatch) => {
  dispatch(['INIT']);

  try {
    const token = window.localStorage.getItem('token');
    const { id } = JSON.parse(window.atob(token.split('.')[1]));
    const userResponse = await getProfile(id);
    const user = await userResponse.json();
    dispatch(['COMPLETE', user])
  } catch (error) {
    setError(dispatch, error);
  }
};

export default function useAuthState() {
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchStatusReducer, {
    loading: true
  });

  useEffect(() => {
    setData(dispatch);
  }, []);

  useEffect(() => {
    function handleLogin() {
      setData(dispatch);
    }

    function handleLogout() {
      dispatch(['COMPLETE', null]);
      router.push({
        pathname: routes.HOME
      });
    }

    const unsubscribeLogin = loginEvents.subscribe('login', handleLogin);
    const unsubscribeLogout = loginEvents.subscribe('logout', handleLogout);

    return () => {
      unsubscribeLogin();
      unsubscribeLogout();
    }
  }, [router]);

  return useMemo(
    () => [state.loading, state.error, state.data, async () => setData(dispatch)],
    [state]
  );
}
