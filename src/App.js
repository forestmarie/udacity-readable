import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Post from "./features/posts/Post";
import PostsContainer from "./features/posts/PostsContainer";
import AddPost from "./features/posts/AddPost";
import EditPost from "./features/posts/EditPost";
import Navbar from "./features/layout/Navbar";
import Footer from "./features/layout/Footer";
import { fetchCategories } from "./features/categories/CategoryActions";
import "./App.css";

const Error404 = () => {
  return <div>The requested item does not exist</div>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="App-container">
          <Route exact path="/posts" component={PostsContainer} />
          <Switch>
            <Route exact path="/posts/add" component={AddPost} />
            <Route exact path="/posts/:category" component={PostsContainer} />
          </Switch>
          <Route exact path="/posts/:id/edit" component={EditPost} />
          <Route exact path="/posts/details/:id" component={Post} />
          <Route exact path="/404" component={Error404} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchCategories })(App));
