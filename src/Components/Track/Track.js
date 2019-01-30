// Luke Zheng
// lqz.fsu@gmail.com
// January, 2019
// The Jammming Project
// Purpose: Build API interface with Spotify.com, search songs,
//          make playlists, and save playlists to Spotify account.
// As Part of "Build Front-End Web Applications from Scratch" Course 
// at Codecademy
//
import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // + for addable and - for removable
  renderAction() {
    return this.props.isRemoval ? "-" : "+";
  }

  // Add a track
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // Remove a track
  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {
    let addOrRemove;
    if(this.props.isRemoval) {
      addOrRemove = <a onClick={this.removeTrack} className="Track-action"> {this.renderAction()}</a>;
    } else {
      addOrRemove = <a onClick={this.addTrack} className="Track-action"> {this.renderAction()}</a>;
    }

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} {this.props.track.album} </p>
        </div>
        {addOrRemove}
      </div>
    )
  }
}

export default Track;


