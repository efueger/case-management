import React from 'react';
import { shallow } from 'enzyme';
import OtherClientInformation from './OtherClientInformation.js';

jest.mock('../../_services/client');
let ClientService = require('../../_services/client').default;

describe('#setClients', () => {
  let setClientSpy;
  beforeEach(() => {
    setClientSpy = jest.spyOn(ClientService, 'fetch');
    setClientSpy.mockReset();
  });

  afterEach(() => {
    setClientSpy.mockRestore();
  });

  it('renders', () => {
    ClientService.fetch.mockReturnValue(Promise.resolve([]));
    expect(() => shallow(<OtherClientInformation />)).not.toThrow();
  });

  it('calls the ClientService', () => {
    ClientService.fetch.mockReturnValue(Promise.resolve([]));
    expect(setClientSpy).not.toHaveBeenCalled();
    const wrapper = shallow(<OtherClientInformation />).instance();
    expect(setClientSpy).toHaveBeenCalledTimes(1);
    wrapper.setClient();
    expect(setClientSpy).toHaveBeenCalledWith();
    expect(setClientSpy).toHaveBeenCalledTimes(2);
  });
});

describe('Other Client Information', () => {
  let otherClient;
  beforeEach(() => {
    otherClient = shallow(<OtherClientInformation />);
  });

  it('renders a Cards, DropDownFields and CheckboxRadioGroup', () => {
    expect(otherClient.find('Cards').length).toBeGreaterThan(0);
    expect(otherClient.find('DropDownField').length).toEqual(4);
    expect(otherClient.find('CheckboxRadioGroup').length).toEqual(2);
  });

  describe('#handleChange() Functions', () => {
    it('should manage the handleSpoken selection', () => {
      const instance = otherClient.instance();
      instance.handleSpokenChange({ target: { value: 'Yes' } });
      expect(instance.state.selected).toContain('Yes');
      instance.handleSpokenChange({ target: { value: 'No' } });
      expect(instance.state.selected).not.toContain(['No']);
    });

    it('should manage the Spoken In selection', () => {
      const instance = otherClient.instance();
      instance.handleSpokenInChange({ target: { value: 'No' } });
      expect(instance.state.spokenInSelection).toContain('No');
      instance.handleSpokenInChange({ target: { value: 'Yes' } });
      expect(instance.state.spokenInSelection).not.toContain(['Yes']);
    });
  });

  describe('#HandleDropDownChange Function', () => {
    it('should update state based on handleDropdownChange event', () => {
      const instance = otherClient.instance();
      const myFunction = instance.handleDropdownChange('myKey');
      expect(() => {
        myFunction({ value: 'foo-bar' });
      }).not.toThrow();
      expect(instance.state.myKey).toEqual('foo-bar');
    });
  });
});
