import { useContext } from 'react';
import AuthContext from '../context/auth';

/* This hook just serves as a way of using auth context without having to import it */
export default function useAuth() {
  const contextState = useContext(AuthContext);
  if (contextState === null) {
    throw new Error('useAuth can only be used within an AuthContext.Provider tag');
  }
  return contextState;
}
