var React = require('react');
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var IngredientForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      'amount': '',
      'units': '',
      'ingredient': ''
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.addIngredient(this.state);
    this.setState({
      'amount': '',
      'units': '',
      'ingredient': ''
    });
  },
  render: function(){
    var plural = '';
    if(this.state.amount !== 1){
      plural = 's';
    }
    return (
      <div className="row">
        <div className="col-sm-2">
          <Input type="number" placeholder="Amount" min={0}
            valueLink={this.linkState('amount')} />
        </div>
        <div className="col-sm-3">
          <Input type="select" placeholder="Unit"
            valueLink={this.linkState('units')} >
            <option value="Unit">Unit{plural}</option>
            <option value="tsp">teaspoon{plural}</option>
            <option value="Tbsp">tablespoon{plural}</option>
            <option value="Fl Oz">fluid ounce{plural}</option>
            <option value="Cup">cup{plural}</option>
            <option value="Oz">ounce{plural}</option>
            <option value="Lb">pound{plural}</option>
          </Input>
        </div>
        <div className="col-sm-5">
          <Input type="text" placeholder="Ingredient"
            valueLink={this.linkState('ingredient')} />
        </div>
        <div className="col-sm-2">
          <ButtonInput value="Add" onClick={this.handleSubmit} block />
        </div>
      </div>
    );
  }
});

module.exports = IngredientForm;
