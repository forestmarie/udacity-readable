import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "semantic-ui-react";
import { vote, deleteComment } from "../actions/comments";

class Comment extends Component {
  likeComment = () => {
    this.props.onVote(this.props.id, "upVote");
  };

  dislikeComment = () => {
    this.props.onVote(this.props.id, "downVote");
  };

  deleteComment = () => {
    this.props.deleteComment(this.props.id);
  };

  editComment = () => {
    alert("edited comment");
  };

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Meta>
            By {this.props.author}, {this.props.commentDate}
          </Card.Meta>
          <Card.Description>{this.props.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={this.editComment} content="Edit" />
          <Button onClick={this.deleteComment} content="Delete" />
          <div className="right floated">
            <Button onClick={this.likeComment} icon="thumbs up" />
            <Button onClick={this.dislikeComment} icon="thumbs down" />
            {this.props.voteScore}
          </div>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    vote: (commentId, choice) => dispatch(vote(commentId, choice)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
};

export default connect(null, mapDispatchToProps)(Comment);
