import React from 'react';
import ChildClientService from '../../_services/child_client';
import PropTypes from 'prop-types';
import {
  DropDownField,
  InputComponent,
  Cards,
  DateTimePicker,
  CheckboxRadioGroup,
  Button,
} from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getAgeUtil } from '../../_utils/ageCalc/getAgeFormat';
import { DataGridCard } from '../../_components';
import OtherClientInformation from './OtherClientInformation.js';

import {
  GENDERS,
  MARITAL_STATUS,
  AGE_UNITS,
  STATE_TYPES,
  NAME_TYPES,
  CSEC_TYPES,
  PREFIX,
  SUFFIX,
  PRIMARY_LANGUAGES,
  SECONDARY_LANGUAGES,
  ICWA_COUNTIES,
} from './Constants';

const LabelValueShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});
const LabelValueEnumerableShape = PropTypes.arrayOf(LabelValueShape);

export default class ClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      indianAncestory: { XHRStatus: 'idle' },
      addNotifications: false,
      addCsec: false,
      csecResponse: [],
      checked: false,
      value: '',
      client: ['Client is a Minor/NMD parent'],
      clients: [' Client is a Safely surrendered baby'],
      warranty: ['Outstanding warranty exists'],
      confidentiality: ['Confidentiality in effect'],
      selected: [],
      genderValue: '',

      ageUnitValue: '',
      nameTypeValue: '',
      prefixValue: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffixValue: '',
      socialSecurityNumber: '',
      birthDate: '',
      clientNumber: '',

      age: '',
      primaryLanguageValue: '',
      secondaryLanguageValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.getAge = this.getAge.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleCsecDateChange = this.handleCsecDateChange.bind(this);
    this.handleCsec = this.handleCsec.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setClientData();
    this.setCsecData();
    // this.fetchIndianAncestoryData();
  }

  setClientData = () => {
    return ChildClientService.fetch()
      .then(response =>
        this.setState({
          response,
          prefix: response.name_prefix_description,
          firstName: response.common_first_name,
          middleName: response.common_middle_name,
          lastName: response.common_last_name,
          suffix: response.suffix_title_description,
          socialSecurityNumber: response.social_security_number,
          birthDate: response.birth_dt,
          clientNumber: response.identifier,
          alienRegistration: response.alien_registration_number,
          driverLicensNumber: response.driver_licens_number,
          genderValue: response.gender_code,
          maritalValue: String(response.material_status_type),
          ageUnitValue: response.ageUnit,
          stateTypesValue: String(response.driver_license_state_code_type),
          nameTypeValue: String(response.name_type),
        })
      )
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };

  // fetchIndianAncestoryData = () => {
  //   this.setState({ indianAncestory: { XHRStatus: 'waiting' } });
  //   return ChildClientService.indianAncestory()
  //     .then(indianAncestory => {
  //       this.setState({
  //         indianAncestory: {
  //           XHRStatus: 'ready',
  //           records: indianAncestory,
  //         },
  //       });
  //     })
  //     .catch(() => this.setState({ indianAncestory: { XHRStatus: 'error' } }));
  // };

  setCsecData = () => {
    return ChildClientService.csec()
      .then(csecResponse => {
        if (csecResponse.length > 0) {
          this.setState({
            csecResponse: csecResponse,
            hasCsecData: true,
          });
        }
        this.setState({
          csecResponse,
        });
      })
      .catch(() => this.setState({ csecResponse: { XHRStatus: 'error' } }));
  };

  notificationsInfo = () => {
    if (!this.state.indianAncestory.records) {
      return 'Currently No Notifications. Click addNotifications to add New Notifications';
    } else {
      return (
        <DataGridCard
          cardHeaderText={getCardHeaderText(
            this.state.addNotifications,
            'Indian Ancestry Notifications'
          )}
          status={this.state.indianAncestory.XHRStatus}
          render={() => (
            <BootstrapTable data={this.state.indianAncestory.records}>
              <TableHeaderColumn dataField="id" isKey hidden dataSort>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="child_client_id" dataSort>
                child_client ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="county_code" dataSort>
                County
              </TableHeaderColumn>
              <TableHeaderColumn dataField="notification_date" dataSort>
                Notification Date
              </TableHeaderColumn>
            </BootstrapTable>
          )}
        />
      );
    }
  };

  addCsec = () => {
    if (!this.state.csecResponse) {
      return 'Currently No Notifications. Click addNotifications to add New Notifications';
    } else {
      return (
        <DataGridCard
          cardHeaderText={getCardHeaderText(
            this.state.addCsec,
            'CSEC Information'
          )}
          status={this.state.addCsec}
          render={() => (
            <div>
              <BootstrapTable
                data={this.state.csecResponse}
                striped={true}
                hover={true}
              >
                <TableHeaderColumn
                  dataField="sexual_exploitation_type"
                  isKey
                  dataSort
                  width="150"
                >
                  CSEC Type
                </TableHeaderColumn>
                <TableHeaderColumn dataField="start_date" dataSort width="150">
                  Start Date
                </TableHeaderColumn>
                <TableHeaderColumn dataField="end_date" dataSort width="150">
                  End Date
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          )}
        />
      );
    }
  };

  handleChange(event) {
    const newSelection = event.target.value;
    let newSelectionArray;
    if (this.state.selected.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selected.filter(s => s !== newSelection);
    } else {
      newSelectionArray = [...this.state.selected, newSelection];
    }
    this.setState({ selected: newSelectionArray });
  }

  handleDropdownChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }

  onClick() {
    this.state.addNotifications === false
      ? this.setState({ addNotifications: true })
      : this.setState({ addNotifications: false });
  }

  handleCsec() {
    this.state.addCsec === false
      ? this.setState({ addCsec: true })
      : this.setState({ addCsec: false });
  }

  getAge(birthDate) {
    return getAgeUtil(birthDate);
  }
  handleDobChange(event) {
    const ageValue = this.getAge(event.target.value);
    this.setState({
      birthDate: event.target.value,
      age: ageValue.age,
      ageUnitValue: ageValue.ageUnitSelection,
    });
  }

  handleCsecDateChange(event) {
    this.setState({
      csecStartDate: event.target.value,
    });
  }

  handleCsecChange(event) {
    if (this.state.csecResponse.length > 0) {
      this.setState({
        hasCsecData: true,
        csecInfoBox: ['This case has CSEC Data'],
      });
    }
  }
  render() {
    return (
      <div>
        <Cards
          cardHeaderText="Client Information"
          id={this.props.anchorId}
          cardHeaderButton={false}
          cardActionButtons={true}
        >
          <div>
            <DropDownField
              gridClassName="col-md-1 col-sm-6 col-xs-12"
              options={PREFIX}
              label="Prefix"
              selectedOption={this.state.nameTypeValue}
              onChange={this.handleDropdownChange('prefixValue')}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="First Name (required)"
              type="string"
              value={this.state.firstName}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Middle Name"
              type="string"
              value={this.state.middleName}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Last Name (required)"
              type="string"
              value={this.state.lastName}
            />
            <DropDownField
              gridClassName="col-md-2 col-sm-6 col-xs-12"
              options={SUFFIX}
              label="Suffix"
              selectedOption={this.state.nameTypeValue}
              onChange={this.handleDropdownChange('suffixValue')}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-4 col-sm-6 col-xs-12"
              selectedOption={this.state.nameTypeValue}
              options={NAME_TYPES}
              label="Name Type (required)"
              onChange={this.handleDropdownChange('nameTypeValue')}
            />
            <InputComponent
              label="Client Index Number"
              gridClassName="col-md-4 col-sm-3 col-xs-3"
              fieldClassName="form-group"
              type="number"
              value={this.state.clientIndexNumber}
            />
            <InputComponent
              gridClassName="col-md-4 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="SSN"
              type="number"
              value={this.state.socialSecurityNumber}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown3"
              name="Gender"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.genderValue}
              options={GENDERS}
              label="Sex at birth(required)"
              onChange={this.handleDropdownChange('genderValue')}
            />
            <InputComponent
              label="Date Of Birth"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              type="date"
              value={this.state.birthDate}
              onChange={this.handleDobChange}
            />
            <InputComponent
              gridClassName="col-md-2 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Age"
              type="string"
              value={this.state.age}
            />
            <DropDownField
              id="dropdown4"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.ageUnitValue}
              options={AGE_UNITS}
              label="Age Unit"
              onChange={this.handleDropdownChange('ageUnitValue')}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-7 col-sm-6 col-xs-12"
              selectedOption={this.state.primaryLanguageValue}
              options={PRIMARY_LANGUAGES}
              label="Primary Language"
              onChange={this.handleDropdownChange('primaryLanguageValue')}
            />
            <DropDownField
              id="dropdown2"
              gridClassName="col-md-5 col-sm-6 col-xs-12"
              selectedOption={this.state.secondaryLanguageValue}
              options={SECONDARY_LANGUAGES}
              label="Secondary Language"
              onChange={this.handleDropdownChange('secondaryLanguageValue')}
            />
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <label htmlFor="SOGIE Data">SOGIE</label>
            <label htmlFor="Race& Ethnicity">Race & Ethnicity</label>
          </div>
          <div>
            <div className="row">
              <Button
                btnClassName="default pull-right"
                btnName="+Add Notifications"
                onClick={this.onClick}
              />
            </div>
            {this.notificationsInfo()}
            {this.state.addNotifications && (
              <div>
                <DropDownField
                  id="dropdown1"
                  gridClassName="col-md-6 col-sm-6 col-xs-12"
                  selectedOption={this.state.county}
                  options={ICWA_COUNTIES}
                  label="County"
                  onChange={this.handleDropdownChange('county')}
                />
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <label htmlFor="Date Informed">Date Informed</label>
                  <DateTimePicker />
                </div>
              </div>
            )}
          </div>
          <div className="form-group row">
            <div className="col-md-12">
              <label htmlFor="CONFIDENTIALITY">CONFIDENTIALITY</label>
              <CheckboxRadioGroup
                id="checkbox4"
                name={'confidentiality'}
                type={'checkbox'}
                handleOnChange={this.handleChange}
                options={this.state.confidentiality}
                selectedOptions={this.state.selected}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="CONFIDENTIALITY EFFECTIVE DATE">
                CONFIDENTIALITY EFFECTIVE DATE
              </label>
              <DateTimePicker />
            </div>
          </div>
          <div className="row">
            <Button
              btnClassName="default pull-right"
              btnName="+Add CSEC Info"
              onClick={this.handleCsec}
            />
            {this.addCsec()}
            {this.state.addCsec && (
              <div>
                <DropDownField
                  id="dropdown6"
                  gridClassName="col-md-4 col-sm-6 col-xs-12"
                  selectedOption={this.state.csecCodeValue}
                  label="CSEC Data Type"
                  onChange={this.handleDropdownChange('csecCodeValue')}
                />

                <div className="col-md-4 col-sm-6 col-xs-12">
                  <label htmlFor="START DATE">START DATE</label>
                  <DateTimePicker />
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <label htmlFor="END DATE">END DATE</label>
                  <DateTimePicker fieldClassName="form-group" />
                </div>
              </div>
            )}
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <CheckboxRadioGroup
                id="checkbox1"
                name={'child'}
                type={'checkbox'}
                handleOnChange={this.handleChange}
                options={this.state.client}
                selectedOptions={this.state.selected}
              />
            </div>
            <div className="col-md-6">
              <CheckboxRadioGroup
                id="checkbox2"
                name={'client'}
                type={'checkbox'}
                handleOnChange={this.handleChange}
                options={this.state.clients}
                selectedOptions={this.state.selected}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-12">
              <CheckboxRadioGroup
                id="checkbox3"
                name={'Warranty'}
                type={'checkbox'}
                handleOnChange={this.handleChange}
                options={this.state.warranty}
                selectedOptions={this.state.selected}
              />
            </div>
          </div>
          <h3>Other Client Information</h3>
          <OtherClientInformation />
        </Cards>
      </div>
    );
  }
}
function getCardHeaderText(indianAncestory, text) {
  return indianAncestory.XHRStatus === 'ready' &&
    indianAncestory.records &&
    indianAncestory.length
    ? `${text} (${indianAncestory.length})`
    : text;
}
ClientInformation.propTypes = {
  anchorId: PropTypes.string,
  GENDERS: LabelValueEnumerableShape,
  MARITAL_STATUS: LabelValueEnumerableShape,
  AGE_UNITS: LabelValueEnumerableShape,
  STATE_TYPES: LabelValueEnumerableShape,
  NAME_TYPES: LabelValueEnumerableShape,
  CSEC_TYPES: LabelValueEnumerableShape,
};
ClientInformation.defaultProps = {
  GENDERS,
  MARITAL_STATUS,
  AGE_UNITS,
  STATE_TYPES,
  NAME_TYPES,
  CSEC_TYPES,
};
