import {
  ADD_POST_SUCCESSFUL,
  EDIT_POST,
  FETCH_POSTS_SUCCESSFUL,
  FETCH_POST_DETAILS_SUCCESSFUL,
  FETCH_POSTS_BY_CATEGORY_SUCCESSFUL,
  DELETE_POST_SUCCESSFUL,
  VOTE_ON_POST_SUCCESSFUL,
  SORT_POSTS
} from "../actions/posts";

const postsInitialState = {
  items: []
};

const posts = (state = postsInitialState, action) => {
  const { author, title, body, postId, voteScore } = action;

  switch (action.type) {
    case ADD_POST_SUCCESSFUL:
      return {
        ...state,
        items: [...state.items, action.post]
      };

    case EDIT_POST:
      let posts = state.filter(x => x.postId !== postId);
      return {
        isLoading: state.isLoading,
        hasErrored: state.hasErrored,
        items: [...posts, { author, title, body, postId }]
      };

    case VOTE_ON_POST_SUCCESSFUL:
      const { currentPost } = state;
      let newVoteScore = currentPost.voteScore + voteScore;

      return {
        ...state,
        currentPost: { ...state.currentPost, voteScore: newVoteScore }
      };

    case DELETE_POST_SUCCESSFUL:
      return {
        items: [...state.items.filter(x => x.id !== action.postId)]
      };

    case FETCH_POSTS_SUCCESSFUL:
      return {
        items: action.items
      };

    case FETCH_POST_DETAILS_SUCCESSFUL:
      return {
        ...state,
        currentPost: action.post
      };

    case FETCH_POSTS_BY_CATEGORY_SUCCESSFUL:
      return {
        items: action.items
      };

    case SORT_POSTS:
      let currentPosts = [...state.items];
      let sortKey = action.filter;

      return {
        ...state,
        items: currentPosts.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) {
            return 1;
          } else if (a[sortKey] > b[sortKey]) {
            return -1;
          }
          return 0;
        })
      };

    default:
      return state;
  }
};

export default posts;
