import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import Comment from "./Comment";
import { addComment, fetchComments, vote } from "../actions/comments";
import generateUUID from "../utils";
import auth from "../services/auth";

class CommentsContainer extends Component {
  state = {
    commentBody: ""
  };

  constructor() {
    super();
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  handleVote(commentId, choice) {
    this.props.vote(commentId, choice);
  }

  addComment = () => {
    let comment = {
      id: generateUUID(),
      body: this.commentBody.value,
      author: auth.fullName,
      parentId: this.props.postId,
      timestamp: Date.now()
    };

    this.setState({
      commentBody: ""
    });

    this.props.addComment(this.props.postId, comment);
  };

  handleChange = e => {
    this.setState({
      commentBody: e.target.innerHtml
    });
  };

  _renderComments() {
    if (this.props.comments.length > 0) {
      return (
        <div className="ui cards">
          {this.props.comments.map(x => (
            <Comment
              key={x.id}
              id={x.id}
              author={x.author}
              body={x.body}
              commentDate={x.timestamp}
              voteScore={x.voteScore}
              onVote={this.handleVote}
            />
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
          <textarea
            rows="3"
            value={this.state.commentBody}
            onChange={this.handleChange}
            ref={input => (this.commentBody = input)}
            placeholder="Add Comment"
          />
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
    fetchComments: postId => dispatch(fetchComments(postId)),
    vote: (commentId, choice) => dispatch(vote(commentId, choice))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
