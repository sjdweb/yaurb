import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, store, ...rest }) => {
  const state = store.getState();
  const hasFetched = Boolean(state.login.fetched);
  const isLoggedIn = Boolean(state.login.loggedIn);

  if (!hasFetched) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={props => (
      hasFetched && isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
        )
    )}
    />
  );
};

export default PrivateRoute;
