var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;

var LoginForm = require('./loginform.jsx');

var Header = React.createClass({
  render: function(){
    var page = this.props.page;
    var loginProfile;
    if(this.props.user){
      loginProfile = (
        <Nav pullRight>
          <NavItem eventKey={1} href="#new-recipe">
            <Glyphicon glyph="plus" />
            <span className="menu-name">New Recipe</span>
          </NavItem>
          <NavItem eventKey={2} href="#profile">
            <Glyphicon glyph="user" />
            <span className="menu-name">Your Profile</span>
          </NavItem>
          <NavItem eventKey={3} href="#" onClick={this.props.logout}>
            <span className="menu-name">Log Out</span>
          </NavItem>
        </Nav>
      );
    }else{
      loginProfile = (
        <Nav pullRight>
          <NavItem eventKey={1} href="#new-recipe">
            <Glyphicon glyph="plus" />
            <span className="menu-name">New Recipe</span>
          </NavItem>
          <NavItem onClick={this.props.open}>
            Login
            <Glyphicon glyph="chevron-right" />
          </NavItem>
        </Nav>
      );
    }
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
            {loginProfile}
          </Navbar.Collapse>
        </Navbar>
        <Modal show={this.props.modal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login Now To Start Creating And Saving Recipes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm signUp={this.props.signUp} login={this.props.login}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = Header;
