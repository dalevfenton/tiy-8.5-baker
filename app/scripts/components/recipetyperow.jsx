var Backbone = require('backbone');
var Parse = require('parse');
var React = require('react');

var Glyphicon = require('react-bootstrap').Glyphicon;

var TitleChiron = require('./titlechiron.jsx');
var Loading = require('./loading.jsx');

var RecipeTypeRow = React.createClass({
  getInitialState: function(){
    return {
      recipes: null
    }
  },
  componentWillMount: function(){
    this.setState({"recipes": null});
    var Recipe = Parse.Object.extend("Recipe");
    var query = new Parse.Query(Recipe)
    query.limit(5);

    switch (this.props.type) {
      case 'user':
        if(this.props.user){
          //set user query
          query.equalTo( "authorId", this.props.user.id );
        }else{
          Backbone.history.navigate('', {trigger: true});
        }
        break;
      case 'public':
        //set user query
        break;
      case 'popular':
        //need to keep track of views on objects or something
        break;
      case 'favorite':
        if(this.props.user){
          var relation = Parse.User.current().relation("favorites");
          query = relation.query();
        }else{
          Backbone.history.navigate('', {trigger: true});
        }
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
        return (
          <div className="thumb-outer col-sm-3" key={recipe.id}>
            <div className="thumb-inner">
              <a href={"#recipe/" + recipe.id}>
                <img className="thumb-image" src={recipe.get('picture').url()} />
                <h6 className="thumb-title">{recipe.get('title')}</h6>
              </a>
            </div>
          </div> );
      });
    }else{
      recipes = (<Loading />);
    }
    var title = ( <span>View All <Glyphicon glyph="chevron-right" /></span> );
    return (
      <div className="row">
        <div className="col-sm-12">
          <TitleChiron title={labels[this.props.type]} link={ "#type/" + this.props.type }
            linkTitle={title} />
          <div className="row">
            {recipes}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RecipeTypeRow;
