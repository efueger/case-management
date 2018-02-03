import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalHeader, PageHeader } from 'react-wood-duck';
import PlacementContainer from './PlacementContainer';

const propTypes = {
  basename: PropTypes.string.isRequired,
};

const defaultProps = {
  basename: '/placement/',
};

const PlacementApp = ({ basename }) => (
  <Router basename={basename}>
    <div>
      <GlobalHeader logoCallback={() => (window.location.href = '/')} />
      <PageHeader pageTitle="Placement Tool" button={null} />
      <Route path="/client/:clientId" component={PlacementContainer} />
      <Route
        path="/"
        exact
        render={() => {
          return (
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <h3>OH Snap!</h3>
                  <p>
                    You need a <tt>childClientId</tt> to get started
                  </p>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  </Router>
);

PlacementApp.propTypes = propTypes;
PlacementApp.defaultProps = defaultProps;

export default PlacementApp;
