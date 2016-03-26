//3rd party libs & frameworks
var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Parse = require('parse');

//setup parse SDK to connect to server
Parse.initialize("dvf_tiy_gvl");
Parse.serverURL = 'http://tiy-parse-server.herokuapp.com';

//require in child components
var Header = require('./header.jsx');
var Sidebar = require('./sidebar.jsx');
var NewRecipe = require('./newrecipe.jsx');
var Recipe = require('./recipe.jsx');
var Home = require('./home.jsx');
var Profile = require('./profile.jsx');

//lists used to populate sidebar & home screens
var userList = ['user', 'public', 'popular', 'favorite'];
var anonList = ['public', 'popular', 'breakfast', 'lunch', 'dinner', 'dessert', 'appetizer'];

var Interface = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router,
      user: null,
      modalToggle: false,
      //don't think we actually used error anywhere
      error: null
    }
  },
  newRecipe: function( recipeObj ){
    //make sure we have a user to set on the object
    if(Parse.User.current()){
      //set the author's id to the recipeObj since it was not held by the form
      console.log(this.state.user);
      recipeObj.authorId = this.state.user.id;
      recipeObj.authorName = this.state.user.get('firstname')
                            + ' ' + this.state.user.get('lastname');

      //define our constructors for the classes included in a recipe
      var Recipe = Parse.Object.extend("Recipe");
      var Step = Parse.Object.extend("Step");
      var Ingredient = Parse.Object.extend("Ingredient");

      //setup access control for this recipe based on public or private form data
      var acl = new Parse.ACL();
      if(recipeObj.pubpriv == 'public'){
        //allow public read of recipe but private write
        acl.setPublicReadAccess(true);
        acl.setWriteAccess(Parse.User.current().id, true);
      }else{
        //only private read and write
        acl.setReadAccess(Parse.User.current().id, true);
        acl.setWriteAccess(Parse.User.current().id, true);
      }
      //exclude the steps and pubpriv from the recipe item since they are
      //included as relational data and the ACL respectively
      var recipeVals = _.omit(recipeObj, ['steps', 'pubpriv']);
      var newRecipe = new Recipe(recipeVals);
      newRecipe.setACL(acl);
      var recipeId;
      newRecipe.save(null).then(function(recipe) {
        // the recipe listing was saved.
        console.log('recipe top level object was saved', recipe);
        // save recipeId into outer scope so we can reference it again
        // when saving child and granchild elements
        recipeId = recipe.id;
        var promises = [];
        _.each(recipeObj.steps, function(stepData){
          var step = new Step();
          step.set("directions", stepData.directions);
          step.set("index", stepData.index);
          step.set("parent", recipe.id);
          step.setACL(acl);
          promises.push(step.save());
        });
        // return another list of promises to resolve when the saves are finished
        return Parse.Promise.when(promises);
      }).then(function(steps) {
        // steps should be an array with Step class objects
        var promises = [];
        _.each(recipeObj.steps, function(stepData, stepIndex){
          _.each(stepData.ingredients, function(ingredient){
            var ingredient = new Ingredient(ingredient);
            ingredient.set("parent", steps[stepIndex].id );
            ingredient.set("grandparent", recipeId );
            ingredient.setACL(acl);
            promises.push(ingredient.save());
          });
        });
        // return another list of promises to resolve when ingredients are saved
        return Parse.Promise.when(promises);
      }).then(function(ingredients){
        //this should return the array of ingredient objects
        //redirect to the recipe's detail view page
        var nav = 'recipe/' + recipeId;
        Backbone.history.navigate(nav, {trigger:true});
      }, function(error) {
        // there was some error.
        console.log('error happened: ', error);
      });
    }else{
      console.log('no user logged in, redirect to login before posting recipe');
    }
  },
  signUp: function(userObj){
    var user = new Parse.User();
    user.set("username", userObj.username);
    user.set("password", userObj.password);
    user.set("email", userObj.email);
    user.set("firstname", userObj.firstname);
    user.set("lastname", userObj.lastname);
    // user.setACL(new Parse.ACL(user));
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        this.setState({user: user, modalToggle: false});
        // Backbone.history.navigate('', {trigger: true});
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
        this.setState({user: user, modalToggle: false});
        this.forceUpdate();
        // Backbone.history.navigate('', {trigger: true});
      }.bind(this),
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log('failed login', user);
        console.log('failed login error: ', error );
        //open modal and display error
      }
    });
  },
  logout: function(e){
    e.preventDefault();
    Parse.User.logOut().then(function(data, code, xhr){
      console.log('logout called successfully');
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
    }
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  modalOpen: function(e){
    e.preventDefault();
   this.setState({ modalToggle: true });
  },
  modalClose: function(){
   this.setState({ modalToggle: false });
  },
  render: function(){
    var body;
    var types;
    if(this.state.user){
      types = userList;
    }else{
      types = anonList;
    }
    if(this.state.router.current == 'home'){
      //home screen
      body = (
        <Home types={types} user={this.state.user} />
      );
    }else if(this.state.router.current == 'new'){
      //new recipe form
      body = (
        <NewRecipe user={this.state.user} newRecipe={this.newRecipe}
          modalOpen={this.modalOpen} />
      );
    }else if(this.state.router.current == 'recipe'){
      //single recipe detail page
      body = (
        <Recipe id={this.state.router.recipeId} editRecipe={this.editRecipe}
          user={this.state.user} />
      );
    }else if(this.state.router.current == 'profile'){
      //user profile screen
      body = (
        <Profile user={this.state.user} />
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
              modal={this.state.modalToggle} open={this.modalOpen}
              close={this.modalClose} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <Sidebar page={this.state.router.current} user={this.state.user}
              types={types} />
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
