import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

class Comment extends Component {
  likeComment() {
    alert("voted up");
  }

  dislikeComment() {
    alert("voted down");
  }

  deleteComment() {
    alert("deleted comment");
  }

  editComment() {
    alert("edited comment");
  }

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

export default Comment;
