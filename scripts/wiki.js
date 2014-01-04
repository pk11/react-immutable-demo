/** @jsx React.DOM */

var AutoComplete = React.createClass({
  render: function() {
    console.log(this.props.name);
    return (
      <p>{this.props.name}</p>     
    );
  }
});

var AutoCompleteBox = React.createClass({
  render: function() {
    var nodes = this.props.list.map(function(item){
      return <AutoComplete name={item} />;
    });
    return (
      <div className="autocompleteNodes">
        {nodes.mutable()}
      </div>
    );
  }
});

var WikiBox = React.createClass({
  getInitialState: function() {
    return {autocomplete: immutable.array([])};
  },
  makeCall: function(k) {
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search="+encodeURIComponent(k);
      $.getJSON(wikiUrl, function(data) {
           this.setState({autocomplete: immutable.array(data[1])});
        }.bind(this)
      );
  },
  handleKeyUp : function (e) {
     var k = e.target.value;
     if (k.length > 3 ) {
      this.makeCall(k);
    }
    if (k.length == 0 && this.state.autocomplete.length > 0 ) {
       this.setState({autocomplete: immutable.array([])});
    }
    return false;
  },
  render: function() {
    return (
      <div className="wikibox">
        <span>Give it a try:</span>
        <input type="text" placeholder="search" onKeyUp={this.handleKeyUp} />
        <AutoCompleteBox list={this.state.autocomplete} />
      </div>  
    );
  }
});

React.renderComponent(
  <WikiBox />,
  document.getElementById('container')
);
