import React, { Component } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import toastr from "toastr";
import { addPostData } from "../actions/posts";
import generateUUID from "../utils";

class AddPost extends Component {
  state = {
    body: "",
    category: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const post = {
      id: generateUUID(),
      title: this.title.value,
      author: this.author.value,
      body: this.body.value,
      category: this.state.category
    };

    this.props.addPost("http://localhost:3001/posts", post).then(() => {
      toastr.info("Post was added successfully!");
      document.getElementById("addForm").reset();
    });
  };

  handleCategoryChange = (e, { value }) => this.setState({ category: value });

  handleChange = event => {
    this.setState({ body: event.target.innerHtml });
  };

  render() {
    return (
      <form id="addForm" className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input type="text" placeholder="Title" ref={input => (this.title = input)} />
        </div>

        <div className="field">
          <label>Author</label>
          <input type="text" placeholder="Author" ref={input => (this.author = input)} />
        </div>

        <div className="field">
          <label>Category</label>
          <Dropdown
            compact
            placeholder="Select category"
            value={this.state.category}
            options={this.props.categoryOptions}
            onChange={this.handleCategoryChange}
          />
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

const mapStateToProps = ({ categories }) => {
  let options = categories.items.map(x => {
    return {
      key: x.path,
      text: x.name,
      value: x.path
    };
  });

  return {
    categoryOptions: options
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: (url, post) => dispatch(addPostData(url, post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
