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
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // Handle playlist name change
  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.name}/>
        <TrackList onRemove={this.props.onRemove} isRemoval={true}  tracks={this.props.playlist}/>
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;

