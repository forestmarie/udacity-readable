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
  switch (action.type) {
    case ADD_COMMENT:
      const { author, body, postId } = action;
      return {
      };

    case LIKE_COMMENT:
        const { commentId } = action;
        return  {

        };

    case EDIT_COMMENT:
        const { author, body, commentId } = action;
        return {
        };

    case FETCH_COMMENTS: 
        const { category } = action;
        return {

        };
        
  
    default:
      return state;
  }
};


const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
        const { author, title, body } = action;
        return {

        };
    
    case EDIT_POST:
        const { author, title, body, postId } = action;
        return {

        };

    case FETCH_POSTS: 
        const { category } = action;
        return {

        };
    
    case LIKE_POST:
        const { postId } = action;
        return  {

        };

    default:
      return state;
  }
};

export default combineReducers({ calendar, food });
