var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'new-recipe': 'newRecipe',
      'recipe/:id': 'recipe',
      'recipe/:id/edit': 'recipeEdit',
      'recipe-edit/:id': 'recipeEdit',
      'recipe/:id/delete': 'recipeDelete',
      'type/:type': 'type',
      'profile': 'profile',
      '*notFound': 'catch'
    },
    index: function(){
      //setup done
      this.current = 'home';
    },
    recipe: function(id){
      //setup done
      this.current = 'recipe';
      this.recipeId = id;
    },
    recipeEdit: function(id){
      //setup done, needs better implementation
      //for editing of steps and ingredients
      //TODO: add ability to resort steps and
      //add / edit / delete ingredients and
      //save on recipeEdit screen
      //TODO: add ability to edit image
      this.current = 'recipeEdit';
      this.recipeId = id;
    },
    recipeDelete: function(id){
      //setup done
      this.current = 'recipeDelete';
      this.recipeId = id;
    },
    newRecipe: function(){
      //setup done
      this.current = 'new';
      this.recipeId = null;
    },
    type: function(type){
      this.current = 'type';
      this.typeName = type;
    },
    profile: function(){
      //setup done
      this.current = 'profile';
    },
    catch: function(){
      //is the final else clause of render: in
      //Interface.jsx
      this.current = 'notFound';
    }
});

module.exports = new Router();
