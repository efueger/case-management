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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const countyList = [
  { value: '1068', label: 'Alameda' },
  { value: '1069', label: 'Alpine' },
  { value: '1070', label: 'Amador' },
  { value: '1071', label: 'Butte' },
  { value: '1072', label: 'Calaveras' },
  { value: '1073', label: 'Colusa' },
  { value: '1074', label: 'Contra Costa' },
  { value: '1075', label: 'Del Norte' },
  { value: '1076', label: 'El Dorado' },
  { value: '1077', label: 'Fresno' },
  { value: '1078', label: 'Glenn' },
  { value: '1079', label: 'Humboldt' },
  { value: '1080', label: 'Imperial' },
  { value: '1081', label: 'Inyo' },
  { value: '1082', label: 'Kern' },
  { value: '1083', label: 'Kings' },
  { value: '1084', label: 'Lake' },
  { value: '1085', label: 'Lassen' },
  { value: '1086', label: 'Los Angeles' },
  { value: '1087', label: 'Madera' },
  { value: '1088', label: 'Marin' },
  { value: '1089', label: 'Mariposa' },
  { value: '1090', label: 'Mendocino' },
  { value: '1091', label: 'Merced' },
  { value: '1092', label: 'Modoc' },
  { value: '1093', label: 'Mono' },
  { value: '1094', label: 'Monterey' },
  { value: '1095', label: 'Napa' },
  { value: '1096', label: 'Nevada' },
  { value: '1097', label: 'Orange' },
  { value: '1098', label: 'Placer' },
  { value: '1099', label: 'Plumas' },
  { value: '1100', label: 'Riverside' },
  { value: '1101', label: 'Sacramento' },
  { value: '1102', label: 'San Benito' },
  { value: '1103', label: 'San Bernardino' },
  { value: '1104', label: 'San Diego' },
  { value: '1105', label: 'San Francisco' },
  { value: '1106', label: 'San Joaquin' },
  { value: '1107', label: 'San Luis Obispo' },
  { value: '1108', label: 'San Mateo' },
  { value: '1109', label: 'Santa Barbara' },
  { value: '1110', label: 'Santa Clara' },
  { value: '1111', label: 'Santa Cruz' },
  { value: '1112', label: 'Shasta' },
  { value: '1113', label: 'Sierra' },
  { value: '1114', label: 'Siskiyou' },
  { value: '1115', label: 'Solano' },
  { value: '1116', label: 'Sonoma' },
  { value: '1117', label: 'Stanislaus' },
  { value: '1118', label: 'Sutter' },
  { value: '1119', label: 'Tehama' },
  { value: '1120', label: 'Trinity' },
  { value: '1121', label: 'Tulare' },
  { value: '1122', label: 'Tuolumne' },
  { value: '1123', label: 'Ventura' },
  { value: '1124', label: 'Yolo' },
  { value: '1125', label: 'Yuba' },
  { value: '1126', label: 'State of California' },
];

const activationInCounty = countyList;
const deactivationInCounty = countyList;

const reasons = [
  { value: 'Carrying Guns in Home', label: 'Carrying Guns in Home' },
  { value: 'Dangerous Environment', label: 'Dangerous Environment' },
];

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
    };
    this.onChange = this.onChange.bind(this);
    this.handleExplanationChange = this.handleExplanationChange.bind(this);
    this.onChangeDeactive = this.onChangeDeactive.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.fetchSafetyAlerts();
  }

  fetchSafetyAlerts = () => {
    this.setState({ safetyAlerts: { XHRStatus: 'waiting' } });
    return ClientService.fetchSafetyAlerts().then(safetyAlerts =>
      this.setState({
        safetyAlerts: {
          XHRStatus: 'ready',
          records: safetyAlerts,
        },
      })
    );
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
    this.setState({ addAlert: true });
  }

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
        <BootstrapTable data={this.state.safetyAlerts.records}>
          <TableHeaderColumn dataField="activation_date" isKey dataSort>
            Activation Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="client_id" dataSort>
            Client ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="activation_government_entity_code"
            dataSort
          >
            County
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="activation_explanation_text_id"
            dataSort
          >
            Text
          </TableHeaderColumn>
          <TableHeaderColumn dataField="activation_reason_code" dataSort>
            Reason
          </TableHeaderColumn>
        </BootstrapTable>
        {this.state.addAlert && (
          <div>
            <label htmlFor="Safety Alert Activation">
              Safety Alert Activation
            </label>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <label htmlFor="Activation Date">Activation Date</label>
              <DateTimePicker />
            </div>
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-4 col-sm-6 col-xs-12"
              selectedOption={this.state.activation_county}
              options={activationInCounty}
              label="County"
              onChange={this.onChange('activationInCounty')}
            />
            <DropDownField
              id="dropdown1"
              gridClassName="col-md-4 col-sm-6 col-xs-12"
              selectedOption={this.state.activation_reason}
              options={reasons}
              label="Reason"
              onChange={this.onChange('reasons')}
            />
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
                selectedOption={this.state.deactivationInCounty}
                options={deactivationInCounty}
                label="County"
                onChange={this.onChange('deactivationinCounty')}
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
SafetyAlertInformation.propTypes = {
  anchorId: PropTypes.string,
};
