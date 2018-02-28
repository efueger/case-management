import React from 'react';
import ClientIdSideBar from './ClientIdSideBar';
import ClientInformation from './ClientInformation';
import ClientService from '../../_services/client';
import OtherClientInformation from './OtherClientInformation';
import RaceEthnicityForm from './RaceEthnicity/RaceEthnicityForm';
import RelationsCard from './Relationships/RelationsCard';
import SafetyAlertInformation from './SafetyAlertInformation';
import { getAgeUtil } from '../../_utils/ageCalc/getAgeFormat';
import { GlobalHeader, PageHeader } from 'react-wood-duck';

/* eslint-disable camelcase */
export const formatTable = client => {
  const {
    city = '',
    primary_phone = '',
    street_name = '',
    street_number = '',
  } =
    client.address || {};
  return {
    address: `${street_name} ${street_number}`,
    age: `${getAgeUtil(client.birth_dt).age} | ${client.birth_dt}`,
    city: city,
    name: `${client.common_first_name} ${client.common_last_name}`,
    phone: primary_phone,
  };
};
/* eslint-enable camelcase */
class ClientIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      relatedClients: {
        records: undefined,
        XHRStatus: 'idle',
      },
      formatTable: {
        records: undefined,
        XHRStatus: 'idle',
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
        this.setState({
          relatedClients: {
            records: relatedClients,
            XHRStatus: 'ready',
          },
          formatTable: {
            XHRStatus: 'ready',
            records: relatedClients.map(formatTable),
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
                relatedClients={this.state.formatTable.records}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientIdPage;
