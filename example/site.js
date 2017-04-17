import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Geocoder from '../src';

class Example extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      value: null
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect (value) {
    this.setState({ value });
  }

  render () {
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
}

/* jshint ignore:start */
ReactDOM.render(<Example />, document.getElementById('app'));
/* jshint ignore:end */
