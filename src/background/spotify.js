import('../vendor/spotify-player')
import message from "./message.coffee"
import $ from "jquery"

window.onSpotifyWebPlaybackSDKReady = () => {
    let player;

    function init (spotifyAccessToken) {
        if (player) return player.connect();
        
        player = new Spotify.Player({
            name: 'Dictionariez Spotify',
            getOAuthToken: cb => { 
                if(spotifyAccessToken)
                    cb(spotifyAccessToken); 
                else if (spotifyRefreshToken)
                    refreshToken().then(cb);
                else 
                    cb();
            }
        });

        window.player = player;

        return new Promise((resolve, reject) => {
            // Error handling
            player.addListener('initialization_error', ({ message }) => { 
                reject({ message, type: 'initialization_error' });
            });
            player.addListener('authentication_error', ({ message }) => {
                player.isReady = false;
                reject({ message, type: 'authentication_error' });
            });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });
        
            // Playback status updates
            player.addListener('player_state_changed', async state => { 
                console.log('Spotify player state changed: ', state); 
                player.currentState = state || null;

                if (player.tabId) {
                    chrome.tabs.sendMessage(player.tabId, {
                        type: 'spotify state changed',
                        state: await getCurrentState()
                    });
                }
            });
        
            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                player.isReady = true;
                player.deviceId = device_id;
                player.currentState = undefined;

                resolve({ready: true});
            });
        
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                player.isReady = false;
            });
        
            // Connect to the player!
            player.connect();
        });
    }

    function refreshToken() {
        const uri = 'https://accounts.spotify.com/api/token';
        return $.post(uri, {
            grant_type: 'refresh_token',
            refresh_token: spotifyRefreshToken,
            client_id: spotifyClientId,
        }).then(({ refresh_token, access_token }) => {
            spotifyRefreshToken = refresh_token;
            localStorage.setItem("spotify_refresh_token", refresh_token);

            localStorage.setItem("spotify_access_token", access_token);

            return access_token;
        }).catch(err => {
            console.error('spotify refresh token failed: ', err);
            localStorage.removeItem("spotify_refresh_token");
            spotifyRefreshToken = null;
        });
    }
    function request(uri, data, type="GET") {
        const headers = {
            "authorization": `Bearer ${localStorage.getItem('spotify_access_token')}`
        };
        if (type != 'GET') {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }

        let body;
        if (data) {
            body = new URLSearchParams(Object.keys(data).map(k => {
                return [k, data[k]];
            }));
        }

        return fetch(uri, {
            method: type,
            headers,
            body
        })
        .then(function (response) { 
            if (response.ok)
                return response.json()
                .then(res => {
                    if (res.error) {
                        console.error("Spotify api failed: ", res.error, uri);
                        return; 
                    }
                    return res;
                })
                .catch(() => {}); 
        })
    }
    function getCurrentPlaying() {
        const uri = "https://api.spotify.com/v1/me/player/currently-playing";
        return request(uri)
        .then(res => {
            if (res) {
                if (res.error) {
                    console.error("Spotify get current playing track failed: ", res.error);
                    return;
                }
                let {
                    is_playing,
                    item, 
                    currently_playing_type,
                    actions: {
                        disallows,
                    }
                } = res; 
                return {
                    paused: !is_playing,
                    current_track: item, 
                    currently_playing_type,
                    disallows
                }
            }
        });
    }
    function getLastPlayed() {
        return request("https://api.spotify.com/v1/me/player/recently-played?limit=1")
        .then(res => {
            if (res && res.items.length) {
                let { track, context } = res.items[0];

                if (!context) context = track.album;

                player.lastPlayed = { track, context };
                return {track, context}; 
            } else {
                player.lastPlayed = null;
            }
        })
    }
    function playLastPlayed(uris, contextUri) {
        const url = "https://api.spotify.com/v1/me/player/play?device_id="+player.deviceId;
        return request(url, {
            context_uri: contextUri,
            // uris
        }, 'PUT');
    }

    async function getCurrentState() {
        let state = player.currentState;
        let ready = player.isReady;

        if (player.currentState === undefined) {
            state = await player.getCurrentState();
            player.currentState = state || null;
        }
            
        if (!state) {
            console.warn('Spotify user current state is empty');
            return { ready };
        }

        let {
            disallows,
            paused,
        } = state;

        let {
            current_track,
            previous_tracks: [previous_track],
            next_tracks: [next_track]
        } = state.track_window || {};
        
        return {
            ready, 

            disallows,
            paused,

            current_track,
            previous_track,
            next_track
        };
    }

    message.on('spotify action', ({ action }) => {
        if (player) { 
            return player[action]();
        }
    });

    message.on('spotify authorized', ( { refresh_token, access_token, client_id }) => {
        spotifyClientId = client_id;
        localStorage.setItem("spotify_client_id", client_id);

        spotifyRefreshToken = refresh_token;
        localStorage.setItem("spotify_refresh_token", refresh_token);

        localStorage.setItem("spotify_access_token", access_token);
        return init(access_token);
    });

    message.on('spotify current state', (request, sender) => {
        if (player && player.isReady) {
            player.tabId = sender.tab.id;
            return getCurrentState();
        }
    });

    let spotifyRefreshToken = localStorage.getItem("spotify_refresh_token");
    let spotifyClientId = localStorage.getItem("spotify_client_id");
    
    if(spotifyRefreshToken && spotifyClientId)
        init();
  };