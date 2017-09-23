import {
  ADD_COMMENT_SUCCESSFUL,
  LIKE_COMMENT,
  EDIT_COMMENT,
  FETCH_COMMENTS_SUCCESSFUL
} from "../actions/comments";

const commentsInitialState = {
  items: []
};

const comments = (state = commentsInitialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESSFUL:
      return { items: [...state.items, { ...action.comment }] };

    // case LIKE_COMMENT:
    //   let comment = state.filter(x => x.commentId === commentId);
    //   comment.voteCount++;
    //   return { ...state, items: [...state.filter(x => x.commentId !== commentId), comment] };
    //
    // case EDIT_COMMENT:
    //   let comments = state.filter(x => x.commentId !== commentId);
    //   return { ...state, items: [...comments, { author, body, commentId }] };

    case FETCH_COMMENTS_SUCCESSFUL:
      return {
        items: [...action.comments]
      };

    default:
      return state;
  }
};

export default comments;
