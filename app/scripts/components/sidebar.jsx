var React = require('react');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Sidebar = React.createClass({
  render: function(){
    var labels = {
      'user': 'My Recipes',
      'public': 'Browse All Recipes',
      'popular': 'Browse Popular Recipes',
      'favorite': 'Your Favorite Recipes',
      'breakfast': 'Breakfast Recipes',
      'lunch': 'Lunch Recipes',
      'dinner': 'Dinner Recipes',
      'dessert': 'Dessert Recipes',
      'appetizer': 'Appetizer Recipes',
    };
    var navItems = this.props.types.map(function(type, index){
      return (
        <NavItem eventKey={index} key={index} href={"#type/" + type}>{labels[type]}</NavItem>
      );
    });
    return (
      <div className="col-sm-2">
        <Nav stacked bsStyle="tabs" className="recipes-sidebar">
          {navItems}
        </Nav>
      </div>
    );
  }
});

module.exports = Sidebar;
