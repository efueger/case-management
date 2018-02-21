import React from 'react';
import { shallow } from 'enzyme';
import ICWA from './ICWA.js';

jest.mock('../../../_services/child_client');
let ChildClientService = require('../../../_services/child_client').default;

describe('ICWA', () => {
  describe('#fetchEthncityData', () => {
    let setClientSpy;
    beforeEach(() => {
      setClientSpy = jest.spyOn(ChildClientService, 'fetch');
      setClientSpy.mockReset();
    });

    afterEach(() => {
      setClientSpy.mockRestore();
    });

    it('renders', () => {
      ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
      expect(() => shallow(<ICWA />)).not.toThrow();
    });

    it('calls the ClientService', () => {
      ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
      expect(setClientSpy).not.toHaveBeenCalled();
      const wrapper = shallow(<ICWA />).instance();
      expect(setClientSpy).toHaveBeenCalledTimes(1);
      wrapper.fetchICWAData();
      expect(setClientSpy).toHaveBeenCalledWith();
      expect(setClientSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle error', () => {
      ChildClientService.fetch.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = shallow(<ICWA />);
      const instance = wrapper.instance();
      return instance.fetchICWAData().then(response => {
        expect(instance.state.response.XHRStatus).toBe('error');
      });
    });
  });

  describe('renders ICWA fields ', () => {
    let component;

    beforeEach(() => {
      component = shallow(<ICWA />);
    });

    it('renders DropDownField Component', () => {
      expect(component.find('DropDownField').length).toBe(1);
    });

    it('should render the DatePicker component', () => {
      expect(component.find('DateTimePicker').length).toEqual(1);
    });

    it('should render the Table component', () => {
      expect(component.find('BootstrapTable').length).toEqual(1);
      expect(component.find('TableHeaderColumn').length).toEqual(2);
    });

    describe('#handleDropdownChange', () => {
      it('should sets state when an event handler Calls ', () => {
        const instance = component.instance();
        const element = instance.handleDropdownChange('key');
        expect(() => {
          element({ value: 'sacramento' });
        }).not.toThrow();
        expect(instance.state.key).toEqual('sacramento');
      });
    });

    describe('#handleChange', () => {
      it('should manage the selection', () => {
        const instance = component.instance();
        instance.handleChange({ target: { value: 'foo' } });
        expect(instance.state.selected).toContain('foo');
        instance.handleChange({ target: { value: 'foo' } });
        expect(instance.state.selected).not.toContain('foo');
      });
    });

    describe('#valueToString', () => {
      beforeEach(() => {
        component = shallow(<ICWA />);
      });

      it('should set received value to Yes', () => {
        const instance = component.instance();
        instance.setState({ selected: 'Y' });
        instance.valueToString();
        expect(instance.state.selected).toEqual('Yes');
      });

      it('should set received value to label as No', () => {
        const instance = component.instance();
        instance.setState({ selected: 'N' });
        instance.valueToString();
        expect(instance.state.selected).toEqual('No');
      });

      it('should set received value to label as Not Asked', () => {
        const instance = component.instance();
        instance.setState({ selected: 'U' });
        instance.valueToString();
        expect(instance.state.selected).toEqual('Not Asked');
      });

      it('should set received value to label as Pending', () => {
        const instance = component.instance();
        instance.setState({ selected: null });
        instance.valueToString();
        expect(instance.state.selected).toEqual('Pending');
      });
    });
  });
});
