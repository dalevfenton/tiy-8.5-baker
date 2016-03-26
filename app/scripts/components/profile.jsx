var React = require('react');
var Parse = require('parse');
var Backbone = require('backbone');

var Table = require('react-bootstrap').Button;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var TitleChiron = require('./titlechiron.jsx');

var UserRecipes = React.createClass({
  getInitialState: function(){
    return {
      recipes: null
    }
  },
  componentWillMount: function(){
    var Recipe = Parse.Object.extend("Recipe");
    var query = new Parse.Query(Recipe);
    query.equalTo( "authorId", this.props.user.id );
    query.find().then( function(recipes){
      // the recipe listings were retrieved
      // console.log(recipes);
      this.setState({'recipes': recipes});
    }.bind(this),
    function(error){
      console.log('error in profile recipes query: ', error);
    });
  },
  render: function(){
    var recipes;
    if(this.state.recipes){
      recipes = this.state.recipes.map(function(recipe){
        return (
          <tr key={recipe.id}>
            <td>Title</td>
            <td>Type</td>
          </tr>
        );
      });
    }
    return (
      <Table striped responsive hover>
        <tbody>
          <tr>
            <td>Title</td>
            <td>Type</td>
          </tr>
        </tbody>
      </Table>
    );
  }
});

var Profile = React.createClass({
  render: function(){
    if(this.props.user){
      var user = this.props.user.attributes;
      console.log(user);
      return (
        <div>
          <TitleChiron title="Your Information" />
          <div className="row">
            <div className="col-sm-6">
              <div className="user-info">{user.firstname}</div>
            </div>
            <div className="col-sm-6">
              <div className="user-info">{user.lastname}</div>
            </div>
            <div className="col-sm-6">
              <div className="user-info">{user.username}</div>
            </div>
            <div className="col-sm-6">
              <div className="user-info">{user.email}</div>
            </div>
            <div className="col-sm-12">
              <Button>Reset Your Password</Button>
              <Button>Edit Your Profile</Button>
            </div>
          </div>
          <TitleChiron title="Your Recipes" />
          <div className="row">
            <div className="col-sm-12">
              <UserRecipes user={this.props.user} />
            </div>
          </div>
        </div>
      );
    }else{
      Backbone.history.navigate("", {trigger:true});
    }
  }
});

module.exports = Profile;
