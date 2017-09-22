import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Message } from "semantic-ui-react";
import moment from "moment";
import { fetchPosts, fetchPostsByCategory, sortPosts } from "../actions/posts";

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  constructor() {
    super();
    this.categoryChanged = this.categoryChanged.bind(this);
    this.sortFilterChanged = this.sortFilterChanged.bind(this);
    this._viewDetails = this._viewDetails.bind(this);

    this.state = {
      currentCategory: "All",
      currentSortFilter: ""
    };
  }

  categoryChanged = e => {
    e.preventDefault();
    let category = e.target.innerText;

    this.setState({
      currentCategory: category,
      currentSortFilter: ""
    });

    if (category !== "All") {
      this.props.fetchPostsByCategory(category);
    } else {
      this.props.fetchPosts();
    }
  };

  sortFilterChanged = e => {
    e.preventDefault();
    let innerText = e.target.innerText;
    let sortFilter = innerText === "Votes" ? "voteScore" : "timestamp";

    this.setState({
      currentSortFilter: sortFilter
    });

    this.props.sortPosts(sortFilter);
  };

  _viewDetails(postId) {
    this.props.history.push(`/posts/details/${postId}`);
  }

  _renderPosts() {
    const { posts } = this.props;

    if (posts && posts.length > 0) {
      return (
        <Card.Group>
          {posts.map(item => (
            <Card key={item.id} fluid onClick={() => this._viewDetails(item.id)}>
              <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Card.Meta>
                  by {item.author}, {moment(item.timestamp).format("YYYY-MM-DD HH:mm")}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  <i className="thumbs up icon">{item.voteScore}</i>
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

  _renderSortFilters() {
    const { currentSortFilter } = this.state;
    return (
      <div className="column">
        Sort by&nbsp;&nbsp;
        <div className="ui buttons">
          <button
            onClick={this.sortFilterChanged}
            className={currentSortFilter === "timestamp" ? "ui button disabled" : "ui button"}
          >
            Date
          </button>
          <div className="or" />
          <button
            onClick={this.sortFilterChanged}
            className={currentSortFilter === "voteScore" ? "ui button disabled" : "ui button"}
          >
            Votes
          </button>
        </div>
      </div>
    );
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
                key={cat.name}
                onClick={this.categoryChanged}
              >
                {cat.name}
              </button>&nbsp;&nbsp;
            </span>
          ))}
        <button
          className={"All" === currentCategory ? "ui button disabled" : "ui button"}
          onClick={this.categoryChanged}
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
          {this._renderSortFilters()}
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
    sortPosts: filter => dispatch(sortPosts(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
