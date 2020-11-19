import('../vendor/spotify-player')
import message from "./message.coffee"

window.onSpotifyWebPlaybackSDKReady = () => {
    let player;

    function init () {
        if (player) return;
        
        return new Promise((resolve, reject) => {
            player = new Spotify.Player({
                name: 'Dictionariez Spotify',
                getOAuthToken: cb => { cb(token); }
            });
        
            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });
        
            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });
        
            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
        
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
        
            // Connect to the player!
            player.connect();
        });
    }

    message.on('music togglePlay', () => {
        player && player.togglePlay().then(() => {
            console.log('Toggled playback!');
        });
    });

    message.on('spotify authorized', ( { token }) => {
        init(token);
    });

    message.on('spotify init', init);
  };