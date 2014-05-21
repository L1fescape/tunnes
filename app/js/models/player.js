var Backbone = require('backbone'),
  SCPlayer = require('../utils/player-sc'),
  YTPlayer = require('../utils/player-yt'),
  vent = require('../vent');

module.exports = Backbone.Model.extend({
  curSong: null,

  players: {
    sc : SCPlayer,
    yt : YTPlayer
  },

  initialize: function(){
    vent.on('play', this.play, this);
    vent.on('stop', this.stop, this);
    vent.on('player:update:playing', this.updatePlaying, this);
  },

  // todo: refactor this. kinda messy. youtube and soundcloud's widget apis are
  // different enough that I came nothing short of losing my mind trying to
  // write this. it works, but I'll try to make it better when I have more 
  // patience.
  play: function(song){
    var player;

    if (!song){
      if (!this.curSong){
        return;
      }
      song = this.curSong;
    }

    if (song.get('site') === 'soundcloud'){
      player = this.players.sc;
    }
    else {
      player = this.players.yt;
    }

    if (!player.initialized){
      player.setup(song);
      return;
    }

    if (!this.curSong || this.curSong != song){
      vent.trigger('stop');
      this.curSong = song;
      player.loadSong(song);
      return;
    }

    var playing = this.curSong.get('playing');
    if (!playing){
      player.play();
    }
    else{
      player.pause();
    }
    vent.trigger('player:update:playing', !playing, this);
  },

  stop: function(){
    this.players.sc.stop();
    this.players.yt.stop();
  },

  updatePlaying: function(playing){
    this.curSong.set('playing', playing);
  }
});

