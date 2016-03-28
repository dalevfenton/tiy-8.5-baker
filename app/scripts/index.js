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
//delete buttons are in but non functional
//gallery pages for specific types ( aka category page template not built out )
//need to add a bunch of recipes by different users to test with
//rebuild routes to be inline with RESTful standard design
