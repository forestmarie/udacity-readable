import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import Comment from "./Comment";
import { addComment, fetchComments } from "../actions/comments";
import generateUUID from "../utils";

class CommentsContainer extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  addComment = () => {
    let comment = {
      id: generateUUID(),
      body: "Great post",
      author: "Forest Marie",
      parentId: this.props.postId,
      timestamp: Date.now()
    };

    this.props.addComment(this.props.postId, comment);
  };

  _renderComments() {
    if (this.props.comments.length > 0) {
      return (
        <div className="ui cards">
          {this.props.comments.map(x => (
            <Comment key={x.id} author={x.author} body={x.body} commentDate={x.timestamp} />
          ))}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <div className="ui form">
          <textarea rows="3" placeholder="Add Comment" />
          <br />
          <br />
          <Button
            primary
            content="Add Comment"
            icon="add"
            labelPosition="right"
            onClick={() => this.addComment()}
          />
        </div>
        <br />
        <div>
          Sort by&nbsp;&nbsp;
          <div className="ui buttons">
            <button className="ui button">Date</button>
            <div className="or" />
            <button className="ui button">Votes</button>
          </div>
        </div>
        <br />
        {this._renderComments()}
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => {
  return {
    comments: comments.items || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: (postId, comment) => dispatch(addComment(postId, comment)),
    fetchComments: postId => dispatch(fetchComments(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
