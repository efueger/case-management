import React from 'react';
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
});
