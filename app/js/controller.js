var vent = require('./vent');

module.exports = {
  home: function() {
    vent.trigger('filter:genre');
  },
  genre: function(genre){
    vent.trigger('filter:genre', genre);
  },
  playlist: function(playlist){
    vent.trigger('filter:playlist', playlist);
  }
};
