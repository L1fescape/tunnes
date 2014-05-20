var app = require('./app');

module.exports = {
  home: function() {
    app.vent.trigger('filter:genre');
  },
  genre: function(genre){
    app.vent.trigger('filter:genre', genre);
  },
  playlist: function(playlist){
    app.vent.trigger('filter:playlist', playlist);
  }
};
