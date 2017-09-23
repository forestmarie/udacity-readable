import {
  ADD_COMMENT_SUCCESSFUL,
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  FETCH_COMMENTS_SUCCESSFUL
} from "../actions/comments";

const commentsInitialState = {
  items: []
};

const comments = (state = commentsInitialState, action) => {
  const { items } = state;
  const { commentId, choice } = action;

  switch (action.type) {
    case ADD_COMMENT_SUCCESSFUL:
      return { items: [...items, { ...action.comment }] };

    case VOTE_ON_COMMENT:
      let originalComment = items.filter(x => x.id === commentId)[0];
      let index = items.findIndex(x => x.id === commentId);

      let voteScore = choice === "upVote" ? 1 : -1;

      let comment = { ...originalComment, voteScore: originalComment.voteScore + voteScore };

      return {
        items: [...items.slice(0, index), comment, ...items.slice(index + 1, items.length)]
      };

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
