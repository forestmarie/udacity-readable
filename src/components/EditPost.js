import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { editPost, fetchPostDetails } from "../actions/posts";

class EditPost extends Component {
  state = {
    body: "",
    title: ""
  };

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id).then(post => {
      this.setState({
        body: post.body,
        title: post.title
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const post = {
      id: this.props.match.params.id,
      title: this.title.value,
      body: this.body.value
    };

    this.props.editPost(post);
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.innerHtml });
  };

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            ref={input => (this.title = input)}
          />
        </div>

        <div className="field">
          <label>Post</label>
          <textarea
            placeholder="Body"
            value={this.state.body}
            onChange={this.handleBodyChange}
            rows="3"
            ref={input => (this.body = input)}
          />
        </div>

        <Button primary content="Save Post" icon="save" labelPosition="right" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch(editPost(post)),
    fetchPost: postId => dispatch(fetchPostDetails(postId))
  };
};

export default connect(null, mapDispatchToProps)(EditPost);
