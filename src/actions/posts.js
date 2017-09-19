import { baseFetchHeaders } from "../utils/http-helpers";

export const ADD_POST_SUCCESSFUL = "ADD_POST_SUCCESSFUL";
export const LIKE_POST = "LIKE_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POSTS_HAS_ERRORED = "FETCH_POSTS_HAS_ERRORED";
export const FETCH_POSTS_LOADING = "FETCH_POSTS_LOADING";

export const FETCH_POSTS_BY_CATEGORY_SUCCESSFUL = "FETCH_POSTS_BY_CATEGORY_SUCCESSFUL";
export const FETCH_POSTS_BY_CATEGORY_HAS_ERRORED = "FETCH_POSTS_BY_CATEGORY_HAS_ERRORED";
export const FETCH_POSTS_BY_CATEGORY_LOADING = "FETCH_POSTS_BY_CATEGORY_LOADING";
export const SORT_POSTS = "SORT_POSTS";

export function addPostSuccessful(post) {
  return {
    type: ADD_POST_SUCCESSFUL,
    post: post
  };
}

export function addPostData(url, post) {
  let addPostRequest = {
    ...post,
    timestamp: Date.now()
  };

  return dispatch => {
    fetch(url, {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify(addPostRequest)
    })
      .then(response => {
        dispatch(addPostSuccessful(addPostRequest));
        return response;
      })
      .catch(error => {
        alert(error);
      });
  };
}

export function likePost({ postId }) {
  return {
    type: LIKE_POST,
    postId
  };
}

export function editPost({ author, title, body, postId }) {
  return {
    type: EDIT_POST,
    author,
    title,
    body,
    postId
  };
}

export function fetchPostsHasErrored() {
  return {
    type: FETCH_POSTS_HAS_ERRORED,
    hasErrored: true
  };
}

export function fetchPostsLoading(isLoading) {
  return {
    type: FETCH_POSTS_LOADING,
    isLoading
  };
}

export function fetchPostsSuccessful(posts) {
  return {
    type: FETCH_POSTS_SUCCESSFUL,
    items: posts
  };
}

export function postsFetchData(url, category = null) {
  return dispatch => {
    dispatch(fetchPostsLoading(true));

    fetch(url, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchPostsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(fetchPostsSuccessful(posts)))
      .catch(error => {
        dispatch(fetchPostsHasErrored());
      });
  };
}

export function sortPosts(filter) {
  return {
    type: SORT_POSTS,
    filter
  };
}

export function fetchPostsByCategoryHasErrored() {
  return {
    type: FETCH_POSTS_BY_CATEGORY_HAS_ERRORED,
    hasErrored: true
  };
}

export function fetchPostsByCategoryLoading(isLoading) {
  return {
    type: FETCH_POSTS_BY_CATEGORY_LOADING,
    isLoading
  };
}

export function fetchPostsByCategorySuccessful(posts) {
  return {
    type: FETCH_POSTS_BY_CATEGORY_SUCCESSFUL,
    items: posts
  };
}

export function postsByCategoryFetchData(url) {
  return dispatch => {
    dispatch(fetchPostsByCategoryLoading(true));

    fetch(url, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchPostsByCategoryLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(fetchPostsByCategorySuccessful(posts)))
      .catch(error => {
        dispatch(fetchPostsByCategoryHasErrored());
      });
  };
}
