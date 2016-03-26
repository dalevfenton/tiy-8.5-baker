var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'new-recipe': 'newRecipe',
      'recipe/:id': 'recipe',
      'type/:type': 'type',
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
    type: function(type){
      this.current = 'type';
      this.typeName = type;
    },
    newRecipe: function(){
      this.current = 'new';
    },
    profile: function(){
      this.current = 'profile';
    },
    catch: function(){
      this.current = 'notFound';
    }
});

module.exports = new Router();
