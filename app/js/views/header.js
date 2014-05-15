var Marionette = require('backbone.marionette'),
  HeaderTemplate = require('../templates/header.handlebars');
  
module.exports = Marionette.ItemView.extend({
  template : HeaderTemplate
});
