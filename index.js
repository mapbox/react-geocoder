'use strict';

var React = require('react'),
    search = require('./search');

var Geocoder = React.createClass({
  displayName: 'Geocoder',

  getDefaultProps: function getDefaultProps() {
    return {
      endpoint: 'https://api.tiles.mapbox.com',
      inputClass: '',
      resultClass: '',
      resultsClass: '',
      resultFocusClass: 'strong',
      inputPosition: 'top',
      inputPlaceholder: 'Search',
      source: 'mapbox.places-v1'
    };
  },
  getInitialState: function getInitialState() {
    return {
      results: [],
      focus: null
    };
  },
  propTypes: {
    endpoint: React.PropTypes.string,
    source: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    resultClass: React.PropTypes.string,
    resultsClass: React.PropTypes.string,
    inputPosition: React.PropTypes.string,
    inputPlaceholder: React.PropTypes.string,
    resultFocusClass: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
    accessToken: React.PropTypes.string.isRequired
  },
  componentDidMount: function componentDidMount() {
    this.refs.input.getDOMNode().focus();
  },
  onInput: function onInput(e) {
    var value = e.target.value;
    if (value === '') {
      this.setState({
        results: [],
        focus: null
      });
    } else {
      search(this.props.endpoint, this.props.source, this.props.accessToken, value, this.onResult);
    }
  },
  moveFocus: function moveFocus(dir) {
    this.setState({
      focus: this.state.focus === null ? 0 : Math.max(0, Math.min(this.state.results.length - 1, this.state.focus + dir))
    });
  },
  acceptFocus: function acceptFocus() {
    if (this.state.focus !== null) {
      this.props.onSelect(this.state.results[this.state.focus]);
    }
  },
  onKeyDown: function onKeyDown(e) {
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
  onResult: function onResult(err, res, body) {
    if (!err && body && body.features) {
      this.setState({
        results: body.features,
        focus: null
      });
    }
  },
  clickOption: function clickOption(place) {
    this.props.onSelect(place);
    return false;
  },
  render: function render() {
    var _this = this;

    /* jshint ignore:start */
    var input = React.createElement('input', {
      ref: 'input',
      className: this.props.inputClass,
      onInput: this.onInput,
      onKeyDown: this.onKeyDown,
      placeholder: this.props.inputPlaceholder,
      type: 'text' });
    return React.createElement(
      'div',
      null,
      this.props.inputPosition === 'top' ? input : null,
      this.state.results.length > 0 && React.createElement(
        'ul',
        { className: this.props.resultsClass },
        this.state.results.map(function (result, i) {
          return React.createElement(
            'li',
            { key: 'geocoder-' + result.id },
            React.createElement(
              'a',
              { href: '#',
                onClick: _this.clickOption.bind(_this, result),
                className: _this.props.resultClass + ' ' + (i === _this.state.focus ? _this.props.resultFocusClass : '')
              },
              result.place_name
            )
          );
        })
      ),
      this.props.inputPosition === 'bottom' ? input : null
    );
    /* jshint ignore:end */
  }
});

module.exports = Geocoder;

