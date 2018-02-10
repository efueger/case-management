import React from 'react';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
import { DataGridCard } from '../_components';
import CaseService from '../_services/case';
import ReferralService from '../_services/referral';

jest.mock('../_services/case');
jest.mock('../_services/referral');

describe('<DashboardContainer />', () => {
  it('renders', () => {
    expect(() =>
      shallow(<DashboardContainer />, { disableLifecycleMethods: true })
    ).not.toThrow();
  });

  describe('#fetchCases', () => {
    it('retrieves cases by staff person', () => {
      const mockFetchCases = jest.fn(() => Promise.resolve([]));
      CaseService.mockImplementationOnce(() => {
        return {
          fetch: mockFetchCases,
        };
      });
      const wrapper = shallow(<DashboardContainer />, {
        disableLifecycleMethods: true,
      });
      const instance = wrapper.instance();
      instance.fetchCases();
      expect(wrapper.state('cases')).toEqual({
        XHRStatus: 'waiting',
      });
      process.nextTick(() => {
        expect(mockFetchCases).toHaveBeenCalledWith();
        expect(wrapper.state('cases')).toEqual({
          XHRStatus: 'ready',
          records: [],
        });
      });
      CaseService.mockClear();
    });
  });

  describe('#fetchReferrals()', () => {
    it('retrieves referrals by staff person', () => {
      const mockFetchReferrals = jest.fn(() => Promise.resolve([]));
      ReferralService.mockImplementationOnce(() => {
        return { fetch: mockFetchReferrals };
      });
      const wrapper = shallow(<DashboardContainer />, {
        disableLifecycleMethods: true,
      });
      const instance = wrapper.instance();
      instance.fetchReferrals();
      expect(wrapper.state('referrals')).toEqual({
        XHRStatus: 'waiting',
      });
      process.nextTick(() => {
        expect(mockFetchReferrals).toHaveBeenCalledWith();
        expect(wrapper.state('referrals')).toEqual({
          XHRStatus: 'ready',
          records: [],
        });
      });
      ReferralService.mockClear();
    });
  });

  describe('list view props', () => {
    it('constructs the cardHeaderText', () => {
      const wrapper = shallow(<DashboardContainer />, {
        disableLifecycleMethods: true,
      });
      expect(
        wrapper.find(DataGridCard).map($el => $el.prop('cardHeaderText'))
      ).toEqual(['Cases', 'Referrals']);
      wrapper.setState({
        cases: { XHRStatus: 'ready', records: [{}, {}] },
        referrals: { XHRStatus: 'ready', records: [{}, {}] },
      });
      expect(
        wrapper
          .find(DataGridCard)
          .map($wrapper => $wrapper.prop('cardHeaderText'))
      ).toEqual(['Cases (2)', 'Referrals (2)']);
    });
  });

  describe('#componentDidMount', () => {
    let instance;

    beforeEach(() => {
      instance = shallow(<DashboardContainer />, {
        disableLifecycleMethods: true,
      }).instance();
      jest.spyOn(instance, 'fetchCases').mockImplementation(() => {});
      jest.spyOn(instance, 'fetchReferrals').mockReturnValue(() => {});
    });

    it('calls fetchCases', () => {
      expect(instance.fetchCases).not.toHaveBeenCalled();
      instance.componentDidMount();
      expect(instance.fetchCases).toHaveBeenCalledWith();
    });

    it('calls fetchReferrals', () => {
      expect(instance.fetchReferrals).not.toHaveBeenCalled();
      instance.componentDidMount();
      expect(instance.fetchReferrals).toHaveBeenCalledWith();
    });
  });
});
