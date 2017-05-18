import {
  FETCHING_POST,
  FETCHED_POST,
} from '../../actions/posts';

const PostReducer = (state = {
  collection: null,
  networkState: 'fresh',
}, action) => {
  switch (action.type) {
    case FETCHING_POST: {
      return Object.assign({}, state, { networkState: 'fetching' });
    }
    case FETCHED_POST: {
      const { collection } = action.payload;
      return Object.assign({}, state,
        {
          networkState: 'loaded',
          collection,
        },
      );
    }
    default:
      return state;
  }
};

export default PostReducer;
