define(['backbone', 'services', 'events', 'tpl!templates/header.tpl'], function(Backbone, Services, Events, tpl) {
  return Backbone.View.extend({
    el: $("#hPageHeader"),

    events: {
      "click .fa-plus": "toggleAdd" 
    },

    initialize: function() {
      this.render();
      this.on('hide', this.hide, this);
      this.on('show', this.show, this);
    },

    render: function() {
      this.$el.html(tpl({}));
    },

    toggleAdd: function() {
      Events.trigger("toggleAdd");
    },

    show: function() {
      if (!$(this.el).is(":visible")) {
        this.render();
        $(this.el).show();
      }
    }
  });
});
