import React from 'react';
import { shallow } from 'enzyme';
import OtherClientInformation from './OtherClientInformation.js';

jest.mock('../../_services/child_client');
let ChildClientService = require('../../_services/child_client').default;

describe('#childclient', () => {
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
    expect(() => shallow(<OtherClientInformation />)).not.toThrow();
  });

  it('calls the ClientService', () => {
    ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
    expect(setClientSpy).not.toHaveBeenCalled();
    const wrapper = shallow(<OtherClientInformation />).instance();
    expect(setClientSpy).toHaveBeenCalledTimes(1);
    wrapper.setClient();
    expect(setClientSpy).toHaveBeenCalledWith();
    expect(setClientSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle error in #setClient', () => {
    ChildClientService.fetch.mockReturnValue(Promise.reject(Error('error')));
    const wrapper = shallow(<OtherClientInformation />);
    const instance = wrapper.instance();
    return instance.setClient().then(response => {
      expect(instance.state.response.XHRStatus).toBe('error');
    });
  });
});

describe('Other Client Information', () => {
  let otherClient;
  beforeEach(() => {
    otherClient = shallow(<OtherClientInformation />);
  });

  it('renders a Cards, DropDownFields and CheckboxRadioGroup', () => {
    expect(otherClient.find('DropDownField').length).toEqual(4);
    expect(otherClient.find('InputComponent').length).toEqual(2);
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
