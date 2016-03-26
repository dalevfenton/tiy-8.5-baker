var React = require('react');
var TitleChiron = require('./titlechiron.jsx');
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Ingredient = require('./recipeingredient.jsx');
var IngredientForm = require('./recipeingredientform.jsx');

var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var RecipeStep = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      ingredients: [],
      directions: ''
    }
  },
  addIngredient: function(ingredientObj){
    var curIngredients = this.state.ingredients;
    curIngredients.push(ingredientObj);
    this.setState({'ingredients': curIngredients });
  },
  handleSubmit: function(e){
    e.preventDefault();
    var step = this.state;
    step.index = this.props.index;
    this.props.addStep( step );
    this.setState({
      ingredients: [],
      directions: ''
    });
  },
  render: function(){
    var ingredients = this.state.ingredients.map(function(ingredient, index){
      return <Ingredient ingredient={ingredient} key={index} />;
    });
    return (
      <div className="col-sm-12">
        <TitleChiron title={"Step " + this.props.index} />
        <IngredientForm addIngredient={this.addIngredient} />
        {ingredients}
        <div className="row">
          <div className="col-sm-12">
            <Input type="textarea" placeholder="Provide Directions For This Step"
              valueLink={this.linkState('directions')}  />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ButtonInput value="Add Another Step" onClick={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RecipeStep;
