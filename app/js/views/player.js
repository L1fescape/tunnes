var Marionette = require('backbone.marionette'),
  vent = require('../vent'),
  PlayerModel = require('../models/player'),
  PlayerTemplate = require('../templates/player.handlebars');

module.exports = Marionette.ItemView.extend({
  template: PlayerTemplate,
  className: 'player',

  events: {
    'click .fa-play': 'play',
    'click .fa-pause': 'play'
  },

  initialize: function(){
    vent.on('player:update:playing', this.updatePlaying, this);
    vent.on('player:update:seek', this.updateProgress, this);
  },

  play: function(){
    this.model.play();
  },
  
  updatePlaying: function(playing){
    var icon = this.$el.find('.fa').eq(1);
    console.log(playing, icon);
    if (playing){
      icon.removeClass('fa-play');
      icon.addClass('fa-pause');
    }else{
      icon.removeClass('fa-pause');
      icon.addClass('fa-play');
    }
  }
});
