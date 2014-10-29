/** @jsx React.DOM */
var React = require('react'),
  search = require('./search');

var Geocoder = React.createClass({
  getDefaultProps: function() {
    return {
      endpoint: 'http://api.tiles.mapbox.com',
      source: 'mapbox.places-v1'
    };
  },
  getInitialState: function() {
    return {
      results: [],
      focus: null
    };
  },
  propTypes: {
    endpoint: React.PropTypes.string,
    source: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
    accessToken: React.PropTypes.string.isRequired
  },
  onInput: function(e) {
    var value = e.target.value;
    if (value === '') {
      this.setState({
        results: [],
        focus: null
      });
    } else {
      search(
        this.props.endpoint,
        this.props.source,
        this.props.accessToken,
        value,
        this.onResult);
    }
  },
  moveFocus: function(dir) {
    this.setState({
      focus: this.state.focus === null ?
        0 : Math.max(0,
          Math.min(
            this.state.results.length - 1,
            this.state.focus + dir))
    });
  },
  acceptFocus: function() {
    if (this.state.focus !== null) {
      this.props.onSelect(this.state.results[this.state.focus]);
    }
  },
  onKeyDown: function(e) {
    switch (e.which) {
      // up
      case 38:
        this.moveFocus(-1);
        break;
      // down
      case 40:
        this.moveFocus(1);
        break;
      // accept
      case 13:
        this.acceptFocus();
        break;
    }
  },
  onResult: function(err, res, body) {
    if (!err && body && body.features) {
      this.setState({
        results: body.features,
        focus: null
      });
    }
  },
  clickOption: function(place) {
    this.props.onSelect(place);
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <input
          onInput={this.onInput}
          onKeyDown={this.onKeyDown}
          type='text' />
        {this.state.results.map(function(result, i) {
          return <div
            onClick={this.clickOption.bind(this, result)}
            className={i === this.state.focus ? ' loud' : ''}
            key={result.id}>{result.place_name}</div>;
        }.bind(this))}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = Geocoder;
