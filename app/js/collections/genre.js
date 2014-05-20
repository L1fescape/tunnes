var Backbone = require('backbone'),
  Genre = require('../models/genre'),
  _ = require('lodash');

module.exports = Backbone.Collection.extend({
  url: '/api/v1/genres',
  model: Genre,

  parse: function(response){
    var genres = [];
    console.log(response);
    for (var i = 0; i < response.length; i++){
      genres.push({name: response[i]});
    }
    return genres;
  }
});
