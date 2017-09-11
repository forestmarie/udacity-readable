export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS = "FETCH_POSTS";

export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const FETCH_COMMENTS = "FETCH_COMMENTS";

export function addPost({ author, title, body }) {
    return {
        type: ADD_POST,
        author,
        title,
        body
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

export function fetchPosts({ category }) {
    return {
        type: FETCH_POSTS,
        category 
    };
}

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

export function fetchComments({ postId }) {
    return {
        type: FETCH_COMMENTS,
        postId 
    };
}