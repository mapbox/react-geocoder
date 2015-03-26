var React = require('react'),
  search = require('./search');

var Geocoder = React.createClass({
  getDefaultProps() {
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
  getInitialState() {
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
  componentDidMount() {
    this.refs.input.getDOMNode().focus();
  },
  onInput(e) {
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
  moveFocus(dir) {
    this.setState({
      focus: this.state.focus === null ?
        0 : Math.max(0,
          Math.min(
            this.state.results.length - 1,
            this.state.focus + dir))
    });
  },
  acceptFocus() {
    if (this.state.focus !== null) {
      this.props.onSelect(this.state.results[this.state.focus]);
    }
  },
  onKeyDown(e) {
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
  onResult(err, res, body) {
    if (!err && body && body.features) {
      this.setState({
        results: body.features,
        focus: null
      });
    }
  },
  clickOption(place) {
    this.props.onSelect(place);
    return false;
  },
  render() {
    /* jshint ignore:start */
    var input = <input
      ref='input'
      className={this.props.inputClass}
      onInput={this.onInput}
      onKeyDown={this.onKeyDown}
      placeholder={this.props.inputPlaceholder}
      type='text' />;
    return (
      <div>
        {this.props.inputPosition === 'top' && input}
        {this.state.results.length > 0 && (
          <ul className={this.props.resultsClass}>
            {this.state.results.map((result, i) => (
              <li key={result.id}>
                <a href='#'
                  onClick={this.clickOption.bind(this, result)}
                  className={this.props.resultClass + ' ' + (i === this.state.focus ? this.props.resultFocusClass : '')}
                  key={result.id}>{result.place_name}</a>
              </li>
            ))}
          </ul>
        )}
        {this.props.inputPosition === 'bottom' && input}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = Geocoder;
