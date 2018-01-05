import React from 'react';
import { GlobalHeader, PageHeader, Cards, Alert } from 'react-wood-duck';
import Table from '../_components/Table';
import CaseService from '../_services/case';
import ReferralService from '../_services/referral';

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
    const { records, XHRStatus } = this.state.cases;
    const headerText =
      XHRStatus === 'ready' && records && records.length
        ? `Cases (${records.length})`
        : 'Cases';
    const content = (() => {
      if (XHRStatus === 'idle') return false;
      if (XHRStatus === 'error')
        return this.renderAlert(
          'There was a problem retrieving your cases!',
          'error'
        );
      if (XHRStatus === 'waiting') return 'waiting...';
      if (records && !records.length)
        return this.renderAlert('No cases found!', 'info');
      return (
        <Table
          colNames={['Name', 'Service Component', 'Type']}
          data={records.map(record => [
            record.case_name,
            record.active_service_component,
            record.assignment_type,
          ])}
        />
      );
    })();
    return (
      <Cards cardHeaderText={headerText} cardbgcolor="transparent">
        {content}
      </Cards>
    );
  };

  renderReferrals = () => {
    const { records, XHRStatus } = this.state.referrals;
    const headerText =
      XHRStatus === 'ready' && records && records.length
        ? `Referrals (${records.length})`
        : 'Referrals';
    const content = (() => {
      if (XHRStatus === 'idle') return false;
      if (XHRStatus === 'error')
        return this.renderAlert(
          'There was a problem retrieving your referrals!',
          'error'
        );
      if (XHRStatus === 'waiting') return 'waiting...';
      if (!records.length)
        return this.renderAlert('No referrals were found!', 'info');
      return (
        <Table
          colNames={['Name', 'Type', 'received_date']}
          data={records.map(referral => [
            referral.referral_name,
            referral.assignment_type,
            referral.received_date,
          ])}
        />
      );
    })();
    return (
      <Cards cardHeaderText={headerText} cardbgcolor="transparent">
        {content}
      </Cards>
    );
  };

  renderAlert = (message = 'No records found!', type = 'info') => (
    <Alert
      alertClassName={type}
      alertMessage={message}
      alertCross={null}
      faIcon="fa-info-circle"
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
              {this.renderCases()}
              {this.renderReferrals()}
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
