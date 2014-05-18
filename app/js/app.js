var Marionette = require('backbone.marionette'),
  Sidebar = require('./views/sidebar'),
  Body = require('./views/body'),
  Songs = require('./collections/songs'),
  _ = require('lodash');

var app = new Marionette.Application({});

app.on('initialize:before', function(){
  var songs = new Songs();
  var sidebar = new Sidebar({ collection: songs });
  var body = new Body({ collection: songs });
  
  this.addRegions({
    sidebar: '#sidebar',
    body: '#body'
  });

  this.addInitializer(function () {
    this.sidebar.show(sidebar);
    this.body.show(body);

    songs.fetch();
  });

  app.vent.on('filter:genre', function(genre) {
    body.filterGenre(genre);
  });
});

module.exports = app;
