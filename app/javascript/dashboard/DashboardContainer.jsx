import React from 'react';
import axios from 'axios';
import { GlobalHeader, PageHeader, Cards, Alert } from 'react-wood-duck';
import Caseload from '../_components/Caseload';

/**
 * @param {CWDS.CaseResponse} res
 * @returns {CWDS.CaseSummary}
 */
function transformCase(res) {
  return {
    id: res.identifier,
    name: res.case_name,
    assignmentType: res.assignment_type,
    assignmentDate: '?',
    serviceComponent: res.active_service_component,
  };
}

/**
 * @param {CWDS.ReferralResponse} dirty
 * @returns {CWDS.CaseSummary}
 */
function transformReferral(dirty) {
  return {
    id: dirty.identifier,
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
  renderReferrals = () => {
    return <div>alskdjf</div>;
    // {this.state.referrals &&
    //   this.state.referrals.map(d => <div>I AM A Referral</div>)}
    // <div>alskdfj</div>
  };
  componentDidMount() {
    // TODO: Don't leapfrog the rails API
    axios
      // .get('/api/cases/123/index')
      .get('//localhost:8080/staff/0Ki/cases')
      .then(res => res.data)
      .then(cases => cases.map(transformCase))
      .then(cases => {
        this.setState({
          ...this.state,
          caseload: {
            XHRStatus: 'ready',
            records: cases,
          },
        });
      })
      .catch(err => {
        throw err;
      });

    axios
      .get('/api/referrals/123')
      .then(res => res.data)
      .then(referrals => referrals.map(transformReferral))
      .then(referrals => {
        this.setState({
          ...this.state,
          referrals: {
            records: referrals,
          },
        });
      })
      .catch(err => {
        throw err;
      });
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
