import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PostDetail from "./components/PostDetail";
import PostsContainer from "./components/PostsContainer";
import EditPost from "./components/EditPost";
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
          <Route exact path="/(|posts)/" component={PostsContainer} />
          <Route exact path="/posts/:id" component={PostDetail} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: url => dispatch(categoriesFetchData(url))
  };
};

export default connect(null, mapDispatchToProps)(App);
