function hasRole(user, role) {
  switch (user.role) {
    case 'admin': {
      return true;
    }
    case 'issuer': {
      if (role === 'issuer') {
        return true;
      }
    }
    // falls through
    case 'participant': {
      if (role === 'participant') {
        return true;
      }
    }
    // falls through
    default: {
      console.warn(`permission requested for unhandled role '${role}', returning 'false'`);
      return false;
    }
  }
}

export default hasRole;
