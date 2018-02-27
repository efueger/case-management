import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, InputComponent } from 'react-wood-duck';
import ChildClientService from '../../_services/child_client';
import {
  LITERATE,
  INCAPACITATED_PARENT,
  MARITAL_STATUS,
  STATE_TYPES,
} from './Constants';

const LabelValueShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});
const LabelValueEnumerableShape = PropTypes.arrayOf(LabelValueShape);

export default class OtherClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      checked: false,
      value: '',
      literateValue: '',
      incapacitatedParentValue: '',
      maritalValue: 'ma',
      stateTypesValue: '',
      alienRegistration: '',
      driverLicensNumber: '',
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    this.setClient();
  }

  setClient = () => {
    return ChildClientService.fetch()
      .then(response =>
        this.setState({
          response,
          maritalValue: String(response.marital_status_type),
          literateValue: String(response.litrate_code),
          alienRegistration: response.alien_registration_number,
          stateTypesValue: String(response.driver_license_state_code_type),
          incapacitatedParentValue: String(response.incapacitated_parent_code),
        })
      )
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };

  handleDropdownChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }

  render() {
    // console.log(this.state.response);
    return (
      <div>
        <div>
          <DropDownField
            id="dropdown2"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={this.state.maritalValue}
            options={MARITAL_STATUS}
            label="Marital Status"
            onChange={this.handleDropdownChange('maritalValue')}
          />
          <DropDownField
            id="dropdown3"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={this.state.literateValue}
            options={LITERATE}
            label="Litearate"
            onChange={this.handleDropdownChange('literateValue')}
          />
          <DropDownField
            id="dropdown5"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={this.state.stateTypesValue}
            options={STATE_TYPES}
            label="Drivers License State"
            onChange={this.handleDropdownChange('stateTypesValue')}
          />
          <InputComponent
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            fieldClassName="form-group"
            label="Drivers License # "
            type="number"
            value={this.state.driverLicensNumber}
            // onChange={this}
          />
          <DropDownField
            id="dropdown4"
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            selectedOption={this.state.incapacitatedParentValue}
            options={INCAPACITATED_PARENT}
            label="Incapacitated Parent"
            onChange={this.handleDropdownChange('incapacitatedParentValue')}
          />
          <InputComponent
            gridClassName="col-md-6 col-sm-6 col-xs-12"
            fieldClassName="form-group"
            label="Alien Registration#"
            type="number"
            value={this.state.alienRegistration}
          />
        </div>
      </div>
    );
  }
}

OtherClientInformation.propTypes = {
  anchorId: PropTypes.string,
  MARITAL_STATUS: LabelValueEnumerableShape,
  STATE_TYPES: LabelValueEnumerableShape,
  LITERATE: LabelValueEnumerableShape,
  INCAPACITATED_PARENT: LabelValueEnumerableShape,
};
OtherClientInformation.defaultProps = {
  LITERATE: LITERATE,
  MARITAL_STATUS,
  STATE_TYPES,
  INCAPACITATED_PARENT: INCAPACITATED_PARENT,
};
