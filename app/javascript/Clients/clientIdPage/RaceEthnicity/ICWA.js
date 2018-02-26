import React from 'react';
import PropTypes from 'prop-types';
import {
  DropDownField,
  DateTimePicker,
  CheckboxRadioGroup,
  Button,
} from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ICWA_COUNTIES } from '../Constants';
import ChildClientService from '../../../_services/child_client';
import { DataGridCard } from '../../../_components';

const icwaElegible = ['Yes', 'No', 'Not Asked', 'Pending'];

export default class ICWA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indianAncestory: { XHRStatus: 'idle' },
      response: { XHRStatus: 'idle' },
      checked: false,
      selected: [],
      county: '',
      addNotifications: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.notificationsInfo = this.notificationsInfo.bind(this);
  }

  componentDidMount() {
    this.fetchICWAData();
    this.fetchIndianAncestoryData();
  }

  fetchICWAData = () => {
    return ChildClientService.fetch()
      .then(response => {
        this.setState({
          response,
          selected: response.icwa_eligibility_code,
        });
        this.valueToString();
      })
      .catch(() => this.setState({ response: { XHRStatus: 'error' } }));
  };

  fetchIndianAncestoryData = () => {
    this.setState({ indianAncestory: { XHRStatus: 'waiting' } });
    return ChildClientService.indianAncestory()
      .then(indianAncestory => {
        this.setState({
          indianAncestory: {
            XHRStatus: 'ready',
            records: indianAncestory,
          },
        });
      })
      .catch(() => this.setState({ indianAncestory: { XHRStatus: 'error' } }));
  };

  valueToString(event) {
    let codeToString = this.state.selected;
    switch (codeToString) {
      case 'Y': {
        this.setState({
          selected: icwaElegible[0],
        });
        break;
      }
      case 'N': {
        this.setState({
          selected: icwaElegible[1],
        });
        break;
      }
      case 'U': {
        this.setState({
          selected: icwaElegible[2],
        });
        break;
      }
      default: {
        this.setState({
          selected: icwaElegible[3],
        });
        break;
      }
    }
  }

  onClick() {
    this.state.addNotifications === false
      ? this.setState({ addNotifications: true })
      : this.setState({ addNotifications: false });
  }

  notificationsInfo = () => {
    if (!this.state.indianAncestory.records) {
      return 'Currently No Notifications. Click addNotifications button to add New Notifications';
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

  handleDropdownChange(name) {
    return ({ value }) => this.setState({ [name]: value });
  }

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

  render() {
    // console.log(this.state.indianAncestory.records);
    return (
      <div>
        <label htmlFor="ICWA Eligible">ICWA Eligible</label>
        <CheckboxRadioGroup
          id="checkbox1"
          name={'child'}
          type={'radio'}
          handleOnChange={this.handleChange}
          options={icwaElegible}
          selectedOptions={this.state.selected}
        />
        <div>
          <div className="row">
            <Button
              btnClassName="default pull-right"
              btnName="Add Notifications"
              onClick={this.onClick}
            />
          </div>
          {this.notificationsInfo()}
          {this.state.indianAncestory && (
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
      </div>
    );
  }
}

function getCardHeaderText({ XHRStatus, records }, text) {
  return XHRStatus === 'ready' && records && records.length
    ? `${text} (${records.length})`
    : text;
}

ICWA.propTypes = {
  ICWA_COUNTIES: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};
ICWA.defaultProps = {
  ICWA_COUNTIES: ICWA_COUNTIES,
};
