import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import posts from './posts';

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  posts,
});

export default rootReducer;
