var Backbone = require('backbone'),
  Song = require('../models/song');

module.exports = Backbone.Collection.extend({
  url: '/songs',
  model: Song,

});
