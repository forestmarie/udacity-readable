export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POSTS_HAS_ERRORED = "FETCH_POSTS_HAS_ERRORED";
export const FETCH_POSTS_LOADING = "FETCH_POSTS_LOADING";

export const FETCH_POSTS_BY_CATEGORY_SUCCESSFUL =
  "FETCH_POSTS_BY_CATEGORY_SUCCESSFUL";
export const FETCH_POSTS_BY_CATEGORY_HAS_ERRORED =
  "FETCH_POSTS_BY_CATEGORY_HAS_ERRORED";
export const FETCH_POSTS_BY_CATEGORY_LOADING =
  "FETCH_POSTS_BY_CATEGORY_LOADING";

export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const FETCH_COMMENTS_SUCCESSFUL = "FETCH_COMMENTS_SUCCESSFUL";
export const FETCH_COMMENTS_HAS_ERRORED = "FETCH_COMMENTS_HAS_ERRORED";
export const FETCH_COMMENTS_LOADING = "FETCH_COMMENTS_LOADING";
export const FETCH_CATEGORIES_SUCCESSFUL = "FETCH_CATEGORIES_SUCCESSFUL";
export const FETCH_CATEGORIES_HAS_ERRORED = "FETCH_CATEGORIES_HAS_ERRORED";
export const FETCH_CATEGORIES_LOADING = "FETCH_CATEGORIES_LOADING";

export function fetchCategoriesHasErrored() {
  return {
    type: FETCH_CATEGORIES_HAS_ERRORED,
    hasErrored: true
  };
}

export function fetchCategoriesLoading(isLoading) {
  return {
    type: FETCH_CATEGORIES_LOADING,
    isLoading
  };
}

export function fetchCategoriesSuccessful(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESSFUL,
    items: categories
  };
}

export function categoriesFetchData(url) {
  return dispatch => {
    dispatch(fetchCategoriesLoading(true));

    fetch(url, { headers: { Authorization: "foobar" } })
      .then(response => {
        dispatch(fetchCategoriesLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(response => {
        dispatch(fetchCategoriesSuccessful(response.categories));
      })
      .catch(error => {
        dispatch(fetchCategoriesHasErrored());
      });
  };
}

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

    fetch(url, { headers: { Authorization: "foobar" } })
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

    fetch(url, { headers: { Authorization: "foobar" } })
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

    fetch(url, { headers: { Authorization: "foobar" } })
      .then(response => {
        dispatch(fetchCommentsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(comments => dispatch(fetchCommentsSuccessful(comments)))
      .catch(() => dispatch(fetchCommentsHasErrored()));
  };
}
