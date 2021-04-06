import { createContext } from 'react';

export default createContext({
  authStatusReported: false,
  isUserSignedIn: false,
  currentUser: null,
  eror: null,
  reload: () => {}
});
