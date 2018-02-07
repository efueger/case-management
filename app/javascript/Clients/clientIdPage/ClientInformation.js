import React from 'react';
import ChildClientService from '../../_services/child_client';
import PropTypes from 'prop-types';
import {
  DropDownField,
  InputComponent,
  Cards,
  DateTimePicker,
  CheckboxRadioGroup,
} from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

const gender = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];
const marital = [
  { value: '0', label: 'Married' },
  { value: '1', label: 'Never Married' },
  { value: '2', label: 'Widowed' },
  { value: '3', label: 'Divorced' },
];
const ageUnit = [
  { value: 'Dy', label: 'Day' },
  { value: 'D', label: 'Days' },
  { value: 'Mn', label: 'Month' },
  { value: 'M', label: 'Months' },
  { value: 'Yr', label: 'Year' },
  { value: 'Y', label: 'Years' },
];

const stateTypes = [{ value: '0', label: 'CA' }, { value: '1', label: 'NY' }];
const csecCode = [
  { value: '6750', label: '6750' },
  { value: '6680', label: '6680' },
];

const nameType = [
  { value: '1313', label: 'Primary' },
  { value: '1314', label: 'Secondary' },
];
export default class ClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      csecResponse: { XHRStatus: 'idle' },
      checked: false,
      value: '',
      client: ['Client is a Minor/NMD parent'],
      clients: [' Client is a Safely surrendered baby'],
      warranty: ['Outstanding warranty exists'],
      confidentiality: ['Confidentiality in effect'],
      csecInfoBox: ['This case involves CSEC Data'],
      selected: [],
      genderValue: '',
      maritalValue: '',
      ageUnitValue: '',
      StateTypesValue: '',
      nameTypeValue: '',
      prefix: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      socialSecurityNumber: '',
      birthDate: '',
      clientNumber: '',
      alienRegistration: '',
      driverLicensNumber: '',
      csecBlock: false,
      csecDataType: '',
      csecStartDate: '',
      csecEndDate: '',
      csecCodeValue: '',
      age: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.getAge = this.getAge.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleCsecDateChange = this.handleCsecDateChange.bind(this);
  }

  componentDidMount() {
    this.setClient();
    this.setCsecData();
  }

  setClient = () => {
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
          nameType: String(response.name_type),
        })
      )
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };
  setCsecData = () => {
    return ChildClientService.csec()
      .then(csecResponse =>
        this.setState({
          csecResponse,
        })
      )
      .catch(() => this.setState({ csecResponse: { XHRStatus: 'error' } }));
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
    if (
      event.target.value === 'This case involves CSEC Data' &&
      event.target.checked
    ) {
      this.setState({ csecBlock: true });
    } else {
      this.setState({ csecBlock: false });
    }
  }
  handleDropdownChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }

  getAge(birthDate) {
    let dob = moment(birthDate);
    let months = moment().diff(dob, 'months');
    let years = moment().diff(dob, 'years');
    let days = moment().diff(dob, 'days');
    let age;
    let ageUnitSelection;
    if (years <= 0 && months <= 0 && days < 1) {
      age = '0';
    } else if (years === 0 && months === 0 && days === 1) {
      age = days;
      ageUnitSelection = 'Dy';
    } else if (years === 0 && months === 0 && days < 31) {
      age = days;
      ageUnitSelection = 'D';
    } else if (years === 0 && months === 1) {
      age = months;
      ageUnitSelection = 'Mn';
    } else if (years === 0 && months > 1) {
      age = months;
      ageUnitSelection = 'M';
    } else if (years === 1) {
      age = years;
      ageUnitSelection = 'Yr';
    } else if (years > 1) {
      age = years;
      ageUnitSelection = 'Y';
    }
    if (!age) {
      age = '';
    }
    return { age, ageUnitSelection };
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
            <InputComponent
              gridClassName="col-md-1 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Prefix"
              type="string"
              value={this.state.prefix}
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
            <InputComponent
              gridClassName="col-md-2 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Suffix"
              type="string"
              value={this.state.suffix}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.nameType}
              options={nameType}
              label="Name Type (required)"
              onChange={this.handleDropdownChange('nameTypeValue')}
            />
            <DropDownField
              id="dropdown2"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.maritalValue}
              options={marital}
              label="Marital Status"
              onChange={this.handleDropdownChange('maritalValue')}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="SSN"
              type="number"
              value={this.state.socialSecurityNumber}
            />
            <InputComponent
              label="Client Index Number"
              gridClassName="col-md-3 col-sm-3 col-xs-3"
              fieldClassName="form-group"
              type="number"
              value={this.state.clientIndexNumber}
            />
          </div>
          <div className="row">
            <div>
              <DropDownField
                id="dropdown3"
                name="Gender"
                gridClassName="col-md-3 col-sm-6 col-xs-12"
                selectedOption={this.state.genderValue}
                options={gender}
                label="Gender"
                onChange={this.handleDropdownChange('genderValue')}
              />
            </div>
            <InputComponent
              label="Date Of Birth"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              type="date"
              value={this.state.birthDate}
              onChange={this.handleDobChange}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Age"
              type="string"
              value={this.state.age}
            />
            <DropDownField
              id="dropdown4"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.ageUnitValue}
              options={ageUnit}
              label="Age Unit"
              onChange={this.handleDropdownChange('ageUnitValue')}
            />
          </div>
          <div className="row">
            <div>
              <InputComponent
                gridClassName="col-md-3 col-sm-6 col-xs-12"
                fieldClassName="form-group"
                label="Client Number"
                type="string"
                value={this.state.clientNumber}
              />
            </div>
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Alien Registration#"
              type="number"
              value={this.state.alienRegistration}
            />
            <DropDownField
              id="dropdown5"
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              selectedOption={this.state.stateTypesValue}
              options={stateTypes}
              label="Drivers License State"
              onChange={this.handleDropdownChange('this.state.stateTypesValue')}
            />
            <InputComponent
              gridClassName="col-md-3 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              label="Drivers License # "
              type="number"
              value={this.state.driverLicensNumber}
            />
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
          <div className="form-group row">
            <div className="col-md-4">
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
          <div className="form-group row">
            <div className="col-md-12">
              <CheckboxRadioGroup
                id="checkbox5"
                name={'csecInfoBox'}
                type={'checkbox'}
                handleOnChange={this.handleChange}
                options={this.state.csecInfoBox}
                selectedOptions={this.state.selected}
              />
            </div>
          </div>
          {this.state.csecBlock && (
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
              <div>
                <DropDownField
                  id="dropdown6"
                  gridClassName="col-md-4 col-sm-6 col-xs-12"
                  selectedOption={this.state.csecCodeValue}
                  options={csecCode}
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
            </div>
          )}
        </Cards>
      </div>
    );
  }
}
ClientInformation.propTypes = {
  anchorId: PropTypes.string,
};
