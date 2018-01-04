import React from 'react';
import { GlobalHeader, PageHeader, Cards, Alert } from 'react-wood-duck';
import Caseload from '../_components/Caseload';
import Table from '../_components/Table';
import CaseService from '../_services/case';
import ReferralService from '../_services/referral';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseload: {
        XHRStatus: 'waiting',
      },
    };
  }

  fetchReferrals = () =>
    ReferralService.fetch().catch(err => {
      throw err;
    });

  fetchCases = () =>
    CaseService.fetch().catch(err => {
      throw err;
    });

  renderReferrals = () => {
    if (!this.state.referrals) return false;
    return (
      <Table
        colNames={['Id', 'Name', 'Assignment Type']}
        data={this.state.referrals.map(d => [
          d.identifier,
          d.referral_name,
          d.assignment_type,
        ])}
      />
    );
  };

  componentDidMount() {
    this.fetchCases().then(cases =>
      this.setState({
        ...this.state,
        caseload: {
          XHRStatus: 'ready',
          records: cases,
        },
      })
    );

    this.fetchReferrals().then(referrals =>
      this.setState({ ...this.state, referrals })
    );
  }

  renderEmptyCaseload = () => (
    <Alert
      alertClassName="info"
      alertMessage="Your caseload is empty!"
      alertCross={null}
      faIcon="fa-rocket"
    />
  );

  render() {
    return (
      <div>
        <GlobalHeader />
        <PageHeader pageTitle="Dashboard" button={null} />
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Caseload
                status={this.state.caseload.XHRStatus}
                cases={this.state.caseload.records}
                renderEmpty={this.renderEmptyCaseload}
              />
              <Cards cardHeaderText="Referrals" cardbgcolor="transparent">
                {this.renderReferrals()}
              </Cards>
            </div>
            <div className="col-md-3">
              <div className="list-group double-gap-top card">
                <span className="list-group-item">
                  <span className="card-header">Quick Links</span>
                </span>
                <a href="/clients/index" className="list-group-item">
                  Client ID Page
                </a>
                <a href="/family_finding/index" className="list-group-item">
                  Network Finding Tool
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardContainer;
