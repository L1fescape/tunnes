var Marionette = require('backbone.marionette'),
  Header = require('./views/header'),
  Main = require('./views/main'),
  Songs = require('./collections/songs');

var app = new Marionette.Application({});

app.on('initialize:before', function(){
  var songs = new Songs();
  var header = new Header();
  var main = new Main({ collection: songs });
  
  this.addRegions({
    header: '#header',
    main: '#main'
  });

  this.addInitializer(function () {
    this.header.show(header);
    this.main.show(main);

    songs.fetch();
  });
});

module.exports = app;
