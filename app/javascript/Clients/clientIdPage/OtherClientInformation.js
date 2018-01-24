import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, Cards, CheckboxRadioGroup } from 'react-wood-duck';
import ClientService from '../../_services/client';

const primaryLanguage = [
  { value: '1253', label: 'English' },
  { value: '1', label: 'Spanish' },
  { value: '2', label: 'French' },
  { value: '3', label: 'Hindi' },
  { value: '4', label: 'Chinese' },
];
const secondaryLanguage = [
  { value: '0', label: 'English' },
  { value: '1', label: 'Spanish' },
  { value: '2', label: 'Chinese' },
  { value: '3', label: 'Hindi' },
  { value: '4', label: 'French' },
];

const literate = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
  { value: 'UNKNOWN', label: 'Unknown' },
  { value: 'NOT_APPLICABLE', label: 'Not Applicable' },
];

const incapacitatedParent = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
  { value: 'UNKNOWN', label: 'Unknown' },
  { value: 'NOT_APPLICABLE', label: 'Not Applicable' },
];
export default class OtherClientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: { XHRStatus: 'idle' },
      checked: false,
      value: '',
      primaryLanguageValue: '',
      secondaryLanguageValue: '',
      spokenIn: ['Yes', 'No'],
      spokenInHome: ['Yes', 'No'],
      literateValue: '',
      incapacitatedParentValue: '',
      selected: [],
      spokenInSelection: [],
    };
    this.handleSpokenChange = this.handleSpokenChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSpokenInChange = this.handleSpokenInChange.bind(this);
  }

  componentDidMount() {
    this.setClient();
  }

  setClient = () => {
    return ClientService.fetch()
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

  handleSpokenChange(event) {
    this.setState({ selected: [event.target.value] });
  }
  handleSpokenInChange(event) {
    this.setState({ spokenInSelection: [event.target.value] });
  }

  handleDropdownChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }

  render() {
    return (
      <Cards
        cardHeaderText="Other Client Information"
        id={this.props.anchorId}
        cardHeaderButton={false}
        cardActionButtons={true}
      >
        <div>
          <div>
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={this.state.primaryLanguageValue}
              options={primaryLanguage}
              label="Primary Language"
              onChange={this.handleDropdownChange('primaryLanguageValue')}
            />
            <DropDownField
              id="dropdown2"
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={this.state.secondaryLanguageValue}
              options={secondaryLanguage}
              label="Secondary Language"
              onChange={this.handleDropdownChange('secondaryLanguageValue')}
            />
          </div>
          <div className="col-md-6 ">
            <label htmlFor="Spoken in Home">Spoken in Home</label>
            <CheckboxRadioGroup
              id="radio1"
              name={'spokenIn'}
              type={'radio'}
              options={this.state.spokenIn}
              handleOnChange={this.handleSpokenChange}
              selectedOptions={this.state.selected}
            />
          </div>
          <div className="col-md-6 ">
            <label htmlFor="Spoken in Home">Spoken in Home</label>
            <CheckboxRadioGroup
              id="radio2"
              name={'spokenInHome'}
              type={'radio'}
              options={this.state.spokenInHome}
              handleOnChange={this.handleSpokenInChange}
              selectedOptions={this.state.spokenInSelection}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown3"
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={this.state.literateValue}
              options={literate}
              label="Litearate"
              onChange={this.handleDropdownChange('literateValue')}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown4"
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={this.state.incapacitatedParentValue}
              options={incapacitatedParent}
              label="Incapacitated Parent"
              onChange={this.handleDropdownChange('incapacitatedParentValue')}
            />
          </div>
        </div>
      </Cards>
    );
  }
}

OtherClientInformation.propTypes = {
  anchorId: PropTypes.string,
};
