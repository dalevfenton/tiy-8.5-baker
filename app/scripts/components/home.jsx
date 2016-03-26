var React = require('react');
var Parse = require('parse');

var Glyphicon = require('react-bootstrap').Glyphicon;

var TitleChiron = require('./titlechiron.jsx');

var RecipeTypeRow = React.createClass({
  getInitialState: function(){
    return {
      recipes: null
    }
  },
  componentWillMount: function(){
    var Recipe = Parse.Object.extend("Recipe");
    var query = new Parse.Query(Recipe)
    query.limit(5);

    switch (this.props.type) {
      case 'user':
        //set user query
        query.equalTo( "authorId", this.props.user.id );
        console.log('query for user recipes: ');

        break;
      case 'public':
        //set user query
        break;
      case 'popular':
        //need to keep track of views on objects or something
        break;
      case 'favorite':
        //need to set favorites on user so that we can look them up here
        var testFavs = ['uGJRx36SoO'];
        // query.containedIn( "objectId", this.props.user.favorites );
        query.containedIn( "objectId", testFavs );
        break;
      default:
        query.equalTo("recipeType", this.props.type.toUpperCase() );
    };
    query.find().then( function(recipes){
      // the recipe listing was retrieved
      // console.log('recipes found for ' );
      // console.log(recipes);
      this.setState({'recipes': recipes});
    }.bind(this),
    function(error){
      console.log('error in RecipeRow query: ', error);
    });
  },
  render: function(){
    var recipes;
    var labels = {
      'user': 'My Recipes',
      'public': 'Browse All Recipes',
      'popular': 'Browse Popular Recipes',
      'favorite': 'Your Favorite Recipes',
      'breakfast': 'Breakfast Recipes',
      'lunch': 'Lunch Recipes',
      'dinner': 'Dinner Recipes',
      'dessert': 'Dessert Recipes',
      'appetizer': 'Appetizer Recipes',
    }
    if(this.state.recipes){
      recipes = this.state.recipes.map(function(recipe){
        return ( <div key={recipe.id}><h6>{recipe.get('title')}</h6></div> );
      });
    }
    var title = ( <span>View All <Glyphicon glyph="chevron-right" /></span> );
    return (
      <div className="row">
        <div className="col-sm-12">
          <TitleChiron title={labels[this.props.type]} link={ "type/" + this.props.type }
            linkTitle={title} />
          {recipes}
        </div>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function(){
    console.log(this.props.types);
    var recipeTypes = this.props.types.map(function(type){
      return <RecipeTypeRow type={type} key={type} user={this.props.user}/>
    }.bind(this));
    console.log(recipeTypes);
    return (
      <div>
        <h1>Home Page</h1>
        {recipeTypes}
      </div>
    );
  }
});

module.exports = Home;
