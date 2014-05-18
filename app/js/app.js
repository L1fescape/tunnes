var Marionette = require('backbone.marionette'),
  Sidebar = require('./views/sidebar'),
  Main = require('./views/main'),
  Songs = require('./collections/songs'),
  _ = require('lodash');

var app = new Marionette.Application({});

app.on('initialize:before', function(){
  var songs = new Songs();
  var sidebar = new Sidebar({ collection: songs });
  var main = new Main({ collection: songs });
  
  this.addRegions({
    sidebar: '#sidebar',
    main: '#main'
  });

  this.addInitializer(function () {
    this.sidebar.show(sidebar);
    this.main.show(main);

    songs.fetch();
  });
});

module.exports = app;
