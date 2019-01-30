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
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList onAdd={this.props.onAdd} isRemoval={false} tracks={this.props.searchResults} />
      </div>
    )
  }
}

export default SearchResults;

