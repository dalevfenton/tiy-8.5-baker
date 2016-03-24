var React = require('react');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Sidebar = React.createClass({
  render: function(){
    return (
      <div className="col-sm-2">
        <Nav stacked bsStyle="tabs" className="recipes-sidebar">
          <NavItem eventKey={1} href="recipes">My Recipes</NavItem>
          <NavItem eventKey={2} href="recipes/public">Public Recipes</NavItem>
          <NavItem eventKey={3} href="recipes/popular">Popular Recipes</NavItem>
          <NavItem eventKey={4} href="recipes/favorites">My Favorite Recipes</NavItem>
          <NavItem eventKey={4} href="pantry">Pantry</NavItem>
        </Nav>
      </div>
    );
  }
});

module.exports = Sidebar;
