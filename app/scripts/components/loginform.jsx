var React = require('react');
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;

var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var LoginForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      toggleSignIn: false
    }
  },
  signup: function(e){
    e.preventDefault();
    // console.log(this.state);
    this.resetState();
    this.props.signUp(this.state);
  },
  login: function(e){
    e.preventDefault();
    // console.log(this.state);
    this.resetState();
    this.props.login(this.state);
  },
  resetState: function(){
    this.setState({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      toggleSignIn: false
    });
  },
  setLogin: function(e){
    e.preventDefault();
    this.setState({toggleSignIn: !this.state.toggleSignIn});
  },
  render: function(){
    var form, linkText;
    if(this.state.toggleSignIn){
      form = (
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
      );
      linkText = 'Already Signed Up? Click Here To Sign In!';
    }else{
      form = (
        <form onSubmit={this.login}>
          <Input type="text" placeholder="Username"
            valueLink={this.linkState('username')} block />
          <Input type="password" placeholder="Password"
            valueLink={this.linkState('password')} block />
          <ButtonInput type="submit" block value="Signup Now"
            bsStyle="success" />
        </form>
      );
      linkText = 'Don\'t Have An Account? Click To Sign Up!';
    }
    return (
      <div>
        {form}
        <div className="ref-link">
          <a href="#" onClick={this.setLogin}>
            {linkText}
          </a>
        </div>
      </div>
    );
  }
});

module.exports = LoginForm;
