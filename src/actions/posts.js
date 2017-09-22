import toastr from "toastr";
import { baseFetchHeaders } from "../utils/http-helpers";
import { fetchErrored, fetchLoading } from "./common";

export const ADD_POST_SUCCESSFUL = "ADD_POST_SUCCESSFUL";
export const EDIT_POST_SUCCESSFUL = "EDIT_POST_SUCCESSFUL";

export const VOTE_ON_POST_SUCCESSFUL = "VOTE_ON_POST_SUCCESSFUL";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POST_DETAILS_SUCCESSFUL = "FETCH_POST_DETAILS_SUCCESSFUL";
export const FETCH_POSTS_BY_CATEGORY_SUCCESSFUL = "FETCH_POSTS_BY_CATEGORY_SUCCESSFUL";
export const DELETE_POST_SUCCESSFUL = "DELETE_POST_SUCCESSFUL";
export const SORT_POSTS = "SORT_POSTS";

export function addPostSuccessful(post) {
  return {
    type: ADD_POST_SUCCESSFUL,
    post: post
  };
}

export function addPost(post) {
  let addPostRequest = {
    ...post,
    timestamp: Date.now()
  };

  return dispatch => {
    return fetch("http://localhost:3001/posts", {
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

export function editPostSuccessful(post) {
  return {
    type: EDIT_POST_SUCCESSFUL,
    post: post
  };
}

export function editPost({ id, title, body }) {
  let editPostRequest = {
    title: title,
    body: body
  };

  return dispatch => {
    return fetch(`http://localhost:3001/posts/${id}`, {
      headers: baseFetchHeaders,
      method: "PUT",
      body: JSON.stringify(editPostRequest)
    })
      .then(response => {
        toastr.info("Post was successfully updated");
        dispatch(editPostSuccessful(editPostRequest));
        return response;
      })
      .catch(error => {
        alert(error);
      });
  };
}

export function voteOnPostSuccessful(post, vote) {
  let voteScore = vote === "upVote" ? 1 : -1;
  return {
    type: VOTE_ON_POST_SUCCESSFUL,
    voteScore
  };
}

export function voteOnPost(postId, vote) {
  const action = "vote-on-post";
  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch(`http://localhost:3001/posts/${postId}`, {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify({ option: vote })
    })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(post => dispatch(voteOnPostSuccessful(post, vote)))
      .catch(error => {
        dispatch(fetchErrored(action));
      });
  };
}

export function fetchPostsSuccessful(posts) {
  return {
    type: FETCH_POSTS_SUCCESSFUL,
    items: posts
  };
}

export function fetchPostDetailsSuccessful(post) {
  return {
    type: FETCH_POST_DETAILS_SUCCESSFUL,
    post
  };
}

export function fetchPostDetails(id) {
  const action = "fetch-post-details";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch(`http://localhost:3001/posts/${id}`, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(action, false));
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(post => {
        dispatch(fetchErrored(action, false));
        dispatch(fetchPostDetailsSuccessful(post));
        return post;
      })
      .catch(error => {
        dispatch(fetchErrored(action, true));
      });
  };
}

export function fetchPosts() {
  const action = "fetch-posts";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch("http://localhost:3001/posts", { headers: baseFetchHeaders })
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

export function deletePostSuccessful(postId) {
  return {
    type: DELETE_POST_SUCCESSFUL,
    postId
  };
}

export function deletePost(postId) {
  const action = "delete-post";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch(`http://localhost:3001/posts/${postId}`, {
      headers: baseFetchHeaders,
      method: "DELETE"
    })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(posts => {
        toastr.info("The post was successfully deleted.");
        dispatch(deletePostSuccessful(postId));
      })
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

export function fetchPostsByCategory(category) {
  const action = "posts-by-category";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    fetch(`http://localhost:3001/${category}/posts`, { headers: baseFetchHeaders })
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
