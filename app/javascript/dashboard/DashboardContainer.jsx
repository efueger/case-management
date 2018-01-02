import React from 'react';
import axios from 'axios';
import { GlobalHeader, PageHeader, Cards, Alert } from 'react-wood-duck';
import Caseload from '../_components/Caseload';
import Table from '../_components/Table';

/**
 * @param {CWDS.CaseResponse} dirty
 * @returns {CWDS.CaseSummary}
 */
function transformCase(dirty) {
  return {
    id: dirty.identifier,
    name: dirty.case_name,
    assignmentType: dirty.assignment_type,
    assignmentDate: '?',
    serviceComponent: dirty.active_service_component,
  };
}

/**
 * @param {CWDS.ReferralResponse} dirty
 * @returns {CWDS.CaseSummary}
 */
function transformReferral(dirty) {
  return {
    id: dirty.identifier,
    name: dirty.referral_name,
    assignmentType: dirty.assignment_type,
  };
}

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseload: {
        XHRStatus: 'waiting',
      },
    };
  }

  fetchReferrals = () => {
    return axios
      .get('/api/referrals/123')
      .then(res => res.data)
      .then(referrals => referrals.map(transformReferral))
      .catch(err => {
        throw err;
      });
  };

  fetchCases = () => {
    return axios
      .get('//localhost:8080/staff/0Ki/cases')
      .then(res => res.data)
      .then(cases => cases.map(transformCase))
      .catch(err => {
        throw err;
      });
  };

  renderReferrals = () => {
    if (!this.state.referrals) return false;
    const data = this.state.referrals.reduce(
      (aggr, { id, name, assignmentType }) => {
        return [...aggr, [id, name, assignmentType]];
      },
      []
    );
    return <Table colNames={['Id', 'Name', 'Assignment Type']} data={data} />;
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
                renderEmpty={() => (
                  <Alert
                    alertClassName="info"
                    alertMessage="Your caseload is empty!"
                    alertCross={null}
                    faIcon="fa-rocket"
                  />
                )}
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
