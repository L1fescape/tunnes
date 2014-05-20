var Marionette = require('backbone.marionette'),
  SongView = require('./song'),
  vent = require('../vent'),
  BodyTemplate = require('../templates/body.handlebars');
  
module.exports = Marionette.CompositeView.extend({
  template: BodyTemplate,
  itemView: SongView,

  initialize: function(){
    vent.on('filter:genre', this.filterGenre, this);
    vent.on('sort:time', this.sortTime, this);
    vent.on('song:add', this.addSong, this);
  },

  addSong: function(song){
    this.collection.create(song, { wait: true, error: _.bind(this.onSongAddError, this) });
  },

  filterGenre: function(genre){
    this.collection.each(function(item, index){
      if (!genre){ 
        item.set('shown', true);
      } else if (!item.get('genre')){
        item.set('shown', false);
      } else if (item.get('genre').toLowerCase() === genre.toLowerCase()){
        item.set('shown', true);
      }
      else{
        item.set('shown', false);
      }
    });
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

  sortTime: function(){
    this.collection.sortEarliest = !this.collection.sortEarliest;
    var sortOrder = this.collection.sortEarliest;
    this.collection.comparator = function(song) {
        return sortOrder ? -song.get("timestamp") : song.get("timestamp"); // Note the minus!
    };
    this.collection.sort();
    this.collection.trigger('reset');
  }

});
