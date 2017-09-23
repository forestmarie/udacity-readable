import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import Comment from "./Comment";
import { addComment, fetchComments, deleteComment, vote } from "../actions/comments";
import generateUUID from "../utils";
import auth from "../services/auth";
import _ from "lodash";

class CommentsContainer extends Component {
  state = {
    commentBody: "",
    sortFilter: "timestamp"
  };

  componentDidMount() {
    this.props.fetchComments(this.props.postId);
  }

  handleVote = (commentId, choice) => {
    this.props.vote(commentId, choice);
  };

  sortFilterChanged = e => {
    e.preventDefault();
    let innerText = e.target.innerText;
    let sortFilter = innerText === "Votes" ? "voteScore" : "timestamp";

    this.setState({
      sortFilter: sortFilter
    });
  };

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

  handleDelete = commentId => {
    this.props.deleteComment(commentId);
  };

  handleChange = e => {
    this.setState({
      commentBody: e.target.innerHtml
    });
  };

  _renderComments() {
    if (this.props.comments.length === 0) {
      return null;
    }

    let comments = this.props.comments;
    if (this.state.sortFilter === "timestamp") {
      comments = _.orderBy(comments, ["timestamp"], ["asc"]);
    } else {
      comments = _.orderBy(comments, ["voteScore"], ["desc"]);
    }

    return (
      <div className="ui cards">
        {comments.map(x => (
          <Comment
            key={x.id}
            id={x.id}
            author={x.author}
            body={x.body}
            commentDate={x.timestamp}
            voteScore={x.voteScore}
            onDelete={this.handleDelete}
            onVote={this.handleVote}
          />
        ))}
      </div>
    );
  }

  _renderSortFilters() {
    const { sortFilter } = this.state;
    return (
      <div className="column">
        Sort by&nbsp;&nbsp;
        <div className="ui buttons">
          <button
            onClick={this.sortFilterChanged}
            className={sortFilter === "timestamp" ? "ui button disabled" : "ui button"}
          >
            Date
          </button>
          <div className="or" />
          <button
            onClick={this.sortFilterChanged}
            className={sortFilter === "voteScore" ? "ui button disabled" : "ui button"}
          >
            Votes
          </button>
        </div>
      </div>
    );
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
        {this._renderSortFilters()}
        <br />
        {this._renderComments()}
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  comments: PropTypes.array.isRequired
};

const mapStateToProps = ({ comments }) => {
  let items = comments.items || [];

  return {
    comments: items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addComment: (postId, comment) => dispatch(addComment(postId, comment)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    vote: (commentId, choice) => dispatch(vote(commentId, choice))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
