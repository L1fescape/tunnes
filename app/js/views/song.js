var Marionette = require('backbone.marionette'),
  SoundCloudTemplate = require('../templates/songs/soundcloud.handlebars'),
  YouTubeTemplate = require('../templates/songs/youtube.handlebars');

module.exports = Marionette.CompositeView.extend({
  tagName: 'div',
  className: 'song',

  getTemplate: function(){
    switch (this.model.get('site')) {
      case "soundcloud":
        return SoundCloudTemplate;
      case "youtube":
        return YouTubeTemplate;
      default:
        return '';
    }
  },


  initialize: function(){
    this.listenTo(this.model, 'change', this.render, this);
  }
});

