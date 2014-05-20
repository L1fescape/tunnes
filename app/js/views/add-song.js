var Marionette = require('backbone.marionette'),
  AddSongTemplate = require('../templates/add-song.handlebars'),
  vent = require('../vent');

module.exports = Marionette.ItemView.extend({
  template: AddSongTemplate,

  events: {
    'click button' : 'addSong',
    'keypress input[type=text]' : 'input'
  },

  addSong : function(e){
    e.preventDefault();
    var song = {
      songurl : this.$el.find('input[name=url]').val()
    };
    vent.trigger('song:add', song);
  },

  clearUrl : function(){
    this.$el.find('input[name=url]').val("");
    this.genres = this.collection.getGenres();
    this.render();
  },

  input : function(e){
    if (e.which === 13){
      this.addSong(e);
    }
  }

});
