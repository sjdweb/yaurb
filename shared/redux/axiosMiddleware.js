// import { revokeAuth } from '../actions/login';

function dispatchIfDefined(dispatch, value) {
  if (typeof value !== 'undefined') {
    dispatch(value);
    return true;
  }

  return false;
}

const reduxSmallAxiosMiddleware = (axios) => {
  return ({ getState, dispatch }) => next => (action) => {
    if (!(action.options && action.options.url)) {
      return next(action);
    }

    const requestType = `${action.type}_REQUEST`;
    const successType = `${action.type}_SUCCESS`;
    const failureType = `${action.type}_FAILURE`;

    const {
      options = {},
      success = () => { },
      error = () => { },
      pending = () => { },
    } = action;

    dispatchIfDefined(dispatch, pending());

    next(action);

    next({
      loading: true,
      error: false,
      type: requestType,
      options,
    });

    axios.request(options)
      .then((response) => {
        const successAction = {
          loading: false,
          error: false,
          type: successType,
          options,
          payload: response.data,
        };

        next(successAction);
        dispatchIfDefined(next, success(response.data));
      })

      .catch((err) => {
        const status = (
          err &&
          err.response &&
          err.response.status
        ) || null;

        if (status === 401) {
          // Redirect to login page, clear out token too.
          // dispatch(revokeAuth(err.response.data));
        }

        const errorAction = {
          loading: false,
          error: true,
          type: failureType,
          stack: err,
          status,
        };

        next(errorAction);

        error(err);
      });
  };
};

export default (axios, errorTrigger) => reduxSmallAxiosMiddleware(axios, errorTrigger);
