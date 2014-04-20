define(['backbone', 'services', 'events', 'tpl!templates/home.tpl'], 
function(Backbone, Services, Events, tpl) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
      "click input[type='submit']": "addSong",
      "keydown input": "checkEnter"
    },

    initialize: function() {
      this.render();
      this.getSongs();
      
      Events.on('views:closePage', this.close, this);
      Events.on('songs:get', this.render, this);
      Events.on('songs:add', this.getSongs, this);
      Events.on('toggleAdd', this.toggleAdd, this);
    },

    getSongs: function() {
      Services.getSongs();
    },

    render: function(songs) {
      songs = songs || [];
      this.$el.html(tpl({songs:songs}));
    },

    addSong: function() {
      var url = $("#url").val();
      Services.addSong(url);
    },

    checkEnter: function(e) {
      if (e.which == 13)
        this.addSong();
    },

    toggleAdd: function() {
      if (!this.$el.find(".add").is(":visible"))
        this.showAdd();
      else
        this.hideAdd();
    },

    showAdd: function() {
      this.$el.find(".add").show();
    },

    hideAdd: function() {
      this.$el.find(".add").hide();
    },

    close: function() {
      Events.off();
      this.unbind();
      this.undelegateEvents();
      this.$el.html("");
    }
  });
});
