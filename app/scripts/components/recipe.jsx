var React = require('react');

var Recipe = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Home Page for Recipe #{this.props.id}</h1>
      </div>
    );
  }
});

module.exports = Recipe;
