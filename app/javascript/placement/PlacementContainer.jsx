import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import ClientService from '../_services/client';
import { Filters, PlacementMap, PlacementList } from './_components';

// TODO: Consume service after #204 is merged
// https://github.com/ca-cwds/case-management/pull/204
const MOCK_FOCUS_CHILD = {
  identifier: '123',
  address: {
    longitude: -121.46,
    latitude: 38.66,
  },
};

class PlacementContainer extends Component {
  static get propTypes() {
    return {
      match: PropTypes.shape({
        params: PropTypes.shape({
          clientId: PropTypes.string,
        }).isRequired,
      }).isRequired,
      history: PropTypes.shape({
        push: PropTypes.func,
      }).isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      relatedClients: {
        XHRStatus: 'idle',
        records: undefined,
      },
      focusChild: {
        XHRStatus: 'idle',
        record: undefined,
      },
      views: [
        {
          name: 'list',
          displayName: 'List',
          component: PlacementList,
          isVisible: false,
        },
        {
          name: 'map',
          displayName: 'Map',
          component: PlacementMap,
          isVisible: true,
        },
      ],
    };
  }

  getClientId() {
    return this.props.match.params.clientId;
  }

  fetchRelatedClients() {
    ClientService.getRelatedClientsByChildClientId(this.getClientId()).then(
      records => {
        this.setState({
          relatedClients: {
            ...this.state.relatedClients,
            records,
            XHRStatus: 'ready',
          },
        });
      }
    );
  }

  fetchFocusChild() {
    Promise.resolve(MOCK_FOCUS_CHILD).then(focusChild => {
      this.setState({
        focusChild: { XHRStatus: 'ready', record: focusChild },
      });
    });
  }

  componentDidMount() {
    this.fetchFocusChild();
    this.fetchRelatedClients();
  }

  renderViewPicker() {
    const { history } = this.props;
    return (
      <div className="btn-group" role="group" aria-label="...">
        {this.state.views.map(view => (
          <button
            key={view.name}
            type="button"
            className={classNames({
              'btn btn-default': true,
              active: false,
            })}
            onClick={() => {
              history.push(view.name);
            }}
          >
            {view.displayName}
          </button>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row text-right">{this.renderViewPicker()}</div>
        <div className="row">
          <div className="col-md-3">
            <Filters />
          </div>
          <div className="col-md-9">
            <Switch>
              <Route
                path="/client/:clientId/map"
                render={() => (
                  <PlacementMap
                    relatedClients={this.state.relatedClients.records}
                    focusChild={this.state.focusChild.record}
                  />
                )}
              />
              <Route
                path="/client/:clientId/list"
                render={() => (
                  <PlacementList
                    relatedClients={this.state.relatedClients.records}
                  />
                )}
              />
              <Route
                render={({ match }) => {
                  const { clientId } = match.params;
                  const redirect = clientId ? `/client/${clientId}/map` : '/';
                  return <Redirect to={redirect} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default PlacementContainer;
