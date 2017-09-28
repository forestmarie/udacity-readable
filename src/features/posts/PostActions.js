import toastr from "toastr";
import { baseFetchHeaders, BaseApiUrl } from "../../utils/http-helpers";
import { fetchService } from "../../utils/http-helpers";
import { fetchErrored, fetchLoading } from "../common/CommonActions";

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
        return fetchService.post(
            ADD_POST,
            "/posts",
            "Post",
            JSON.stringify(addPostRequest),
            dispatch,
            addPostSuccessful(addPostRequest)
        );
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

export function voteOnPostSuccessful(postId, vote) {
    const voteScore = vote === "upVote" ? 1 : -1;
    return {
        type: VOTE_ON_POST,
        voteScore,
        postId: postId
    };
}

export function voteOnPost(postId, vote) {
    return dispatch => {
        return fetchService.post(
            VOTE_ON_POST,
            `/posts/${postId}`,
            "Post",
            JSON.stringify({ option: vote }),
            dispatch,
            voteOnPostSuccessful(postId, vote)
        );
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
        return fetchService.get(
            FETCH_POST_DETAILS,
            `/posts/${id}`,
            "Post",
            fetchPostDetailsSuccessful,
            dispatch
        );
    };
}

export function fetchPosts() {
    return dispatch => {
        return fetchService.get(FETCH_POSTS, "/posts", "Post", fetchPostsSuccessful, dispatch);
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
        return fetchService.delete(
            DELETE_POST,
            `/posts/${postId}`,
            "Post",
            deletePostSuccessful(postId),
            dispatch
        );
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
        return fetchService.get(
            FETCH_POSTS_BY_CATEGORY,
            `/${category}/posts`,
            "Post",
            fetchPostsByCategorySuccessful,
            dispatch
        );
    };
}
