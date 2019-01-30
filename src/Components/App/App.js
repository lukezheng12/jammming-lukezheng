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
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [],
                   playlistName: "New Playlist",
                   playlistTracks: []
                 };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Add a track to the tracklist
  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const newList = this.state.playlistTracks;
    newList.push(track);
    this.setState({playlistTracks: newList});
  }

  // Remove a track from the tracklist
  removeTrack(trackToBeRemoved) {
    const newList = this.state.playlistTracks.filter(track => track.id !== trackToBeRemoved.id);
    this.setState({playlistTracks: newList});

  }

  // Update the playlist name
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  // Save playlist to Spotify
  savePlaylist(){
    const trackURIs = [];
    this.state.playlistTracks.map(track => trackURIs.push(track.uri));
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist',
                   playlistTracks: []});
  }

  // Search songs in Spotify
  search(term) {
    Spotify.search(term).then(playlistIn => {
      this.setState({searchResults: playlistIn});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} 
                      name={this.state.playlistName} 
                      onNameChange={this.updatePlaylistName} 
                      onRemove={this.removeTrack} 
                      playlist={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
