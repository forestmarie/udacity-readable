import { 
    ADD_POST, 
    LIKE_POST,
    EDIT_POST,
    FETCH_POSTS_SUCCESSFUL,
    FETCH_POSTS_HAS_ERRORED,
    FETCH_POSTS_LOADING
} from "../actions";

const postsInitialState = {
    items: [],
    hasErrored: false,
    isLoading: false
};

const posts = (state = postsInitialState, action) => {
  const { author, title, body, postId } = action;
  
  switch (action.type) {
    case ADD_POST:
        return [...state, { author, title, body }];
    
    case EDIT_POST:
        let posts = state.filter(x => x.postId !== postId);
        return [ ...posts, { author, title, body, postId }];
    
    case LIKE_POST:
        let post = state.filter(x => x.postId === postId);
        post.voteCount++;
        return [...state.filter(x => x.postId !== postId), post];

        case FETCH_POSTS_HAS_ERRORED: 
        return {
            ...state,
            hasErrored: action.hasErrored
        };

    case FETCH_POSTS_LOADING: 
        return {
            ...state,
            isLoading: action.isLoading
        }; 
    case FETCH_POSTS_SUCCESSFUL: 
        return {
            ...state,
            items: action.items
        };

    default:
      return state;
  }
};

export default posts;