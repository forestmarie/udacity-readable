import { baseFetchHeaders } from "../utils/http-helpers";
import { fetchErrored, fetchLoading } from "./common";
import toastr from "toastr";
export const ADD = "ADD";
export const DELETE = "DELETE";
export const VOTE = "VOTE";
export const EDIT = "EDIT";
export const FETCH = "FETCH";

export function addSuccessful(comment) {
  return {
    type: ADD,
    comment: comment
  };
}

export function addComment(postId, comment) {
  return dispatch => {
    dispatch(fetchLoading(ADD, true));

    let request = {
      ...comment,
      parentId: postId
    };

    return fetch("http://localhost:3001/comments", {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        dispatch(fetchLoading(ADD, false));
        return response;
      })
      .then(response => response.json())
      .then(comment => {
        dispatch(addSuccessful(comment));
        toastr.info("Comment added successfully");
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchErrored(ADD));
      });
  };
}

export function editSuccessful(commentId, timestamp) {
  return {
    type: EDIT,
    commentId,
    timestamp
  };
}

export function editComment(commentId, body) {
  return dispatch => {
    dispatch(fetchLoading(EDIT, true));

    let now = Date.now();

    let request = {
      timestamp: now,
      body: body
    };

    return fetch(`http://localhost:3001/comments/${commentId}`, {
      headers: baseFetchHeaders,
      method: "PUT",
      body: JSON.stringify(request)
    })
      .then(response => {
        dispatch(fetchLoading(EDIT, false));
        return response;
      })
      .then(response => response.json())
      .then(comment => {
        dispatch(editSuccessful(commentId, now));
        toastr.info("Comment edited successfully");
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchErrored(ADD));
      });
  };
}

export function voteSuccessful(commentId, choice) {
  return {
    type: VOTE,
    commentId,
    choice
  };
}

export function vote(commentId, choice) {
  let request = {
    option: choice
  };

  return dispatch => {
    dispatch(fetchLoading(VOTE, true));

    return fetch(`http://localhost:3001/comments/${commentId}`, {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        dispatch(fetchLoading(VOTE, false));
        return response;
      })
      .then(response => response.json())
      .then(() => dispatch(voteSuccessful(commentId, choice)))
      .catch(error => dispatch(fetchErrored(VOTE)));
  };
}

export function deleteSuccessful(commentId) {
  return {
    type: DELETE,
    commentId
  };
}

export function deleteComment(commentId) {
  return dispatch => {
    dispatch(fetchLoading(DELETE, true));

    return fetch(`http://localhost:3001/comments/${commentId}`, {
      headers: baseFetchHeaders,
      method: "DELETE"
    })
      .then(response => {
        dispatch(fetchLoading(DELETE, false));
        return response;
      })
      .then(response => response.json())
      .then(() => dispatch(deleteSuccessful(commentId)))
      .catch(error => dispatch(fetchErrored(DELETE)));
  };
}

export function fetchSuccessful(comments) {
  return {
    type: FETCH,
    comments
  };
}

export function fetchComments(postId) {
  return dispatch => {
    dispatch(fetchLoading(FETCH, true));

    return fetch(`http://localhost:3001/posts/${postId}/comments`, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(FETCH, false));
        return response;
      })
      .then(response => response.json())
      .then(comments => dispatch(fetchSuccessful(comments)))
      .catch(error => dispatch(fetchErrored(FETCH)));
  };
}
