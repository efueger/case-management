import React from 'react';
import PropTypes from 'prop-types';
import ClientService from '../../_services/client';
import {
  Cards,
  DropDownField,
  DateTimePicker,
  TextArea,
  Button,
} from 'react-wood-duck';
import { DataGridCard } from '../../_components';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { REASONS, COUNTY_LIST } from './Constants';

export default class SafetyAlertInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      safetyAlerts: '',
      addAlert: false,
      county: '',
      reasons: '',
      explanation: '',
      deactive: '',
      activationCounty: '',
      deactivationCounty: '',
      activationReason: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleExplanationChange = this.handleExplanationChange.bind(this);
    this.onChangeDeactive = this.onChangeDeactive.bind(this);
    this.onClick = this.onClick.bind(this);
    this.alertInfo = this.alertInfo.bind(this);
  }

  componentDidMount() {
    this.fetchSafetyAlerts();
  }

  fetchSafetyAlerts = () => {
    this.setState({ safetyAlerts: { XHRStatus: 'waiting' } });
    return ClientService.fetchSafetyAlerts()
      .then(safetyAlerts => {
        this.setState({
          safetyAlerts: {
            XHRStatus: 'ready',
            records: safetyAlerts,
          },
        });
      })
      .catch(() => this.setState({ safetyAlerts: { XHRStatus: 'error' } }));
  };

  onChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }
  handleExplanationChange(e) {
    this.setState({ explanation: e.target.value });
  }

  onChangeDeactive(e) {
    this.setState({ deactive: e.target.value });
  }

  onClick() {
    this.state.addAlert === false
      ? this.setState({ addAlert: true })
      : this.setState({ addAlert: false });
  }

  alertInfo = () => {
    if (!this.state.safetyAlerts.records) {
      return 'Currently No SafetyAlerts. Click AddAlert button to add New Alerts';
    } else {
      return (
        <DataGridCard
          cardHeaderText={getCardHeaderText(
            this.state.safetyAlerts,
            'SafetyAlerts'
          )}
          status={this.state.safetyAlerts.XHRStatus}
          render={() => (
            <BootstrapTable data={this.state.safetyAlerts.records}>
              <TableHeaderColumn dataField="activation_date" dataSort>
                Activation Date
              </TableHeaderColumn>
              <TableHeaderColumn dataField="client_id" isKey hidden dataSort>
                Client ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="activation_reason_code" dataSort>
                Reason
              </TableHeaderColumn>
              <TableHeaderColumn dataField="deactivation_date" dataSort>
                Deactivation Date
              </TableHeaderColumn>
            </BootstrapTable>
          )}
        />
      );
    }
  };
  render() {
    return (
      <Cards
        cardHeaderText="Safety Alert Information"
        id={this.props.anchorId}
        cardHeaderButton={false}
        cardActionButtons={true}
      >
        <div className="row">
          <Button
            btnClassName="default pull-right"
            btnName="Add Alert"
            onClick={this.onClick}
          />
        </div>
        {this.alertInfo()}
        {this.state.addAlert && (
          <div>
            <label htmlFor="Safety Alert Activation">
              Safety Alert Activation
            </label>

            <div className="row">
              <div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <label htmlFor="Activation Date">Activation Date</label>
                  <DateTimePicker />
                </div>
                <DropDownField
                  id="dropdown1"
                  gridClassName="col-md-4 col-sm-6 col-xs-12"
                  selectedOption={this.state.activation_county}
                  options={COUNTY_LIST}
                  label="County"
                  onChange={this.onChange('activationInCounty')}
                />
              </div>
              <div>
                <DropDownField
                  id="dropdown1"
                  gridClassName="col-md-4 col-sm-6 col-xs-12"
                  selectedOption={this.state.activation_reason}
                  options={REASONS}
                  label="Reason"
                  onChange={this.onChange('reasons')}
                />
              </div>

              <TextArea
                gridClassName="col-md-12 col-sm-12 col-xs-12"
                labelClassName="form-control"
                label="Explanation"
                rows={5}
                resize={false}
                value={this.state.explanation}
                name={'Explanation'}
                handleOnChange={this.handleExplanationChange}
                placeholder={''}
              />
            </div>
            <div className="row">
              <label
                htmlFor="Safety Alert Deactivation"
                className="col-md-12 col-sm-6 col-xs-12"
              >
                Safety Alert Deactivation
              </label>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <label htmlFor="Deactivation Date">Deactivation Date</label>
                <DateTimePicker />
              </div>
              <DropDownField
                id="dropdown1"
                gridClassName="col-md-4 col-sm-6 col-xs-12"
                selectedOption={this.state.deactivationCounty}
                options={COUNTY_LIST}
                label="County"
                onChange={this.onChange('deactivationCounty')}
              />
              <TextArea
                gridClassName="col-md-12 col-sm-12 col-xs-12"
                labelClassName="form-control"
                label="Explanation"
                rows={5}
                resize={false}
                value={this.state.deactive}
                name={'Explanation'}
                handleOnChange={this.onChangeDeactive}
                placeholder={''}
              />
            </div>
          </div>
        )}
      </Cards>
    );
  }
}
function getCardHeaderText({ XHRStatus, records }, text) {
  return XHRStatus === 'ready' && records && records.length
    ? `${text} (${records.length})`
    : text;
}

SafetyAlertInformation.propTypes = {
  anchorId: PropTypes.string,
  REASONS: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  COUNTY_LIST: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

SafetyAlertInformation.defaultProps = {
  REASONS: REASONS,
  COUNTY_LIST: COUNTY_LIST,
};
