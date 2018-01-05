import React from 'react';
import moxios from 'moxios';
// import CaseService from '../_services/case';
import ReferralService from '../_services/referral';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
// import Alert from 'react-wood-duck/dist/Alert';

const mockFetchReferrals = jest.fn(() => Promise.resolve([]));
console.log(mockFetchReferrals);
jest.mock('../_services/referral', () => ({
  fetch: mockFetchReferrals,
}));
// jest.mock('../_services/referral', );
// const ReferralService = require('../_services/referral');
console.log(ReferralService);
// ReferralService.mockImplementation({
//   fetch: mockFetchReferrals,
// });
// jest.mock('../_services/referral', () => {
//   return {
//     fetch: jest.fn()
//   };
// });
// ReferralService.mockImplementation(() => {
//   return {
//     fetch: () => Promise.resolve([]),
//   };
// });

// const mockFetchCases = jest.fn();

// const mockFetchReferrals = jest.fn();

// jest.mock('../_services/case', () => {
//   return {
//     fetch: () => mockFetchCases,
//   };
// });

// jest.mock('../_services/referral', () => {
//   return {
//     fetch: mockFetchReferrals,
//   };
// });

describe('<DashboardContainer />', () => {
  it('exists', () => {
    expect(!!DashboardContainer).toBe(true);
  });

  it('renders', () => {
    // mockFetchCases.mockImplementationOnce(() => Promise.resolve([]));
    // mockFetchReferrals.mockImplementationOnce(() => Promise.resolve([]));
    expect(() => {
      shallow(<DashboardContainer />);
    }).not.toThrow();
  });

  // it('passes a renderEmpty callback to Caseload', () => {
  //   const wrapper = shallow(<DashboardContainer />);
  //   const caseLoad = wrapper.find(Caseload);
  //   expect(caseLoad.prop('renderEmpty')).toEqual(jasmine.any(Function));
  // });

  // describe('#renderEmptyCaseload()', () => {
  //   it('renders an Alert', () => {
  //     const wrapper = shallow(<DashboardContainer />);
  //     const renderEmptyCaseload = wrapper.instance().renderEmptyCaseload;
  //     expect(renderEmptyCaseload().type).toEqual(Alert);
  //   });
  // });

  describe('#fetchReferrals()', () => {
    it('is applied during the componentDidMount lifecycle', () => {
      const instance = shallow(<DashboardContainer />).instance();
      const spy = jest.spyOn(instance, 'fetchReferrals');
      expect(spy).not.toHaveBeenCalled();
      instance.componentDidMount();
      expect(spy).toHaveBeenCalledWith();
    });

    fit('calls the ReferralsService', () => {
      // const wrapper = shallow(<DashboardContainer />).instance();
      // wrapper.fetchReferrals();
      // console.log(DashboardContainer.prototype.fetchReferrals);
      const promise = shallow(<DashboardContainer />)
        .instance()
        .fetchReferrals();
      // console.log(promise);
      // promise.then(d => {
      //   console.log(d);
      // });
      // // console.log(mockFetchReferrals.mock.calls);
      // mockFetchReferrals.mockClear();

      expect(mockFetchReferrals).toHaveBeenCalledWith();
    });
  });

  describe('data access request methods', () => {
    describe('#fetchCases()', () => {
      it('fetches cases from API', done => {
        moxios.stubRequest('/api/cases/0Ki', {
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
          })
          .catch(done);
      });
    });
  });
});
