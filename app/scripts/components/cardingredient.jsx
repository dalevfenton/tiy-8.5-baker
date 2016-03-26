var React = require('react');

var CardIngredient = React.createClass({
  render: function(){
    var ingredient = this.props.data;
    // console.log(ingredient);
    // console.log(ingredient.amount);
    // console.log(ingredient.units);
    // console.log(ingredient.ingredient);
    return (
      <tr>
        <td>{ingredient.amount}{ingredient.units}</td>
        <td>{ingredient.ingredient}</td>
      </tr>
    );
  }
});

module.exports = CardIngredient;
