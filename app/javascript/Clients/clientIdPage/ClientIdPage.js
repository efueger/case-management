import React from 'react';
import ClientInformation from './ClientInformation';
import OtherClientInformation from './OtherClientInformation';
import SafetyAlertInformation from './SafetyAlertInformation';
import { GlobalHeader, PageHeader } from 'react-wood-duck';
import ClientIdSideBar from './ClientIdSideBar';
import ClientService from '../../_services/client';
import RelationsCard from './Relationships/RelationsCard';

import RaceEthnicityForm from './RaceEthnicity/RaceEthnicityForm';

export default class ClientIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      relatedClients: {
        XHRStatus: 'idle',
        records: undefined,
      },
    };
  }

  componentDidMount() {
    this.fetchRelatedClients();
  }

  fetchRelatedClients() {
    const clientId = 'AazXkWY06s';
    ClientService.getRelatedClientsByChildClientId(clientId)
      .then(records => {
        return records.filter(record => !!record.address);
      })
      .then(records => {
        const relatedClients = records.filter(
          record => record.identifier !== clientId
        );
        if (!relatedClients.length)
          this.setState({
            relatedClients: {
              ...this.state.relatedClients,
              records: relatedClients,
              XHRStatus: 'ready',
            },
          });
      })
      .catch(() => this.setState({ relatedClients: { XHRStatus: 'error' } }));
  }

  handleSelect(href, event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <GlobalHeader />
        <PageHeader pageTitle="Child Name" button="" />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <ClientIdSideBar handleSelect={this.handleSelect} />
            </div>
            <div className="col-sm-9">
              <ClientInformation anchorId="clientInformation" />
              <OtherClientInformation anchorId="otherCLientInformation" />
              <SafetyAlertInformation anchorId="safetyAlertInformation" />
              <RaceEthnicityForm anchorId="raceEthnicity" />
              <RelationsCard
                anchorId="relationshipsView"
                relatedClients={this.state.relatedClients.records}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
