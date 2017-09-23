import { ADD, VOTE, DELETE, EDIT, FETCH } from "../actions/comments";

const commentsInitialState = {
  items: []
};

const comments = (state = commentsInitialState, action) => {
  const { items } = state;
  const { commentId, choice, timestamp } = action;
  let index;
  let originalComment;

  switch (action.type) {
    case ADD:
      return { items: [...items, { ...action.comment }] };

    case DELETE:
      index = items.findIndex(x => x.id === commentId);

      return {
        items: [...items.slice(0, index), ...items.slice(index + 1, items.length)]
      };

    case VOTE:
      originalComment = items.filter(x => x.id === commentId)[0];
      index = items.findIndex(x => x.id === commentId);

      let voteScore = choice === "upVote" ? 1 : -1;

      let comment = { ...originalComment, voteScore: originalComment.voteScore + voteScore };

      return {
        items: [...items.slice(0, index), comment, ...items.slice(index + 1, items.length)]
      };

    case EDIT:
      let unmodifiedComments = items.filter(x => x.id !== commentId);
      originalComment = items.filter(x => x.id === commentId)[0];
      let modifiedComment = { ...originalComment, timestamp: timestamp };

      return { items: [...unmodifiedComments, modifiedComment] };

    case FETCH:
      return {
        items: [...action.comments]
      };

    default:
      return state;
  }
};

export default comments;
