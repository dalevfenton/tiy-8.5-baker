var React = require('react');
var Parse = require('parse');
var _ = require('underscore');

var CardIngredient = require('./cardingredient.jsx');
var RecipeDetailStep = require('./recipedetailstep.jsx');
var TitleChiron = require('./titlechiron.jsx');
var Loading = require('./loading.jsx');

var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;

var Recipe = React.createClass({
  getInitialState: function(){
    return {
      recipeObj: null,
      servings: 0
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
      // console.log('should be the recipe with steps and ingredients set');
      // console.log(recipe);
      // console.log(recipe.attributes);
      //set the recipe to state and update our view
      console.log('before favs check');
      //if the user isn't logged in we can't query for favorite status
      if(!Parse.User.current()){
        this.setState({'recipeObj': recipe, 'servings': recipe.get('servings')});
        return 'exiting before relation query';
      };
      var relation = Parse.User.current().relation("favorites");
      var query = relation.query();
      return query.find();
    }.bind(this)).then(function(favs){
      console.log('favs returned');
      var found = _.findWhere(favs, {id: recipe.id});
      if( found != undefined ){
        this.setState({'fav': found });
      }
      console.log(recipe.attributes);
      this.setState({'recipeObj': recipe, 'servings': recipe.get('servings')});
    }.bind(this),function(error){
      console.log('error happened', error);
    });
  },
  handleServings: function(e){
    this.setState({"servings": e.target.value});
  },
  toggleConversion: function(){
    this.setState({toggleConversion: !this.state.toggleConversion});
  },
  favorite: function(){
      var user = Parse.User.current();
      var relation = user.relation("favorites");
      relation.add(this.state.recipeObj);
      user.save().then(function(user){
        this.setState({ "fav" : true });
      }.bind(this),function(error){
        console.log('error saving favorite:', error);
      });
  },
  render: function(){
    var display = (
      <Loading />
    );

    if(this.state.recipeObj){
      //only render the detail view if we have our recipe retrieved from the server
      // console.log('recipeObj is defined!');
      // console.log(this.state.recipeObj.attributes);

      var recipe = this.state.recipeObj;
      //convert tempScale index value to string for display
      var tempScale = ["F", "C"][recipe.get("tempScale")];

      //massage the recipe object data to pull out the ingredients and set them
      //into individual components for use on recipe card panel
      var ingredients = recipe.get("steps").reduce(function(memo, step){
        _.each(step.get('ingredients'), function(ingredient){
          //we really need to do a check if this ingredient exists in the array
          //and combine the amounts if so
          memo.push(ingredient);
          // memo[ingredient.get('ingredient')] = ingredient;
        });
        return memo;
      }, []);
      console.log(this.state.servings);
      console.log(this.state.recipeObj.get('servings'));
      console.log( (this.state.servings / this.state.recipeObj.get("servings")) );
      ingredients = ingredients.map(function(ingredient, index){
        console.log(ingredient);
        return ( <CardIngredient data={ingredient.attributes}
          key={ingredient.id}
          ratio={(this.state.servings / this.state.recipeObj.get("servings"))} /> );
      }.bind(this));

      //build the step display items
      var steps = recipe.get("steps").map(function(step){
        return (<RecipeDetailStep data={step.attributes} key={step.id}
          ratio={(this.state.servings / this.state.recipeObj.get("servings"))} /> );
      }.bind(this));

      //add an edit button if the user is the owner of the recipe-title
      var edit = '';
      if(this.props.user && this.props.user.id === recipe.get('authorId')){
        edit = (<a href={"#recipe-edit/" + recipe.id} className="btn btn-primary pull-right">Edit This Recipe</a>)
      }

      var fav;
      if(this.props.user && this.state.fav){
        fav = ( <span>Favorite! <Glyphicon className="star-pulse-animate" glyph="star-empty" /></span>);
      }else if(this.props.user){
        fav = ( <Button onClick={this.favorite}>Add to Favorites</Button>);
      }
      //set the display so we can return it
      console.log(this.state);
      display = (
        <div>
          <div className="recipe-image">
            <img src={recipe.get('picture').url()} />
            <h1 className="recipe-title">{recipe.get('title')}</h1>
            <h3 className="recipe-author">by {recipe.get('authorName')}</h3>
            <ul className="recipe-details">
              <li>
                <div className="recipe-label">Recipe Type: </div>
                <div className="recipe-info">{recipe.get('recipeType')}</div>
              </li>
              <li>
                <div className="recipe-label">Prep Time: </div>
                <div className="recipe-info">{recipe.get('prepTime')} minutes</div>
              </li>
              <li>
                <div className="recipe-label">Cook Time: </div>
                <div className="recipe-info">{recipe.get('cookTime')} minutes</div>
              </li>
              <li>
                <div className="recipe-label">Cook Temp: </div>
                <div className="recipe-info">{recipe.get('temp')} &deg;{tempScale}</div>
              </li>
            </ul>
          </div>
          <Panel header={
            <div className="row">
              <div className="col-xs-5">
                <span className="servings">Adjust Value to Scale Recipe Up or Down</span>
              </div>
              <div className="col-xs-2">
                <Input type="number" onChange={this.handleServings} min={1}
                  value={this.state.servings} />
              </div>
              <div className="col-xs-5">
                <span className="servings">Servings</span>
              </div>
            </div> } >
            <Table striped responsive hover>
              <tbody>
                {ingredients}
              </tbody>
            </Table>
          </Panel>
          {steps}
          <TitleChiron title="Personal Notes" />
          <div>
            {recipe.get("notes")}
          </div>
          <div className="bottom-button">
            {fav}{edit}
          </div>
        </div>
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
