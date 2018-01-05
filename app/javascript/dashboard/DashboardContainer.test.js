import React from 'react';
// import moxios from 'moxios';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';

jest.mock('../_services/case');
const CaseService = require('../_services/case').default;

describe('<DashboardContainer />', () => {
  it('exists', () => {
    expect(!!DashboardContainer).toBe(true);
  });

  it('renders', () => {
    CaseService.fetch.mockReturnValue(Promise.resolve([]));
    expect(() => shallow(<DashboardContainer />)).not.toThrow();
  });

  describe('#fetchCases', () => {
    let fetchCasesSpy;

    beforeEach(() => {
      fetchCasesSpy = jest.spyOn(CaseService, 'fetch');
      fetchCasesSpy.mockReset();
    });

    afterEach(() => {
      fetchCasesSpy.mockReset();
      fetchCasesSpy.mockRestore();
    });

    it('calls the CaseService', () => {
      CaseService.fetch.mockReturnValue(Promise.resolve([]));
      expect(fetchCasesSpy).not.toHaveBeenCalled();
      const wrapper = shallow(<DashboardContainer />).instance();
      expect(fetchCasesSpy).toHaveBeenCalledTimes(1);
      wrapper.fetchCases();
      expect(fetchCasesSpy).toHaveBeenCalledWith();
      expect(fetchCasesSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('#fetchReferrals()', () => {
    it('does something', () => {
      CaseService.fetch.mockReturnValue(Promise.resolve([]));
      const instance = shallow(<DashboardContainer />).instance();
      expect(instance.fetchReferrals).toBeDefined();
    });
  });
});
