var Backbone = require('backbone'),
  Song = require('../models/song'),
  _ = require('lodash');

module.exports = Backbone.Collection.extend({
  url: '/api/v1/songs',
  model: Song,

  getGenres : function(){
    var genre;
    return _.reduce(this.models, function(genres, model){ 
      genre = model.get('genre');
      if (genres.indexOf(genre) === -1){
        genres.push(genre);
      }
      return genres;
    }, []);
  }

});
