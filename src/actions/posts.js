import toastr from "toastr";
import { baseFetchHeaders, BaseApiUrl } from "../utils/http-helpers";
import { fetchErrored, fetchLoading } from "./common";

export const ADD_POST = "ADD_POST";
export const VOTE_ON_POST = "VOTE_ON_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST_DETAILS = "FETCH_POST_DETAILS";
export const FETCH_POSTS_BY_CATEGORY = "FETCH_POSTS_BY_CATEGORY";
export const DELETE_POST = "DELETE_POST";
export const SORT_POSTS = "SORT_POSTS";

export function addPostSuccessful(post) {
  return {
    type: ADD_POST,
    post: { ...post, voteScore: 1 }
  };
}

export function addPost(post) {
  const addPostRequest = {
    ...post,
    timestamp: Date.now()
  };

  return dispatch => {
    return fetch(`${BaseApiUrl}/posts`, {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify(addPostRequest)
    })
      .then(response => {
        toastr.info("Post was added successfully!");
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
    type: EDIT_POST,
    post: post
  };
}

export function editPost({ id, title, body }) {
  const editPostRequest = {
    title: title,
    body: body
  };

  return dispatch => {
    return fetch(`${BaseApiUrl}/posts/${id}`, {
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
  const voteScore = vote === "upVote" ? 1 : -1;
  return {
    type: VOTE_ON_POST,
    voteScore,
    postId: post.id
  };
}

export function voteOnPost(postId, vote) {
  return dispatch => {
    dispatch(fetchLoading(VOTE_ON_POST, true));

    return fetch(`${BaseApiUrl}/posts/${postId}`, {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify({ option: vote })
    })
      .then(response => {
        dispatch(fetchLoading(VOTE_ON_POST, false));
        return response;
      })
      .then(response => response.json())
      .then(post => dispatch(voteOnPostSuccessful(post, vote)))
      .catch(error => {
        dispatch(fetchErrored(VOTE_ON_POST));
      });
  };
}

export function fetchPostsSuccessful(posts) {
  return {
    type: FETCH_POSTS,
    items: posts
  };
}

export function fetchPostDetailsSuccessful(post) {
  return {
    type: FETCH_POST_DETAILS,
    post
  };
}

export function fetchPostDetails(id) {
  return dispatch => {
    dispatch(fetchErrored(FETCH_POST_DETAILS, false));
    dispatch(fetchLoading(FETCH_POST_DETAILS, true));

    return fetch(`${BaseApiUrl}/posts/${id}`, { headers: baseFetchHeaders })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          dispatch(fetchErrored(FETCH_POST_DETAILS, true));
          throw new Error("Post does not exist");
        }
      })
      .then(response => response.json())
      .then(post => {
        dispatch(fetchPostDetailsSuccessful(post));
        return post;
      })
      .catch(error => {
        dispatch(fetchErrored(FETCH_POST_DETAILS, true));
      });
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchLoading(FETCH_POSTS, true));

    (async () => {
      var response = await fetch(`${BaseApiUrl}/posts`, {
        headers: baseFetchHeaders
      });

      if (!response.ok) {
        dispatch(fetchErrored(FETCH_POSTS));
      } else {
        dispatch(fetchLoading(FETCH_POSTS, false));
        const posts = await response.json();
        dispatch(fetchPostsSuccessful(posts));
      }
    })();
  };
}

export function deletePostSuccessful(postId) {
  return {
    type: DELETE_POST,
    postId
  };
}

export function deletePost(postId) {
  return dispatch => {
    dispatch(fetchLoading(DELETE_POST, true));

    return fetch(`${BaseApiUrl}/posts/${postId}`, {
      headers: baseFetchHeaders,
      method: "DELETE"
    })
      .then(response => {
        dispatch(fetchLoading(DELETE_POST, false));
        return response;
      })
      .then(response => response.json())
      .then(posts => {
        toastr.info("The post was successfully deleted.");
        dispatch(deletePostSuccessful(postId));
      })
      .catch(error => {
        dispatch(fetchErrored(DELETE_POST));
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
    type: FETCH_POSTS_BY_CATEGORY,
    items: posts
  };
}

export function fetchPostsByCategory(category) {
  return dispatch => {
    dispatch(fetchLoading(FETCH_POSTS_BY_CATEGORY, true));

    fetch(`${BaseApiUrl}/${category}/posts`, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(FETCH_POSTS_BY_CATEGORY, false));
        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(fetchPostsByCategorySuccessful(posts)))
      .catch(error => {
        dispatch(fetchErrored(FETCH_POSTS_BY_CATEGORY));
      });
  };
}
