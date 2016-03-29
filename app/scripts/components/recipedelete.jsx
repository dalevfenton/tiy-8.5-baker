var React = require('react');
var Parse = require('parse');
var Backbone = require('backbone');

var Loading = require('./loading.jsx');

var Panel = require('react-bootstrap').Panel;
var ButtonInput = require('react-bootstrap').Button;

var RecipeDelete = React.createClass({
  getInitialState: function(){
    return {
      'recipe': null
    }
  },
  componentWillMount: function(){
    var Recipe = Parse.Object.extend("Recipe");

    var recipe;
    var query = new Parse.Query(Recipe);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //HOW TO INCLUDE POINTER FIELDS BACK INTO PARENT OBJ
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    query.include('steps');
    query.include('steps.ingredients');
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    query.get(this.props.id).then(function(recipeObj) {
      // the recipe listing was retrieved
      if(recipeObj.get('authorId') == Parse.User.current().id ){
        this.setState({'recipe': recipeObj});
      }else{
        //user not the post owner, redirect to home
        Backbone.history.navigate("#", {trigger: true});
      }
    }.bind(this));
  },
  cancel: function(e){
    e.preventDefault();
    Backbone.history.navigate("recipe/" + this.state.recipe.id, {trigger:true});
  },
  doDelete: function(e){
    e.preventDefault();
    var promises = [];
    this.state.recipe.get('steps').map(function(step){
      step.get('ingredients').map(function(ingredient){
        promises.push(ingredient.destroy());
      });
      promises.push(step.destroy());
    });
    promises.push(this.state.recipe.destroy());
    console.log(promises);
    Parse.Promise.when(promises).then(function(deletes){
      Backbone.history.navigate('profile', {trigger: true});
    },function(error){
      console.log('error deleting recipe: ', error);
    });
  },
  render: function(){
    console.log(this.state);
    if(this.state.recipe){
      return (
        <Panel header={<h3>Confirm Delete</h3>} bsStyle="danger">
          <ButtonInput onClick={this.cancel}
            label="Return To This Recipe">Cancel
          </ButtonInput>
          <ButtonInput onClick={this.doDelete}
            label="Are You Sure You Want To Delete This Recipe?"
            bsStyle="danger" className="pull-right">
            Confirm Delete
          </ButtonInput>
        </Panel>
      );
    }else{
      return ( <Loading /> );
    }
  }
});

module.exports = RecipeDelete;
