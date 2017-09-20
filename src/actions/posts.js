import { baseFetchHeaders } from "../utils/http-helpers";
import { fetchErrored, fetchLoading } from "./common";

export const ADD_POST_SUCCESSFUL = "ADD_POST_SUCCESSFUL";
export const LIKE_POST = "LIKE_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POSTS_BY_CATEGORY_SUCCESSFUL = "FETCH_POSTS_BY_CATEGORY_SUCCESSFUL";
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
    return fetch(url, {
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

export function fetchPostsSuccessful(posts) {
  return {
    type: FETCH_POSTS_SUCCESSFUL,
    items: posts
  };
}

export function postsFetchData(url, category = null) {
  const action = "posts";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch(url, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(fetchPostsSuccessful(posts)))
      .catch(error => {
        dispatch(fetchErrored(action));
      });
  };
}

export function sortPosts(filter) {
  return {
    type: SORT_POSTS,
    filter
  };
}

export function fetchPostsByCategorySuccessful(posts) {
  return {
    type: FETCH_POSTS_BY_CATEGORY_SUCCESSFUL,
    items: posts
  };
}

export function postsByCategoryFetchData(url) {
  const action = "posts-by-category";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    fetch(url, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(fetchPostsByCategorySuccessful(posts)))
      .catch(error => {
        dispatch(fetchErrored(action));
      });
  };
}
