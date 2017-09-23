import { ADD, VOTE, DELETE, EDIT, FETCH } from "../actions/comments";

const commentsInitialState = {
  items: []
};

const comments = (state = commentsInitialState, action) => {
  const { items } = state;
  const { commentId, choice } = action;
  let index;

  switch (action.type) {
    case ADD:
      return { items: [...items, { ...action.comment }] };

    case DELETE:
      index = items.findIndex(x => x.id === commentId);

      return {
        items: [...items.slice(0, index), ...items.slice(index + 1, items.length)]
      };

    case VOTE:
      let originalComment = items.filter(x => x.id === commentId)[0];
      index = items.findIndex(x => x.id === commentId);

      let voteScore = choice === "upVote" ? 1 : -1;

      let comment = { ...originalComment, voteScore: originalComment.voteScore + voteScore };

      return {
        items: [...items.slice(0, index), comment, ...items.slice(index + 1, items.length)]
      };

    // case EDIT_COMMENT:
    //   let comments = state.filter(x => x.commentId !== commentId);
    //   return { ...state, items: [...comments, { author, body, commentId }] };

    case FETCH:
      return {
        items: [...action.comments]
      };

    default:
      return state;
  }
};

export default comments;
