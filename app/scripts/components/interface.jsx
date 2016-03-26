var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
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
    //make sure we have a user to set on the object
    if(Parse.User.current()){
      //set the author's id to the recipeObj since it was not held by the form
      recipeObj.author = this.state.user.id;
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
        console.log(recipe);
        recipeId = recipe.id;
        var promises = [];
        _.each(recipeObj.steps, function(stepData){
          var step = new Step();
          step.set("directions", stepData.directions);
          step.set("index", stepData.stepNum);
          step.set("parent", recipe.id);
          step.setACL(acl);
          promises.push(step.save());
        });
        // Return a new promise that is resolved when all of the deletes are finished.
        return Parse.Promise.when(promises);
      }).then(function(steps) {
        // steps should be an array with the step Ids and other object properties
        _.each(steps, function(step){
          console.log(step.attributes);
        });
        var promises = [];
        _.each(recipeObj.steps, function(stepData){
          _.each(stepData.ingredients, function(ingredient){
            var ingredient = new Ingredient(ingredient);
            ingredient.setACL(acl);
            console.log(ingredient);
            promises.push(ingredient.save());
          });
        });
        return Parse.Promise.when(promises);
      }).then(function(ingredients){
        //this should return the array of ingredient objects
        console.log('ingredients returned: ', ingredients);
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + recipe.id);
        console.log(recipeId);
        // var nav = 'recipe/' + recipe.id;
        // Backbone.history.navigate(nav, {trigger:true});
      }, function(error) {
        // there was some error.
        console.log('error happened: ', error);
      });


      // recipeObj.steps.forEach(function(stepData){
      //   var step = new Step();
      //   step.set("directions", stepData.directions);
      //   step.set("parent", object.id);
      //   step.save(null).then(
      //     function(object) {
      //       // the object was saved.
      //     },
      //     function(error) {
      //       // saving the object failed.
      //     });
      //   )
      //   stepArray.push(step);
      //   stepData.ingredients.forEach(function(ingredientData){
      //     var ingredient = new Ingredient(ingredientData);
      //     ingredient.set("parent", step);
      //     ingredientArray.push(ingredient);
      //     ingredient.save();
      //   });
      // });
      // console.log('stepArray: ', stepArray);
      // console.log('ingredientArray: ', ingredientArray );
      // newRecipe.save(null, {
      //   success: function(recipe) {
      //     // Execute any logic that should take place after the object is saved.
      //     console.log('New object created with objectId: ' + recipe.id);
      //     var nav = 'recipe/' + recipe.id;
      //     Backbone.history.navigate(nav, {trigger:true});
      //   },
      //   error: function(recipe, error) {
      //     // Execute any logic that should take place if the save fails.
      //     // error is a Parse.Error with an error code and message.
      //     console.log('Failed to create new object, with error: ' + error);
      //   }
      // });
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
    user.setACL(new Parse.ACL(user));
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
