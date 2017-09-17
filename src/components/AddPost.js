import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { addPostData } from "../actions/";

// TODO - Move this to utils
function _generateUUID() {
  var d = new Date().getTime();
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

class AddPost extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost("http://localhost:3001/posts", {
      id: _generateUUID(),
      title: this.title.value,
      author: this.author.value,
      body: this.body.value
    });
  };

  state = {
    body: ""
  };

  handleChange = event => {
    this.setState({ body: event.target.innerHtml });
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input type="text" placeholder="Title" ref={input => (this.title = input)} />
        </div>

        <div className="field">
          <label>Author</label>
          <input type="text" placeholder="Author" ref={input => (this.author = input)} />
        </div>

        <div className="field">
          <label>Post</label>
          <textarea
            placeholder="Body"
            value={this.state.body}
            onChange={this.handleChange}
            rows="3"
            ref={input => (this.body = input)}
          />
        </div>

        <button className="ui icon right labeled primary button">
          Add Post<i className="add icon" />
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: (url, post) => dispatch(addPostData(url, post))
  };
};

export default connect(null, mapDispatchToProps)(AddPost);
