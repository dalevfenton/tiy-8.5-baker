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
  editIngredient: function(ingredientObj, index){
    var curIngredients = this.state.ingredients;
    curIngredients[index] = ingredientObj;
    this.setState({'ingredients': curIngredients });
  },
  componentWillMount: function(){
    if(this.props.step){
      this.setState({
        ingredients: this.props.step.ingredients,
        directions: this.props.step.directions
      });
    }
  },
  handleEdit: function(e){
    e.preventDefault();
    this.props.editStep(this.state, this.props.index);
    this.props.resetEdit();
    this.setState({
      ingredients: [],
      directions: ''
    });
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
    console.log('render called');
    var ingredients = this.state.ingredients.map(function(ingredient, index){
      return <Ingredient ingredient={ingredient} key={index}
        index={index} editIngredient={this.editIngredient} />;
    }.bind(this));
    var indexDisp;
    if(this.props.step){
      indexDisp = this.props.index + 1;
    }else{
      indexDisp = this.props.index;
    }
    var button;
    if(this.props.step){
      button = (
        <ButtonInput value="Save Your Changes" onClick={this.handleEdit}/>
      );
    }else{
      button = (
        <ButtonInput value="Add This Step" onClick={this.handleSubmit}/>
      );
    }
    return (
      <div className="col-sm-12">
        <TitleChiron title={"Step " + indexDisp} />
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
            {button}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RecipeStep;
