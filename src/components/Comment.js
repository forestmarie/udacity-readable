import React, { Component } from 'react';

class Comment extends Component {
    render() {
      return (
        <div className="ui card">
          <div className="content">
            <div className="meta">Joe, August 31st 2017, 9:53 AM</div>
            <div className="description">Hey man great post!</div>
          </div>
          <div className="extra content">
            <a href="#">edit</a> | <a href="#">delete</a> | <a href="#">like</a>
            <div className="right floated"><i className="thumbs up icon"></i>438</div>
          </div>
        </div>
      );
    }
  }

  export default Comment;