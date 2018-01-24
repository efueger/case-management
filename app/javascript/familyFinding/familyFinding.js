import AddressService from '../_services/address';
import axios from 'axios';
import React from 'react';
import RelationshipService from '../_services/relationship';
import { DataGridCard } from '../_components';
import {
  GlobalHeader,
  PageHeader,
  SideBar,
  DropDownField,
} from 'react-wood-duck';

const names = [
  { value: '', label: '- Select a child -' },
  { value: 'Tina Masterson', label: 'Tina Masterson', id: 'FplTfDs0Rx' },
  { value: 'Anderson, James', label: 'James Anderson' },
  { value: 'Sally Johnson', label: 'Sally Johnson' },
  { value: 'Kelly Marisol Smith', label: 'Kelly Marisol Smith' },
  { value: 'Keith Lovely', label: 'Keith Lovely' },
];

class FamilyFinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      relationships: { XHRStatus: 'idle' },
      records: [],
    };
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
  }

  fetchClientRelationships = id => {
    return RelationshipService.fetch(id)
      .then(relationships => {
        relationships[0].related_client.identifier = 'AaQshqm0Mb';
        relationships[1].related_client.identifier = 'AaQshqm0Mb';
        relationships[2].related_client.identifier = 'AaQshqm0Mb';
        this.fetchAddress(relationships);
      })
      .catch(() => this.setState({ relationships: { XHRStatus: 'error' } }));
  };

  fetchAddress = relationships => {
    return axios
      .all(
        relationships.map(value =>
          AddressService.fetch(value.related_client.identifier)
        )
      )
      .then(
        axios.spread((...results) => {
          relationships.map((value, index) => {
            value.address = results[index];
            value.address.zip = '808-96701';
          });
          this.setState({
            relationships: {
              XHRStatus: 'ready',
              records: relationships,
            },
          });
        })
      )
      .catch(() => this.setState({ relationships: { XHRStatus: 'error' } }));
  };

  handleChangeDropDown({ id, value }) {
    this.setState({ selectedOption: value });

    if (value !== '') this.fetchClientRelationships(id);
  }

  /* eslint-disable camelcase */
  renderRelationships = () => {
    const { XHRStatus, records } = this.state.relationships;
    if (XHRStatus === 'ready') {
      return records.map(({ address, related_client_id, related_client }) => {
        const id = related_client_id;
        const name = `${related_client.common_first_name} ${
          related_client.common_last_name
        }`;
        const home = `${address.street_number} ${address.street_name} ${
          address.city
        } ${address.zip}`;

        return (
          <DataGridCard
            key={id}
            cardHeaderText={name}
            status={XHRStatus}
            render={() => (
              <div>
                <div className="row">
                  <div className="col-xs-6" />
                  <div className="col-xs-6">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>Home: {home}</span>
                  </div>
                </div>
              </div>
            )}
          />
        );
      });
    } else {
      return (
        <DataGridCard
          cardHeaderText={getCardHeaderText(XHRStatus)}
          status={XHRStatus}
          render={() => {}}
        />
      );
    }
  };
  /* eslint-enable camelcase */

  render() {
    return (
      <div>
        <GlobalHeader />
        <PageHeader pageTitle="Network Finding Tool" button={null} />
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideBar>
                <DropDownField
                  name="Find Placement Dropdown"
                  label="Find Placement For:"
                  options={names}
                  onChange={this.handleChangeDropDown}
                  selectedOption={this.state.selectedOption}
                />
              </SideBar>
            </div>
            <div className="col-lg-9">{this.renderRelationships()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FamilyFinding;

function getCardHeaderText(XHRStatus) {
  return XHRStatus === 'error' ? 'Error' : 'Not Found';
}
