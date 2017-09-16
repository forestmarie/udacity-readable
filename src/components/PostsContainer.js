import React, { Component } from "react";
import { connect } from "react-redux";
import { postsFetchData, postsByCategoryFetchData } from "../actions/";
import moment from "moment";

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts("http://localhost:3001/posts");
  }

  constructor() {
    super();
    this.categoryChanged = this.categoryChanged.bind(this);
  }

  categoryChanged = e => {
    e.preventDefault();
    console.dir(e.target.innerText);
    this.props.fetchPostsByCategory(
      `http://localhost:3001/${e.target.innerText}/posts`
    );
  };

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
          <div className="column">
            Sort by&nbsp;&nbsp;
            <div className="ui buttons">
              <button className="ui button" role="button">
                Date
              </button>
              <div className="or" />
              <button className="ui button" role="button">
                Votes
              </button>
            </div>
          </div>
          <div className="column">
            Category: &nbsp;
            {this.props.categories &&
              this.props.categories.map(cat =>
                <span>
                  <button key={cat.name} onClick={this.categoryChanged}>
                    {cat.name}
                  </button>&nbsp;&nbsp;
                </span>
              )}
          </div>
          <div className="column">
            <div>
              <button className="ui icon right labeled primary button">
                Add New Post <i className="plus icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="ui cards">
          {this.props.items.map(item =>
            <div key={item.id} className="ui fluid card">
              <div className="content">
                <div className="header">
                  {item.title}
                </div>
                <div className="meta">
                  by {item.author},{" "}
                  {moment.unix(item.timestamp).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
              <div className="extra content">
                <i className="thumbs up icon">
                  {item.voteScore}
                </i>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    items: posts.items,
    hasErrored: posts.hasErrored,
    isLoading: posts.isLoading,
    categories: categories.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: url => dispatch(postsFetchData(url)),
    fetchPostsByCategory: url => dispatch(postsByCategoryFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
