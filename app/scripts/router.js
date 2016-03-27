var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'new-recipe': 'newRecipe',
      'recipe/:id': 'recipe',
      'recipe-edit/:id': 'recipeEdit',
      'recipe-delete/:id': 'recipeDelete',
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
    recipeEdit: function(id){
      this.current = 'recipeEdit';
      this.recipeId = id;
    },
    recipeDelete: function(id){
      this.current = 'recipeDelete';
      this.recipeId = id;
    },
    newRecipe: function(){
      this.current = 'new';
      this.recipeId = null;
    },
    type: function(type){
      this.current = 'type';
      this.typeName = type;
    },
    profile: function(){
      this.current = 'profile';
    },
    catch: function(){
      this.current = 'notFound';
    }
});

module.exports = new Router();
