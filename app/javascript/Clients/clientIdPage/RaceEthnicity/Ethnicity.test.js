import React from 'react';
import { shallow } from 'enzyme';
import Ethnicity from '../RaceEthnicity/Ethnicity.js';

describe('Ethnicity', () => {
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
  });
});
