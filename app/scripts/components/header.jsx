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

  getInitialState: function(){
    return {
      showModal: false,
    }
  },
  open: function(){
     this.setState({ showModal: true });
  },
  close: function(){
     this.setState({ showModal: false });
  },
  signup: function(e){
    e.preventDefault();
    console.log(this.state);
  },
  render: function(){
    var page = '#';
    var loginProfile;
    if(this.props.user){
      loginProfile = (
        <NavItem eventKey={2} href="#profile">
          <Glyphicon glyph="user" />
          <span className="menu-name">Your Profile</span>
        </NavItem>
      );
    }else{
      loginProfile = (
        <Navbar.Text onClick={this.open}>
          Login
          <Glyphicon glyph="chevron-right" />
        </Navbar.Text>
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
            <Nav pullRight>
              <NavItem eventKey={1} href="#new-recipe">
                <Glyphicon glyph="plus" />
                <span className="menu-name">New Recipe</span>
              </NavItem>
              {loginProfile}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login Now To Start Creating And Saving Recipes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = Header;
