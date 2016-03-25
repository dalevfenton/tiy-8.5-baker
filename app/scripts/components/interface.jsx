var React = require('react');
var Backbone = require('backbone');
var Parse = require('parse');
Parse.initialize("dvf_tiy_gvl");
Parse.serverURL = 'http://tiy-parse-server.herokuapp.com';

var Header = require('./header.jsx');
var Sidebar = require('./sidebar.jsx');
var NewRecipe = require('./newrecipe.jsx');
var Recipe = require('./recipe.jsx');

var Interface = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router,
      user: null
    }
  },
  newRecipe: function(recipeId){
    var nav = 'recipe/' + recipeId
    Backbone.history.navigate(nav, {trigger:true});
  },
  signUp: function(userObj){
    console.log('inside signUp of Interface');
    var user = new Parse.User();
    user.set("username", userObj.username);
    user.set("password", userObj.password);
    user.set("email", userObj.email);
    user.set("firstname", userObj.firstname);
    user.set("lastname", userObj.lastname);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        console.log('success: ', user);
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  },
  login: function(userObj){
    console.log('inside login of Interface');
    Parse.User.logIn(userObj.username, userObj.password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log('successful login', user);
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log('failed login', user);
        console.log('failed login error: ', error );
      }
    });
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  render: function(){
    console.log(this.state.router);
    var body;

    if(this.state.router.current == 'home'){
      //home screen
      body = (
        <div>
          <h1>Home Page</h1>
        </div>
      );
    }else if(this.state.router.current == 'new'){
      //new recipe form
      body = (
        <NewRecipe newRecipe={this.newRecipe}/>
      );
    }else if(this.state.router.current == 'recipe'){
      //new recipe form
      body = (
        <Recipe id={this.state.router.recipeId} editRecipe={this.editRecipe}/>
      );
    }else if(this.state.router.current == 'preview'){
      //recipe view screen
      body = (
        <div>
          <h1>Preview</h1>
        </div>
      );
    }else if(this.state.router.current == 'profile'){
      //recipe view screen
      body = (
        <div>
          <h1>Profile</h1>
        </div>
      );
    }else{
      body = (
        <div>
          <h1>Page Doesn't Exist</h1>
        </div>
      );
    }


    return (
      <div>
        <div className="container-fluid">
            <Header page={this.state.router.current} user={this.state.user}
              signUp={this.signUp} login={this.login}/>
        </div>
        <div className="container-fluid">
          <div className="row">
            <Sidebar page={this.state.router.current} />
            <div className="col-sm-10">
              {body}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Interface;
