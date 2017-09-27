import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Message, Button } from "semantic-ui-react";
import moment from "moment";
import SortFilters from "./SortFilters";
import { fetchPosts, fetchPostsByCategory, sortPosts, voteOnPost } from "../actions/posts";
import VoteButtons from "./VoteButtons";

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  state = {
    currentCategory: "All",
    sortFilter: ""
  };

  handleUpvote = postId => {
    this.props.vote(postId, "upVote");
  };

  handleDownvote = postId => {
    this.props.vote(postId, "downVote");
  };

  _categoryChanged = e => {
    e.preventDefault();
    const category = e.target.innerText;

    this.setState({
      currentCategory: category,
      sortFilter: ""
    });

    if (category !== "All") {
      this.props.fetchPostsByCategory(category);
    } else {
      this.props.fetchPosts();
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
          {posts.map(item => (
            <Card key={item.id} fluid>
              <Card.Content>
                <Card.Header>
                  <Link to={`/posts/details/${item.id}`}>{item.title}</Link>
                </Card.Header>
                <Card.Meta>
                  by {item.author}, {moment(item.timestamp).format("YYYY-MM-DD HH:mm")}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  <VoteButtons
                    voteScore={item.voteScore}
                    postId={item.id}
                    onUpvote={this.handleUpvote}
                    onDownvote={this.handleDownvote}
                  />
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
        Category: &nbsp;
        {categories &&
          categories.map(cat => (
            <span key={cat.name}>
              <button
                className={cat.name === currentCategory ? "ui button disabled" : "ui button"}
                onClick={this._categoryChanged}
              >
                {cat.name}
              </button>&nbsp;&nbsp;
            </span>
          ))}
        <button
          className={"All" === currentCategory ? "ui button disabled" : "ui button"}
          onClick={this._categoryChanged}
        >
          All
        </button>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    vote: (postId, voteChoice) => dispatch(voteOnPost(postId, voteChoice)),
    sortPosts: filter => dispatch(sortPosts(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
