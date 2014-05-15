var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '' : 'home',
    'about' : 'about'
  }
});
