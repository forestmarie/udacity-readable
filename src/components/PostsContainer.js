import React, { Component } from "react";
import { connect } from "react-redux";
import { postsFetchData } from "../actions/";
import moment from "moment";

class PostsContainer extends Component {
  componentDidMount() {
    this.props.fetchData("http://localhost:3001/posts");
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
            <div>Category: Sports | Politics | News</div>
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

const mapStateToProps = ({ posts }) => {
  return {
    items: posts.items,
    hasErrored: posts.hasErrored,
    isLoading: posts.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(postsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
