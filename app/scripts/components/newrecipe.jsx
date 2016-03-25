var React = require('react');
var Panel = require('react-bootstrap').Panel;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonInput = require('react-bootstrap').ButtonInput;
var Image = require('react-bootstrap').Image;
var TitleChiron = require('./titlechiron.jsx');
var RecipeStep = require('./recipestep.jsx');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var NewRecipe = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      title: '',
      user: '',
      pubpriv: 'public',
      recipeType: '',
      prepTime: '',
      cookTime: '',
      temp: '',
      tempScale: '',
      servingsBase: '',
      steps: [],
      notes: ''
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    console.log(this.state);
  },
  render: function(){
    var innerDropdown = (
      <DropdownButton title="&deg;F" id="input-dropdown-addon">
        <MenuItem key="1">&deg;F</MenuItem>
        <MenuItem key="2">&deg;C</MenuItem>
      </DropdownButton>
    );
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
                </div>
                <Input type="file" />
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
                    <Input type="number" placeholder="Cooking Temp" buttonAfter={innerDropdown} />
                  </div>
                  <div className="col-sm-3">
                    <Input type="radio" name="pubpriv" value="public" label="Public" defaultChecked />
                  </div>
                  <div className="col-sm-3">
                    <Input type="radio" name="pubpriv" value="private" label="Private" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input type="number" addonBefore="This Recipe Will Make" addonAfter="Servings" />
              </div>
            </div>
            <div className="row">
              <RecipeStep index={1} />
            </div>
            <div className="row">
              <div className="col-sm-12">
                <TitleChiron title="Personal Notes" />
                <Input type="textarea" placeholder="Add Your Notes Here" />
              </div>
            </div>
            <ButtonInput type="submit" block value="Save This Recipe!"
              bsStyle="success" />
          </form>
        </Panel>
      </div>
    );
  }
});

module.exports = NewRecipe;
