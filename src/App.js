import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Post from "./features/posts/Post";
import PostsContainer from "./features/posts/PostsContainer";
import AddPost from "./features/posts/AddPost";
import EditPost from "./features/posts/EditPost";
import Navbar from "./features/layout/Navbar";
import { fetchCategories } from "./features/categories/CategoryActions";
import "./App.css";

const Error404 = () => {
  return <div>The requested item does not exist</div>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleMenuChange = menuItem => {
    if (menuItem === "posts") {
      this.props.history.push("/posts");
    }
    this.setState({ activeItem: menuItem });
  };

  render() {
    return (
      <div>
        <Navbar activeItem="posts" onMenuChanged={this.handleMenuChange} />
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
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchCategories })(App));
