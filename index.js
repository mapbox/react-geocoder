var React = require('react'),
  ReactDOM = require('react-dom'),
  search = require('./search');

/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an autocompleting interface for finding locations.
 */
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
      showLoader: false,
      source: 'mapbox.places',
      proximity: '',
      bbox: '',
      types: '',
      onSuggest: function() {},
      focusOnMount: true
    };
  },
  getInitialState() {
    return {
      results: [],
      focus: null,
      loading: false,
      searchTime: new Date()
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
    onSuggest: React.PropTypes.func,
    accessToken: React.PropTypes.string.isRequired,
    proximity: React.PropTypes.string,
    bbox: React.PropTypes.string,
    showLoader: React.PropTypes.bool,
    focusOnMount: React.PropTypes.bool,
    types: React.PropTypes.string
  },
  componentDidMount() {
    if (this.props.focusOnMount) ReactDOM.findDOMNode(this.refs.input).focus();
  },
  onInput(e) {
    this.setState({loading:true});
    var value = e.target.value;
    if (value === '') {
      this.setState({
        results: [],
        focus: null,
        loading:false
      });
    } else {
      search(
        this.props.endpoint,
        this.props.source,
        this.props.accessToken,
        this.props.proximity,
        this.props.bbox,
        this.props.types,
        value,
        this.onResult);
    }
  },
  moveFocus(dir) {
    if(this.state.loading) return;
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
        e.preventDefault();
        this.moveFocus(-1);
        break;
      // down
      case 40:
        this.moveFocus(1);
        break;
      // accept
      case 13:
        if( this.state.results.length > 0 && this.state.focus == null) {
          this.clickOption(this.state.results[0],0);
        }
        this.acceptFocus();
        break;
    }
  },
  onResult(err, res, body, searchTime) {
    // searchTime is compared with the last search to set the state
    // to ensure that a slow xhr response does not scramble the
    // sequence of autocomplete display.
    if (!err && body && body.features && this.state.searchTime <= searchTime) {
      this.setState({
        searchTime: searchTime,
        loading: false,
        results: body.features,
        focus: null
      });
      this.props.onSuggest(this.state.results);
    }
  },
  clickOption(place, listLocation) {
    this.props.onSelect(place);
    this.setState({focus:listLocation});
    // focus on the input after click to maintain key traversal
    ReactDOM.findDOMNode(this.refs.input).focus();
    return false;
  },
  render() {
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
          <ul className={`${this.props.showLoader && this.state.loading ? 'loading' : ''} ${this.props.resultsClass}`}>
            {this.state.results.map((result, i) => (
              <li key={result.id}>
                <a href='#'
                  onClick={this.clickOption.bind(this, result, i)}
                  className={this.props.resultClass + ' ' + (i === this.state.focus ? this.props.resultFocusClass : '')}
                  key={result.id}>{result.place_name}</a>
              </li>
            ))}
          </ul>
        )}
        {this.props.inputPosition === 'bottom' && input}
      </div>
    );
  }
});

module.exports = Geocoder;
