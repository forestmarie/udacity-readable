import { baseFetchHeaders } from "../utils/http-helpers";

export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const FETCH_COMMENTS_SUCCESSFUL = "FETCH_COMMENTS_SUCCESSFUL";
export const FETCH_COMMENTS_HAS_ERRORED = "FETCH_COMMENTS_HAS_ERRORED";
export const FETCH_COMMENTS_LOADING = "FETCH_COMMENTS_LOADING";

export function addComment({ author, body, postId }) {
  return {
    type: ADD_COMMENT,
    author,
    body,
    postId
  };
}

export function likeComment({ commentId }) {
  return {
    type: LIKE_COMMENT,
    commentId
  };
}

export function editComment({ author, body, commentId }) {
  return {
    type: EDIT_COMMENT,
    author,
    body,
    commentId
  };
}

export function fetchCommentsHasErrored() {
  return {
    type: FETCH_COMMENTS_HAS_ERRORED,
    hasErrored: true
  };
}

export function fetchCommentsLoading(isLoading) {
  return {
    type: FETCH_COMMENTS_LOADING,
    isLoading
  };
}

export function fetchCommentsSuccessful(posts) {
  return {
    type: FETCH_COMMENTS_SUCCESSFUL,
    posts
  };
}

export function commentsFetchData(url) {
  return dispatch => {
    dispatch(fetchCommentsLoading(true));

    fetch(url, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchCommentsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(comments => dispatch(fetchCommentsSuccessful(comments)))
      .catch(() => dispatch(fetchCommentsHasErrored()));
  };
}
