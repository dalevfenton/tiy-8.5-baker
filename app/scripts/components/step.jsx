var React = require('react');
var ButtonInput = require('react-bootstrap').ButtonInput;
var Ingredient = require('./recipeingredient.jsx');
var TitleChiron = require('./titlechiron.jsx');

var RecipeStep = require('./recipestep.jsx');

var Step = React.createClass({
  getInitialState: function(){
    return {
      toggleEdit: false
    }
  },
  componentWillMount: function(){
    if(this.props.step){
      this.setState({
        ingredients: this.props.step.ingredients,
        directions: this.props.step.directions
      });
    }
  },
  edit: function(){
    this.setState({toggleEdit: !this.state.toggleEdit});
  },
  editIngredient: function(ingredientObj, index){
    var curIngredients = this.state.ingredients;
    curIngredients[index] = ingredientObj;
    this.setState({'ingredients': curIngredients });
  },
  deleteIngredient: function(ingredientObj, index){
    console.log('do the delete');
  },
  render: function(){
    var ingredients = this.props.step.ingredients.map(function(ingredient, index){
      return <Ingredient ingredient={ingredient} key={index} index={index} editIngredient={this.editIngredient} delete={this.props.deleteIngredient} />;
    }.bind(this));
    if(this.state.toggleEdit){
      return (
        <RecipeStep index={this.props.index}
          editStep={this.props.editStep}
          step={this.props.step} resetEdit={this.edit}
          delete={this.props.deleteIngredient} />
      );
    }else{
      return (
        <div className="col-sm-12">
          <TitleChiron title={"Step " + (this.props.index+1) } />
          {ingredients}
          <div className="row">
            <div className="col-sm-12">
              <div>{this.props.step.directions}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ButtonInput value="Edit This Step" onClick={this.edit}/>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = Step;
