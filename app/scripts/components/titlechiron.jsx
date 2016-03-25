var React = require('react');

var TitleChiron = React.createClass({
  render: function(){
    var link = '';
    if(this.props.link){
      link = ( <div className="title-chiron-link"><a href={this.props.link}>{this.props.linkTitle}</a></div> );
    }
    return (
      <div className="title-chiron">
        <div className="title-chiron-title">{this.props.title}</div>
        {link}
        <div className="title-chiron-border"></div>
      </div>
    );
  }
});

module.exports = TitleChiron;
