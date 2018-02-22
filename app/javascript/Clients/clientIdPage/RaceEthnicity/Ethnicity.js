import React from 'react';
import { EthnicityForm } from 'react-wood-duck';
import { ETHNICITY_DETAILS } from './EthnicityDetails';
import ChildClientService from '../../../_services/child_client';

const personId = '1';

export default class Ethnicity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      personId: personId,
      latinoOrigin: '',
      ethnicityDetailOptions: ETHNICITY_DETAILS,
      disableFields: false,
      ethnicityDetail: '',
      code: '',
      value: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchEthnicityData();
  }

  fetchEthnicityData = () => {
    return ChildClientService.fetch()
      .then(response => {
        this.setState({
          response,
          latinoOrigin: response.hispanic_origin_code,
        });
        this.valueToString();
      })
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };

  valueToString(event) {
    let codeToString = this.state.latinoOrigin;
    switch (codeToString) {
      case 'Y': {
        this.setState({
          latinoOrigin: 'Yes',
          disableFields: true,
        });
        break;
      }
      case 'N': {
        this.setState({
          latinoOrigin: 'No',
          disableFields: true,
        });
        break;
      }
      case 'U': {
        this.setState({
          latinoOrigin: 'Unknown',
          disableFields: true,
        });
        break;
      }
      case 'Z': {
        this.setState({
          latinoOrigin: 'Abandoned',
          disableFields: true,
        });
        break;
      }
      default: {
        this.setState({
          latinoOrigin: 'Declined to answer',
          disableFields: true,
        });
      }
    }
  }

  onChange(field, value) {
    field !== 'ethnicity_detail'
      ? value === 'Yes' || value === null || value.length === 0
        ? this.setState({ latinoOrigin: value, disableFields: false })
        : this.setState({
            latinoOrigin: value,
            disableFields: true,
            ethnicityDetail: '',
          })
      : this.setState({ ethnicityDetail: value.toString() });
  }
  render() {
    return (
      <div>
        <EthnicityForm
          latinoOrigin={this.state.latinoOrigin}
          onChange={this.onChange}
          ethnicityDetailOptions={this.state.ethnicityDetailOptions}
          {...this.state}
        />
      </div>
    );
  }
}
