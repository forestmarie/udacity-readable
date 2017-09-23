import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Post from "./components/Post";
import PostsContainer from "./components/PostsContainer";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import { fetchCategories } from "./actions/categories";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Recent Posts</h2>
        </div>
        <div className="App-container">
          <Route exact path="/(|posts)/" component={PostsContainer} />
          <Route exact path="/posts/add" component={AddPost} />
          <Route exact path="/posts/:id/edit" component={EditPost} />
          <Route exact path="/posts/details/:id" component={Post} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
