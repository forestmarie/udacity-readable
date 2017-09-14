import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postsFetchData } from "../actions/";

class PostsContainer extends Component { 
    componentDidMount() {
      this.props.fetchData("http://59b9daa3a7ba690011e127d4.mockapi.io/api/v1/posts");      
    }

    render() {
      if (this.props.hasErrored) {
        return <p>Sorry!  There was an error</p>;
      }
      if (this.props.isLoading) {
        return <p>Loading...</p>;
      }
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

              {this.props.items.map((item) => (
                <div className="ui fluid card">
                  <div className="content">
                    <div className="header">Lebron Scores 58 in OT Loss</div>
                    <div className="meta">by John Doe, August 8th 2017, 9:53 AM</div>
                  </div>
                  <div className="extra content">
                    <i className="thumbs up icon">485</i>
                  </div>
                </div>
               ))}
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

  const mapStateToProps = ({posts}) => {
    return {
      items: posts.items,
      hasErrored: posts.hasErrored,
      isLoading: posts.isLoading
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchData: (url) => dispatch(postsFetchData(url))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);