var React = require('react');

var Header = require('./header.jsx');

var Interface = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router,
      user: null
    }
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
        <div>
          <h1>New Recipe</h1>
        </div>
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
      <div className="container">
        <Header page={this.state.router.current} user={this.state.user} />
        {body}
      </div>
    )
  }
});

module.exports = Interface;
