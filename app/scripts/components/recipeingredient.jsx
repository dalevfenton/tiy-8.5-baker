var React = require('react');
var ButtonInput = require('react-bootstrap').ButtonInput;
var IngredientForm = require('./recipeingredientform.jsx');

var Ingredient = React.createClass({
  getInitialState: function(){
    return {
      toggleEdit: false
    }
  },
  edit: function(){
    this.setState({toggleEdit: !this.state.toggleEdit});
  },
  delete: function(){
    this.props.delete(this.props.ingredient, this.props.index);
  },
  render: function(){
    var plural = '';
    if(this.props.ingredient.amount !== 1){
      plural = 's';
    }
    if(this.state.toggleEdit){
      return (
        <IngredientForm index={this.props.index}
          editIngredient={this.props.editIngredient}
          ingredient={this.props.ingredient} resetEdit={this.edit} />
      );
    }else{
      return (
        <div className="row">
          <div className="col-sm-1">
            <div className="ing-amount ingredient-display">
              {this.props.ingredient.amount}
            </div>
          </div>
          <div className="col-sm-2">
            <div className="ing-unit ingredient-display">
              {this.props.ingredient.units}
            </div>
          </div>
          <div className="col-sm-5">
            <div className="ing-ingredient ingredient-display">
              {this.props.ingredient.ingredient}
            </div>
          </div>
          <div className="col-sm-2">
            <ButtonInput value="Edit" onClick={this.edit} block />
          </div>
          <div className="col-sm-2">
            <ButtonInput value="Delete" onClick={this.delete} block />
          </div>
        </div>
      );
    }
  }
});

module.exports = Ingredient;
