var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'new-recipe': 'newRecipe',
      'recipe/:id': 'recipe',
      'recipe-preview': 'preview',
      'profile': 'profile',
      '*notFound': 'catch'
    },
    index: function(){
      this.current = 'home';
    },
    login: function(){
      this.current = 'login';
    },
    recipe: function(id){
      this.current = 'recipe';
      this.recipeId = id;
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
