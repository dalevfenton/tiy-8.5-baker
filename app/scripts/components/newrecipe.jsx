var React = require('react');
var Parse = require('parse');
var _ = require('underscore');
var $ = require('jquery');

var Panel = require('react-bootstrap').Panel;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Image = require('react-bootstrap').Image;
var Glyphicon = require('react-bootstrap').Glyphicon;

var TitleChiron = require('./titlechiron.jsx');
var RecipeStep = require('./recipestep.jsx');
var Step = require('./step.jsx');

var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var NewRecipe = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      picture: '',
      title: '',
      pubpriv: 'public',
      recipeType: '',
      prepTime: '',
      cookTime: '',
      temp: '',
      tempScale: 0,
      servings: '',
      steps: [],
      notes: ''
    }
  },
  componentWillMount: function(){
    if(this.props.type == "edit"){
      //lets get our recipe object and set the state
      var Recipe = Parse.Object.extend("Recipe");
      var Step = Parse.Object.extend("Step");
      var Ingredient = Parse.Object.extend("Ingredient");

      var recipe, steps;
      var stepsJSON = [];

      var query = new Parse.Query(Recipe);
      query.get(this.props.id).then(function(recipeObj) {
        // the recipe listing was retrieved
        recipe = recipeObj;
        var query = new Parse.Query(Step);
        query.equalTo("parent", recipeObj.id);
        //return a promise so that we can chain
        return query.find();
      }).then(function(stepsObjs){
        // the steps for the recipe are retrieved
        steps = stepsObjs;
        var promises = [];
        _.each(stepsObjs, function(stepObj){
          var query = new Parse.Query(Ingredient);
          query.equalTo("parent", stepObj.id);
          promises.push(query.find());
        });
        // Return a new promise that is resolved when all of the finds are finished.
        return Parse.Promise.when(promises);
      }).then(function(ingredients){
        //reassociate the ingredients with their respective steps
        _.each(steps, function(step, index){
          step.set("ingredients", ingredients[index]);
          var jason = step.toJSON();
          jason.ingredients = [];
          _.each(ingredients[index], function(ingredient, index){
            jason.ingredients.push(ingredient.toJSON());
          });
          stepsJSON.push(jason);
          // stepsJSON[index].ingredients.push(ingredients[index].toJSON());
        })
        //set the steps on the recipe
        recipe.set("steps", steps);

        //infer the correct public / private value from the ACL
        var pubpriv;
        if ( recipe.get('ACL').getPublicReadAccess() ){
          pubpriv = 'public';
        }else{
          pubpriv = 'private';
        }
        //set the recipe Parse object so we can pass it if needed
        this.recipe = recipe;
        this.setState({
          picture: recipe.get('picture'),
          title: recipe.get('title'),
          pubpriv: pubpriv,
          recipeType: recipe.get('recipeType'),
          prepTime: recipe.get('prepTime'),
          cookTime: recipe.get('cookTime'),
          temp: recipe.get('temp'),
          tempScale: recipe.get('tempScale'),
          servings: recipe.get('servings'),
          steps: stepsJSON,
          notes: recipe.get('notes')
        });
      }.bind(this),function(error){
        console.log('error happened', error);
      });
    }
  },
  setVisiblity: function(e){
    this.setState({'pubpriv': e.target.value });
  },
  getTempScale: function(e, key){
    this.setState({'tempScale': key });
  },
  addStep: function(stepObj){
    var steps = this.state.steps;
    steps.push(stepObj);
    this.setState({'steps': steps});
  },
  editStep: function(stepObj, index){
    var curSteps = this.state.steps;
    curSteps[index] = stepObj;
    this.setState({'steps': curSteps });
  },
  editIngredient: function(ingredientObj, index){
    console.log('edit ingredient', ingredientObj);
  },
  deleteIngredient: function(ingredientObj, index){
    console.log('delete ingredient', ingredientObj);
  },
  handlePicture: function(e){
    e.preventDefault();
    //this works too but it very ugly
    // console.log(this.refs.fileInput.getInputDOMNode().files);
    var name = this.props.user.id + Date.now() + ".jpg";
    var file = new Parse.File(name, e.target.files[0] );
    file.save().then(function(file){
      console.log(file);
      this.setState({picture: file});
    }.bind(this)
    , function(error){
      console.log('error saving file', error);
    });
  },
  handleSubmit: function(e){
    e.preventDefault();
    //do submission
    console.log(this.state);
    this.props.recipeSubmit(this.state, this.props.type, this.recipe);
  },
  render: function(){
    var tempSc = ['F', 'C'][this.state.tempScale];
    var innerDropdown = (
      <DropdownButton
        title={ tempSc }
        id="input-dropdown-addon"
        onSelect={ this.getTempScale }
        key={ this.state.tempScale } >
        <MenuItem eventKey="0" key="0">&deg;F</MenuItem>
        <MenuItem eventKey="1" key="1">&deg;C</MenuItem>
      </DropdownButton>
    );
    var steps = this.state.steps.map(function(step, index){
      return <Step step={step} index={index} key={index} editStep={this.editStep} />
    }.bind(this));
    var button;
    if(this.props.user){
      button = (
        <ButtonInput type="submit" block value="Save This Recipe!"
          bsStyle="success" />
      );
    }else{
      button = (
        <ButtonInput type="button" block value="Login To Save Your Recipe"
          bsStyle="success" onClick={this.props.modalOpen} />
      );
    }
    var fileLabel = (
      <div className="file-label">
        <div><Glyphicon glyph="plus" /></div>
        <div>Add Photo</div>
      </div>
    );
    var fileDisplay;
    if(this.state.picture){
      fileDisplay = (
          <img src={this.state.picture.url()} />
      );
    }else{
      fileDisplay = (<Input id="fileInput" type="file" ref="fileInput"
        onChange={this.handlePicture}
        label={fileLabel} bsSize="small" />);
    }
    return (
      <div>
        <Panel header="Add A New Recipe">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <TitleChiron title="Basic Info" />
              </div>
              <div className="col-sm-3">
                <div className="fileblock">
                  {fileDisplay}
                </div>
              </div>
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-sm-12">
                    <Input type="text" placeholder="Recipe Name"
                      valueLink={this.linkState('title')} />
                  </div>
                  <div className="col-sm-6">
                    <Input type="number" placeholder="Prep Time" addonAfter="mins"
                      valueLink={this.linkState('prepTime')} />
                  </div>
                  <div className="col-sm-6">
                    <Input type="number" placeholder="Cook Time" addonAfter="mins"
                      valueLink={this.linkState('cookTime')} />
                  </div>
                  <div className="col-sm-6">
                    <Input type="select" placeholder="Recipe Type"
                      valueLink={this.linkState('recipeType')}
                      >
                      <option value="Recipe Type">Recipe Type</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Appetizer">Appetizer</option>
                    </Input>
                  </div>
                  <div className="col-sm-6">
                    <Input type="number" placeholder="Cooking Temp"
                      buttonAfter={innerDropdown}
                      getScale={this.getCookingTemp}
                      valueLink={this.linkState('temp')} />
                  </div>
                  <div className="col-sm-3">
                    <Input type="radio" name="pubpriv"
                      value="public" label="Public"
                      checked={this.state.pubpriv == 'public'}
                      onChange={this.setVisiblity} />
                  </div>
                  <div className="col-sm-3">
                    <Input type="radio" name="pubpriv"
                      value="private" label="Private"
                      checked={this.state.pubpriv == 'private'}
                      onChange={this.setVisiblity} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input type="number" addonBefore="This Recipe Will Make"
                  addonAfter="Servings" valueLink={this.linkState('servings')} />
              </div>
            </div>
            <div className="row">
              {steps}
            </div>
            <div className="row">
              <RecipeStep index={this.state.steps.length + 1} addStep={this.addStep}/>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <TitleChiron title="Personal Notes" />
                <Input type="textarea" placeholder="Add Your Notes Here"
                  valueLink={this.linkState('notes')} />
              </div>
            </div>
            {button}

          </form>
        </Panel>
      </div>
    );
  }
});

module.exports = NewRecipe;
