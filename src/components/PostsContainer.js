import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Message, Button } from "semantic-ui-react";
import moment from "moment";
import SortFilters from "./SortFilters";
import {
    fetchPosts,
    fetchPostsByCategory,
    sortPosts,
    deletePost,
    voteOnPost
} from "../actions/posts";
import VoteButtons from "./VoteButtons";
import AdminButtons from "./AdminButtons";

class PostsContainer extends Component {
    componentDidMount() {
        const category = this.props.match.params.category;
        if (!category) {
            this.props.fetchPosts();
        } else {
            this.props.fetchPostsByCategory(category);
        }

        this.setState({
            currentCategory: category || "All"
        });
    }

    state = {
        sortFilter: ""
    };

    handleUpvote = postId => {
        this.props.voteOnPost(postId, "upVote");
    };

    handleDownvote = postId => {
        this.props.voteOnPost(postId, "downVote");
    };

    handleEdit = postId => {
        this.props.history.push(`/posts/${postId}/edit/`);
    };

    handleDelete = postId => {
        this.props.deletePost(postId);
    };

    _categoryChanged = e => {
        e.preventDefault();
        const category = e.target.innerText;

        this.setState({
            sortFilter: "",
            currentCategory: category
        });

        if (category !== "All") {
            this.props.fetchPostsByCategory(category);
            this.props.history.push(`/posts/${category}`);
        } else {
            this.props.history.push("/posts");
        }
    };

    _handlerSortFilterChanged = e => {
        e.preventDefault();
        const innerText = e.target.innerText;
        const sortFilter = innerText === "Votes" ? "voteScore" : "timestamp";

        this.setState({
            sortFilter: sortFilter
        });

        this.props.sortPosts(sortFilter);
    };

    _viewDetails = postId => {
        this.props.history.push(`/posts/details/${postId}`);
    };

    _renderPosts() {
        const { posts } = this.props;

        if (posts && posts.length > 0) {
            return (
                <Card.Group>
                    {posts.filter(x => !x.deleted).map(item => (
                        <Card key={item.id} fluid>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={`/posts/details/${item.id}`}>{item.title}</Link>
                                </Card.Header>
                                <Card.Meta>
                                    by {item.author},{" "}
                                    {moment(item.timestamp).format("YYYY-MM-DD HH:mm")}
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <Card.Meta>
                                    <VoteButtons
                                        voteScore={item.voteScore}
                                        postId={item.id}
                                        onUpvote={() => this.handleUpvote(item.id)}
                                        onDownvote={() => this.handleDownvote(item.id)}
                                    />
                                    <div className="right floated">
                                        <AdminButtons
                                            onEdit={() => this.handleEdit(item.id)}
                                            onDelete={() => this.handleDelete(item.id)}
                                        />
                                    </div>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            );
        } else {
            return (
                <Message negative>
                    <Message.Header>We&#x27;re sorry but no posts were found.</Message.Header>
                    <p>Please try a different category</p>
                </Message>
            );
        }
    }

    _renderCategories() {
        const { currentCategory } = this.state;
        const { categories } = this.props;

        return (
            <div className="column">
                <Button.Group>
                    {categories &&
                        categories.map(cat => (
                            <Button
                                key={cat.name}
                                className={
                                    cat.name === currentCategory
                                        ? "ui button disabled"
                                        : "ui button"
                                }
                                onClick={this._categoryChanged}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    <Button
                        className={"All" === currentCategory ? "ui button disabled" : "ui button"}
                        onClick={this._categoryChanged}
                    >
                        All
                    </Button>
                </Button.Group>
            </div>
        );
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <div className="ui equal width grid">
                    <SortFilters
                        filter={this.state.sortFilter}
                        filterChanged={this._handlerSortFilterChanged}
                    />
                    {this._renderCategories()}
                    <div className="column">
                        <div>
                            <Link to="/posts/add">
                                <button className="ui icon right labeled right floated primary button">
                                    Add New Post <i className="plus icon" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {this._renderPosts()}
            </div>
        );
    }
}

const mapStateToProps = ({ posts, categories, common }) => {
    let errorsFound = false;
    if (common && common.errors && common.errors["posts"]) {
        errorsFound = true;
    }

    let isLoading = false;
    if (common && common.loading["posts"]) {
        isLoading = true;
    }

    return {
        posts: posts.items,
        hasErrored: errorsFound,
        isLoading: isLoading,
        categories: categories.items
    };
};

export default connect(mapStateToProps, {
    fetchPosts,
    fetchPostsByCategory,
    voteOnPost,
    sortPosts,
    deletePost
})(PostsContainer);
