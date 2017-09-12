import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            </div>
        </div>
      );
    }
  }

  function mapStateToProps({ /*props you leverage*/ }) {
    return [];
  }
  
  export default connect(mapStateToProps)(PostsContainer);