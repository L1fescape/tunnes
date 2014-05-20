var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '' : 'home',
    'genres' : 'genre',
    'genres/:genre' : 'genre',
    'playlists' : 'playlist',
    'playlists/:playlist' : 'playlist'
  }
});
