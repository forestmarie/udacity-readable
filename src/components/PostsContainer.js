import React, { Component } from 'react';

class PostsContainer extends Component { 
    render() {
      return (
        <div>
            <div className="ui equal width grid">
              <div className="column">
                Sort by&nbsp;&nbsp;
                <div className="ui buttons">
                      <button className="ui button" role="button">Date</button>
                      <div className="or" />
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

  export default PostsContainer;