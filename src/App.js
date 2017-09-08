import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Recent Posts</h2>
        </div>
        <div>Sort By: Vote | Date</div>
        <div>Category: Sports | Politics | News</div>
        <div>
          <button className="ui primary icon button">Add New Post <i className="plus icon"></i></button>
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
      </div>
    );
  }
}

export default App;
