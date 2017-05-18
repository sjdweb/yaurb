/* eslint-disable import/prefer-default-export */

import { callAPI, throwServerError } from '../common/apiMiddleware';

export const FETCHING_POST = 'FETCHING_POST';
export const FETCHED_POST = 'FETCHED_POST';

function fetching(id) {
  return { type: FETCHING_POST, payload: id };
}

function fetched(post) {
  return { type: FETCHED_POST, payload: post };
}

export function fetch(id) {
  return callAPI('GET', '/posts', {
    pending: () => fetching(id),
    success: data => fetched(data),
    error: throwServerError,
  });
}
