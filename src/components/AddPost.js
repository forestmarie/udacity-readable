import React, { Component } from "react";

class AddPost extends Component {
  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>Title</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Author</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Post</label>
          <textarea rows="10" />
        </div>
        <div>
          <button className="ui icon right labeled primary button">
            Add Post<i className="add icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default AddPost;
