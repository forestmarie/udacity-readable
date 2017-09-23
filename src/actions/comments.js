import { baseFetchHeaders } from "../utils/http-helpers";
import { fetchErrored, fetchLoading } from "./common";
import toastr from "toastr";
export const ADD_COMMENT_SUCCESSFUL = "ADD_COMMENT";
export const VOTE_ON_COMMENT = "VOTE_ON_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const FETCH_COMMENTS_SUCCESSFUL = "FETCH_COMMENTS_SUCCESSFUL";

export function addCommentSuccessful(comment) {
  return {
    type: ADD_COMMENT_SUCCESSFUL,
    comment: comment
  };
}

export function addComment(postId, comment) {
  const action = "add-comment";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    let addCommentRequest = {
      ...comment,
      parentId: postId
    };

    return fetch("http://localhost:3001/comments", {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify(addCommentRequest)
    })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(comment => {
        dispatch(addCommentSuccessful(comment));
        toastr.info("Comment added successfully");
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchErrored(action));
      });
  };
}

export function voteOnCommentSuccessful(commentId, choice) {
  return {
    type: VOTE_ON_COMMENT,
    commentId,
    choice
  };
}

export function deleteComment() {}

export function vote(commentId, choice) {
  const action = "vote-on-comment";

  let request = {
    option: choice
  };

  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch(`http://localhost:3001/comments/${commentId}`, {
      headers: baseFetchHeaders,
      method: "POST",
      body: JSON.stringify(request)
    })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(() => dispatch(voteOnCommentSuccessful(commentId, choice)))
      .catch(error => dispatch(fetchErrored(action)));
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

export function fetchCommentsSuccessful(comments) {
  return {
    type: FETCH_COMMENTS_SUCCESSFUL,
    comments
  };
}

export function fetchComments(postId) {
  const action = "fetch-comments";

  return dispatch => {
    dispatch(fetchLoading(action, true));

    return fetch(`http://localhost:3001/posts/${postId}/comments`, { headers: baseFetchHeaders })
      .then(response => {
        dispatch(fetchLoading(action, false));
        return response;
      })
      .then(response => response.json())
      .then(comments => dispatch(fetchCommentsSuccessful(comments)))
      .catch(error => dispatch(fetchErrored(action)));
  };
}
