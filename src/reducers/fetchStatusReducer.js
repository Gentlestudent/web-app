export default function fetchStatusReducer(state, [type, payload]) {
  switch (type) {
    case 'INIT':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
        data: null
      };
    case 'COMPLETE':
      return {
        ...state,
        loading: false,
        error: null,
        data: payload
      };
    default:
      return {};
  }
}
