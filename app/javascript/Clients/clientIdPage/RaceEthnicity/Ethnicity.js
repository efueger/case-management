import React from 'react';
import { EthnicityForm } from 'react-wood-duck';
import { ETHNICITY_DETAILS } from './EthnicityDetails';

const personId = '1';

export default class Ethnicity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: personId,
      latinoOrigin: '',
      ethnicityDetailOptions: ETHNICITY_DETAILS,
      disableFields: false,
      ethnicityDetail: '',
    };
    this.onChange = this.onChange.bind(this);
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
          onChange={this.onChange}
          ethnicityDetailOptions={this.state.ethnicityDetailOptions}
          {...this.state}
        />
      </div>
    );
  }
}
