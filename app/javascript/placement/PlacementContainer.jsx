import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import ClientService from '../_services/client';
import { Filters, PlacementMap, PlacementList } from './_components';

export const fixMisspelling = record => {
  const { lattitude, ...addressProps } = record.address;
  return {
    ...record,
    address: {
      ...addressProps,
      latitude: lattitude,
    },
  };
};

export const isNotBogusAddress = record =>
  !!record.address && !!record.address.latitude && !!record.address.longitude;

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
    const clients$ = ClientService.getRelatedClientsByChildClientId(
      this.getClientId()
    ).then(records => {
      return records
        .filter(record => !!record.address)
        .map(fixMisspelling)
        .filter(isNotBogusAddress);
    });

    clients$.then(records => {
      const relatedClients = records.filter(
        record => record.identifier !== this.getClientId()
      );
      if (!relatedClients.length)
        console.error(
          'Garbage response from API! No relatedClients can be mapped!'
        );
      this.setState({
        relatedClients: {
          ...this.state.relatedClients,
          records: relatedClients,
          XHRStatus: 'ready',
        },
      });
    });

    return clients$;
  }

  componentDidMount() {
    const clients$ = this.fetchRelatedClients();
    clients$
      .then(clients =>
        clients.find(client => client.identifier === this.getClientId())
      )
      .then(focusChild => {
        if (!focusChild)
          console.error(
            'Garbage response from API! The focusChild does not have required values and can not be mapped!'
          );
        this.setState({
          focusChild: { XHRStatus: 'ready', record: focusChild },
        });
      });
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
                render={() =>
                  this.state.relatedClients.XHRStatus === 'ready' &&
                  this.state.focusChild.XHRStatus === 'ready' && (
                    <PlacementMap
                      relatedClients={this.state.relatedClients.records}
                      focusChild={this.state.focusChild.record}
                    />
                  )
                }
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
