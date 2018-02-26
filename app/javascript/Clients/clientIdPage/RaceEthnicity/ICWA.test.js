import React from 'react';
import { shallow } from 'enzyme';
import ICWA from './ICWA.js';

jest.mock('../../../_services/child_client');
let ChildClientService = require('../../../_services/child_client').default;

describe('ICWA', () => {
  describe('#fetchEthncityData', () => {
    let setClientSpy, indianAncestrySpy;
    beforeEach(() => {
      setClientSpy = jest.spyOn(ChildClientService, 'fetch');
      indianAncestrySpy = jest.spyOn(ChildClientService, 'indianAncestory');
      setClientSpy.mockReset();
      indianAncestrySpy.mockReset();
      ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
      ChildClientService.indianAncestory.mockReturnValue(Promise.resolve([]));
    });

    afterEach(() => {
      setClientSpy.mockRestore();
      indianAncestrySpy.mockRestore();
    });

    describe('#Fetch and #indianAncestryData', () => {
      it('renders', () => {
        expect(() => shallow(<ICWA />)).not.toThrow();
      });

      it('calls the ClientService', () => {
        // expect(setClientSpy).not.toHaveBeenCalled();
        const wrapper = shallow(<ICWA />).instance();
        expect(setClientSpy).toHaveBeenCalledTimes(1);
        expect(indianAncestrySpy).toHaveBeenCalledTimes(1);
        wrapper.fetchICWAData();
        wrapper.fetchIndianAncestoryData();
        expect(setClientSpy).toHaveBeenCalledWith();
        expect(indianAncestrySpy).toHaveBeenCalledTimes(2);
        expect(setClientSpy).toHaveBeenCalledTimes(2);
        expect(indianAncestrySpy).toHaveBeenCalledTimes(2);
      });

      it('should #fetchICWAData handle error', () => {
        ChildClientService.fetch.mockReturnValue(
          Promise.reject(Error('error'))
        );
        const wrapper = shallow(<ICWA />);
        const instance = wrapper.instance();
        return instance.fetchICWAData().then(response => {
          expect(instance.state.response.XHRStatus).toBe('error');
        });
      });

      it('should #fetchIndianAncestoryData handle error', () => {
        ChildClientService.indianAncestory.mockReturnValue(
          Promise.reject(Error('error'))
        );
        const wrapper = shallow(<ICWA />);
        const instance = wrapper.instance();
        return instance.fetchIndianAncestoryData().then(response => {
          expect(instance.state.indianAncestory.XHRStatus).toBe('error');
        });
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

    it('should render the Button component', () => {
      expect(component.find('Button').length).toEqual(1);
    });

    // it('should render the Table component', () => {
    //   expect(component.find('BootstrapTable').length).toEqual(1);
    //   expect(component.find('TableHeaderColumn').length).toEqual(2);
    // });

    it('toggles the addNotifications flag', () => {
      const wrapper = component.instance();
      wrapper.onClick();
      expect(wrapper.state.addNotifications).toEqual(true);
      wrapper.onClick();
      wrapper.setState({ addNotifications: false });
      expect(wrapper.state.addNotifications).toEqual(false);
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

    describe('#notificationInfo', () => {
      it('function defined', () => {
        const instance = component.instance();
        expect(instance.notificationsInfo()).toBeDefined();
      });

      it('Displays msg if Indian Ancestry Notifications records are empty', () => {
        const wrapper = component.instance();
        wrapper.setState({
          indianAncestory: { XHRStatus: 'ready' },
        });
        expect(wrapper.notificationsInfo()).toEqual(
          'Currently No Notifications. Click addNotifications button to add New Notifications'
        );
      });

      it('displays DataGridCard with Table if Notifications has some records', () => {
        const wrapper = shallow(<ICWA />);
        wrapper.setState({
          indianAncestory: { XHRStatus: 'ready', records: [{}, {}, {}] },
        });
        expect(
          wrapper.find('DataGridCard').map($el => $el.prop('cardHeaderText'))
        ).toEqual(['Indian Ancestry Notifications']);
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
