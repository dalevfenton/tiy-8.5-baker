var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var router = require('./router');
var Interface = require('./components/interface.jsx');

Backbone.history.start();

ReactDOM.render(
  React.createElement(
    Interface,
    { router: router }
  ),
  document.getElementById('app')
);

// TODO:
//updating doesn't work when you need to add a step or ingredient to a post
//need to figure out how to unmount compnents on link clicks so they reset
//need to add a bunch of recipes by different users to test with
//rebuild routes to be inline with RESTful standard design
