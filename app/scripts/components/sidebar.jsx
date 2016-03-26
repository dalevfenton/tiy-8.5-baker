var React = require('react');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Sidebar = React.createClass({
  render: function(){
    if(this.props.user){

    }else{
      
    }
    return (
      <div className="col-sm-2">
        <Nav stacked bsStyle="tabs" className="recipes-sidebar">
          <NavItem eventKey={1} href="type/user">My Recipes</NavItem>
          <NavItem eventKey={2} href="type/public">Public Recipes</NavItem>
          <NavItem eventKey={3} href="type/popular">Popular Recipes</NavItem>
          <NavItem eventKey={4} href="type/favorites">My Favorite Recipes</NavItem>
        </Nav>
      </div>
    );
  }
});

module.exports = Sidebar;
