import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Recent Posts</h2>
        </div>
        <div className="App-container">
          <div className="ui equal width grid">
            <div className="column">
              Sort by&nbsp;&nbsp;
              <div className="ui buttons">
                    <button className="ui button" role="button">Date</button>
                    <div className="or">
                    </div>
                    <button className="ui button" role="button">Votes</button>
              </div>
            </div>
            <div className="column">
            <div>Category: Sports | Politics | News</div>
            </div>
            <div className="column">
              <div>
                <button className="ui icon right labeled primary button">Add New Post <i className="plus icon"></i></button>
              </div>
            </div>
            </div>
            <br />
            <div className="ui cards">
              <div className="ui fluid card">
                <div className="content">
                  <div className="header">Lebron Scores 58 in OT Loss</div>
                  <div className="meta">by John Doe, August 8th 2017, 9:53 AM</div>
                </div>
                <div className="extra content">
                  <i className="thumbs up icon">485</i>
                </div>
              </div>
              <div className="ui fluid card">
                <div className="content">
                  <div className="header">Drew Brees Shreds Houston Defense</div>
                  <div className="meta">by John Doe, August 8th 2017, 9:53 AM</div>
                </div>
                <div className="extra content">
                  <i className="thumbs up icon">2038</i>
                </div>
            </div>
              <div className="ui fluid card">
                <div className="content">
                  <div className="header">Karem Hunt Goes Nuts in First NFL Start</div>
                  <div className="meta">by John Doe, August 8th 2017, 9:53 AM</div>
                </div>
                <div className="extra content">
                  <i className="thumbs up icon">4</i>
                </div>
            </div>
            </div>
            <div className="ui divider" />
            <div className="ui fluid container">
              <h2 class="ui header">Drew Brees Passes for 600 Yards Against Vikings</h2>
              <div>By Forest Marie August 31st 2017, 9:15 AM <a href="#">edit</a> | <a href="#">delete</a></div>
              <br />
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
                laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt.
                Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius
                laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
            </div>
            <br />
            <div><button className="ui icon right labeled primary button">View Comments (358) <i className="comments icon" /></button></div>
            <div className="ui divider" />
            <div className="ui form">
              <textarea style={{"resize": ";"}} rows="3" placeholder="Add Comment"></textarea>
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
            <div className="ui cards">
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
            </div>
            <div className="ui divider" />
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
        </div>
      </div>
    );
  }
}

export default App;
