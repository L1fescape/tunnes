var Marionette = require('backbone.marionette'),
  SidebarTemplate = require('../templates/sidebar.handlebars'),
  BabySitter = require('backbone.babysitter'),
  AddSongView = require('./add-song'),
  GenreView = require('./genre'),
  PlayerView = require('./player'),
  PlayerModel = require('../models/player'),
  _ = require('lodash');

module.exports = Marionette.ItemView.extend({
  template : SidebarTemplate,

  initialize : function(){
  },

  constructor : function(){
    var player = new PlayerModel({}); 

    this.children = new BabySitter()
    this.children.add(new AddSongView());
    this.children.add(new GenreView());
    this.children.add(new PlayerView({model: player}));
    this.on('show', this._triggerShowChildren);
    this.on('render', this._renderChildren, this);

    Marionette.ItemView.apply(this, arguments);
  },

  _triggerShowChildren : function(){
    this.children.each(function(child){
      Marionette.triggerMethod.call(child, 'show');
    });
  },

  _renderChildren : function(){
    this.children.each(this._renderChildView, this);
  },

  _renderChildView : function(view){
    this.$el.append(view.render().$el);
  }
});
