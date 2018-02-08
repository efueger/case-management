import React from 'react';
import { shallow } from 'enzyme';
import ClientInformation from './ClientInformation.js';
import moment from 'moment';

jest.mock('../../_services/child_client');
let ChildClientService = require('../../_services/child_client').default;

describe('#setClientData', () => {
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
    ChildClientService.csec.mockReturnValue(Promise.resolve({}));
    expect(() => shallow(<ClientInformation />)).not.toThrow();
  });

  it('calls the ClientService', () => {
    ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
    ChildClientService.csec.mockReturnValue(Promise.resolve({}));
    expect(setClientSpy).not.toHaveBeenCalled();
    const wrapper = shallow(<ClientInformation />).instance();
    expect(setClientSpy).toHaveBeenCalledTimes(1);
    wrapper.setClient();
    expect(setClientSpy).toHaveBeenCalledWith();
    expect(setClientSpy).toHaveBeenCalledTimes(2);
  });
});

describe('#setCsecData', () => {
  let setCsecDataSpy;
  beforeEach(() => {
    setCsecDataSpy = jest.spyOn(ChildClientService, 'csec');
    setCsecDataSpy.mockReset();
  });

  afterEach(() => {
    setCsecDataSpy.mockRestore();
  });

  it('renders csec', () => {
    ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
    ChildClientService.csec.mockReturnValue(Promise.resolve({}));
    expect(() => shallow(<ClientInformation />)).not.toThrow();
  });

  it('calls the ClientService for csec', () => {
    ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
    ChildClientService.csec.mockReturnValue(Promise.resolve([]));
    expect(setCsecDataSpy).not.toHaveBeenCalled();
    const wrapper = shallow(<ClientInformation />).instance();
    expect(setCsecDataSpy).toHaveBeenCalledTimes(1);
    wrapper.setCsecData();
    expect(setCsecDataSpy).toHaveBeenCalledWith();
    expect(setCsecDataSpy).toHaveBeenCalledTimes(2);
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

  it('renders InputComponent components', () => {
    expect(clientPage.find('InputComponent').length).toBe(12);
  });

  it('toggles true when checked CSEC data', () => {
    const wrapper = clientPage.instance();
    wrapper.handleChange({
      target: { value: 'This case involves CSEC Data', checked: true },
    });
    expect(wrapper.state.csecBlock).toEqual(true);
  });

  it('toggles the display of the csec block ', () => {
    clientPage.setState({ csecBlock: false });
    expect(clientPage.find('DropDownField').length).toBe(5);
    clientPage.setState({ csecBlock: true });
    expect(clientPage.find('DropDownField').length).toBe(6);
    expect(clientPage.find('BootstrapTable').length).toBe(1);
    expect(clientPage.find('TableHeaderColumn').length).toBe(3);
  });

  it('dropdown is available on click', () => {
    expect(clientPage.find('DropDownField').length).toBe(5);
    expect(clientPage.find('DateTimePicker').length).toBe(1);
    clientPage.setState({ csecBlock: true });
    expect(clientPage.find('DropDownField').length).toBe(6);
    expect(clientPage.find('DateTimePicker').length).toBe(3);
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
});
