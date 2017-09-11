import React, { Component } from 'react';
import PostDetail from './components/PostDetail';
import PostsContainer from './components/PostsContainer';
import EditPost from './components/EditPost';
import './App.css';

class App extends Component {
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

export default App;
