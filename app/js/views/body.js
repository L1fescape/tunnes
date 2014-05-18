var Marionette = require('backbone.marionette'),
  SongView = require('./song'),
  BodyTemplate = require('../templates/body.handlebars');
  
module.exports = Marionette.CompositeView.extend({
  template: BodyTemplate,

  itemView: SongView,

  filterGenre: function(genre){
    this.collection.each(function(item, index){
      if (!genre || item.get('genre').toLowerCase() === genre.toLowerCase()){
        item.set('shown', true);
      }
      else{
        item.set('shown', false);
      }
    });
  },

});
