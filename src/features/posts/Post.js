import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Icon, Container, Header, Segment, Sidebar, Menu, Image } from "semantic-ui-react";
import moment from "moment";
import { fetchPostDetails, voteOnPost, deletePost, FETCH_POST_DETAILS } from "./PostActions";
import CommentsContainer from "../comments/CommentsContainer";
import VoteButtons from "../common/VoteButtons";
import AdminButtons from "../common/AdminButtons";

class Post extends Component {
  state = {
    showComments: false,
    voteChoice: "",
    adminMode: false,
    postId: this.props.match.params.id
  };

  componentWillMount() {
    this.props.fetchPostDetails(this.state.postId);
  }

  toggleAdminMode = () => {
    this.setState({
      adminMode: !this.state.adminMode
    });
  };

  showComments = e => {
    this.setState({
      showComments: true
    });
  };

  handleUpvote = e => {
    this.setState({
      voteChoice: "up"
    });

    this.props.voteOnPost(this.state.postId, "upVote");
  };

  handleDownvote = e => {
    this.setState({
      voteChoice: "down"
    });

    this.props.voteOnPost(this.state.postId, "downVote");
  };

  handleEdit = () => {
    this.props.history.push(`/posts/${this.state.postId}/edit/`);
  };

  handleDelete = () => {
    this.props.deletePost(this.state.postId).then(_ => {
      this.props.history.push("/posts");
    });
  };

  render() {
    const { isLoading, hasErrored } = this.props;
    const post = this.props.posts.find(x => x.id === this.state.postId);

    if (post && !post.deleted) {
      return (
        <span>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              width="thin"
              direction="right"
              visible={this.state.adminMode}
              icon="labeled"
              vertical
              inverted
            >
              <Menu.Item onClick={this.handleEdit} name="edit">
                <Icon name="edit" />
                Edit
              </Menu.Item>
              <Menu.Item onClick={this.handleDelete} name="delete">
                <Icon name="trash" />
                Delete
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Container text style={{ marginTop: "2em" }}>
                  <Header as="h1">{post.title}</Header>
                  Posted by <Icon name="user" />
                  {post.author} at {moment(post.timestamp).format("MMMM DD YYYY hh:mm A")}{" "}
                  <Icon name="talk" /> 301 comments
                  <div className="ui section divider" />
                  <p>{post.body}</p>
                  <div>
                    <VoteButtons
                      voteScore={post.voteScore}
                      onUpvote={this.handleUpvote}
                      onDownvote={this.handleDownvote}
                    />
                    &nbsp;
                    {!this.state.showComments && (
                      <button className="ui icon right labeled button" onClick={this.showComments}>
                        View Comments <i className="comments icon" />
                      </button>
                    )}
                    <Button content="Toggle Admin Mode" onClick={this.toggleAdminMode} />
                  </div>
                  <br />
                  {this.state.showComments && <CommentsContainer postId={this.state.postId} />}
                </Container>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </span>
      );
    } else if (isLoading) {
      return <div>Post details loading...</div>;
    } else if (hasErrored || (post && post.deleted)) {
      return <Redirect to="/404" />;
    }
    return null;
  }
}

const mapStateToProps = ({ posts, common }) => {
  let errorsFound = false;
  if (common && common.errors && common.errors[FETCH_POST_DETAILS]) {
    errorsFound = true;
  }

  let isLoading = false;
  if (common && common.loading[FETCH_POST_DETAILS]) {
    isLoading = true;
  }

  return {
    hasErrored: errorsFound,
    isLoading: isLoading,
    posts: posts.items
  };
};

export default connect(mapStateToProps, { fetchPostDetails, voteOnPost, deletePost })(Post);
