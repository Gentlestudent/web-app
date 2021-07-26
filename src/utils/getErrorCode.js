async function getErrorCode(error) {
  let code = '';
  try {
    code = (await error.response.json()).code;
  } catch {}
  return code;
}

export default getErrorCode;
