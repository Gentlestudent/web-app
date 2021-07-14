function hasRole(user, role) {
  switch (user?.role) {
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
      return false;
    }
  }
}

export default hasRole;
