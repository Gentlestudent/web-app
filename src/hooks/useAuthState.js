import { useEffect, useMemo, useReducer } from 'react';
import { getFirebaseAppForClient } from '../utils/firebase';
import { getProfile } from '../connector/users';
import User from '../models/User';
import fetchStatusReducer from '../reducers/fetchStatusReducer';

const setError = (dispatch, error) => {
  dispatch(['ERROR', error]);
};

const setData = async (dispatch) => {
  dispatch(['INIT']);

  const app = getFirebaseAppForClient();
  const auth = app.auth();
  const user = auth.currentUser;
  try {
    let data = null;
    if (user) {
      const profile = await getProfile(user.uid);
      const body = await profile.json();
      data = Object.assign(new User(user), body);
    }
    dispatch(['COMPLETE', data]);
  } catch (error) {
    setError(dispatch, error);
  }
};

export default function useAuthState() {
  const app = getFirebaseAppForClient();
  const auth = app.auth();

  const [state, dispatch] = useReducer(fetchStatusReducer, {
    loading: true,
    data: auth.currentUser ? new User(auth.currentUser) : null
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      () => setData(dispatch),
      (error) => setError(dispatch, error)
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return useMemo(() => [state.loading, state.error, state.data, async () => setData(dispatch)], [
    state
  ]);
}
