import React from 'react';
import PropTypes from 'prop-types';
import { DropDownField, Cards, CheckboxRadioGroup } from 'react-wood-duck';
import ChildClientService from '../../_services/child_client';
import {
  PRIMARY_LANGUAGES,
  SECONDARY_LANGUAGES,
  LITERATE,
  INCAPACITATED_PARENT,
} from './Constants';

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
              options={PRIMARY_LANGUAGES}
              label="Primary Language"
              onChange={this.handleDropdownChange('primaryLanguageValue')}
            />
            <DropDownField
              id="dropdown2"
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={this.state.secondaryLanguageValue}
              options={SECONDARY_LANGUAGES}
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
              options={LITERATE}
              label="Litearate"
              onChange={this.handleDropdownChange('literateValue')}
            />
          </div>
          <div>
            <DropDownField
              id="dropdown4"
              gridClassName="col-md-6 col-sm-6 col-xs-12"
              selectedOption={this.state.incapacitatedParentValue}
              options={INCAPACITATED_PARENT}
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
