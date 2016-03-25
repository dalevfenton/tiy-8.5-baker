var React = require('react');
var Parse = require('parse');

var Recipe = React.createClass({
  getInitialState: function(){
    return {
      recipeObj: null
    }
  },
  componentWillMount: function(){
    var query = new Parse.Query("Recipe");
    query.get(this.props.id, {
      success: function(object) {
        // object is an instance of Parse.Object.
        console.log('recipe object!');
        this.setState({'recipeObj': object});
      }.bind(this),
      error: function(object, error) {
        // error is an instance of Parse.Error.
        console.log('error getting recipe', error);
      }
    });
  },
  render: function(){
    var display;
    if(this.state.recipeObj){
      display = (
        <div>
          <h1 className="recipe-title">Home Page for Recipe #{this.props.id}</h1>
        </div>
      );
    }else{
      display = (
        <div>Getting Recipe!</div>
      );
    }
    return (
      <div>
        {display}
      </div>
    );
  }
});

module.exports = Recipe;
