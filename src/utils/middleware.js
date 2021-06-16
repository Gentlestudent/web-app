import { getFirebaseAppForServer } from './firebaseServer';
import { User } from '../sql/sqlClient';

async function verifyToken(token) {
  if (!token) {
    return {
      authenticated: false
    };
  }

  try {
    const app = await getFirebaseAppForServer();
    const auth = app.auth();
    const decodedToken = await auth.verifyIdToken(token);
    const user = await User.findOne({
      where: { firebaseUid: decodedToken.user_id }
    });
    return {
      decodedToken,
      user,
      authenticated: true
    };
  } catch (error) {
    console.error(error);
    return {
      authenticated: false
    };
  }
}

export { verifyToken };
