import React from 'react';
import { shallow } from 'enzyme';
import Race from '../RaceEthnicity/Race.js';

describe('Ethnicity', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Race />);
  });

  it('renders RaceForm Component', () => {
    expect(component.find('RaceForm').length).toBe(1);
  });

  describe('#onRaceChange', () => {
    describe('when changedRace is Unknown', () => {
      it('sets the state of races, raceDetails and racesDisabled', () => {
        const instance = component.instance();
        instance.onRaceChange('Unknown', true);
        expect(instance.state.races.Unknown).toEqual(true);
        expect(instance.state.raceDetails.Unknown).toEqual('');
        expect(instance.state.racesDisabled).toEqual(true);
      });
    });

    describe('when changedRace is Abandoned', () => {
      it('sets the races, raceDetails and racesDisabled', () => {
        const instance = component.instance();
        instance.onRaceChange('Abandoned', true);
        expect(instance.state.races.Abandoned).toEqual(true);
        expect(instance.state.raceDetails.Unknown).toEqual('');
        expect(instance.state.racesDisabled).toEqual(true);
      });
    });

    describe('when changedRace is Declined to answer', () => {
      it('sets the initial value of races, raceDetails and racesDisabled', () => {
        const instance = component.instance();
        instance.onRaceChange('Declined to answer', true);
        expect(instance.state.races['Declined to answer']).toEqual(true);
        expect(instance.state.raceDetails.Unknown).toEqual('');
        expect(instance.state.racesDisabled).toEqual(true);
        instance.onRaceChange('Asian', false);
        expect(instance.state.races.Asian).toEqual(false);
      });
    });
  });
});

describe('#onRaceDetailChange', () => {
  let wrapper = shallow(<Race />);
  describe('when changedRace is White', () => {
    it('sets the values of raceDetails', () => {
      const instance = wrapper.instance();
      instance.onRaceDetailChange('White', true);
      expect(instance.state.raceDetails.White).toEqual(true);
    });
  });

  describe('when changedRace is Asian', () => {
    it('sets the raceDetails value', () => {
      const instance = wrapper.instance();
      instance.onRaceDetailChange('Asian', true);
      expect(instance.state.raceDetails.Asian).toEqual(true);
    });
  });
});
