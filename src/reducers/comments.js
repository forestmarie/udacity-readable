import { 
    ADD_COMMENT,  
    LIKE_COMMENT,  
    EDIT_COMMENT, 
    FETCH_COMMENTS_SUCCESSFUL,
    FETCH_COMMENTS_HAS_ERRORED,
    FETCH_COMMENTS_LOADING } from "../actions";

const commentsInitialState = {
    items: [],
    isLoading: false,
    hasErrored: false
};

const comments = (state = commentsInitialState, action) => {
  const { author, body, postId, commentId } = action;

  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, items: [...state, { author, body, postId }] };
      
    case LIKE_COMMENT:
        let comment = state.filter(x => x.commentId === commentId);
        comment.voteCount++;
        return { ...state, items: [...state.filter(x => x.commentId !== commentId), comment] };

    case EDIT_COMMENT:
        let comments = state.filter(x => x.commentId !== commentId);
        return { ...state, items: [ ...comments, { author, body, commentId }] };

    case FETCH_COMMENTS_HAS_ERRORED: 
        return {
            ...state,
            hasErrored: action.hasErrored
        };

    case FETCH_COMMENTS_LOADING: 
        return {
            ...state,
            isLoading: action.isLoading
        }; 
    case FETCH_COMMENTS_SUCCESSFUL: 
        return {
            ...state,
            items: action.items
        };
  
    default:
      return state;
  }
};

export default comments;