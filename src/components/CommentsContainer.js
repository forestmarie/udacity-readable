import React, { Component } from 'react';
import Comment from './Comment';

class CommentsContainer extends Component {
    render() {
      return (
        <div>
          <div className="ui form">
            <textarea rows="3" placeholder="Add Comment"></textarea>
          </div>
          <br />
          <div>Sort by&nbsp;&nbsp;
            <div className="ui buttons">
              <button className="ui button" role="button">Date</button>
              <div className="or">
              </div>
              <button className="ui button" role="button">Votes</button>
            </div>
          </div>
          <br />
          <div className="ui cards">
            <Comment />
          </div>
        </div>
      );
    }
  }

  export default CommentsContainer;