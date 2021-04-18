export default function fromErrorCodeToMessage(code) {
  switch (code) {
    case 'not-verified':
      return "We can't let you in... Your account is not verified, please check your inbox for a confirmation mail from us.";
    case 'auth/email-already-in-use':
      return 'The email address is already in use.';
    case 'auth/invalid-email':
      return 'The email is invalid.';
    case 'auth/weak-password':
      return 'Your password is too weak...';
    case 'auth/expired-action-code':
      return 'The link has expired.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/invalid-action-code':
      return 'The link is invalid.';
    case 'auth/wrong-password':
      return 'The password is wrong.';
    case 'invalid-argument':
      return 'An argument is invalid.';
    case 'not-found':
      return 'The requested document was not found.';
    case 'already-exists':
      return 'The document already exists.';
    case 'permission-denied':
      return 'You do not have the required rights.';
    case 'verifyemail-fail':
      return 'The account verification failed. You may try again with a new link.';
    default:
      return 'Something unexpected happened, try again.';
  }
}
