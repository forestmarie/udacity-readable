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

export function fetchPosts({ category }) {
    return {
        type: FETCH_POSTS,
        category 
    };
}