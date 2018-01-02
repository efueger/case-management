import React from 'react';
import axios from 'axios';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
import Caseload from '../_components/Caseload';
import Alert from 'react-wood-duck/dist/Alert';

describe('<DashboardContainer />', () => {
  it('exists', () => {
    expect(!!DashboardContainer).toBe(true);
  });

  it('renders', () => {
    expect(() => {
      shallow(<DashboardContainer />);
    }).not.toThrow();
  });

  it('passes a renderEmpty callback to Caseload', () => {
    const wrapper = shallow(<DashboardContainer />);
    const caseLoad = wrapper.find(Caseload);
    expect(caseLoad.prop('renderEmpty')).toEqual(jasmine.any(Function));
  });

  describe('#renderEmptyCaseload()', () => {
    it('renders an Alert', () => {
      const wrapper = shallow(<DashboardContainer />);
      const renderEmptyCaseload = wrapper.instance().renderEmptyCaseload;
      expect(renderEmptyCaseload().type).toEqual(Alert);
    });
  });

  describe('data access request methods', () => {
    beforeEach(() => moxios.install());

    afterEach(() => moxios.uninstall());

    describe('#fetchReferrals()', () => {
      it('fetches referrals from API', () => {
        moxios.stubRequest('/api/referrals/0Ki', {
          status: 200,
          response: [
            {
              identifier: '1',
              referral_name: 'ref-1',
              assignment_type: 'assignmentType',
            },
            {
              identifier: '2',
              referral_name: 'ref-2',
              assignment_type: 'assignmentType',
            },
            {
              identifier: '3',
              referral_name: 'ref-3',
              assignment_type: 'assignmentType',
            },
          ],
        });
        const wrapper = shallow(<DashboardContainer />);
        wrapper
          .instance()
          .fetchReferrals()
          .then(() => {
            const referrals = wrapper.state('referrals');
            expect(referrals.records.length).toEqual(3);
          });
        // const wrapper = shallow(<DashboardContainer />, {
        //   lifecycleExperimental: true,
        // });
      });
    });

    describe('#fetchCases()', () => {
      it('fetches cases from API', () => {
        moxios.stubRequest('/api/cases/0Ki/index', {
          status: 200,
          response: [
            {
              identifier: '1',
              case_name: 'case-1',
              assignment_type: 'assignmentType',
            },
            {
              identifier: '2',
              case_name: 'case-2',
              assignment_type: 'assignmentType',
            },
            {
              identifier: '3',
              case_name: 'case-3',
              assignment_type: 'assignmentType',
            },
          ],
        });
        const wrapper = shallow(<DashboardContainer />);
        wrapper
          .instance()
          .fetchCases()
          .then(() => {
            const caseload = wrapper.state('caseload');
            expect(caseload).toBeDefined();
            expect(caseload.XHRStatus).toEqual('ready');
            expect(caseload.records.length).toEqual(3);
          });
      });
    });
  });
});
