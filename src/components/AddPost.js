import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

class AddPost extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.dir(this.body);
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

export default AddPost;
