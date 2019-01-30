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
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    const trackInfo = this.props.tracks.map((track) => {
      return ( 
        <div key={track.id}  className="TrackList">
          <Track onRemove={this.props.onRemove} 
                 onAdd={this.props.onAdd} 
                 isRemoval={this.props.isRemoval} 
                 track={track} />
        </div>
      )});


    return trackInfo;
    
  }
}

export default TrackList;


