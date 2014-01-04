/** @jsx React.DOM */

var AutoComplete = React.createClass({
  render: function() {
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
    return {autocomplete: immutable.array([]), call: {latest:0, term:''}};
  },
  makeCall: function(term, current) {
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search="+encodeURIComponent(term);
    $.getJSON(wikiUrl, function(data) {
           if (current == this.state.call.latest) {
              var newPriority = this.state.call.latest - 1;
              this.setState({autocomplete: immutable.array(data[1]), call: {latest: newPriority, term:''} });
           } 
        }.bind(this)
    );
  },
  handleKeyUp : function (e) {
     var k = e.target.value;
     if (k.length > 3 ) {
       var priority = this.state.call.latest+1;
       this.setState({call: {latest: priority, term: k }});
     }
     if (k.length == 0 && this.state.autocomplete.length > 0 ) {
       this.setState({autocomplete: immutable.array([]), call: {latest:0, term:''}});
     }
     return false;
  },
  render: function() {
    if (this.state.call.latest > 0 && this.state.call.term != '') {
      this.makeCall(this.state.call.term, this.state.call.latest);
    } 
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
