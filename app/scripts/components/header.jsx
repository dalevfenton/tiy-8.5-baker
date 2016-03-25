var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var Header = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      showModal: false,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: ''
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
            <form onSubmit={this.signup}>
              <Input type="text" placeholder="First Name"
                valueLink={this.linkState('firstname')} block />
              <Input type="text" placeholder="Last Name"
                  valueLink={this.linkState('lastname')} block />
              <Input type="text" placeholder="Username"
                valueLink={this.linkState('username')} block />
              <Input type="email" placeholder="Email"
                  valueLink={this.linkState('email')} block />
                <Input type="password" placeholder="Password"
                  valueLink={this.linkState('password')} block />
                <ButtonInput type="submit" block value="Signup Now"
              bsStyle="success" />
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = Header;
