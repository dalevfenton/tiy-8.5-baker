var React = require('react');
var ButtonInput = require('react-bootstrap').ButtonInput;
var Ingredient = require('./recipeingredient.jsx');
var TitleChiron = require('./titlechiron.jsx');


var Step = React.createClass({
  render: function(){
    var ingredients = this.props.step.ingredients.map(function(ingredient, index){
      return <Ingredient ingredient={ingredient} key={index} />;
    });
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
            <ButtonInput value="Edit This Step" onClick={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Step;
