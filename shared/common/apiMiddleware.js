export const CALL_API = 'CALL_API';

export function callAPI(method, url, params = {}) {
  return Object.assign({}, params, { payload: undefined }, {
    type: CALL_API,
    options: {
      url,
      method: method || 'GET',
      data: params.payload || undefined,
    },
  });
}

export const ERROR_SERVER_THROW = 'ERROR_SERVER_THROW';
export function throwServerError(error) {
  console.error(error);
  return {
    type: ERROR_SERVER_THROW,
    payload: {
      error,
    },
  };
}
