var React = require('react'),
  Geocoder = require('../');

var Example = React.createClass({
  getInitialState: function() {
    return { value: null };
  },
  onSelect: function(value) {
    this.setState({ value: value });
  },
  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        <div className='clearfix pad1 keyline-bottom'>
          <Geocoder
            accessToken='pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ'
            onSelect={this.onSelect}
            />
        </div>
        {this.state.value && <pre>{JSON.stringify(this.state.value, null, 2)}</pre>}
      </div>
    );
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
React.render(<Example />, document.getElementById('app'));
/* jshint ignore:end */
