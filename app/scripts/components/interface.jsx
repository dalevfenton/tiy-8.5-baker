var React = require('react');

var Interface = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router
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
    //home screen
    if(this.state.router.current == 'home'){
      return( <div className="container"><h1>Index</h1></div>);
    }

    //new recipe form
    if(this.state.router.current == 'new'){
      return( <div className="container"><h1>New</h1></div>);
    }

    //recipe view screen
    if(this.state.router.current == 'preview'){
      return( <div className="container"><h1>Preview</h1></div>);
    }
    return( <div className="container"><h1>Not Found</h1></div>);
  }
});

module.exports = Interface;
