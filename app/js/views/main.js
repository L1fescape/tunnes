var Marionette = require('backbone.marionette'),
  SongView = require('./song'),
  MainTemplate = require('../templates/main.handlebars'),
  _ = require('lodash');
  
module.exports = Marionette.CompositeView.extend({
  template: MainTemplate,

  itemView: SongView,

  events: {
    'click button' : 'addSong',
    'keypress input[type=text]' : 'input'
  },

  initialize : function(){
    this.collection.bind('add', this.onSongAdded, this);
  },

  addSong : function(e){
    e.preventDefault();
    var song = {
      songurl : this.$el.find('input[name=url]').val()
    };
    this.collection.create(song, { wait: true, error: _.bind(this.onSongAddError, this) });
  },

  onSongAdded : function(){
    this.$el.find('input[name=url]').val("");
  },

  onSongAddError : function(model, response){
    var error = response.responseJSON && 
      response.responseJSON.error ? 
      response.responseJSON.error : 
      "Oh no! Something bad happened.";

    this.$el.find('.notifications').html('<div class="alert alert-danger">'+error+'</div>');
    clearTimeout(this.timeout);
    this.timeout = setTimeout(_.bind(function(){
      this.$el.find('.notifications').html('');
    }, this), 2000);
  },

  input : function(e){
    if (e.which === 13){
      this.addSong(e);
    }
  }

});
