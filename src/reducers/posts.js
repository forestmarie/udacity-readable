import {
  ADD_POST,
  EDIT_POST,
  FETCH_POSTS,
  FETCH_POST_DETAILS,
  FETCH_POSTS_BY_CATEGORY,
  DELETE_POST,
  VOTE_ON_POST,
  SORT_POSTS
} from "../actions/posts";

const postsInitialState = {
  items: []
};

const posts = (state = postsInitialState, action) => {
  const { items } = state;

  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        items: [...items, action.post]
      };

    case EDIT_POST:
      return {
        ...state,
        currentPost: { ...state.currentPost, title: action.title, body: action.body }
      };

    case VOTE_ON_POST:
      const currentPost = items.find(x => x.id === action.postId);
      const index = items.findIndex(x => x.id === action.postId);
      const newVoteScore = currentPost.voteScore + action.voteScore;

      const item = { ...currentPost, voteScore: newVoteScore };

      return {
        items: [...items.slice(0, index), item, ...items.slice(index + 1, items.length)]
      };

    case DELETE_POST:
      return {
        items: [...state.items.filter(x => x.id !== action.postId)]
      };

    case FETCH_POSTS:
      return {
        items: action.items
      };

    case FETCH_POST_DETAILS:
      return {
        items: [action.post]
      };

    case FETCH_POSTS_BY_CATEGORY:
      return {
        items: action.items
      };

    case SORT_POSTS:
      const currentPosts = [...state.items];
      const sortKey = action.filter;

      return {
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
