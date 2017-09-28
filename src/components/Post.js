import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { fetchPostDetails, voteOnPost, deletePost, FETCH_POST_DETAILS } from "../actions/posts";
import CommentsContainer from "./CommentsContainer";
import VoteButtons from "./VoteButtons";
import AdminButtons from "./AdminButtons";

class Post extends Component {
    state = {
        showComments: false,
        voteChoice: "",
        postId: this.props.match.params.id
    };

    componentWillMount() {
        this.props.fetchPostDetails(this.state.postId);
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
                <div className="ui fluid container">
                    <h2 className="ui header">{post.title}</h2>
                    <div>
                        By {post.author}, {moment(post.timestamp).format("YYYY-MM-DD HH:mm")}
                        <AdminButtons onEdit={this.handleEdit} onDelete={this.handleDelete} />
                    </div>
                    <br />
                    <p>{post.body}</p>
                    <br />
                    <div>
                        <VoteButtons
                            voteScore={post.voteScore}
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
