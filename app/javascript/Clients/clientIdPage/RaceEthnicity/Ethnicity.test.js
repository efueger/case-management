import React from 'react';
import { shallow } from 'enzyme';
import Ethnicity from './Ethnicity.js';

jest.mock('../../../_services/child_client');
let ChildClientService = require('../../../_services/child_client').default;

describe('#Ethnicity', () => {
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
      expect(() => shallow(<Ethnicity />)).not.toThrow();
    });

    it('calls the ClientService', () => {
      ChildClientService.fetch.mockReturnValue(Promise.resolve({}));
      expect(setClientSpy).not.toHaveBeenCalled();
      const wrapper = shallow(<Ethnicity />).instance();
      expect(setClientSpy).toHaveBeenCalledTimes(1);
      wrapper.fetchEthnicityData();
      expect(setClientSpy).toHaveBeenCalledWith();
      expect(setClientSpy).toHaveBeenCalledTimes(2);
    });

    it('tracks child-client api requests', () => {
      ChildClientService.fetch.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = shallow(<Ethnicity />);
      const instance = wrapper.instance();
      return instance.fetchEthnicityData().then(response => {
        expect(instance.state.response.XHRStatus).toBe('error');
      });
    });
  });

  describe('renders the Ethnicity Component functions', () => {
    let component;

    beforeEach(() => {
      component = shallow(<Ethnicity />);
    });

    it('renders EthnicityForm Component', () => {
      expect(component.find('EthnicityForm').length).toBe(1);
    });

    describe('#onchange', () => {
      describe('when value is yes', () => {
        it('sets the value of latinoOrigin and disableFields', () => {
          const instance = component.instance();
          instance.onChange('ethnicitydetail', 'Yes');
          expect(instance.state.latinoOrigin).toEqual('Yes');
          expect(instance.state.disableFields).toEqual(false);
        });
      });

      describe('when value is null', () => {
        it('sets the latinoOrigin and disableFields values', () => {
          const instance = component.instance();
          instance.onChange('ethnicitydetail', null);
          expect(instance.state.latinoOrigin).toEqual(null);
          expect(instance.state.disableFields).toEqual(false);
        });
      });

      describe('when value.length = 0', () => {
        it('sets latinoOrigin and disableFields value', () => {
          const instance = component.instance();
          instance.onChange('ethnicitydetail', '');
          expect(instance.state.latinoOrigin).toEqual('');
          expect(instance.state.disableFields).toEqual(false);
        });
      });

      describe('when value != `yes` || null || ``', () => {
        it('sets latinoOrigin and disableFields', () => {
          const instance = component.instance();
          instance.onChange('ethnicitydetail', 'No');
          expect(instance.state.latinoOrigin).toEqual('No');
          expect(instance.state.ethnicityDetail).toEqual('');
          expect(instance.state.disableFields).toEqual(true);
        });
      });

      describe('when field = ethnicity_detail', () => {
        it('sets the latinoOrigin and disableFields', () => {
          const instance = component.instance();
          instance.onChange('ethnicity_detail', 'Yes');
          expect(instance.state.ethnicityDetail).toEqual('Yes');
          instance.onChange('ethnicity_detail', 'No');
          expect(instance.state.ethnicityDetail).toEqual('No');
        });
      });

      describe('#valueToString', () => {
        beforeEach(() => {
          component = shallow(<Ethnicity />);
        });

        it('should set received value to label as Yes', () => {
          const instance = component.instance();
          instance.setState({ latinoOrigin: 'Y' });
          instance.valueToString();
          expect(instance.state.latinoOrigin).toEqual('Yes');
          expect(instance.state.disableFields).toEqual(true);
        });

        it('should set received value to label as No', () => {
          const instance = component.instance();
          instance.setState({ latinoOrigin: 'N' });
          instance.valueToString();
          expect(instance.state.latinoOrigin).toEqual('No');
          expect(instance.state.disableFields).toEqual(true);
        });

        it('should set received value to label as Unknown', () => {
          const instance = component.instance();
          instance.setState({ latinoOrigin: 'U' });
          instance.valueToString();
          expect(instance.state.latinoOrigin).toEqual('Unknown');
          expect(instance.state.disableFields).toEqual(true);
        });

        it('should set received value to label as Abandoned', () => {
          const instance = component.instance();
          instance.setState({ latinoOrigin: 'Z' });
          instance.valueToString();
          expect(instance.state.latinoOrigin).toEqual('Abandoned');
          expect(instance.state.disableFields).toEqual(true);
        });

        it('should set received value to label as Declined to Answer', () => {
          const instance = component.instance();
          instance.setState({ latinoOrigin: null });
          instance.valueToString();
          expect(instance.state.latinoOrigin).toEqual('Declined to answer');
          expect(instance.state.disableFields).toEqual(true);
        });
      });
    });
  });
});
