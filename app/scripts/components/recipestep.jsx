var React = require('react');
var TitleChiron = require('./titlechiron.jsx');
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Ingredient = require('./recipeingredient.jsx');

var RecipeStep = React.createClass({
  render: function(){
    return (
      <div className="col-sm-12">
        <TitleChiron title={"Step " + this.props.index} />
        <Ingredient />
        <div className="row">
          <div className="col-sm-12">
            <Input type="textarea" placeholder="Provide Directions For This Step" />
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
