import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { fetchPostDetails, voteOnPost, deletePost } from "../actions/posts";
import CommentsContainer from "./CommentsContainer";

class PostDetail extends Component {
  state = {
    showComments: false,
    voteChoice: "",
    postId: this.props.match.params.id
  };

  componentWillMount() {
    this.props.fetchPost(this.state.postId);
  }

  showComments = e => {
    this.setState({
      showComments: true
    });
  };

  upVote = e => {
    this.setState({
      voteChoice: "up"
    });

    this.props.vote(this.state.postId, "upVote");
  };

  downVote = e => {
    this.setState({
      voteChoice: "down"
    });
    this.props.vote(this.state.postId, "downVote");
  };

  goToEditPost = () => {
    this.props.history.push(`/posts/${this.state.postId}/edit/`);
  };

  deletePost = () => {
    this.props.deletePost(this.state.postId).then(_ => {
      this.props.history.push("/posts");
    });
  };

  render() {
    const { currentPost, isLoading, hasErrored } = this.props;
    const { voteChoice } = this.state;

    if (currentPost) {
      return (
        <div className="ui fluid container">
          <h2 className="ui header">{currentPost.title}</h2>
          <div>
            By {currentPost.author} {currentPost.timestamp}
            <Button content="Edit" onClick={this.goToEditPost} icon="file" labelPosition="right" />
            <Button content="Delete" onClick={this.deletePost} icon="trash" labelPosition="right" />
          </div>
          <br />
          <p>{currentPost.body}</p>
          <br />
          {!this.state.showComments && (
            <div>
              <Button disabled={voteChoice === "up"} onClick={this.upVote} icon="thumbs up" />
              <Button disabled={voteChoice === "down"} onClick={this.downVote} icon="thumbs down" />
              <button className="ui icon right labeled button" onClick={this.showComments}>
                View Comments ({currentPost.voteScore}) <i className="comments icon" />
              </button>
            </div>
          )}
          <div className="ui divider" />
          {this.state.showComments && <CommentsContainer />}
        </div>
      );
    } else if (isLoading) {
      return <div>Post details loading...</div>;
    } else if (hasErrored) {
      return <div>There was a problem loading the post</div>;
    }
    return null;
  }
}

const mapStateToProps = ({ posts, common }) => {
  let errorsFound = false;
  if (common && common.errors && common.errors["fetch-post-details"]) {
    errorsFound = true;
  }

  let isLoading = false;
  if (common && common.loading["fetch-post-details"]) {
    isLoading = true;
  }

  return {
    hasErrored: errorsFound,
    isLoading: isLoading,
    currentPost: posts.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: postId => dispatch(fetchPostDetails(postId)),
    vote: (postId, voteChoice) => dispatch(voteOnPost(postId, voteChoice)),
    deletePost: postId => dispatch(deletePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
