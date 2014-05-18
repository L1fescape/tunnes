var Marionette = require('backbone.marionette'),
  SongView = require('./song'),
  MainTemplate = require('../templates/main.handlebars');
  
module.exports = Marionette.CompositeView.extend({
  template: MainTemplate,

  itemView: SongView

});
