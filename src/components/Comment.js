import React, { Component } from "react";

class Comment extends Component {
  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="meta">
            {this.props.author}, {this.props.commentDate}
          </div>
          <div className="description">{this.props.body}</div>
        </div>
        <div className="extra content">
          <a href="edit">edit</a> | <a href="delete">delete</a> | <a href="like">like</a>
          <div className="right floated">
            <i className="thumbs up icon" />438
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
