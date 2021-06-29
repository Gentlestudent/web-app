import { createContext } from 'react';

export default createContext({
  authStatusReported: false,
  isUserSignedIn: false,
  error: null,
  currentUser: null,
  reload: () => {}
});
