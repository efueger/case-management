import React from 'react';
import { GlobalHeader, PageHeader, Alert } from 'react-wood-duck';
import { DataGridCard } from '../_components';
import ClientDetailsService from '../_services/clientdetails';

class ClientsHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientdetails: { XHRStatus: 'idle' },
    };
  }

  componentDidMount() {
    this.fetchClientDetails();
  }

  fetchClientDetails = () => {
    this.setState({ clientdetails: { XHRStatus: 'waiting' } });
    return ClientDetailsService.fetch()
      .then(clientdetails =>
        this.setState({
          clientdetails: {
            XHRStatus: 'ready',
            records: clientdetails,
          },
        })
      )
      .catch(() => this.setState({ clientdetails: { XHRStatus: 'error' } }));
  };

  renderClientDetails = () => {
    return (
      <DataGridCard
        cardHeaderText={getCardHeaderText(
          this.state.clientdetails,
          'Clients List'
        )}
        status={this.state.clientdetails.XHRStatus}
        columns={['Name', 'Type', 'Recieved Date']}
        rows={
          this.state.clientdetails.records &&
          this.state.clientdetails.records.map(record => [
            record.case_name,
            record.active_service_component,
            record.assignment_type,
          ])
        }
      />
    );
  };

  render() {
    return (
      <div>
        <GlobalHeader />
        <PageHeader pageTitle="Dashboard" button={null} />
        <div className="container">
          <div className="row">
            <div className="col-md-9">{this.renderClientDetails()}</div>
            <div className="col-md-3">
              <div className="list-group double-gap-top card">
                <span className="list-group-item">
                  <span className="card-header">Quick Links</span>
                </span>
                <a href="/clients/index" className="list-group-item">
                  Client ID Page
                </a>
                <a href="/family_finding/index" className="list-group-item">
                  Network Finding Tool
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientsHome;

function getCardHeaderText({ XHRStatus, records }, text = 'Records') {
  return XHRStatus === 'ready' && records && records.length
    ? `${text} (${records.length})`
    : text;
}
