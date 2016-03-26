var React = require('react');
var Parse = require('parse');
var _ = require('underscore');

var Panel = require('react-bootstrap').Panel;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;


var Recipe = React.createClass({
  getInitialState: function(){
    return {
      recipeObj: null,
      loaded: false
    }
  },
  componentWillMount: function(){
    var Recipe = Parse.Object.extend("Recipe");
    var Step = Parse.Object.extend("Step");
    var Ingredient = Parse.Object.extend("Ingredient");

    var recipe, steps;
    var query = new Parse.Query(Recipe);
    query.get(this.props.id).then(function(recipeObj) {
      // the recipe listing was retrieved
      recipe = recipeObj;
      var query = new Parse.Query(Step);
      query.equalTo("parent", recipeObj.id);
      //return a promise so that we can chain
      return query.find();
    }).then(function(stepsObjs){
      // the steps for the recipe are retrieved
      steps = stepsObjs;
      var promises = [];
      _.each(stepsObjs, function(stepObj){
        var query = new Parse.Query(Ingredient);
        query.equalTo("parent", stepObj.id);
        promises.push(query.find());
      });
      // Return a new promise that is resolved when all of the finds are finished.
      return Parse.Promise.when(promises);
    }).then(function(ingredients){
      //reassociate the ingredients with their respective steps
      _.each(steps, function(step, index){
        step.set("ingredients", ingredients[index]);
      })
      //set the steps on the recipe
      recipe.set("steps", steps);
      console.log('should be the recipe with steps and ingredients set');
      console.log(recipe);
      console.log(recipe.attributes);
      //set the recipe to state and update our view
      this.setState({'recipeObj': recipe});
    }.bind(this),function(error){
      console.log('error happened', error);
    });

  },
  render: function(){
    var display = ( <div>Hi</div>);

    if(this.state.recipeObj){
      console.log('recipeObj is defined!');
      console.log(this.state.recipeObj.attributes);
      // var atts = this.state.recipeObj.attributes.map(function(att){
      //   console.log('inside atts');
      //   return ( <li key={this}>{att}</li> );
      // });
      var recipe = this.state.recipeObj;
      var tempScale = ["F", "C"][recipe.get("tempScale")];

      display = (
        <div>
          <h1 className="recipe-title">{recipe.get('title')}</h1>
          <h3 className="recipe-author">{recipe.get('author')}</h3>
          <ul>
            <li>Recipe Type: {recipe.get('recipeType')}</li>
            <li>Prep Time: {recipe.get('prepTime')} minutes</li>
            <li>Cook Time: {recipe.get('cookTime')} minutes</li>
            <li>Cook Temp: {recipe.get('temp')} &deg;{tempScale}</li>
          </ul>
          <Panel>
            <div>
              <span className="servings">{recipe.get('servings')} Servings</span>
              <Button onClick={this.triggerConversion} pullRight>
                <Glyphicon glyph="pencil" />Adjust
              </Button>
            </div>
            <div>

            </div>
          </Panel>
        </div>
      );
    }
    console.log(this.state.recipeObj);
    return (
      <div>
        {display}
      </div>
    );
  }
});

module.exports = Recipe;
