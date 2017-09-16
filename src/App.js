import React, { Component } from "react";
import PostDetail from "./components/PostDetail";
import PostsContainer from "./components/PostsContainer";
import EditPost from "./components/EditPost";
import { connect } from "react-redux";
import { categoriesFetchData } from "./actions";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories("http://localhost:3001/categories");
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Recent Posts</h2>
        </div>
        <div className="App-container">
          <PostsContainer />
          <div className="ui divider" />
          <PostDetail />
          <div className="ui divider" />
          <EditPost />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: url => dispatch(categoriesFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
