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
        <div className='clearfix pad1'>
          {/* Geocoder:
              accessToken -- Mapbox developer access token (required)
              onSelect    -- function called after selecting result (required)
              showLoader  -- Boolean to attach `.loading` class to results list
          */}
          <Geocoder
            accessToken='pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ'
            onSelect={this.onSelect}
            showLoader={true}
            />
        </div>
        {this.state.value && <pre className='keyline-all'>{JSON.stringify(this.state.value, null, 2)}</pre>}
      </div>
    );
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
React.render(<Example />, document.getElementById('app'));
/* jshint ignore:end */
