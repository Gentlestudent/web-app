async function getErrorResponse(error) {
  let response = {};
  try {
    response = await error.response.json();
  } catch {}
  return response;
}

export default getErrorResponse;
