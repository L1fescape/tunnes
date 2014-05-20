var Backbone = require('backbone'),
  Song = require('../models/song'),
  _ = require('lodash');

module.exports = Backbone.Collection.extend({
  url: '/api/v1/songs',
  model: Song
});
