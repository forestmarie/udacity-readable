import React, { Component } from 'react';

class EditPost extends Component {
    render() {
      return (
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input type="text" value="Drew Brees Passes for 600 Yards Against Vikings"></input>
          </div>
          <div className="field">
            <label>Author</label>
            <input type="text" value="Forest Marie" />
          </div>
          <div className="field">
            <label>Post</label>
            <textarea style={{"resize": ";"}} rows="10">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
              pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt.
              Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
              laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
            </textarea>
          </div>
          <div><button className="ui icon right labeled primary button">Save Post<i className="save icon" /></button></div>
        </div>
      );
    }
  }

  export default EditPost;