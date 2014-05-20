var Marionette = require('backbone.marionette'),
  app = require('../app'),
  GenreCollection = require('../collections/genre'),
  GenreTemplate = require('../templates/genre.handlebars'),
  _ = require('lodash');

module.exports = Marionette.ItemView.extend({
  template: GenreTemplate,
  genres: [],

  initialize: function(){
    this.collection = new GenreCollection();
    this.collection.fetch();

    this.collection.on('add', this.render, this);
    this.on('before:render', this.beforeRender, this);
  },

  beforeRender: function(){
    this.genres = [];
    this.collection.each(_.bind(function(genre){
      if (genre.get('name')){
        this.genres.push(genre.get('name'));
      }
    }, this));
  },

  serializeData: function(){
    var data = {};
    data.genres = this.genres;

    return data;
  } 

});
