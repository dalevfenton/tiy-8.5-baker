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
      user: null,
      modalToggle: false,
      error: null
    }
  },
  newRecipe: function(recipeObj ){
    recipeObj.author = this.state.user.id;
    var Recipe = Parse.Object.extend("Recipe");
    var newRecipe = new Recipe(recipeObj);

    console.log(newRecipe);
    newRecipe.save(null, {
      success: function(recipe) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + recipe.id);
        var nav = 'recipe/' + recipe.id;
        Backbone.history.navigate(nav, {trigger:true});
      },
      error: function(recipe, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log('Failed to create new object, with error: ' + error);
      }
    });
  },
  signUp: function(userObj){
    var user = new Parse.User();
    user.set("username", userObj.username);
    user.set("password", userObj.password);
    user.set("email", userObj.email);
    user.set("firstname", userObj.firstname);
    user.set("lastname", userObj.lastname);
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        this.setState({user: user.id});
        Backbone.history.navigate('', {trigger: true});
      }.bind(this),
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.log("Error: " + error.code + " " + error.message);
        //open modal and display error
      }
    });
  },
  login: function(userObj){
    Parse.User.logIn(userObj.username, userObj.password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log('successful login', user);
        //set user into state
        this.setState({user: user.id});
        Backbone.history.navigate('', {trigger: true});
      }.bind(this),
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log('failed login', user);
        console.log('failed login error: ', error );
        //open modal and display error
      }
    });
  },
  logout: function(){
    Parse.User.logOut().then(function(data, code, xhr){
      this.setState({'user': null});
    }.bind(this));
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        this.setState({'user': currentUser});
        console.log(currentUser.get('firstname'));
        // var query = new Parse.Query(currentUser.className);
        // query.get(currentUser.id, {
        //   success: function(object) {
        //     // object is an instance of Parse.Object.
        //     console.log('success user object: ', object);
        //   },
        //
        //   error: function(object, error) {
        //     // error is an instance of Parse.Error.
        //   }
        // });
    }
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
              signUp={this.signUp} login={this.login} logout={this.logout}
              modal={this.state.modalToggle}/>
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
