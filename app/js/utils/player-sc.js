var vent = require('../vent'),
  _ = require('lodash');

module.exports = {
  initialized: false,
  player: null,

  play: function(){
    this.player.play();
  },

  pause: function(){
    this.player.pause();
  },

  stop: function(){
    if (this.initialized){
      this.player.pause();
    }
  },

  setup: function(song){
    vent.on('stop', this.stop, this);
    
    var widgetiframe = document.getElementById('sc-widget')
    this.player = SC.Widget(widgetiframe);

    this.player.bind(SC.Widget.Events.READY, _.bind(function() {
      this.initialized = true;
      vent.trigger('play', song);
    }, this));

    this.player.bind(SC.Widget.Events.PLAY, function(){
      vent.trigger('player:update:playing', true);
    });

    this.player.bind(SC.Widget.Events.PAUSE, function(){
      vent.trigger('player:update:playing', false);
    });
  },

  loadSong: function(song){
    vent.trigger('player:update:playing', false);
    this.player.load(song.get('songurl'), {
      show_artwork: false,
      callback: _.bind(function(){
        this.play();
      }, this)
    });
  }
};


