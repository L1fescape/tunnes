var Backbone = require('backbone'),
  vent = require('../vent');

module.exports = Backbone.Model.extend({
  songurl : "",
  genre : "",
  shown : true,
  playing : false,

  initialize: function(){
    vent.on('stop', this.stop, this);
  },

  stop: function(){
    this.set('playing', false);
  },

  destroy: function(){
    this.stop();
  }
});
