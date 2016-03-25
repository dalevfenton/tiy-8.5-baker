var React = require('react');
var ButtonInput = require('react-bootstrap').ButtonInput;

var Ingredient = React.createClass({
  render: function(){
    var plural = '';
    if(this.props.ingredient.amount !== 1){
      plural = 's';
    }
    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="ing-amount ingredient-display">
            {this.props.ingredient.amount}
          </div>
        </div>
        <div className="col-sm-3">
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
          <ButtonInput value="Edit" onClick={this.handleSubmit} block />
        </div>
      </div>
    );
  }
});

module.exports = Ingredient;
