import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { fetchPostDetails, voteOnPost, deletePost, FETCH_POST_DETAILS } from "../actions/posts";
import CommentsContainer from "./CommentsContainer";
import VoteButtons from "./VoteButtons";

class Post extends Component {
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

    handleUpvote = e => {
        this.setState({
            voteChoice: "up"
        });

        this.props.vote(this.state.postId, "upVote");
    };

    handleDownvote = e => {
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
                        <Button
                            content="Edit"
                            onClick={this.goToEditPost}
                            icon="file"
                            labelPosition="right"
                        />
                        <Button
                            content="Delete"
                            onClick={this.deletePost}
                            icon="trash"
                            labelPosition="right"
                        />
                    </div>
                    <br />
                    <p>{currentPost.body}</p>
                    <br />
                    <div>
                        <VoteButtons
                            voteChoice={voteChoice}
                            voteScore={currentPost.voteScore}
                            onUpvote={this.handleUpvote}
                            onDownvote={this.handleDownvote}
                        />
                        &nbsp;
                        {!this.state.showComments && (
                            <button
                                className="ui icon right labeled button"
                                onClick={this.showComments}
                            >
                                View Comments <i className="comments icon" />
                            </button>
                        )}
                    </div>
                    <br />
                    {this.state.showComments && <CommentsContainer postId={this.state.postId} />}
                </div>
            );
        } else if (isLoading) {
            return <div>Post details loading...</div>;
        } else if (hasErrored) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
