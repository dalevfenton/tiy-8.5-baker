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
var Step = require('./step.jsx');

var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var NewRecipe = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
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
  handleSubmit: function(e){
    e.preventDefault();
    //do submission
    console.log(this.state);
    this.props.newRecipe(this.state);
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
      return <Step step={step} index={index} key={index} />
    });
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
                      defaultChecked onChange={this.setVisiblity} />
                  </div>
                  <div className="col-sm-3">
                    <Input type="radio" name="pubpriv"
                      value="private" label="Private"
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
            <ButtonInput type="submit" block value="Save This Recipe!"
              bsStyle="success" />
          </form>
        </Panel>
      </div>
    );
  }
});

module.exports = NewRecipe;
