var app = require('./app');

module.exports = {
  home: function() {
    app.vent.trigger('filter:genre');
  },
  about: function(){
  },
  genre: function(genre){
    app.vent.trigger('filter:genre', genre);
  }
};
