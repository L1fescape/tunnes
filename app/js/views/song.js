var Marionette = require('backbone.marionette'),
  vent = require('../vent'),
  SongTemplate = require('../templates/song.handlebars'),
  _ = require('lodash');

module.exports = Marionette.CompositeView.extend({
  tagName: 'div',
  className: 'song',
  template: SongTemplate,

  events : {
    "click .fa" : "togglePlaying"
  },
  
  initialize: function(){
    this.listenTo(this.model, 'change:shown', this.showHide, this);
    this.listenTo(this.model, 'change:playing', this.updateState, this);
  },

  togglePlaying : function(){
    vent.trigger('play', this.model);
  },

  updateState : function(){
    var playing = this.model.get('playing');
    if (playing){
      this.$el.find('.fa').removeClass('fa-play-circle');
      this.$el.find('.fa').addClass('fa-pause');
    }else{
      this.$el.find('.fa').removeClass('fa-pause');
      this.$el.find('.fa').addClass('fa-play-circle');
    }
  },

  showHide: function(){
    if (this.model.get('shown')){
      this.$el.removeClass('hide');
    }
    else {
      this.$el.addClass('hide');
    }
  }
});

