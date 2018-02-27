import React from 'react';
import PropTypes from 'prop-types';
import {
  DropDownField,
  CheckboxRadioGroup,
  InputComponent,
} from 'react-wood-duck';
import ChildClientService from '../../_services/child_client';
import {
  PRIMARY_LANGUAGES,
  SECONDARY_LANGUAGES,
  LITERATE,
  INCAPACITATED_PARENT,
  MARITAL_STATUS,
  STATE_TYPES,
} from './Constants';

export default class OtherClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      checked: false,
      value: '',
      literateValue: '',
      incapacitatedParentValue: '',
      maritalValue: '',
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
          primaryLanguageValue: String(response.primary_language_type),
          secondaryLanguageValue: String(response.secondary_language_type),
          literateValue: String(response.litrate_code),
          incapacitatedParentValue: String(response.incapacitated_parent_code),
        })
      )
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };

  handleDropdownChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }

  render() {
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
  PRIMARY_LANGUAGES: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  SECONDARY_LANGUAGES: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  LITERATE: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  INCAPACITATED_PARENT: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};
OtherClientInformation.defaultProps = {
  PRIMARY_LANGUAGES: PRIMARY_LANGUAGES,
  SECONDARY_LANGUAGES: SECONDARY_LANGUAGES,
  LITERATE: LITERATE,
  INCAPACITATED_PARENT: INCAPACITATED_PARENT,
};
