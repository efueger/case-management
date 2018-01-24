import FamilyFinding from './familyFinding';
import React from 'react';
import { shallow } from 'enzyme';
import {
  GlobalHeader,
  PageHeader,
  SideBar,
  DropDownField,
} from 'react-wood-duck';

jest.mock('../_services/address');
jest.mock('../_services/relationship');

const AddressService = require('../_services/address').default;
const RelationshipService = require('../_services/relationship').default;

describe('<FamilyFinding />', () => {
  it('exists', () => {
    expect(!!FamilyFinding).toBe(true);
  });

  it('#renders a GlobalHeader, PageHeader, Cards, SideBar', () => {
    const Wrapper = shallow(<FamilyFinding />);
    expect(Wrapper.find(GlobalHeader).length).toBe(1);
    expect(Wrapper.find(PageHeader).length).toBe(1);
    expect(Wrapper.find(SideBar).length).toBe(1);
  });

  describe('<DropDownField />', () => {
    it('#renders', () => {
      const Wrapper = shallow(<FamilyFinding />);
      expect(Wrapper.find(DropDownField).length).toBe(1);
      expect(Wrapper.find(DropDownField).exists()).toBe(true);
    });

    it('changes the selected options in drop down field', () => {
      const Wrapper = shallow(<FamilyFinding />);
      const testValue = { value: '', id: 1 };
      Wrapper.instance().handleChangeDropDown(testValue);
      expect(Wrapper.state('selectedOption')).toEqual(testValue.value);
    });

    it('calls the fetchClientRelationships', () => {
      RelationshipService.fetch.mockReturnValue(Promise.resolve([]));
      let fetchRelationshipSpy;
      const Wrapper = shallow(<FamilyFinding />);
      const testValue = { value: '1', id: 1 };
      fetchRelationshipSpy = jest.spyOn(
        Wrapper.instance(),
        'handleChangeDropDown'
      );
      Wrapper.instance().handleChangeDropDown(testValue);
      expect(fetchRelationshipSpy).toHaveBeenCalledWith(testValue);
      expect(fetchRelationshipSpy).toHaveBeenCalledWith(testValue);
    });
  });

  describe('#fetchClientRelationships()', () => {
    let fetchRelationshipSpy;

    beforeEach(() => {
      fetchRelationshipSpy = jest.spyOn(RelationshipService, 'fetch');
      fetchRelationshipSpy.mockReset();
    });

    afterEach(() => {
      fetchRelationshipSpy.mockReset();
      fetchRelationshipSpy.mockRestore();
    });

    it('fetches all the relationships', () => {
      RelationshipService.fetch.mockReturnValue(Promise.resolve([]));
      expect(
        shallow(<FamilyFinding />).instance().fetchClientRelationships
      ).toBeDefined();
    });

    it('calls the RelationshipService', () => {
      const wrapper = shallow(<FamilyFinding />);

      RelationshipService.fetch.mockReturnValue(Promise.resolve([]));
      expect(fetchRelationshipSpy).not.toHaveBeenCalled();
      wrapper.instance().fetchClientRelationships(42);
      expect(fetchRelationshipSpy).toHaveBeenCalledWith(42);
      expect(fetchRelationshipSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#fetchAddress()', () => {
    it('fetches a list of address', () => {
      AddressService.fetch.mockReturnValue(Promise.resolve({}));
      expect(shallow(<FamilyFinding />).instance().fetchAddress).toBeDefined();
    });
  });
});
