var React = require('react');

var RecipeTypeRow = require('./recipetyperow.jsx');


var Home = React.createClass({
  render: function(){
    var recipeTypes = this.props.types.map(function(type){
      return <RecipeTypeRow type={type} key={type} user={this.props.user}/>
    }.bind(this));
    return (
      <div>
        <h1>Home Page</h1>
        {recipeTypes}
      </div>
    );
  }
});

module.exports = Home;
