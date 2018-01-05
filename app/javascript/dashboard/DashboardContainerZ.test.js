import React from 'react';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';

jest.mock('../_services/case');
const CaseService = require('../_services/case').default;

describe('DashboardContainer', () => {
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
});
