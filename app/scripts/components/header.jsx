var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;
var Glyphicon = require('react-bootstrap').Glyphicon;

var Header = React.createClass({
  render: function(){
    var page = '#';
    return (
      <div id="header" className="row">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Baker</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullLeft>
              <NavItem href={page}><em>The kitchen is yours, chef!</em></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#new-recipe">
                <Glyphicon glyph="plus" />
                <span className="menu-name">New Recipe</span>
              </NavItem>
              <NavItem eventKey={2} href="#profile">
                <Glyphicon glyph="user" />
                <span className="menu-name">Your Profile</span>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
});

module.exports = Header;
