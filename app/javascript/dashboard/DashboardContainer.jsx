import React from 'react';
import { GlobalHeader, PageHeader } from 'react-wood-duck';
import { DataGridCard } from '../_components';
import CaseService from '../_services/case';
import ReferralService from '../_services/referral';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { toCapitalizeCase, toDateFormat } from '../_utils/formatters';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: { XHRStatus: 'idle' },
      referrals: { XHRStatus: 'idle' },
    };
  }

  componentDidMount() {
    this.fetchCases();
    this.fetchReferrals();
  }

  fetchReferrals = () => {
    this.setState({ referrals: { XHRStatus: 'waiting' } });
    return ReferralService.fetch()
      .then(referrals =>
        this.setState({
          referrals: {
            XHRStatus: 'ready',
            records: referrals,
          },
        })
      )
      .catch(() => this.setState({ referrals: { XHRStatus: 'error' } }));
  };

  fetchCases = () => {
    this.setState({ cases: { XHRStatus: 'waiting' } });
    return CaseService.fetch()
      .then(cases =>
        this.setState({
          cases: {
            XHRStatus: 'ready',
            records: cases,
          },
        })
      )
      .catch(() => this.setState({ cases: { XHRStatus: 'error' } }));
  };

  renderCases = () => {
    return (
      <DataGridCard
        cardHeaderText={getCardHeaderText(this.state.cases, 'Cases')}
        status={this.state.cases.XHRStatus}
        empty={isEmpty(this.state.cases.records)}
        render={() => (
          <BootstrapTable data={this.state.cases.records}>
            <TableHeaderColumn dataField="identifier" isKey hidden dataSort>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="case_name" dataSort>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="active_service_component" dataSort>
              Service Component
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="assignment_type"
              dataFormat={toCapitalizeCase}
              dataSort
            >
              Assignment
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="assignment_start_date"
              dataSort
              dataFormat={toDateFormat}
            >
              Assignment Date
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="client_identifier"
              width="34px"
              dataFormat={cilentId => (
                <a href={`/placement/client/0lAv0Yk03k`}>
                  <i className="glyphicon glyphicon-map-marker" />
                </a>
              )}
            />
          </BootstrapTable>
        )}
      />
    );
  };

  renderReferrals = () => {
    return (
      <DataGridCard
        cardHeaderText={getCardHeaderText(this.state.referrals, 'Referrals')}
        status={this.state.referrals.XHRStatus}
        empty={isEmpty(this.state.referrals.records)}
        render={() => (
          <BootstrapTable data={this.state.referrals.records}>
            <TableHeaderColumn dataField="identifier" isKey hidden dataSort>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="referral_name" dataSort>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="referral_response_type" dataSort>
              Response Time
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="assignment_type"
              dataFormat={toCapitalizeCase}
              dataSort
            >
              Assignment
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="received_datetime"
              dataSort
              dataFormat={toDateFormat}
            >
              Call Date/Time
            </TableHeaderColumn>
          </BootstrapTable>
        )}
      />
    );
  };

  render() {
    return (
      <div>
        <GlobalHeader />
        <PageHeader pageTitle="Caseworker Dashboard" button={null} />
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {this.renderCases()}
              {this.renderReferrals()}
            </div>
            <div className="col-md-3">
              <div
                className="double-gap-top card"
                style={{ padding: '5px 15px' }}
              >
                <ul className="list-unstyled">
                  <li className="h4">
                    <a href="/clients/index">Client ID Page</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardContainer;

function getCardHeaderText({ XHRStatus, records }, text) {
  return XHRStatus === 'ready' && records && records.length
    ? `${text} (${records.length})`
    : text;
}

function isEmpty(records) {
  return !!records && !records.length;
}
