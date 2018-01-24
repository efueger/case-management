import React from 'react';
import { shallow } from 'enzyme';
import ClientInformation from './ClientInformation.js';
import moment from 'moment';

jest.mock('../../_services/client');
let ClientService = require('../../_services/client').default;

describe('#fetchClients', () => {
  let fetchClientSpy;
  beforeEach(() => {
    fetchClientSpy = jest.spyOn(ClientService, 'fetch');
    fetchClientSpy.mockReset();
  });

  afterEach(() => {
    fetchClientSpy.mockRestore();
  });

  it('renders', () => {
    ClientService.fetch.mockReturnValue(Promise.resolve([]));
    expect(() => shallow(<ClientInformation />)).not.toThrow();
  });

  it('calls the ClientService', () => {
    ClientService.fetch.mockReturnValue(Promise.resolve([]));
    expect(fetchClientSpy).not.toHaveBeenCalled();
    const wrapper = shallow(<ClientInformation />).instance();
    expect(fetchClientSpy).toHaveBeenCalledTimes(2);
    wrapper.fetchClient();
    expect(fetchClientSpy).toHaveBeenCalledWith();
    expect(fetchClientSpy).toHaveBeenCalledTimes(3);
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

  it('should calculate the age based on DoB', () => {
    const wrapper = clientPage.instance();
    let birth = moment(null);
    let ageCalculate = wrapper.getAge(birth);
    expect(ageCalculate.age).toBe('');
    let birthDate = moment('2011 12 02', 'YYYY MM DD');
    let element = wrapper.getAge(birthDate);
    expect(element.age).toBeTruthy();
    expect(element.ageUnitSelection).not.toBeUndefined();
    let date = moment('2016 12 02', 'YYYY MM DD');
    let old = wrapper.getAge(date);
    expect(old.age).toBeTruthy();
    expect(old.ageUnitSelection).not.toBeUndefined();
    let born = moment('2017 12 02', 'YYYY MM DD');
    let myAge = wrapper.getAge(born);
    expect(myAge.age).toBeTruthy();
    expect(myAge.ageUnitSelection).not.toBeUndefined();
    let monthsOldBaby = moment().subtract(2, 'months');
    let ageInMonths = wrapper.getAge(monthsOldBaby);
    expect(ageInMonths.age).toEqual(2);
    expect(ageInMonths.ageUnitSelection).not.toBeUndefined();
    let daysOldBaby = moment('2018 01 02', 'YYYY MM DD');
    let ageInDays = wrapper.getAge(daysOldBaby);
    expect(ageInDays.age).toBeTruthy();
    expect(ageInDays.ageUnitSelection).not.toBeUndefined();
    let futureDate = moment('2019 06 02', 'YYYY MM DD');
    let invalidDate = wrapper.getAge(futureDate);
    expect(invalidDate.age).toBeTruthy();
    expect(invalidDate.ageUnitSelection).toBeUndefined();
    const dayOldBaby = moment().subtract(1, 'days');
    const dayDate = wrapper.getAge(dayOldBaby);
    expect(dayDate.age).toEqual(1);
    expect(dayDate.ageUnitSelection).toEqual('Dy');
  });

  describe('#handleDobChange()', () => {
    it('should calculate the Age based on user input date of birth ', () => {
      const instance = clientPage.instance();
      let userValue = moment('02 10 2001', 'MM DD YYYY');
      instance.handleDobChange({
        target: { value: moment('02 10 2001', 'MM DD YYYY') },
      });
      expect(instance.state.birthDate).toEqual(userValue);
      expect(instance.state.age).toEqual(16);
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
});
