define(['backbone', 'services', 'events', 'views/header', 'views/home'],
function(Backbone, Services, Events, HeaderView, HomeView) {
  return Backbone.Router.extend({
    prevRoute: "",

    routes: {
      '' : 'home',
      'about' : 'about'
    },

    initialize: function() {
      // keep track of the last route visited (useful to prevent redrawing views)
      Backbone.history.on('route', function() { this.prevRoute = window.location.hash; }, this);
      // init the header and the footer
      this.vPgHeader = new HeaderView();
    },

    home: function() {
      // tell the previous view to close itself
      Events.trigger("views:closePage");
      // draw the home view
      this.vPgBody = new HomeView();
    },
    
    routeToHome: function() {
      this.navigate('#/', {
        trigger: true
      });
    },
  });
});
