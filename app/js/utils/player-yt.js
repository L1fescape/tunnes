var vent = require('../vent'),
  _ = require('lodash');

module.exports = {
  initialized: false,
  player: null,

  play: function(playing){
    this.player.playVideo();
  },

  pause: function(){
    this.stop();
  },

  stop: function(){
    if (this.initialized){
      this.player.stopVideo();
    }
  },

  setup: function(song){
    this.player = new YT.Player('yt-widget', {
      height: '390',
      width: '640',
      videoid: null,
      playerVars: { 'autoplay': 0, 'controls': 0 },
      events: {
        'onReady': _.bind(onPlayerReady, this),
        'onStateChange': _.bind(onPlayerStateChange, this)
      }
    });
    function onPlayerReady(event) {
      this.initialized = true;
      vent.trigger('play', song);
    }
    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.UNSTARTED){
      }
      else if (event.data === YT.PlayerState.BUFFERING){
      }
      else if (event.data === YT.PlayerState.PLAYING){
        vent.trigger('player:update:playing', true);
        song.set('playing', true);
      }
      else if (event.data === YT.PlayerState.PAUSED){
        vent.trigger('player:update:playing', false);
        song.set('playing', false);
      }

      console.log(event);
    }
  },

  loadSong: function(song){
    console.log('loadSong');
    vent.trigger('stop');
    this.player.loadVideoById(song.get('songid'));
    /* vent.trigger('play', song); */
  }
};
