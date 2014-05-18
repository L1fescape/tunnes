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

  showHide: function(){
    if (this.model.get('shown')){
      this.$el.removeClass('hide');
    }
    else {
      this.$el.addClass('hide');
    }
  },

  initialize: function(){
    this.listenTo(this.model, 'change', this.showHide, this);
  }
});

