var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'new-recipe': 'newRecipe',
      'recipe-preview': 'preview',
      'profile': 'profile',
      '*notFound': 'catch'
    },
    index: function(){
      this.current = 'home';
    },
    newRecipe: function(){
      this.current = 'new';
    },
    preview: function(){
      this.current = 'preview';
    },
    profile: function(){
      this.current = 'profile';
    },
    catch: function(){
      this.current = 'notFound';
    }
});

module.exports = new Router();
