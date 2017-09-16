import React, { Component } from "react";
import { connect } from "react-redux";
import { postsFetchData, postsByCategoryFetchData, sortPosts } from "../actions/";
import moment from "moment";

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts("http://localhost:3001/posts");
  }

  constructor() {
    super();
    this.categoryChanged = this.categoryChanged.bind(this);
    this.sortFilterChanged = this.sortFilterChanged.bind(this);
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
      this.props.fetchPostsByCategory(`http://localhost:3001/${category}/posts`);
    } else {
      this.props.fetchPosts("http://localhost:3001/posts");
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

  _renderPosts() {
    const { posts } = this.props;

    if (posts && posts.length > 0) {
      return posts.map(item => (
        <div className="ui cards">
          <div key={item.id} className="ui fluid card">
            <div className="content">
              <div className="header">{item.title}</div>
              <div className="meta">
                by {item.author}, {moment.unix(item.timestamp).format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            <div className="extra content">
              <i className="thumbs up icon">{item.voteScore}</i>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="ui negative message">
          <div className="header">We&#x27;re sorry but no posts were found.</div>
          <p>Please try a different category</p>
        </div>
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
            role="button"
          >
            Date
          </button>
          <div className="or" />
          <button
            onClick={this.sortFilterChanged}
            className={currentSortFilter === "voteScore" ? "ui button disabled" : "ui button"}
            role="button"
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
            <span>
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
              <button className="ui icon right labeled right floated primary button">
                Add New Post <i className="plus icon" />
              </button>
            </div>
          </div>
        </div>
        {this._renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts: posts.items,
    hasErrored: posts.hasErrored,
    isLoading: posts.isLoading,
    categories: categories.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: url => dispatch(postsFetchData(url)),
    fetchPostsByCategory: url => dispatch(postsByCategoryFetchData(url)),
    sortPosts: filter => dispatch(sortPosts(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
