import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostDetails } from "../actions/posts";
import CommentsContainer from "./CommentsContainer";

class PostDetail extends Component {
  state = {
    postDetailsLoaded: false,
    showComments: false
  };

  componentDidMount() {
    var postId = this.props.match.params.id;
    this.props.fetchPost(`http://localhost:3001/posts/${postId}`).then(_ => {
      this.setState({
        postDetailsLoaded: true
      });
    });
  }

  showComments = e => {
    this.setState({
      showComments: true
    });
  };

  render() {
    const { currentPost } = this.props;

    if (this.state.postDetailsLoaded) {
      return (
        <div className="ui fluid container">
          <h2 className="ui header">{currentPost.title}</h2>
          <div>
            By {currentPost.author} {currentPost.timestamp} <a href="edit">edit</a> |{" "}
            <a href="delete">delete</a>
          </div>
          <br />
          <p>{currentPost.body}</p>
          <br />
          {!this.state.showComments && (
            <div>
              <button className="ui icon right labeled primary button" onClick={this.showComments}>
                View Comments ({currentPost.voteScore}) <i className="comments icon" />
              </button>
            </div>
          )}
          <div className="ui divider" />
          {this.state.showComments && <CommentsContainer />}
        </div>
      );
    } else {
      return <div>Post details loading...</div>;
    }
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
    fetchPost: url => dispatch(fetchPostDetails(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
