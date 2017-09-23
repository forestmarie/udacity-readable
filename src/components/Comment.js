import React from "react";
import { Card, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import moment from "moment";

const Comment = ({ id, author, commentDate, body, voteScore, onVote, onDelete }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Meta>
          By {author}, {moment(commentDate).format("YYYY-MM-DD HH:mm")}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button content="Edit" />
        <Button onClick={() => onDelete(id)} content="Delete" />
        <div className="right floated">
          <Button onClick={() => onVote(id, "upVote")} icon="thumbs up" />
          <Button onClick={() => onVote(id, "downVote")} icon="thumbs down" />
          {voteScore}
        </div>
      </Card.Content>
    </Card>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  commentDate: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Comment;
