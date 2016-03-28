var React = require('react');

var CardIngredient = React.createClass({
  scale: function(){
    return (this.props.data.amount * this.props.ratio);
  },
  render: function(){
    var ingredient = this.props.data;
    return (
      <tr>
        <td>{this.scale()}{" " + ingredient.units}</td>
        <td>{ingredient.ingredient}</td>
      </tr>
    );
  }
});

module.exports = CardIngredient;
