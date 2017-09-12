import { combineReducers } from "redux";
import { 
    ADD_POST, 
    LIKE_POST,
    EDIT_POST,
    FETCH_POSTS, 
    ADD_COMMENT,  
    LIKE_COMMENT,  
    EDIT_COMMENT, 
    FETCH_COMMENTS } from "../actions";

const comments = (state = [], action) => {
  const { author, body, postId, commentId } = action;

  switch (action.type) {
    case ADD_COMMENT:
      return [...state, { author, body, postId }];
      
    case LIKE_COMMENT:
        let comment = state.filter(x => x.commentId === commentId);
        comment.voteCount++;

        return [...state.filter(x => x.commentId !== commentId), comment];

    case EDIT_COMMENT:
        let comments = state.filter(x => x.commentId !== commentId);

        return [ ...comments, { author, body, commentId }];

    case FETCH_COMMENTS: 
        const { category } = action;
        return {

        };
        
  
    default:
      return state;
  }
};


const posts = (state = [], action) => {
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

    case FETCH_POSTS: 
        const { category } = action;

        return {

        };

    default:
      return state;
  }
};

export default combineReducers({ comments, posts });
