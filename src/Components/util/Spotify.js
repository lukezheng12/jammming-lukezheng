// Luke Zheng
// lqz.fsu@gmail.com
// January, 2019
// The Jammming Project
// Purpose: Build API interface with Spotify.com, search songs,
//          make playlists, and save playlists to Spotify account.
// As Part of "Build Front-End Web Applications from Scratch" Course 
// at Codecademy
//
let accessToken = '';
const clientId = 'bf36988ddfb54a0b9795ff8d5df0cad9';
const redirectUri = 'http://jammming-lukez.surge.sh'
let expireIn;

// Module for Spotify API
const Spotify = {

  // Get access token
  getAccessToken(){

    const accessToken1 = window.location.href.match(/access_token=([^&]*)/);
    if(accessToken1) {
      accessToken = accessToken1[1];
    } else {
      window.location="https://accounts.spotify.com/authorize?client_id="+clientId+"&response_type=token&scope=playlist-modify-private&redirect_uri="+redirectUri;


      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expireIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expireIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }
  },

  // Get user ID
  getUserId(nameIn, uri){
  
    const myHeader = {Authorization: `Bearer ${accessToken}`}
    const urlToFetch = 'https://api.spotify.com/v1/me';
    const resUserId = fetch(urlToFetch,
      {
        headers: myHeader
      }
    ).then (response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');

    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      this.createNewPlaylist(jsonResponse, nameIn, uri);
      return jsonResponse;
    });

  },

  // Create a new playlist
  createNewPlaylist(resUserId, nameIn, uri){
    const urlToFetch = `https://api.spotify.com/v1/users/${resUserId.id}/playlists`;
    const myHeader = {Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'};
    const myBody = {
         name: nameIn,
         description: "List from Jammming",
         public: false
       };

    const resPlaylist = fetch(urlToFetch,
      {headers: myHeader,
       method: 'POST',
       body: JSON.stringify(myBody)
      }
     ).then(response => {return response.json();})
     .then(jsonResponse => {
      this.addTracksToPlaylist(jsonResponse, uri);
      return jsonResponse.id;
    });
  },

  // Add tracks to playlist
  addTracksToPlaylist(resPlaylist, uri) {
    const urlToFetch = `https://api.spotify.com/v1/playlists/${resPlaylist.id}/tracks`;
    const myHeader = {Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'};
    const myBody = {
         uris: uri
       };
    return fetch(urlToFetch,
      {headers: myHeader,
       method: 'POST',
       body: JSON.stringify(myBody)
      }
     ).then(response => {return response.json();})
     .then(jsonResponse => {
      return jsonResponse;
    });

  },

  // Save playlist to Spotify
  savePlaylist(playlistNameIn, tracksUris){
    if( !playlistNameIn || !tracksUris) return;

    this.getUserId(playlistNameIn, tracksUris); 

    return;
  },

  // Search songs in Spotify
  search(term){
    this.getAccessToken();

    const urlToFetch = "https://api.spotify.com/v1/search?type=track&q="+term;

    return fetch(urlToFetch,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }
    ).then (response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');

    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
    if(jsonResponse.tracks) {
      const tracks = jsonResponse.tracks.items;
      return tracks.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      });
    }
  });
  }

}

export default Spotify;
