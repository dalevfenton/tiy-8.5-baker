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
  componentWillMount: function(){
    if(this.props.ingredient){
      this.setState({
        amount: this.props.ingredient.amount,
        units: this.props.ingredient.units,
        ingredient: this.props.ingredient.ingredient
      });
    }
  },
  handleEdit: function(e){
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.index);
    this.props.editIngredient(this.state, this.props.index);
    this.props.resetEdit();
    this.reset();
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.addIngredient(this.state);
    this.reset();
  },
  reset: function(){
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
    var button;
    if(this.props.ingredient){
      button = <ButtonInput value="Save Edit" onClick={this.handleEdit} block />
    }else{
      button = <ButtonInput value="Save" onClick={this.handleSubmit} block />
    }
    return (
      <div className="row">
        <div className="col-sm-2">
          <Input type="number" placeholder="Amount" min={0}
            valueLink={this.linkState('amount')} onChange={this.normalize} />
        </div>
        <div className="col-sm-3">
          <Input type="text" name="units" list="units"
            placeholder="Units" valueLink={this.linkState('units')} />
          <datalist id="units">
            <option value="Volumes" disabled />
            <option value={ "teaspoon" + plural } />
            <option value={ "tablepoon" + plural } />
            <option value={ "fluid ounce" + plural } />
            <option value={ "cup" + plural } />
            <option value="Weights" disabled />
            <option value={ "ounce" + plural } />
            <option value={ "pound" + plural } />
          </datalist>
        </div>
        <div className="col-sm-5">
          <Input type="text" placeholder="Ingredient"
            valueLink={this.linkState('ingredient')} />
        </div>
        <div className="col-sm-2">
          {button}
        </div>
      </div>
    );
  }
});

module.exports = IngredientForm;
