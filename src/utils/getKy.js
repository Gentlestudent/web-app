async function getKy() {
  const { default: ky } = await import('ky'); // read here why this instead of importing on line 1 -> https://github.com/sindresorhus/ky/issues/322
  return ky;
}

async function getAuthenticatedKy() {
  const ky = await getKy();
  const token = window.localStorage.getItem('token');
  if (token) {
    const authenticated = ky.extend({
      hooks: {
        beforeRequest: [
          request => request.headers.set('authorization', `Bearer ${token}`)
        ]
      }
    });
    return authenticated;
  }
  return ky;
}

function getPublicKy() {
  return getKy();
}

export {
  getAuthenticatedKy,
  getPublicKy
}
