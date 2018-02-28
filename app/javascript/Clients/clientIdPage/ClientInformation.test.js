import React from 'react';
import { shallow } from 'enzyme';
import ClientInformation from './ClientInformation.js';
import moment from 'moment';

jest.mock('../../_services/child_client');
let ChildClientService = require('../../_services/child_client').default;

describe('ClientInformation', () => {
  let fetchSpy, csecSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(ChildClientService, 'fetch');
    csecSpy = jest.spyOn(ChildClientService, 'csec');
    fetchSpy.mockReset();
    csecSpy.mockReset();
    ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
    ChildClientService.csec.mockReturnValue(Promise.resolve([]));
  });

  afterEach(() => {
    fetchSpy.mockRestore();
    csecSpy.mockRestore();
  });

  describe('#setClientData', () => {
    it('renders', () => {
      expect(() => shallow(<ClientInformation />)).not.toThrow();
    });

    it('calls the ClientService', () => {
      const wrapper = shallow(<ClientInformation />).instance();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      wrapper.setClientData();
      expect(fetchSpy).toHaveBeenCalledWith();
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle error #setClientData', () => {
      ChildClientService.fetch.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = shallow(<ClientInformation />);
      const instance = wrapper.instance();
      return instance.setClientData().then(response => {
        expect(instance.state.response.XHRStatus).toBe('error');
      });
    });

    it('should handle error in #setCsecData', () => {
      ChildClientService.csec.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = shallow(<ClientInformation />);
      const instance = wrapper.instance();
      return instance.setCsecData().then(response => {
        expect(instance.state.csecResponse.XHRStatus).toBe('error');
      });
    });
  });

  describe('#setCsecData', () => {
    describe('when csec response is []', () => {
      it('sets hasCsecData to false', () => {
        const wrapper = shallow(<ClientInformation />).instance();
        ChildClientService.csec.mockReturnValue(Promise.resolve([]));
        return wrapper.setCsecData().then(csecResponse => {
          expect(wrapper.state.hasCsecData).toBe(false);
          expect(wrapper.state.csecResponse.length).toEqual(0);
        });
      });
    });

    describe('when csec response is [{}]', () => {
      it('sets hasCsecData to true', () => {
        const wrapper = shallow(<ClientInformation />).instance();
        ChildClientService.csec.mockReturnValue(Promise.resolve([{}]));
        return wrapper.setCsecData().then(csecResponse => {
          expect(wrapper.state.hasCsecData).toBe(true);
          expect(wrapper.state.csecResponse.length).toEqual(1);
        });
      });
    });
  });

  describe('Client Information', () => {
    let clientPage;

    beforeEach(() => {
      clientPage = shallow(<ClientInformation />);
    });

    it('renders Card Component', () => {
      expect(clientPage.find('Cards').length).toBe(1);
    });

    it('renders components', () => {
      expect(clientPage.find('InputComponent').length).toBe(7);
      expect(clientPage.find('DropDownField').length).toBe(8);
    });

    it('toggles the display of the csec block ', () => {
      const instance = clientPage.instance();
      clientPage.setState({ hasCsecData: true });
      expect(instance.state.csecInfoBox).toContain('This case has CSEC Data');

      expect(clientPage.find('BootstrapTable').length).toBe(1);
      expect(clientPage.find('TableHeaderColumn').length).toBe(3);
    });

    describe('#handleDobChange()', () => {
      it('should calculate the Age based on user input date of birth ', () => {
        const instance = clientPage.instance();
        let userValue = moment('2002 08 02', 'YYYY MM DD');
        instance.handleDobChange({
          target: { value: moment('2002 08 02', 'YYYY MM DD') },
        });
        expect(instance.state.birthDate).toEqual(userValue);
        expect(instance.state.age).toEqual(15);
        expect(instance.state.ageUnitValue).toEqual('Y');
      });
    });

    describe('#handleChange()', () => {
      it('should manage the selection', () => {
        const instance = clientPage.instance();
        instance.handleChange({ target: { value: 'foo' } });
        expect(instance.state.selected).toContain('foo');
        instance.handleChange({ target: { value: 'foo' } });
        expect(instance.state.selected).not.toContain('foo');
      });
    });

    describe('#handleDropDownChange()  function', () => {
      it('should an event handler that sets state', () => {
        let clientPage = shallow(<ClientInformation />);
        const instance = clientPage.instance();
        const myFunction = instance.handleDropdownChange('myKey');
        expect(() => {
          myFunction({ value: 'myVal' });
        }).not.toThrow();
        expect(instance.state.myKey).toEqual('myVal');
      });
    });

    describe('#handleCsecDateChange() function', () => {
      it('should an event handler that sets csec start date', () => {
        let clientPage = shallow(<ClientInformation />);
        const instance = clientPage.instance();
        let userValue = moment('02 10 2001', 'MM DD YYYY');
        instance.handleCsecDateChange({ target: { value: userValue } });
        expect(instance.state.csecStartDate).toEqual(userValue);
      });
    });

    describe('#handleCsecChange()', () => {
      it('should manage the csecResponse with out data', () => {
        const instance = clientPage.instance();
        clientPage.setState({ csecResponse: [] });
        instance.handleCsecChange();
        expect(instance.state.hasCsecData).toBe(false);
        expect(instance.state.csecResponse.length).toEqual(0);
      });

      it('should manage the csecResponse with data', () => {
        const instance = clientPage.instance();
        clientPage.setState({ csecResponse: [{}] });
        instance.handleCsecChange();
        expect(instance.state.hasCsecData).toBe(true);
        expect(instance.state.csecResponse.length).toEqual(1);
      });
    });
  });
});
