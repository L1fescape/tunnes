var Backbone = require('backbone'),
  Marionette = require('backbone.marionette'),
  $ = require('jquery'),
  Router, Controller, Application;

Backbone.$ = Marionette.$ = $;

Application = require('./app');
Controller = require('./controller');
Router = require('./router');

$(function(){ 
  var app = Application;
  app.start();

  new Router({ controller: Controller });
  Backbone.history.start();
});
