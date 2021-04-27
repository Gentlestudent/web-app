import { useEffect, useMemo, useReducer } from 'react';
import { auth } from '../api/firebase';
import { getProfile } from '../api/users';
import User from '../models/User';
import fetchStatusReducer from '../reducers/fetchStatusReducer';

const setError = (dispatch, error) => {
  dispatch(['ERROR', error]);
};

const setData = async (dispatch) => {
  dispatch(['INIT']);

  const user = auth.currentUser;
  try {
    dispatch(['COMPLETE', user ? Object.assign(new User(user), await getProfile(user.uid)) : null]);
  } catch (error) {
    setError(dispatch, error);
  }
};

export default function useAuthState() {
  const [state, dispatch] = useReducer(fetchStatusReducer, {
    loading: true,
    data: auth.currentUser ? new User(auth.currentUser) : null
  });

  useEffect(() => {
    const listener = auth.onAuthStateChanged(
      () => setData(dispatch),
      (error) => setError(dispatch, error)
    );

    return () => {
      listener();
    };
  }, []);

  return useMemo(() => [state.loading, state.error, state.data, async () => setData(dispatch)], [
    state
  ]);
}
