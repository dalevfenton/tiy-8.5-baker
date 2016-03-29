var React = require('react');

var RecipeTypeRow = require('./recipetyperow.jsx');

var RecipeType = React.createClass({
  render: function(){
    return (
      <div>
        <h1>{this.props.type.toUpperCase()}</h1>
        <RecipeTypeRow type={this.props.type}  user={this.props.user}/>
      </div>

    );
  }
});

module.exports = RecipeType;
