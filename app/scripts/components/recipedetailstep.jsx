var React = require('react');

var Table = require('react-bootstrap').Table;

var TitleChiron = require('./titlechiron.jsx');
var CardIngredient = require('./cardingredient.jsx');

var RecipeDetailStep = React.createClass({
  render: function(){
    var step = this.props.data;
    var ingredients = step.ingredients.map(function(ingredient){
      return ( <CardIngredient data={ingredient.attributes} key={ingredient.id}
        ratio={this.props.ratio} /> );
    }.bind(this));
    return (
      <div className="row">
        <div className="col-sm-12">
          <TitleChiron title={"Step " + step.index } />
        </div>
        <div className="col-sm-8">
          {step.directions}
        </div>
        <div className="col-sm-4">
          <Table striped responsive hover>
            <tbody>
              {ingredients}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
});

module.exports = RecipeDetailStep;
